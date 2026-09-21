import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StudentVerificationsPage } from "@/pages/admin/student-verifications/StudentVerificationsPage";
import { DelegateRegistrationSection } from "@/pages/registration/delegate/DelegateRegistrationSection";
import { delegateRegistrationSchema } from "@/pages/registration/delegate/delegateRegistrationSchema";
import type { DelegatePackage } from "@/services/delegate/delegateService";
import {
  getAdminStudentVerifications,
  submitStudentApplication,
} from "@/services/studentVerification/studentVerificationService";

const studentPackage: DelegatePackage = {
  id: "9f54a313-4132-4c15-9177-4c2e83f083b1",
  slug: "student-delegate",
  name: "Student Delegate",
  delegateType: "STUDENT",
  description: "For currently enrolled students, subject to Student status verification.",
  benefits: ["Student-focused conference participation"],
  currency: null,
  priceMinor: null,
  prices: [],
  paymentAvailable: false,
  verificationRequired: true,
  pricingStatus: "TO_BE_CONFIRMED",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Student Delegate foundation", () => {
  it("shows unpriced Student package messaging and academic fields without checkout", () => {
    render(
      <DelegateRegistrationSection
        state="ready"
        packages={[studentPackage]}
        confirmation={null}
        onSubmitted={vi.fn()}
        onRetry={vi.fn()}
      />,
    );
    expect(screen.getByText("To be confirmed")).toBeVisible();
    expect(screen.getByText(/Student verification is required before payment/)).toBeVisible();
    expect(screen.getByRole("textbox", { name: /Institution name/ })).toBeVisible();
    expect(screen.getByRole("textbox", { name: /Student ID/ })).toBeVisible();
    expect(screen.queryByRole("textbox", { name: /Job title/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Payment/ })).not.toBeInTheDocument();
  });

  it("keeps Student academic validation conditional and Professional requirements intact", () => {
    const common = {
      packageId: studentPackage.id,
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada@example.com",
      mobile: "+2348000000000",
      telephone: "",
      country: "Nigeria",
      mainObjective: "Learn from experts and meet collaborators.",
      heardAboutSource: "University",
      privacyConsent: true,
      dataSharingConsent: false,
      jobTitle: "",
      companyName: "",
      primaryActivity: "",
      institutionName: "University of Lagos",
      institutionCountry: "Nigeria",
      programmeOfStudy: "Engineering",
      studentIdentificationNumber: "UL-123",
      expectedGraduationYear: "2028",
      institutionalEmail: "",
    };
    expect(
      delegateRegistrationSchema.safeParse({ ...common, delegateType: "STUDENT" }).success,
    ).toBe(true);
    expect(
      delegateRegistrationSchema.safeParse({
        ...common,
        delegateType: "STUDENT",
        studentIdentificationNumber: "",
      }).success,
    ).toBe(false);
    expect(
      delegateRegistrationSchema.safeParse({ ...common, delegateType: "PROFESSIONAL" }).success,
    ).toBe(false);
  });

  it("posts Student applications only to the dedicated public endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          success: true,
          data: {
            reference: "AIAIAC-DEL-STUDENT1",
            registrationStatus: "SUBMITTED",
            paymentStatus: "PENDING",
            verificationStatus: "NOT_SUBMITTED",
            paymentAvailable: false,
          },
        },
        201,
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await submitStudentApplication({
      packageId: studentPackage.id,
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada@example.com",
      mobile: "+2348000000000",
      country: "Nigeria",
      mainObjective: "Learn from experts and meet collaborators.",
      heardAboutSource: "University",
      privacyConsent: true,
      dataSharingConsent: false,
      institutionName: "University of Lagos",
      institutionCountry: "Nigeria",
      programmeOfStudy: "Engineering",
      studentIdentificationNumber: "UL-123",
      expectedGraduationYear: 2028,
    });
    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/student-delegate-applications",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("renders the protected Student queue as read-only", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          data: {
            verifications: {
              items: [
                {
                  registrationReference: "AIAIAC-DEL-STUDENT1",
                  delegateName: "Ada Okafor",
                  institutionName: "University of Lagos",
                  institutionCountry: "Nigeria",
                  programmeOfStudy: "Engineering",
                  verificationStatus: "NOT_SUBMITTED",
                  submittedAt: null,
                  reviewedAt: null,
                  createdAt: "2026-09-20T10:00:00.000Z",
                },
              ],
              total: 1,
              page: 1,
              limit: 20,
            },
          },
        }),
      ),
    );
    render(<StudentVerificationsPage />);
    expect(await screen.findByText("AIAIAC-DEL-STUDENT1")).toBeVisible();
    expect(screen.getAllByText("NOT SUBMITTED").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /approve/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /reject/i })).not.toBeInTheDocument();
  });

  it("uses the protected Admin Student verification endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        success: true,
        data: { verifications: { items: [], total: 0, page: 1, limit: 20 } },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await getAdminStudentVerifications({ status: "NOT_SUBMITTED" });
    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin/student-verifications?status=NOT_SUBMITTED",
      expect.objectContaining({ credentials: "include" }),
    );
  });

  it("shows the secure two-category upload flow and fails closed when scanning is unavailable", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            evidence: {
              items: [],
              readiness: {
                hasAvailableStudentId: false,
                hasAvailableEnrolmentEvidence: false,
                minimumEvidenceReady: false,
              },
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse(
          {
            success: true,
            data: {
              evidence: {
                evidenceId: "00000000-0000-4000-8000-000000000001",
                evidenceType: "CURRENT_STUDENT_ID",
                category: "STUDENT_ID",
                displayFilename: "student-id.png",
                detectedMimeType: "image/png",
                sizeBytes: 68,
                checksumSha256: "a".repeat(64),
                scanStatus: "UNAVAILABLE",
                documentStatus: "PENDING_SCAN",
                uploadedAt: "2026-09-21T12:00:00.000Z",
              },
              readiness: {
                hasAvailableStudentId: false,
                hasAvailableEnrolmentEvidence: false,
                minimumEvidenceReady: false,
              },
            },
          },
          201,
        ),
      );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(
      <DelegateRegistrationSection
        state="ready"
        packages={[studentPackage]}
        confirmation={{
          reference: "AIAIAC-DEL-STUDENT1",
          registrationStatus: "SUBMITTED",
          paymentStatus: "PENDING",
          verificationStatus: "NOT_SUBMITTED",
          paymentAvailable: false,
          continuationToken: "A".repeat(43),
          continuationTokenExpiresAt: "2026-09-22T12:00:00.000Z",
        }}
        onSubmitted={vi.fn()}
        onRetry={vi.fn()}
      />,
    );

    expect(
      await screen.findByRole("heading", { name: /Add your Student Delegate evidence/i }),
    ).toBeVisible();
    expect(screen.getByText(/current student ID and at least one institutional/i)).toBeVisible();
    expect(screen.getByText(/limited to 5 MB each/i)).toBeVisible();
    expect(screen.queryByRole("button", { name: /Proceed to/i })).not.toBeInTheDocument();

    const idInput = screen.getByLabelText(/Choose PDF, JPEG, or PNG/i, {
      selector: 'input[name="CURRENT_STUDENT_ID"]',
    });
    await user.upload(idInput, new File(["image"], "student-id.png", { type: "image/png" }));
    await user.click(screen.getAllByRole("button", { name: "Upload evidence" })[0]!);

    expect(await screen.findByText("Unable to verify file safely")).toBeVisible();
    expect(
      screen.getByText(/not available to reviewers until safety scanning succeeds/i),
    ).toBeVisible();
    const [url, options] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toBe("/api/student-delegate-applications/AIAIAC-DEL-STUDENT1/evidence");
    expect(new Headers(options.headers).get("x-aiaiac-continuation-token")).toBe("A".repeat(43));
    expect(new Headers(options.headers).get("x-aiaiac-evidence-type")).toBe("CURRENT_STUDENT_ID");
    expect(options.body).toBeInstanceOf(FormData);
  });

  it("shows Admin evidence metadata and download only for clean available documents", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          data: {
            verifications: {
              items: [
                {
                  registrationReference: "AIAIAC-DEL-STUDENT1",
                  delegateName: "Ada Okafor",
                  institutionName: "University of Lagos",
                  institutionCountry: "Nigeria",
                  programmeOfStudy: "Engineering",
                  verificationStatus: "NOT_SUBMITTED",
                  submittedAt: null,
                  reviewedAt: null,
                  createdAt: "2026-09-20T10:00:00.000Z",
                  evidence: [
                    {
                      evidenceId: "00000000-0000-4000-8000-000000000001",
                      evidenceType: "CURRENT_STUDENT_ID",
                      category: "STUDENT_ID",
                      displayFilename: "student-id.png",
                      detectedMimeType: "image/png",
                      sizeBytes: 68,
                      checksumSha256: "a".repeat(64),
                      scanStatus: "CLEAN",
                      documentStatus: "AVAILABLE",
                      uploadedAt: "2026-09-21T12:00:00.000Z",
                    },
                    {
                      evidenceId: "00000000-0000-4000-8000-000000000002",
                      evidenceType: "ENROLMENT_LETTER",
                      category: "ENROLMENT",
                      displayFilename: "letter.pdf",
                      detectedMimeType: "application/pdf",
                      sizeBytes: 120,
                      checksumSha256: "b".repeat(64),
                      scanStatus: "INFECTED",
                      documentStatus: "REJECTED",
                      uploadedAt: "2026-09-21T12:01:00.000Z",
                    },
                  ],
                  evidenceReadiness: {
                    hasAvailableStudentId: true,
                    hasAvailableEnrolmentEvidence: false,
                    minimumEvidenceReady: false,
                  },
                },
              ],
              total: 1,
              page: 1,
              limit: 20,
            },
          },
        }),
      ),
    );
    render(<StudentVerificationsPage />);
    expect(await screen.findByText("student-id.png")).toBeVisible();
    expect(screen.getByText("letter.pdf")).toBeVisible();
    expect(screen.getByRole("button", { name: "Download" })).toBeVisible();
    expect(screen.queryByRole("button", { name: /approve/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /reject/i })).not.toBeInTheDocument();
  });
});
