import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EnquiriesPage } from "@/pages/admin/enquiries/EnquiriesPage";
import { EnquiryDetailPage } from "@/pages/admin/enquiries/EnquiryDetailPage";
import { createEnquiryIdempotencyKey, submitEnquiry } from "@/services/enquiry/enquiryService";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ admin: { permissions: ["enquiries.read", "enquiries.manage"] } }),
}));
afterEach(() => vi.unstubAllGlobals());

const reference = "AIAIAC-ENQ-ABCD1234";
const item = {
  reference,
  sender: "Amina Okafor",
  email: "amina@example.com",
  category: "GENERAL",
  subject: "Conference question",
  status: "OPEN",
  submittedAt: "2026-09-23T12:00:00.000Z",
};
function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Enquiry frontend", () => {
  it("generates a 256-bit retry key", () => {
    expect(createEnquiryIdempotencyKey()).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(createEnquiryIdempotencyKey()).not.toBe(createEnquiryIdempotencyKey());
  });

  it("submits through the real API boundary without browser payment or status fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          reference,
          acknowledgement: "We have received your enquiry.",
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await submitEnquiry({
      idempotencyKey: createEnquiryIdempotencyKey(),
      firstName: "Amina",
      lastName: "Okafor",
      email: "amina@example.com",
      category: "GENERAL",
      subject: "Conference question",
      message: "Please provide more information about the venue.",
    });
    expect(result).toEqual({
      ok: true,
      reference,
      acknowledgement: "We have received your enquiry.",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/enquiries",
      expect.objectContaining({ method: "POST" }),
    );
    expect(String((fetchMock.mock.calls[0]?.[1] as RequestInit).body)).not.toMatch(
      /paymentStatus|priceMinor|adminId/,
    );
  });

  it("renders the protected paginated queue from the API", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          enquiries: { items: [item], page: 1, pageSize: 20, total: 1, totalPages: 1 },
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <MemoryRouter>
        <EnquiriesPage />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("link", { name: reference })).toHaveAttribute(
      "href",
      `/admin/enquiries/${reference}`,
    );
    expect(screen.getByText("Amina Okafor")).toBeVisible();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/admin/enquiries?"),
      expect.objectContaining({ credentials: "include" }),
    );
    await userEvent.setup().selectOptions(screen.getByLabelText("Filter by category"), "GENERAL");
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some((call) => String(call[0]).includes("category=GENERAL")),
      ).toBe(true),
    );
  });

  it("shows status actions and internal history without implying a visitor reply", async () => {
    const detail = {
      ...item,
      firstName: "Amina",
      lastName: "Okafor",
      phone: null,
      organization: null,
      country: null,
      message: "Please send information about the venue.",
      updatedAt: item.submittedAt,
      resolvedAt: null,
      closedAt: null,
      history: [
        {
          id: "history",
          action: "SUBMITTED",
          fromStatus: null,
          toStatus: "OPEN",
          adminName: null,
          internalNote: null,
          createdAt: item.submittedAt,
        },
      ],
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ success: true, data: { enquiry: detail } }));
    vi.stubGlobal("fetch", fetchMock);
    render(
      <MemoryRouter initialEntries={[`/admin/enquiries/${reference}`]}>
        <Routes>
          <Route path="/admin/enquiries/:reference" element={<EnquiryDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText("Please send information about the venue.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Mark in progress" })).toBeVisible();
    expect(screen.getByText(/does not send a response to the visitor/)).toBeVisible();
    await userEvent.setup().click(screen.getByRole("button", { name: "Mark in progress" }));
    await userEvent
      .setup()
      .type(screen.getByLabelText("Internal note (optional)"), "Following up.");
    await userEvent.setup().click(screen.getByRole("button", { name: "Confirm status" }));
    await waitFor(() =>
      expect(fetchMock.mock.calls.some((call) => String(call[0]).endsWith("/in-progress"))).toBe(
        true,
      ),
    );
  });
});
