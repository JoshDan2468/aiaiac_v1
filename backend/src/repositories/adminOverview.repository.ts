/** Admin overview aggregates authoritative counters in PostgreSQL. */

import type { QueryResultRow } from "pg";
import { getDatabasePool } from "../config/database";
import type { DatabaseExecutor } from "../types/database";
import type {
  AdminOverview,
  AdminRecentActivity,
} from "../types/adminOverview";

interface MetricsRow extends QueryResultRow {
  total_registrations: string;
  paid_registrations: string;
  pending_payments: string;
  ngn_revenue_minor: string;
  usd_revenue_minor: string;
}

interface ActivityRow extends QueryResultRow {
  type: string;
  registration_reference: string | null;
  occurred_at: Date;
}

export interface AdminOverviewRepository {
  getOverview(): Promise<AdminOverview>;
}

function activitySummary(row: ActivityRow): string {
  const reference = row.registration_reference;
  switch (row.type) {
    case "PAYMENT_CONFIRMED":
      return reference
        ? `Payment confirmed for ${reference}`
        : "Payment confirmed";
    case "EVENT_PASS_ISSUED":
      return reference
        ? `Event pass issued for ${reference}`
        : "Event pass issued";
    case "DELEGATE_CONFIRMATION_SENT":
      return reference
        ? `Delegate confirmation sent for ${reference}`
        : "Delegate confirmation sent";
    case "ADMIN_PAYMENT_NOTIFICATION_SENT":
      return reference
        ? `Payment oversight notification sent for ${reference}`
        : "Payment oversight notification sent";
    case "INVITATION_ACCEPTED":
      return "Admin invitation accepted";
    case "USER_ROLE_CHANGED":
      return "Admin role changed";
    default:
      return row.type.replaceAll("_", " ").toLowerCase();
  }
}

export function createAdminOverviewRepository(
  executor?: DatabaseExecutor,
): AdminOverviewRepository {
  const database = () => {
    const selected = executor ?? getDatabasePool();
    if (!selected) throw new Error("Database is not configured");
    return selected;
  };

  return {
    async getOverview() {
      const metricsResult = await database().query<MetricsRow>(`
        SELECT
          (SELECT count(*)::text FROM delegate_registrations) AS total_registrations,
          (SELECT count(*)::text FROM delegate_registrations
             WHERE payment_status = 'PAID') AS paid_registrations,
          (SELECT count(*)::text FROM delegate_registrations
             WHERE payment_status = 'PENDING') AS pending_payments,
          (SELECT COALESCE(sum(amount_minor), 0)::text FROM payment_transactions
             WHERE status = 'PAID' AND currency = 'NGN') AS ngn_revenue_minor,
          (SELECT COALESCE(sum(amount_minor), 0)::text FROM payment_transactions
             WHERE status = 'PAID' AND currency = 'USD') AS usd_revenue_minor
      `);
      const row = metricsResult.rows[0];
      if (!row) throw new Error("Overview metrics query returned no record");

      const activityResult = await database().query<ActivityRow>(`
        SELECT activity.type, activity.registration_reference, activity.occurred_at
        FROM (
          SELECT pe.event_type AS type, dr.reference AS registration_reference,
                 pe.created_at AS occurred_at
          FROM payment_events pe
          JOIN payment_transactions pt ON pt.id = pe.payment_transaction_id
          JOIN delegate_registrations dr ON dr.id = pt.registration_id
          WHERE pe.event_type IN (
            'PAYMENT_CONFIRMED', 'EVENT_PASS_ISSUED',
            'DELEGATE_CONFIRMATION_SENT', 'ADMIN_PAYMENT_NOTIFICATION_SENT'
          )
          UNION ALL
          SELECT aal.action AS type, NULL AS registration_reference,
                 aal.created_at AS occurred_at
          FROM admin_audit_logs aal
          WHERE aal.action IN ('INVITATION_ACCEPTED', 'USER_ROLE_CHANGED')
        ) activity
        ORDER BY activity.occurred_at DESC
        LIMIT 8
      `);

      const recentActivity: AdminRecentActivity[] = activityResult.rows.map(
        (activity) => ({
          type: activity.type,
          summary: activitySummary(activity),
          occurredAt: activity.occurred_at,
        }),
      );
      return {
        metrics: {
          totalRegistrations: Number(row.total_registrations),
          paidRegistrations: Number(row.paid_registrations),
          pendingPayments: Number(row.pending_payments),
          confirmedRevenue: {
            NGN: Number(row.ngn_revenue_minor),
            USD: Number(row.usd_revenue_minor),
          },
          sponsorEnquiries: 0,
          exhibitorEnquiries: 0,
          abstractSubmissions: 0,
        },
        recentActivity,
      };
    },
  };
}

export const postgresAdminOverviewRepository = createAdminOverviewRepository();
