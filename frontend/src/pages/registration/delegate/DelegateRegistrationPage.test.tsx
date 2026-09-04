import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { DelegateRegistrationPage } from "./DelegateRegistrationPage";

const packageId = "7b1f1c1d-8f18-4d41-9921-4d663958a201";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("DelegateRegistrationPage", () => {
  it("loads a server package, sends only approved fields, and shows the pending confirmation", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            packages: [
              {
                id: packageId,
                slug: "professional-delegate",
                name: "Professional Delegate",
                delegateType: "PROFESSIONAL",
                description: "Conference participation.",
                benefits: ["Technical knowledge exchange"],
                currency: "USD",
                priceMinor: 100000,
              },
            ],
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse(
          {
            success: true,
            message: "Delegate registration submitted successfully.",
            data: {
              reference: "AIAIAC-DEL-ABCD2345",
              registrationStatus: "SUBMITTED",
              paymentStatus: "PENDING",
            },
          },
          201,
        ),
      );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/registration/delegate"]}>
        <DelegateRegistrationPage />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "Professional Delegate" })).toBeVisible();
    expect(screen.getByText("$1,000")).toBeVisible();
    await user.type(screen.getByLabelText("First name *"), "Ada");
    await user.type(screen.getByLabelText("Last name *"), "Okafor");
    await user.type(screen.getByLabelText("Email *"), "ADA@EXAMPLE.COM");
    await user.type(screen.getByLabelText("Mobile *"), "+2348000000000");
    await user.type(screen.getByLabelText("Country *"), "Nigeria");
    await user.type(screen.getByLabelText("Job title *"), "Integrity Engineer");
    await user.type(screen.getByLabelText("Company name *"), "Example Energy");
    await user.type(screen.getByLabelText("Primary activity *"), "Asset integrity");
    await user.type(
      screen.getByLabelText("How did you hear about AIAIAC? *"),
      "Professional network",
    );
    await user.type(
      screen.getByLabelText("Main objective for attending *"),
      "Exchange practical integrity and automation knowledge.",
    );
    await user.click(
      screen.getByLabelText(
        /I consent to AIAIAC processing my registration details for this application/i,
      ),
    );
    await user.click(screen.getByRole("button", { name: "Submit delegate application" }));

    expect(await screen.findByText("AIAIAC-DEL-ABCD2345")).toBeVisible();
    expect(screen.getByText("Payment pending")).toBeVisible();
    const [, options] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(JSON.parse(options.body as string)).toEqual({
      packageId,
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada@example.com",
      mobile: "+2348000000000",
      jobTitle: "Integrity Engineer",
      companyName: "Example Energy",
      country: "Nigeria",
      primaryActivity: "Asset integrity",
      mainObjective: "Exchange practical integrity and automation knowledge.",
      heardAboutSource: "Professional network",
      privacyConsent: true,
      dataSharingConsent: false,
    });
  });
});
