import { z } from "zod";
import type { PaymentListFilters } from "../types/payment";

export const paymentCurrencies = ["USD", "NGN"] as const;
export const paymentTransactionStatuses = [
  "INITIALIZED",
  "PENDING",
  "PAID",
  "FAILED",
  "ABANDONED",
  "REVERSED",
] as const;

export const registrationPaymentParamsSchema = z.strictObject({
  reference: z.string().regex(/^AIAIAC-DEL-[A-Z0-9]{8}$/),
});

export const paymentParamsSchema = z.strictObject({
  reference: z.string().regex(/^AIAIAC-PAY-[A-Z0-9]{24}$/),
});

export const initializePaymentSchema = z.strictObject({
  currency: z.enum(paymentCurrencies),
});

const optionalSearch = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() ? value.trim() : undefined,
  z.string().max(100).optional(),
);

const adminPaymentListSchema = z
  .object({
    page: z.coerce.number().int().min(1).max(100_000).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: optionalSearch,
    status: z.enum(paymentTransactionStatuses).optional(),
    currency: z.enum(paymentCurrencies).optional(),
  })
  .strict();

export function parsePaymentListFilters(
  input: unknown,
): PaymentListFilters | null {
  const parsed = adminPaymentListSchema.safeParse(input);
  return parsed.success ? parsed.data : null;
}

export const paystackWebhookSchema = z.object({
  event: z.string(),
  data: z.object({
    id: z.union([z.string(), z.number()]),
    status: z.string(),
    reference: z.string(),
    amount: z.number().int(),
    currency: z.string(),
    channel: z.string().nullable().optional(),
    gateway_response: z.string().nullable().optional(),
    paid_at: z.string().datetime().nullable().optional(),
    customer: z.object({ email: z.string().email() }),
  }),
});
