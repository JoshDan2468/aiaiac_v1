import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PermissionRoute } from "@/components/admin/PermissionRoute";
import { ReportsPage } from "@/pages/admin/reports/ReportsPage";
import type { Permission } from "@/types/auth";

const { auth } = vi.hoisted(() => ({ auth: { permissions: [] as Permission[] } }));
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ admin: { permissions: auth.permissions } }),
}));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const report = {
  domain: "delegates",
  columns: [
    { key: "reference", label: "Registration Reference" },
    { key: "name", label: "Delegate Name" },
  ],
  items: [{ reference: "AIAIAC-DEL-ABCDEFGH", name: "Ada Delegate" }],
  page: 1,
  pageSize: 20,
  total: 1,
  totalPages: 1,
};
const summary = {
  professionalRegistrations: 4,
  paidProfessionalRegistrations: 2,
  pendingProfessionalRegistrations: 1,
  studentsByStatus: { PENDING: 3 },
  confirmedRevenueMinor: { NGN: 210000000, USD: 150000 },
  sponsorApplications: 2,
  confirmedSponsors: 1,
  exhibitorApplications: 1,
  confirmedExhibitors: 0,
  abstractSubmissions: 5,
  acceptedAbstracts: 2,
  openEnquiries: 6,
  generatedAt: "2026-09-24T10:00:00.000Z",
};
function fetchFixture() {
  const fetchMock = vi.fn().mockImplementation(async (url: string, options?: RequestInit) => {
    if (options?.method === "POST")
      return new Response('"Registration Reference"\r\n', {
        status: 200,
        headers: { "Content-Type": "text/csv" },
      });
    if (url.includes("/summary"))
      return new Response(JSON.stringify({ success: true, data: { summary } }), { status: 200 });
    return new Response(JSON.stringify({ success: true, data: { report } }), { status: 200 });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/admin/reports"]}>
      <Routes>
        <Route
          path="/admin/reports"
          element={
            <PermissionRoute permission="reports.read">
              <ReportsPage />
            </PermissionRoute>
          }
        />
        <Route path="/admin/login" element={<p>Login fallback</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Reporting & Exports frontend", () => {
  it("route access requires reports.read", () => {
    auth.permissions = [];
    fetchFixture();
    renderPage();
    expect(screen.getByText("Login fallback")).toBeVisible();
  });

  it("previews server results and sends filters without exposing Finance", async () => {
    auth.permissions = ["reports.read", "reports.export", "delegates.read", "sponsors.read"];
    const fetchMock = fetchFixture();
    renderPage();
    expect(await screen.findByText("AIAIAC-DEL-ABCDEFGH")).toBeVisible();
    expect(screen.getByText("1 result")).toBeVisible();
    expect(screen.getByRole("button", { name: "Sponsors" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Payments" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Management summary")).not.toBeInTheDocument();
    await userEvent.setup().selectOptions(screen.getByLabelText("Report status"), "APPROVED");
    await waitFor(() =>
      expect(fetchMock.mock.calls.some((call) => String(call[0]).includes("status=APPROVED"))).toBe(
        true,
      ),
    );
  });

  it("exports filtered CSV with the protected Admin header", async () => {
    auth.permissions = ["reports.read", "reports.export", "delegates.read"];
    const fetchMock = fetchFixture();
    vi.stubGlobal(
      "URL",
      Object.assign(URL, { createObjectURL: vi.fn(() => "blob:test"), revokeObjectURL: vi.fn() }),
    );
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    renderPage();
    await screen.findByText("AIAIAC-DEL-ABCDEFGH");
    await userEvent.setup().click(screen.getByRole("button", { name: "Export filtered CSV" }));
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some(
          (call) => String(call[0]).includes("/export") && call[1]?.method === "POST",
        ),
      ).toBe(true),
    );
    const exportCall = fetchMock.mock.calls.find((call) => String(call[0]).includes("/export"));
    expect(exportCall?.[1]).toEqual(
      expect.objectContaining({
        credentials: "include",
        headers: expect.objectContaining({ "X-AIAIAC-CSRF": "1" }),
      }),
    );
    expect(await screen.findByText("CSV export started.")).toBeVisible();
  });

  it("shows Finance-only summary and payments without unrelated domains", async () => {
    auth.permissions = ["reports.read", "reports.export", "reports.financial", "payments.read"];
    fetchFixture();
    renderPage();
    expect(await screen.findByLabelText("Management summary")).toBeVisible();
    expect(screen.getByRole("button", { name: "Payments" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Sponsors" })).not.toBeInTheDocument();
    expect(screen.getByText(/₦2,100,000/)).toBeVisible();
    expect(screen.getByText(/\$1,500/)).toBeVisible();
  });

  it("Communications sees enquiries but no export or financial values", async () => {
    auth.permissions = ["reports.read", "enquiries.read"];
    fetchFixture();
    renderPage();
    expect(await screen.findByRole("button", { name: "Enquiries" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Export filtered CSV" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Management summary")).not.toBeInTheDocument();
  });
});
