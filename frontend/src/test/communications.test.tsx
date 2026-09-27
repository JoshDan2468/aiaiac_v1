import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PermissionRoute } from "@/components/admin/PermissionRoute";
import { getAdminHomePath, adminNavigation } from "@/data/adminNavigation";
import {
  CampaignsPage,
  DeliveryActivityPage,
  EmailCentrePage,
  TemplatesPage,
} from "@/pages/admin/communications/CommunicationsPages";
import type { Permission } from "@/types/auth";

const { auth, service } = vi.hoisted(() => ({
  auth: { permissions: [] as Permission[] },
  service: {
    presets: vi.fn(),
    count: vi.fn(),
    preview: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    get: vi.fn(),
    list: vi.fn(),
    deliveries: vi.fn(),
    test: vi.fn(),
    confirm: vi.fn(),
    deliver: vi.fn(),
    retry: vi.fn(),
  },
}));
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ admin: { permissions: auth.permissions } }),
}));
vi.mock("@/services/communication/communicationService", () => ({ communicationService: service }));

const campaign = {
  id: "id",
  reference: "AIAIAC-COM-1234ABCD",
  title: "Programme update",
  subject: "New programme",
  preheader: "AIAIAC 2027 news",
  heading: "Programme",
  body: "A conference programme announcement.",
  ctaLabel: null,
  ctaUrl: null,
  audience: { code: "ALL_DELEGATES" },
  status: "DRAFT",
  recipientCount: 0,
  createdBy: "Comms Admin",
  createdAt: "2026-09-27T00:00:00Z",
  updatedAt: "2026-09-27T00:00:00Z",
  sentAt: null,
  sent: 0,
  failed: 0,
  pending: 0,
  claimed: 0,
};
function page(path: string, element: React.ReactNode) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path={path}
          element={<PermissionRoute permission="communications.read">{element}</PermissionRoute>}
        />
        <Route path="/admin/login" element={<p>Denied</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  auth.permissions = [
    "communications.read",
    "communications.create",
    "communications.send",
    "communications.manage",
  ];
  service.presets.mockResolvedValue([
    {
      id: "PROGRAMME_UPDATE",
      label: "Programme Update",
      heading: "Programme news",
      body: "New conference programme.",
    },
  ]);
  service.count.mockResolvedValue({
    count: 2,
    fingerprint: "a".repeat(64),
    overLimit: false,
    limit: 500,
  });
  service.preview.mockResolvedValue({
    subject: "New programme",
    text: "Programme",
    html: "<p>AIAIAC Africa 2027 preview</p>",
  });
  service.create.mockResolvedValue(campaign);
  service.update.mockResolvedValue(campaign);
  service.test.mockResolvedValue({ accepted: true, providerMessageId: "test-message" });
  service.confirm.mockResolvedValue({ ...campaign, status: "SENDING" });
  service.list.mockResolvedValue({ items: [campaign], total: 1 });
  service.deliveries.mockResolvedValue({
    items: [
      {
        id: "delivery",
        campaignReference: campaign.reference,
        email: "delegate@example.com",
        name: "Delegate",
        sourceCategory: "PROFESSIONAL",
        status: "SENT",
        attempts: 1,
        providerMessageId: "mailjet-message",
        errorSummary: null,
        sentAt: "2026-09-27T00:00:00Z",
      },
    ],
    total: 1,
  });
});

describe("Communications Centre", () => {
  it("provides four navigation routes and a Communications-only home", () => {
    const group = adminNavigation.find((item) => item.label === "Communications");
    expect(group?.items.map((item) => item.label)).toEqual([
      "Email Centre",
      "Campaigns",
      "Templates",
      "Delivery Activity",
    ]);
    expect(getAdminHomePath(["communications.read"])).toBe("/admin/communications");
  });

  it("denies a role without communications.read", () => {
    auth.permissions = [];
    page("/admin/communications", <EmailCentrePage />);
    expect(screen.getByText("Denied")).toBeVisible();
    expect(service.count).not.toHaveBeenCalled();
  });

  it("selects a segment, obtains authoritative count, previews, saves, and reviews", async () => {
    const user = userEvent.setup();
    page("/admin/communications", <EmailCentrePage />);
    await user.selectOptions(screen.getByLabelText("Audience"), "PROFESSIONAL_DELEGATES");
    await user.selectOptions(screen.getByLabelText("Payment status"), "PAID");
    await user.click(screen.getByRole("button", { name: "Count matching recipients" }));
    expect(await screen.findByRole("status")).toHaveTextContent("2 distinct valid email addresses");
    await user.type(screen.getByLabelText("Internal campaign name"), "Programme update");
    await user.type(screen.getByLabelText("Email subject"), "New programme");
    await user.type(screen.getByLabelText("Preheader"), "AIAIAC news");
    await user.type(screen.getByLabelText("Email heading"), "Programme");
    await user.type(screen.getByLabelText("Message"), "A conference programme announcement.");
    await user.click(screen.getByRole("button", { name: "Preview email" }));
    expect(await screen.findByTitle("Campaign email preview")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Save draft" }));
    expect(await screen.findByText(/Draft AIAIAC-COM-1234ABCD saved/)).toBeVisible();
    await user.type(screen.getByLabelText("Test email address"), "test@example.com");
    await user.click(screen.getByRole("button", { name: "Send one test email" }));
    await waitFor(() =>
      expect(service.test).toHaveBeenCalledWith(campaign.reference, "test@example.com"),
    );
    await user.click(screen.getByRole("button", { name: "Count matching recipients" }));
    await user.click(screen.getByRole("button", { name: "Review campaign" }));
    expect(await screen.findByText("Final confirmation")).toBeVisible();
    expect(service.confirm).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Confirm recipient snapshot" }));
    await waitFor(() =>
      expect(service.confirm).toHaveBeenCalledWith(campaign.reference, "a".repeat(64)),
    );
    expect(service.create).toHaveBeenCalled();
    await waitFor(() =>
      expect(service.count).toHaveBeenCalledWith(
        expect.objectContaining({ code: "PROFESSIONAL_DELEGATES", paymentStatus: "PAID" }),
      ),
    );
  });

  it("shows campaign history, delivery activity, and controlled presets", async () => {
    const first = page("/admin/communications/campaigns", <CampaignsPage />);
    expect(await screen.findByText("Programme update")).toBeVisible();
    expect(screen.getByText("Comms Admin")).toBeVisible();
    first.unmount();
    const second = page("/admin/communications/deliveries", <DeliveryActivityPage />);
    expect(await screen.findByText("delegate@example.com")).toBeVisible();
    expect(screen.getByText("mailjet-message")).toBeVisible();
    second.unmount();
    page("/admin/communications/templates", <TemplatesPage />);
    expect(await screen.findByText("Programme Update")).toBeVisible();
    expect(screen.getByText(/Transactional payment, pass, security/)).toBeVisible();
  });

  it("shows empty and error states without inventing campaign rows", async () => {
    service.list.mockResolvedValue({ items: [], total: 0 });
    const first = page("/admin/communications/campaigns", <CampaignsPage />);
    expect(await screen.findByText("No campaigns found.")).toBeVisible();
    first.unmount();
    service.deliveries.mockRejectedValue(new Error("Service unavailable"));
    page("/admin/communications/deliveries", <DeliveryActivityPage />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Service unavailable");
  });
});
