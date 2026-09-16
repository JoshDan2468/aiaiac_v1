/**
 * Payment repository
 *
 * Owns trusted price resolution, active-attempt serialization, payment state
 * transitions, and the deliberately small payment event history.
 */

import { randomUUID } from "node:crypto";
import type { PoolClient, QueryResultRow } from "pg";
import { getDatabasePool, withTransaction } from "../config/database";
import type {
  PaymentCurrency,
  PaymentDetail,
  PaymentListFilters,
  PaymentListResult,
  PaymentRecord,
  PaymentTransactionStatus,
} from "../types/payment";

export type PaymentPreparation =
  | { kind: "not_found" }
  | { kind: "ineligible" }
  | { kind: "already_paid" }
  | { kind: "price_unavailable" }
  | { kind: "initializing"; paymentReference: string }
  | { kind: "existing"; payment: PaymentRecord }
  | {
      kind: "created";
      payment: PaymentRecord;
      email: string;
      registrationReference: string;
      packageCode: string;
    };

export interface SuccessfulPaymentInput {
  paymentReference: string;
  providerReference: string;
  providerTransactionId: string;
  amountMinor: number;
  currency: string;
  customerEmail: string | null;
  channel: string | null;
  gatewayResponse: string | null;
  paidAt: Date | null;
}

export type PaymentFinalization =
  | { kind: "not_found" }
  | {
      kind: "mismatch";
      reason: "reference" | "amount" | "currency" | "customer";
    }
  | { kind: "paid"; payment: PaymentRecord; becamePaid: boolean };

export interface PaymentRepository {
  prepareInitialization(
    registrationReference: string,
    currency: PaymentCurrency,
    paymentReference: string,
  ): Promise<PaymentPreparation>;
  completeInitialization(
    paymentReference: string,
    authorizationUrl: string,
    accessCode: string,
  ): Promise<PaymentRecord | null>;
  failInitialization(paymentReference: string): Promise<void>;
  findByReference(paymentReference: string): Promise<PaymentRecord | null>;
  recordVerificationFailure(
    paymentReference: string,
    reason: string,
  ): Promise<void>;
  finalizeSuccessfulPayment(
    input: SuccessfulPaymentInput,
  ): Promise<PaymentFinalization>;
  recordConfirmationEmailResult(
    paymentReference: string,
    sent: boolean,
  ): Promise<void>;
  listPayments(filters: PaymentListFilters): Promise<PaymentListResult>;
  findPaymentDetail(paymentReference: string): Promise<PaymentDetail | null>;
}

interface PaymentRow extends QueryResultRow {
  id: string;
  registration_id: string;
  registration_reference: string;
  delegate_name: string;
  delegate_email: string;
  provider: "PAYSTACK";
  provider_reference: string;
  provider_transaction_id: string | null;
  package_code_snapshot: string;
  package_name: string;
  currency: PaymentCurrency;
  amount_minor: number;
  status: PaymentTransactionStatus;
  authorization_url: string | null;
  access_code: string | null;
  channel: string | null;
  gateway_response: string | null;
  confirmation_email_status: PaymentRecord["confirmationEmailStatus"];
  created_at: Date;
  paid_at: Date | null;
  verified_at: Date | null;
}

interface RegistrationRow extends QueryResultRow {
  id: string;
  reference: string;
  email: string;
  registration_status: string;
  payment_status: string;
  package_code: string;
  package_name: string;
  package_type: string;
}

const paymentSelect = `
  SELECT pt.id, pt.registration_id, dr.reference AS registration_reference,
         concat_ws(' ', dr.first_name, dr.last_name) AS delegate_name,
         dr.email AS delegate_email, pt.provider, pt.provider_reference,
         pt.provider_transaction_id, pt.package_code_snapshot,
         dr.package_name_snapshot AS package_name, pt.currency, pt.amount_minor,
         pt.status, pt.authorization_url, pt.access_code, pt.channel,
         pt.gateway_response, pt.confirmation_email_status, pt.created_at,
         pt.paid_at, pt.verified_at
  FROM payment_transactions pt
  JOIN delegate_registrations dr ON dr.id = pt.registration_id`;

function requireDatabasePool() {
  const pool = getDatabasePool();
  if (!pool) throw new Error("Database is not configured");
  return pool;
}

function mapPayment(row: PaymentRow): PaymentRecord {
  return {
    id: row.id,
    registrationId: row.registration_id,
    registrationReference: row.registration_reference,
    delegateName: row.delegate_name,
    delegateEmail: row.delegate_email,
    provider: row.provider,
    paymentReference: row.provider_reference,
    providerTransactionId: row.provider_transaction_id,
    packageCode: row.package_code_snapshot,
    packageName: row.package_name,
    currency: row.currency,
    amountMinor: row.amount_minor,
    status: row.status,
    authorizationUrl: row.authorization_url,
    accessCode: row.access_code,
    channel: row.channel,
    gatewayResponse: row.gateway_response,
    confirmationEmailStatus: row.confirmation_email_status,
    createdAt: row.created_at,
    paidAt: row.paid_at,
    verifiedAt: row.verified_at,
  };
}

async function findPayment(
  executor: Pick<PoolClient, "query">,
  paymentReference: string,
  forUpdate = false,
): Promise<PaymentRecord | null> {
  const result = await executor.query<PaymentRow>(
    `${paymentSelect} WHERE pt.provider_reference = $1${forUpdate ? " FOR UPDATE OF pt, dr" : ""}`,
    [paymentReference],
  );
  return result.rows[0] ? mapPayment(result.rows[0]) : null;
}

async function recordEvent(
  client: PoolClient,
  paymentId: string,
  eventType:
    "PAYMENT_INITIALIZED" | "PAYMENT_CONFIRMED" | "PAYMENT_VERIFICATION_FAILED",
): Promise<void> {
  await client.query(
    `INSERT INTO payment_events (id, payment_transaction_id, event_type, details)
     VALUES ($1, $2, $3, '{}'::jsonb)
     ON CONFLICT (payment_transaction_id, event_type) DO NOTHING`,
    [randomUUID(), paymentId, eventType],
  );
}

export const postgresPaymentRepository: PaymentRepository = {
  async prepareInitialization(
    registrationReference,
    currency,
    paymentReference,
  ) {
    return withTransaction(async (client) => {
      const registrationResult = await client.query<RegistrationRow>(
        `SELECT dr.id, dr.reference, dr.email, dr.registration_status, dr.payment_status,
                dp.delegate_type AS package_code, dp.name AS package_name,
                dp.delegate_type AS package_type
         FROM delegate_registrations dr
         JOIN delegate_packages dp ON dp.id = dr.package_id
         WHERE dr.reference = $1
         FOR UPDATE OF dr`,
        [registrationReference],
      );
      const registration = registrationResult.rows[0];
      if (!registration) return { kind: "not_found" } as const;
      if (
        registration.package_type !== "PROFESSIONAL" ||
        ["REJECTED", "CANCELLED"].includes(registration.registration_status)
      ) {
        return { kind: "ineligible" } as const;
      }
      if (registration.payment_status === "PAID")
        return { kind: "already_paid" } as const;

      const priceResult = await client.query<{ amount_minor: number }>(
        `SELECT amount_minor
         FROM delegate_package_prices
         WHERE package_id = (SELECT package_id FROM delegate_registrations WHERE id = $1)
           AND currency = $2 AND is_active = true
         FOR SHARE`,
        [registration.id, currency],
      );
      const price = priceResult.rows[0];
      if (!price) return { kind: "price_unavailable" } as const;

      const activeResult = await client.query<PaymentRow>(
        `${paymentSelect}
         WHERE pt.registration_id = $1 AND pt.status IN ('INITIALIZED', 'PENDING')
         LIMIT 1`,
        [registration.id],
      );
      const active = activeResult.rows[0]
        ? mapPayment(activeResult.rows[0])
        : null;
      if (active) {
        const staleUnfinishedInitialization =
          active.status === "INITIALIZED" &&
          !active.authorizationUrl &&
          Date.now() - active.createdAt.getTime() > 2 * 60_000;
        if (staleUnfinishedInitialization) {
          // No checkout URL was delivered; release only this orphaned pre-provider attempt.
          await client.query(
            `UPDATE payment_transactions
             SET status = 'ABANDONED', failure_reason = 'INITIALIZATION_INTERRUPTED',
                 updated_at = current_timestamp
             WHERE id = $1 AND status = 'INITIALIZED'`,
            [active.id],
          );
        } else {
          return active.authorizationUrl && active.accessCode
            ? ({ kind: "existing", payment: active } as const)
            : ({
                kind: "initializing",
                paymentReference: active.paymentReference,
              } as const);
        }
      }

      const paymentId = randomUUID();
      await client.query(
        `INSERT INTO payment_transactions (
           id, registration_id, provider, provider_reference, package_code_snapshot,
           customer_email_snapshot, currency, amount_minor, status
         ) VALUES ($1, $2, 'PAYSTACK', $3, $4, $5, $6, $7, 'INITIALIZED')`,
        [
          paymentId,
          registration.id,
          paymentReference,
          registration.package_code,
          registration.email,
          currency,
          price.amount_minor,
        ],
      );
      await recordEvent(client, paymentId, "PAYMENT_INITIALIZED");
      const payment = await findPayment(client, paymentReference);
      if (!payment) throw new Error("Payment creation returned no record");
      return {
        kind: "created",
        payment,
        email: registration.email,
        registrationReference: registration.reference,
        packageCode: registration.package_code,
      } as const;
    });
  },

  async completeInitialization(paymentReference, authorizationUrl, accessCode) {
    await requireDatabasePool().query(
      `UPDATE payment_transactions
       SET authorization_url = $2, access_code = $3, status = 'PENDING', updated_at = current_timestamp
       WHERE provider_reference = $1 AND status = 'INITIALIZED'`,
      [paymentReference, authorizationUrl, accessCode],
    );
    return findPayment(requireDatabasePool(), paymentReference);
  },

  async failInitialization(paymentReference) {
    await requireDatabasePool().query(
      `UPDATE payment_transactions
       SET status = 'FAILED', failure_reason = 'PROVIDER_INITIALIZATION_FAILED',
           updated_at = current_timestamp
       WHERE provider_reference = $1 AND status = 'INITIALIZED'`,
      [paymentReference],
    );
  },

  findByReference(paymentReference) {
    return findPayment(requireDatabasePool(), paymentReference);
  },

  async recordVerificationFailure(paymentReference, reason) {
    await withTransaction(async (client) => {
      const payment = await findPayment(client, paymentReference, true);
      if (!payment || payment.status === "PAID") return;
      await client.query(
        `UPDATE payment_transactions
         SET status = 'FAILED', failure_reason = $2, verified_at = current_timestamp,
             updated_at = current_timestamp
         WHERE provider_reference = $1`,
        [paymentReference, reason.slice(0, 80)],
      );
      await recordEvent(client, payment.id, "PAYMENT_VERIFICATION_FAILED");
    });
  },

  async finalizeSuccessfulPayment(input) {
    return withTransaction(async (client) => {
      const payment = await findPayment(client, input.paymentReference, true);
      if (!payment) return { kind: "not_found" } as const;
      const mismatch =
        input.providerReference !== payment.paymentReference
          ? "reference"
          : input.amountMinor !== payment.amountMinor
            ? "amount"
            : input.currency !== payment.currency
              ? "currency"
              : input.customerEmail?.trim().toLowerCase() !==
                  payment.delegateEmail
                ? "customer"
                : null;
      if (mismatch) {
        if (payment.status !== "PAID") {
          await client.query(
            `UPDATE payment_transactions
             SET status = 'FAILED', failure_reason = $2, verified_at = current_timestamp,
                 updated_at = current_timestamp
             WHERE provider_reference = $1`,
            [input.paymentReference, `MISMATCH_${mismatch.toUpperCase()}`],
          );
          await recordEvent(client, payment.id, "PAYMENT_VERIFICATION_FAILED");
        }
        return { kind: "mismatch", reason: mismatch } as const;
      }
      if (payment.status === "PAID")
        return { kind: "paid", payment, becamePaid: false } as const;

      await client.query(
        `UPDATE payment_transactions
         SET status = 'PAID', provider_transaction_id = $2, channel = $3,
             gateway_response = $4, paid_at = COALESCE($5, current_timestamp),
             verified_at = current_timestamp, confirmation_email_status = 'PENDING',
             failure_reason = NULL, updated_at = current_timestamp
         WHERE provider_reference = $1`,
        [
          input.paymentReference,
          input.providerTransactionId,
          input.channel,
          input.gatewayResponse,
          input.paidAt,
        ],
      );
      await client.query(
        `UPDATE delegate_registrations
         SET payment_status = 'PAID', updated_at = current_timestamp
         WHERE id = $1 AND payment_status <> 'PAID'`,
        [payment.registrationId],
      );
      await recordEvent(client, payment.id, "PAYMENT_CONFIRMED");
      const updated = await findPayment(client, input.paymentReference);
      if (!updated) throw new Error("Finalized payment disappeared");
      return { kind: "paid", payment: updated, becamePaid: true } as const;
    });
  },

  async recordConfirmationEmailResult(paymentReference, sent) {
    await requireDatabasePool().query(
      `UPDATE payment_transactions
       SET confirmation_email_status = $2,
           confirmation_email_sent_at = CASE WHEN $2 = 'SENT' THEN current_timestamp ELSE NULL END,
           updated_at = current_timestamp
       WHERE provider_reference = $1 AND confirmation_email_status = 'PENDING'`,
      [paymentReference, sent ? "SENT" : "FAILED"],
    );
  },

  async listPayments(filters) {
    const values: unknown[] = [];
    const clauses: string[] = [];
    const add = (column: string, value: unknown) => {
      values.push(value);
      clauses.push(`${column} = $${values.length}`);
    };
    if (filters.status) add("pt.status", filters.status);
    if (filters.currency) add("pt.currency", filters.currency);
    if (filters.search) {
      values.push(`%${filters.search}%`);
      const parameter = `$${values.length}`;
      clauses.push(
        `(pt.provider_reference ILIKE ${parameter} OR dr.reference ILIKE ${parameter} OR ` +
          `dr.email ILIKE ${parameter} OR dr.first_name ILIKE ${parameter} OR dr.last_name ILIKE ${parameter})`,
      );
    }
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const pool = requireDatabasePool();
    const count = await pool.query<{ count: string }>(
      `SELECT count(*)::text AS count FROM payment_transactions pt
       JOIN delegate_registrations dr ON dr.id = pt.registration_id ${where}`,
      values,
    );
    const pageValues = [
      ...values,
      filters.limit,
      (filters.page - 1) * filters.limit,
    ];
    const result = await pool.query<PaymentRow>(
      `${paymentSelect} ${where}
       ORDER BY pt.created_at DESC, pt.id DESC
       LIMIT $${pageValues.length - 1} OFFSET $${pageValues.length}`,
      pageValues,
    );
    return {
      items: result.rows.map(mapPayment),
      total: Number(count.rows[0]?.count ?? 0),
      page: filters.page,
      limit: filters.limit,
    };
  },

  async findPaymentDetail(paymentReference) {
    const pool = requireDatabasePool();
    const payment = await findPayment(pool, paymentReference);
    if (!payment) return null;
    const events = await pool.query<{
      event_type: PaymentDetail["events"][number]["eventType"];
      created_at: Date;
    }>(
      `SELECT event_type, created_at FROM payment_events
       WHERE payment_transaction_id = $1 ORDER BY created_at ASC, id ASC`,
      [payment.id],
    );
    return {
      ...payment,
      events: events.rows.map((event) => ({
        eventType: event.event_type,
        createdAt: event.created_at,
      })),
    };
  },
};
