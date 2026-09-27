import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AuthContext } from "@/context/authContextValue";
import { StudentVerificationDetailPage } from "@/pages/admin/student-verifications/StudentVerificationDetailPage";
import { StudentEvidenceUploadPanel } from "@/pages/registration/delegate/StudentEvidenceUploadPanel";
import { StudentVerificationAccessPage } from "@/pages/registration/student-verification/StudentVerificationAccessPage";
import type {
  StudentEvidenceMetadata,
  StudentVerificationPublicState,
} from "@/services/studentVerification/studentVerificationService";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const evidence: StudentEvidenceMetadata[] = [
  {
    evidenceId: "student-id",
    evidenceType: "CURRENT_STUDENT_ID",
    category: "STUDENT_ID",
    displayFilename: "student-id.png",
    detectedMimeType: "image/png",
    sizeBytes: 1024,
    checksumSha256: "a".repeat(64),
    scanStatus: "CLEAN",
    documentStatus: "AVAILABLE",
    uploadedAt: "2026-09-21T10:00:00.000Z",
  },
  {
    evidenceId: "enrolment-id",
    evidenceType: "COURSE_REGISTRATION",
    category: "ENROLMENT",
    displayFilename: "course-registration.pdf",
    detectedMimeType: "application/pdf",
    sizeBytes: 2048,
    checksumSha256: "b".repeat(64),
    scanStatus: "CLEAN",
    documentStatus: "AVAILABLE",
    uploadedAt: "2026-09-21T10:01:00.000Z",
  },
];

function publicState(
  status: StudentVerificationPublicState["verificationStatus"],
  overrides: Partial<StudentVerificationPublicState> = {},
): StudentVerificationPublicState {
  const editable = status === "NOT_SUBMITTED" || status === "MORE_INFORMATION_REQUIRED";
  return {
    registrationReference: "AIAIAC-DEL-STUDENT1",
    verificationStatus: status,
    submittedAt: status === "NOT_SUBMITTED" ? null : "2026-09-21T10:02:00.000Z",
    reviewedAt: null,
    latestReviewReason: null,
    evidence,
    evidenceReadiness: {
      hasAvailableStudentId: true,
      hasAvailableEnrolmentEvidence: true,
      minimumEvidenceReady: true,
    },
    evidenceEditingAllowed: editable,
    submissionAllowed: editable,
    paymentAvailable: false,
    ...overrides,
  };
}

function verificationResponse(verification: StudentVerificationPublicState) {
  return jsonResponse({ success: true, data: { verification } });
}

describe("Student verification workflow UI", () => {
  it("keeps an approved but unpriced Student non-payable", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          verificationResponse(
            publicState("APPROVED", { availablePrices: [], paymentAvailable: false }),
          ),
        ),
    );
    render(
      <StudentEvidenceUploadPanel
        reference="AIAIAC-DEL-STUDENT1"
        continuationToken={"T".repeat(43)}
      />,
    );
    expect(
      await screen.findByText(
        /Registration pricing and payment instructions will be made available once confirmed/,
      ),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /Proceed to Student Delegate payment/ }),
    ).not.toBeInTheDocument();
  });

  it("shows only authoritative Student currency prices after approval", async () => {
    const prices = [
      { currency: "USD" as const, amountMinor: 12300 },
      { currency: "NGN" as const, amountMinor: 456700 },
    ];
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          verificationResponse(
            publicState("APPROVED", { availablePrices: prices, paymentAvailable: true }),
          ),
        ),
    );
    render(
      <StudentEvidenceUploadPanel
        reference="AIAIAC-DEL-STUDENT1"
        continuationToken={"T".repeat(43)}
      />,
    );
    expect(
      await screen.findByRole("button", { name: "Proceed to Student Delegate payment" }),
    ).toBeEnabled();
    expect(screen.getByText(/\$123\.00 \(USD\)/)).toBeVisible();
    expect(screen.getByText(/₦4,567\.00 \(NGN\)/)).toBeVisible();
    expect(screen.queryByText(/₦1,400\/USD/)).not.toBeInTheDocument();
  });

  it("initializes only the selected currency, never a browser-supplied amount", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        verificationResponse(
          publicState("APPROVED", {
            availablePrices: [
              { currency: "USD", amountMinor: 12300 },
              { currency: "NGN", amountMinor: 456700 },
            ],
            paymentAvailable: true,
          }),
        ),
      )
      .mockResolvedValueOnce(jsonResponse({ success: false }, 503));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(
      <StudentEvidenceUploadPanel
        reference="AIAIAC-DEL-STUDENT1"
        continuationToken={"T".repeat(43)}
      />,
    );
    await user.click(await screen.findByRole("radio", { name: /₦4,567\.00 \(NGN\)/ }));
    await user.click(screen.getByRole("button", { name: "Proceed to Student Delegate payment" }));
    await screen.findByRole("alert");
    const [url, options] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain("/delegate-registrations/AIAIAC-DEL-STUDENT1/payment/initialize");
    expect(options.method).toBe("POST");
    expect(JSON.parse(String(options.body))).toEqual({ currency: "NGN" });
  });

  it("does not show payment before approval even if Student prices are active", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        verificationResponse(
          publicState("PENDING", {
            availablePrices: [{ currency: "USD", amountMinor: 12300 }],
            paymentAvailable: false,
          }),
        ),
      ),
    );
    render(
      <StudentEvidenceUploadPanel
        reference="AIAIAC-DEL-STUDENT1"
        continuationToken={"T".repeat(43)}
      />,
    );
    expect(await screen.findByText(/under review/i)).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /Proceed to Student Delegate payment/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/\$123\.00/)).not.toBeInTheDocument();
  });

  it("submits only when server readiness allows it, then freezes evidence while pending", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(verificationResponse(publicState("NOT_SUBMITTED")))
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            registrationReference: "AIAIAC-DEL-STUDENT1",
            verificationStatus: "PENDING",
          },
        }),
      )
      .mockResolvedValueOnce(
        verificationResponse(
          publicState("PENDING", { evidenceEditingAllowed: false, submissionAllowed: false }),
        ),
      );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(
      <StudentEvidenceUploadPanel
        reference="AIAIAC-DEL-STUDENT1"
        continuationToken={"T".repeat(43)}
      />,
    );

    await user.click(await screen.findByRole("button", { name: "Submit for verification" }));
    expect(await screen.findByText(/under review/i)).toBeVisible();
    expect(screen.queryByLabelText(/Choose PDF, JPEG, or PNG/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /submit for verification/i }),
    ).not.toBeInTheDocument();
    const [url, options] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain("/verification/submit");
    expect(options.body).toBe("{}");
  });

  it("shows the exact Admin instruction and permits explicit resubmission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        verificationResponse(
          publicState("MORE_INFORMATION_REQUIRED", {
            latestReviewReason: "Please upload a clearer image of your current Student ID.",
          }),
        ),
      ),
    );
    render(
      <StudentEvidenceUploadPanel
        reference="AIAIAC-DEL-STUDENT1"
        continuationToken={"T".repeat(43)}
      />,
    );
    expect(
      await screen.findByText(/Please upload a clearer image of your current Student ID/),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Resubmit for verification" })).toBeEnabled();
    expect(screen.getAllByLabelText(/Choose PDF, JPEG, or PNG/i)).toHaveLength(2);
  });

  it("uses an enumeration-resistant recovery request and never shows payment", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          success: true,
          message:
            "If the details match an eligible Student application, a secure recovery email will be sent.",
        },
        202,
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <StudentVerificationAccessPage />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText("Registration reference"), "AIAIAC-DEL-STUDENT1");
    await user.type(screen.getByLabelText("Application email"), "ada@example.edu");
    await user.click(screen.getByRole("button", { name: "Email secure link" }));
    expect(await screen.findByText(/If the details match/)).toBeVisible();
    expect(screen.queryByRole("button", { name: /pay|payment/i })).not.toBeInTheDocument();
  });

  it("shows review controls only to a reviewer and requires a meaningful rejection reason", async () => {
    const pending = {
      ...publicState("PENDING", { evidenceEditingAllowed: false, submissionAllowed: false }),
      delegateName: "Ada Okafor",
      email: "ada@example.edu",
      institutionName: "University of Lagos",
      institutionCountry: "Nigeria",
      programmeOfStudy: "Mechanical Engineering",
      studentIdentificationNumber: "UL-123",
      expectedGraduationYear: 2028,
      institutionalEmail: "ada@unilag.edu.ng",
      createdAt: "2026-09-21T09:00:00.000Z",
      history: [],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ success: true, data: { verification: pending } })),
    );
    const user = userEvent.setup();
    render(
      <AuthContext.Provider
        value={{
          admin: {
            id: "admin-1",
            fullName: "Review Admin",
            email: "review@example.com",
            role: "REGISTRATION_MANAGER",
            permissions: ["student_verifications.read", "student_verifications.review"],
          },
          isAuthenticated: true,
          isLoading: false,
          sessionExpired: false,
          login: vi.fn(),
          logout: vi.fn(),
          refreshCurrentAdmin: vi.fn(),
        }}
      >
        <MemoryRouter initialEntries={["/admin/student-verifications/AIAIAC-DEL-STUDENT1"]}>
          <Routes>
            <Route
              path="/admin/student-verifications/:reference"
              element={<StudentVerificationDetailPage />}
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    await user.click(await screen.findByRole("button", { name: "Reject application" }));
    const confirm = screen.getByRole("button", { name: "Confirm decision" });
    expect(confirm).toBeDisabled();
    await user.type(
      screen.getByLabelText(/Reason \(required/),
      "The evidence does not demonstrate current enrolment.",
    );
    expect(confirm).toBeEnabled();
    expect(screen.queryByText("a".repeat(64))).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Ada Okafor")).toBeVisible());
  });
});
