import { apiRequest } from "@/services/api/client";

export type PaymentCurrency = "USD" | "NGN";
export type PaymentTransactionStatus =
  "INITIALIZED" | "PENDING" | "PAID" | "FAILED" | "ABANDONED" | "REVERSED";

export interface PaymentSummary {
  paymentReference: string;
  registrationReference: string;
  package: string;
  currency: PaymentCurrency;
  amountMinor: number;
  displayAmount: string;
  status: PaymentTransactionStatus;
  authorizationUrl: string | null;
  accessCode: string | null;
  paidAt: string | null;
}

export interface AdminPayment {
  id: string;
  registrationReference: string;
  delegateName: string;
  delegateEmail: string;
  provider: "PAYSTACK";
  paymentReference: string;
  providerTransactionId: string | null;
  packageCode: string;
  packageName: string;
  currency: PaymentCurrency;
  amountMinor: number;
  status: PaymentTransactionStatus;
  channel: string | null;
  gatewayResponse: string | null;
  confirmationEmailStatus: string;
  createdAt: string;
  paidAt: string | null;
  verifiedAt: string | null;
}

export interface AdminPaymentDetail extends AdminPayment {
  events: Array<{ eventType: string; createdAt: string }>;
}

interface Envelope<T> {
  success: true;
  data: T;
}

export async function initializeDelegatePayment(
  registrationReference: string,
  currency: PaymentCurrency,
) {
  const result = await apiRequest<Envelope<{ payment: PaymentSummary }>>(
    `/delegate-registrations/${encodeURIComponent(registrationReference)}/payment/initialize`,
    { method: "POST", body: { currency } },
  );
  return result.ok && result.data
    ? { ok: true as const, payment: result.data.data.payment }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function verifyDelegatePayment(paymentReference: string) {
  const result = await apiRequest<Envelope<{ payment: PaymentSummary }>>(
    `/payments/${encodeURIComponent(paymentReference)}/verify`,
  );
  return result.ok && result.data
    ? { ok: true as const, payment: result.data.data.payment }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getAdminPayments(filters: {
  page?: number;
  search?: string;
  status?: PaymentTransactionStatus;
  currency?: PaymentCurrency;
}) {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const result = await apiRequest<
    Envelope<{ payments: { items: AdminPayment[]; total: number; page: number; limit: number } }>
  >(`/admin/payments?${query.toString()}`);
  return result.ok && result.data
    ? { ok: true as const, payments: result.data.data.payments }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getAdminPayment(paymentReference: string) {
  const result = await apiRequest<Envelope<{ payment: AdminPaymentDetail }>>(
    `/admin/payments/${encodeURIComponent(paymentReference)}`,
  );
  return result.ok && result.data
    ? { ok: true as const, payment: result.data.data.payment }
    : { ok: false as const, status: result.status, error: result.error };
}
