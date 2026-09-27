import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AbstractSubmissionPage } from "@/pages/registration/abstract/AbstractSubmissionPage";
import { AbstractSubmissionsPage } from "@/pages/admin/abstracts/AbstractSubmissionsPage";
import { AbstractSubmissionDetailPage } from "@/pages/admin/abstracts/AbstractSubmissionDetailPage";
import {
  countAbstractWords,
  createAbstractIdempotencyKey,
  submitAbstract,
} from "@/services/abstractSubmission/abstractSubmissionService";

vi.mock("@/components/layout/PublicPageLayout", () => ({
  PublicPageLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ admin: { permissions: ["abstracts.read", "abstracts.review"] } }),
}));

afterEach(() => vi.unstubAllGlobals());

function jsonResponse(body: unknown, status = 201): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Abstract submission frontend", () => {
  it("uses the same whitespace word-count rule and a 256-bit client retry key", () => {
    expect(countAbstractWords("  One\n two   three  ")).toBe(3);
    expect(countAbstractWords(Array(500).fill("word").join(" "))).toBe(500);
    expect(createAbstractIdempotencyKey()).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("shows deadline, live word count, author fields and a recovery form", () => {
    render(
      <MemoryRouter>
        <AbstractSubmissionPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/15 March 2027/)).toBeVisible();
    expect(screen.getByText("0 / 500 words")).toBeVisible();
    expect(screen.getByLabelText("Abstract body *")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Return to your Abstract" })).toBeVisible();
  });

  it("submits bounded public fields and shows a reference without claiming payment", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            reference: "AIAIAC-ABS-ABCD1234",
            title: "Integrity research",
            wordCount: 10,
            status: "SUBMITTED",
            submittedAt: "2026-09-22T12:00:00Z",
            continuationToken: "A".repeat(43),
            continuationTokenExpiresAt: "2026-09-23T12:00:00Z",
            nextStep: "Review follows.",
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            workspace: {
              reference: "AIAIAC-ABS-ABCD1234",
              title: "Integrity research",
              abstractBody: "A valid abstract body here.",
              wordCount: 5,
              keywords: null,
              topic: null,
              status: "SUBMITTED",
              submittedAt: "2026-09-22T12:00:00Z",
              resubmittedAt: null,
              currentReviewReason: null,
              editingAllowed: false,
              resubmissionAllowed: false,
              paymentAvailable: false,
            },
          },
        }),
      );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <MemoryRouter>
        <AbstractSubmissionPage />
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("First name"), "Ada");
    await user.type(screen.getByLabelText("Last name"), "Author");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Phone"), "+2348000000000");
    await user.type(screen.getByLabelText("Organization / institution"), "Research Centre");
    await user.type(screen.getByLabelText("Country"), "Nigeria");
    await user.type(screen.getByLabelText("Abstract title *"), "Integrity research");
    await user.type(
      screen.getByLabelText("Abstract body *"),
      "A short but valid research abstract body.",
    );
    expect(screen.getByText("7 / 500 words")).toBeVisible();
    await user.click(screen.getByLabelText(/I confirm this submission/));
    await user.click(screen.getByRole("button", { name: "Submit Abstract" }));
    await waitFor(() => expect(screen.getByText("AIAIAC-ABS-ABCD1234")).toBeVisible());
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const payload = JSON.parse(String(request.body));
    expect(payload).toEqual(
      expect.objectContaining({
        title: "Integrity research",
        authorEmail: "ada@example.com",
        consent: true,
      }),
    );
    expect(payload.idempotencyKey).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(String(request.body)).not.toMatch(/paymentStatus|reviewerId|priceMinor/);
    expect(screen.queryByText(/payment required|Event Pass issued/i)).not.toBeInTheDocument();
  });

  it("maps the public submission envelope without exposing an internal UUID", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          reference: "AIAIAC-ABS-ABCD1234",
          title: "Test title",
          wordCount: 3,
          status: "SUBMITTED",
          submittedAt: "2026-09-22T12:00:00Z",
          continuationToken: "A".repeat(43),
          continuationTokenExpiresAt: "2026-09-23T12:00:00Z",
          nextStep: "Review follows.",
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await submitAbstract({
      idempotencyKey: createAbstractIdempotencyKey(),
      authorFirstName: "Ada",
      authorLastName: "Author",
      authorEmail: "ada@example.com",
      authorPhone: "+2348000000000",
      organizationName: "Centre",
      country: "Nigeria",
      title: "Test title",
      abstractBody: "One two three",
      consent: true,
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect("id" in result.confirmation).toBe(false);
  });

  it("renders the server-paginated Admin queue with status and reference", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          submissions: {
            page: 1,
            pageSize: 20,
            total: 1,
            totalPages: 1,
            items: [
              {
                reference: "AIAIAC-ABS-ABCD1234",
                authorName: "Ada Author",
                organizationName: "Research Centre",
                country: "Nigeria",
                title: "Integrity research",
                wordCount: 42,
                status: "SUBMITTED",
                submittedAt: "2026-09-22T12:00:00Z",
                resubmittedAt: null,
              },
            ],
          },
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <MemoryRouter>
        <AbstractSubmissionsPage />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("link", { name: "AIAIAC-ABS-ABCD1234" })).toBeVisible();
    expect(screen.getByText("Ada Author")).toBeVisible();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin/abstract-submissions?page=1&limit=20",
      expect.objectContaining({ credentials: "include" }),
    );
  });

  it("shows Admin detail, prior reason, and only actions valid for under-review status", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          submission: {
            reference: "AIAIAC-ABS-ABCD1234",
            authorName: "Ada Author",
            authorEmail: "ada@example.com",
            authorPhone: "+2348000000000",
            organizationName: "Research Centre",
            jobTitle: null,
            country: "Nigeria",
            title: "Integrity research",
            abstractBody: "A plain text abstract body.",
            wordCount: 5,
            keywords: null,
            topic: null,
            status: "UNDER_REVIEW",
            currentReviewReason: null,
            reviewerName: "Admin Reviewer",
            submittedAt: "2026-09-22T12:00:00Z",
            resubmittedAt: null,
            reviewStartedAt: "2026-09-23T12:00:00Z",
            decidedAt: null,
            history: [
              {
                id: "h1",
                action: "REVISION_REQUIRED",
                fromStatus: "UNDER_REVIEW",
                toStatus: "REVISION_REQUIRED",
                reviewerName: "Admin Reviewer",
                authorVisibleReason: "Please clarify the methodology.",
                internalNote: null,
                wordCount: 5,
                createdAt: "2026-09-22T12:00:00Z",
              },
            ],
          },
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <MemoryRouter initialEntries={["/admin/abstract-submissions/AIAIAC-ABS-ABCD1234"]}>
        <Routes>
          <Route
            path="/admin/abstract-submissions/:reference"
            element={<AbstractSubmissionDetailPage />}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText("A plain text abstract body.")).toBeVisible();
    expect(screen.getByText(/Please clarify the methodology/)).toBeVisible();
    expect(screen.getByRole("button", { name: "Accept" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Request revision" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Start review" })).not.toBeInTheDocument();
  });
});
