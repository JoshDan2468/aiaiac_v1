import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { PaymentCallbackPage } from "@/pages/registration/payment/PaymentCallbackPage";
import { PaymentsPage } from "@/pages/admin/payments/PaymentsPage";
import { initializeDelegatePayment } from "@/services/payment/paymentService";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("delegate payment flow", () => {
  it("initializes with registration context and currency but never a browser amount", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          payment: {
            paymentReference: "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
            registrationReference: "AIAIAC-DEL-ABCDEFGH",
            package: "Professional Delegate",
            currency: "USD",
            amountMinor: 100000,
            displayAmount: "$1,000.00",
            status: "PENDING",
            authorizationUrl: "https://checkout.paystack.com/safe-code",
            accessCode: "safe-code",
            paidAt: null,
          },
        },
      }),
    );

    const result = await initializeDelegatePayment("AIAIAC-DEL-ABCDEFGH", "USD");
    expect(result.ok).toBe(true);
    const request = fetchMock.mock.calls[0];
    expect(request?.[0]).toBe("/api/delegate-registrations/AIAIAC-DEL-ABCDEFGH/payment/initialize");
    expect(JSON.parse(String((request?.[1] as RequestInit).body))).toEqual({ currency: "USD" });
  });

  it("treats callback parameters only as a reference to verify on the backend", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          payment: {
            paymentReference: "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
            registrationReference: "AIAIAC-DEL-ABCDEFGH",
            package: "Professional Delegate",
            currency: "USD",
            amountMinor: 100000,
            displayAmount: "$1,000.00",
            status: "PAID",
            authorizationUrl: null,
            accessCode: null,
            paidAt: "2026-09-15T01:00:00.000Z",
          },
        },
      }),
    );

    render(
      <MemoryRouter
        initialEntries={[
          "/registration/payment/callback?reference=AIAIAC-PAY-1234567890ABCDEFGHIJKLMN&status=success",
        ]}
      >
        <PaymentCallbackPage />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "Payment confirmed" })).toBeVisible();
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "/api/payments/AIAIAC-PAY-1234567890ABCDEFGHIJKLMN/verify",
    );
    expect((fetchMock.mock.calls[0]?.[1] as RequestInit).body).toBeUndefined();
  });

  it("does not claim payment when the callback has no reference", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(
      <MemoryRouter initialEntries={["/registration/payment/callback?status=success"]}>
        <PaymentCallbackPage />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: "We could not confirm this payment" }),
    ).toBeVisible();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders safe payment monitoring fields from the Admin API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        success: true,
        data: {
          payments: {
            items: [
              {
                id: "payment-id",
                registrationReference: "AIAIAC-DEL-ABCDEFGH",
                delegateName: "Amina Okafor",
                delegateEmail: "amina@example.com",
                provider: "PAYSTACK",
                paymentReference: "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
                providerTransactionId: null,
                packageCode: "PROFESSIONAL",
                packageName: "Professional Delegate",
                currency: "USD",
                amountMinor: 100000,
                status: "PAID",
                channel: "card",
                gatewayResponse: "Successful",
                confirmationEmailStatus: "SENT",
                createdAt: "2026-09-15T00:00:00.000Z",
                paidAt: "2026-09-15T01:00:00.000Z",
                verifiedAt: "2026-09-15T01:00:00.000Z",
              },
            ],
            total: 1,
            page: 1,
            limit: 20,
          },
        },
      }),
    );
    render(
      <MemoryRouter>
        <PaymentsPage />
      </MemoryRouter>,
    );
    expect(await screen.findByText("Amina Okafor")).toBeVisible();
    expect(screen.getByText("$1,000.00")).toBeVisible();
    expect(screen.getByText("PAYSTACK")).toBeVisible();
  });
});
