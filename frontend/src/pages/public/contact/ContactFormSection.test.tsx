import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ContactFormSection } from "./ContactFormSection";

vi.mock("@/components/common/AnimatedSection", () => ({
  AnimatedSection: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

async function completeValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Full Name/), "Amina Okafor");
  await user.type(screen.getByLabelText(/Work Email/), "amina@example.com");
  await user.type(screen.getByLabelText(/Phone Number/), "+234 801 234 5678");
  await user.type(screen.getByLabelText(/Organisation/), "West Africa Energy");
  await user.selectOptions(screen.getByLabelText(/Enquiry Type/), "Sponsorship Enquiry");
  await user.type(screen.getByLabelText(/Subject/), "Partnership discussion");
  await user.type(
    screen.getByLabelText(/Message/),
    "Please share the next steps for discussing a conference partnership.",
  );
  return user;
}

describe("ContactFormSection", () => {
  it("shows required-field and invalid-email feedback beside the fields", async () => {
    const user = userEvent.setup();
    render(<ContactFormSection />);

    await user.type(screen.getByLabelText(/Work Email/), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Prepare enquiry email" }));

    expect(await screen.findByText("Error — Enter your full name")).toBeVisible();
    expect(screen.getByText("Error — Enter a valid email address")).toBeVisible();
    expect(screen.getByText("Error — Choose an enquiry type")).toBeVisible();
    expect(screen.getByLabelText(/Work Email/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Work Email/)).toHaveAttribute(
      "aria-describedby",
      "contact-work-email-error",
    );
  });

  it("prepares a correctly encoded email hand-off without calling an API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactFormSection />);
    const user = await completeValidForm();

    await user.click(screen.getByRole("button", { name: "Prepare enquiry email" }));

    const preparedLink = await screen.findByRole("link", { name: "Open prepared email" });
    expect(preparedLink).toHaveAttribute(
      "href",
      expect.stringContaining(
        "mailto:support@aldrich-energy.com?subject=%5BSponsorship%20Enquiry%5D",
      ),
    );
    expect(preparedLink).toHaveAttribute("href", expect.stringContaining("Amina%20Okafor"));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("states that the website has not sent or stored the prepared details", async () => {
    render(<ContactFormSection />);
    const user = await completeValidForm();

    await user.click(screen.getByRole("button", { name: "Prepare enquiry email" }));

    await waitFor(() =>
      expect(screen.getByText("This website has not sent or stored your details.")).toBeVisible(),
    );
    expect(screen.getByText(/Your enquiry is ready/)).toBeVisible();
  });
});
