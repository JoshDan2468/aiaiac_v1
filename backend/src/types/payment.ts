export type PaymentCurrency = "USD" | "NGN";
export type PaymentProviderName = "PAYSTACK";
export type PaymentTransactionStatus =
  "INITIALIZED" | "PENDING" | "PAID" | "FAILED" | "ABANDONED" | "REVERSED";
export type ConfirmationEmailStatus =
  "NOT_QUEUED" | "PENDING" | "SENT" | "FAILED";

export interface PaymentRecord {
  id: string;
  registrationId: string;
  registrationReference: string;
  delegateName: string;
  delegateEmail: string;
  provider: PaymentProviderName;
  paymentReference: string;
  providerTransactionId: string | null;
  packageCode: string;
  packageName: string;
  currency: PaymentCurrency;
  amountMinor: number;
  status: PaymentTransactionStatus;
  authorizationUrl: string | null;
  accessCode: string | null;
  channel: string | null;
  gatewayResponse: string | null;
  confirmationEmailStatus: ConfirmationEmailStatus;
  createdAt: Date;
  paidAt: Date | null;
  verifiedAt: Date | null;
}

export interface PaymentListFilters {
  page: number;
  limit: number;
  search?: string | undefined;
  status?: PaymentTransactionStatus | undefined;
  currency?: PaymentCurrency | undefined;
}

export interface PaymentListResult {
  items: PaymentRecord[];
  total: number;
  page: number;
  limit: number;
}

export interface PaymentDetail extends PaymentRecord {
  events: Array<{
    eventType:
      | "PAYMENT_INITIALIZED"
      | "PAYMENT_CONFIRMED"
      | "PAYMENT_VERIFICATION_FAILED";
    createdAt: Date;
  }>;
}
