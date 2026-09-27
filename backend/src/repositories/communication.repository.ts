import { randomUUID } from "node:crypto";
import type { QueryResultRow } from "pg";
import { z } from "zod";
import { getDatabasePool, withTransaction } from "../config/database";
import type { CommunicationAudience, CommunicationCampaign, CommunicationContent, CommunicationDelivery, CommunicationRecipient } from "../types/communication";
import type { DatabaseExecutor } from "../types/database";

const db = (executor?: DatabaseExecutor): DatabaseExecutor => {
  const pool = executor ?? getDatabasePool();
  if (!pool) throw new Error("Database is not configured");
  return pool;
};

const emailSchema = z.email().max(254);

export function normalizeRecipients(rows: readonly CommunicationRecipient[]): CommunicationRecipient[] {
  const seen = new Set<string>();
  const recipients: CommunicationRecipient[] = [];
  for (const row of rows) {
    const email = row.email.trim().toLowerCase();
    if (!emailSchema.safeParse(email).success || seen.has(email)) continue;
    seen.add(email);
    recipients.push({ email, name: row.name.trim().slice(0, 200), sourceCategory: row.sourceCategory });
  }
  return recipients.sort((a, b) => a.email.localeCompare(b.email));
}

function audienceSql(audience: CommunicationAudience): { sql: string; values: unknown[] } {
  const values: unknown[] = [];
  const add = (value: unknown) => { values.push(value); return `$${values.length}`; };
  const conditions: string[] = [];
  let from: string;
  let select: string;
  if (audience.code.includes("DELEGATES")) {
    from = "delegate_registrations dr LEFT JOIN student_verifications sv ON sv.registration_id=dr.id";
    select = "dr.email AS email, concat_ws(' ',dr.first_name,dr.last_name) AS name, dr.package_type_snapshot AS \"sourceCategory\"";
    if (audience.code === "PROFESSIONAL_DELEGATES") conditions.push("dr.package_type_snapshot='PROFESSIONAL'");
    if (audience.code === "STUDENT_DELEGATES") conditions.push("dr.package_type_snapshot='STUDENT'");
    if (audience.registrationStatus) conditions.push(`dr.registration_status=${add(audience.registrationStatus)}`);
    if (audience.paymentStatus) conditions.push(`dr.payment_status=${add(audience.paymentStatus)}`);
    if (audience.verificationStatus) conditions.push(`sv.status=${add(audience.verificationStatus)}`);
    if (audience.country) conditions.push(`lower(dr.country)=lower(${add(audience.country)})`);
    if (audience.currency) conditions.push(`EXISTS (SELECT 1 FROM payment_transactions pt WHERE pt.registration_id=dr.id AND pt.status='PAID' AND pt.currency=${add(audience.currency)})`);
  } else if (audience.code.includes("SPONSORS")) {
    from = "sponsor_applications sa";
    select = "sa.contact_email AS email, concat_ws(' ',sa.contact_first_name,sa.contact_last_name) AS name, 'SPONSOR' AS \"sourceCategory\"";
    conditions.push("sa.event_year=2027");
    if (audience.code === "CONFIRMED_SPONSORS") conditions.push("sa.status='CONFIRMED'");
  } else if (audience.code.includes("EXHIBITORS")) {
    from = "exhibitor_applications ea";
    select = "ea.contact_email AS email, concat_ws(' ',ea.contact_first_name,ea.contact_last_name) AS name, 'EXHIBITOR' AS \"sourceCategory\"";
    conditions.push("ea.event_year=2027");
    if (audience.code === "CONFIRMED_EXHIBITORS") conditions.push("ea.status='CONFIRMED'");
  } else {
    from = "abstract_submissions a";
    select = "a.author_email AS email, concat_ws(' ',a.author_first_name,a.author_last_name) AS name, 'ABSTRACT_AUTHOR' AS \"sourceCategory\"";
    conditions.push("a.event_year=2027");
    if (audience.abstractStatus) conditions.push(`a.status=${add(audience.abstractStatus)}`);
  }
  return { sql: `SELECT ${select} FROM ${from}${conditions.length ? ` WHERE ${conditions.join(" AND ")}` : ""} LIMIT 5001`, values };
}

function mapCampaign(row: QueryResultRow): CommunicationCampaign {
  return {
    id: row.id, reference: row.reference, title: row.title, subject: row.subject,
    preheader: row.preheader, heading: row.heading, body: row.body,
    ctaLabel: row.cta_label, ctaUrl: row.cta_url, audience: row.audience,
    status: row.status, recipientCount: row.recipient_count,
    createdBy: row.created_by, createdAt: row.created_at, updatedAt: row.updated_at,
    sentAt: row.sent_at, sent: Number(row.sent), failed: Number(row.failed),
    pending: Number(row.pending), claimed: Number(row.claimed),
  };
}

const campaignSelect = `SELECT c.*, a.full_name AS created_by,
  (SELECT count(*) FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status='SENT') AS sent,
  (SELECT count(*) FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status='FAILED') AS failed,
  (SELECT count(*) FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status='PENDING') AS pending,
  (SELECT count(*) FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status='CLAIMED') AS claimed
  FROM communication_campaigns c JOIN admins a ON a.id=c.created_by_admin_id`;

export const postgresCommunicationRepository = {
  async recipients(audience: CommunicationAudience): Promise<CommunicationRecipient[]> {
    const { sql, values } = audienceSql(audience);
    const result = await db().query<CommunicationRecipient>(sql, values);
    if (result.rows.length > 5000) throw new Error("Audience exceeds the 5,000-record resolution limit");
    return normalizeRecipients(result.rows);
  },

  async create(content: CommunicationContent, adminId: string, executor?: DatabaseExecutor): Promise<CommunicationCampaign> {
    const id = randomUUID();
    const reference = `AIAIAC-COM-${randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
    await db(executor).query(`INSERT INTO communication_campaigns
      (id,reference,title,subject,preheader,heading,body,cta_label,cta_url,audience,created_by_admin_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11)`,
      [id, reference, content.title, content.subject, content.preheader, content.heading,
        content.body, content.ctaLabel ?? null, content.ctaUrl ?? null, JSON.stringify(content.audience), adminId]);
    return (await this.get(reference, executor))!;
  },

  async update(reference: string, content: CommunicationContent, executor?: DatabaseExecutor): Promise<CommunicationCampaign | null> {
    const result = await db(executor).query(`UPDATE communication_campaigns SET
      title=$2,subject=$3,preheader=$4,heading=$5,body=$6,cta_label=$7,cta_url=$8,audience=$9::jsonb,updated_at=now()
      WHERE reference=$1 AND status='DRAFT' RETURNING id`,
      [reference, content.title, content.subject, content.preheader, content.heading,
        content.body, content.ctaLabel ?? null, content.ctaUrl ?? null, JSON.stringify(content.audience)]);
    return result.rowCount ? this.get(reference, executor) : null;
  },

  async get(reference: string, executor?: DatabaseExecutor): Promise<CommunicationCampaign | null> {
    const result = await db(executor).query(`${campaignSelect} WHERE c.reference=$1`, [reference]);
    return result.rows[0] ? mapCampaign(result.rows[0]) : null;
  },

  async list(page: number, status?: string): Promise<{ items: CommunicationCampaign[]; total: number }> {
    const where = status ? "WHERE c.status=$1" : "";
    const values = status ? [status] : [];
    const result = await db().query(`${campaignSelect} ${where} ORDER BY c.created_at DESC LIMIT 20 OFFSET ${status ? "$2" : "$1"}`, [...values, (page - 1) * 20]);
    const count = await db().query(`SELECT count(*)::int AS total FROM communication_campaigns c ${where}`, values);
    return { items: result.rows.map(mapCampaign), total: count.rows[0].total };
  },

  async confirm(reference: string, recipients: readonly CommunicationRecipient[], onConfirmed?: (executor: DatabaseExecutor) => Promise<void>): Promise<boolean> {
    return withTransaction(async (client) => {
      const locked = await client.query("SELECT id FROM communication_campaigns WHERE reference=$1 AND status='DRAFT' FOR UPDATE", [reference]);
      if (!locked.rows[0]) return false;
      const id: string = locked.rows[0].id;
      for (const recipient of recipients) {
        await client.query(`INSERT INTO communication_deliveries
          (id,campaign_id,recipient_email,recipient_name,source_category) VALUES ($1,$2,$3,$4,$5)`,
          [randomUUID(), id, recipient.email, recipient.name, recipient.sourceCategory]);
      }
      await client.query("UPDATE communication_campaigns SET status='SENDING',recipient_count=$2,updated_at=now() WHERE id=$1", [id, recipients.length]);
      if (onConfirmed) await onConfirmed(client);
      return true;
    });
  },

  async claim(reference: string, retry: boolean): Promise<CommunicationDelivery[]> {
    return withTransaction(async (client) => {
      const campaign = await client.query("SELECT id FROM communication_campaigns WHERE reference=$1 AND status IN ('SENDING','PARTIALLY_FAILED','FAILED') FOR UPDATE", [reference]);
      if (!campaign.rows[0]) return [];
      const id: string = campaign.rows[0].id;
      const statuses = retry ? "('PENDING','FAILED')" : "('PENDING')";
      const rows = await client.query(`SELECT * FROM communication_deliveries WHERE campaign_id=$1 AND status IN ${statuses} AND attempts<3 ORDER BY created_at,id LIMIT 10 FOR UPDATE SKIP LOCKED`, [id]);
      const deliveries: CommunicationDelivery[] = [];
      for (const row of rows.rows) {
        await client.query("UPDATE communication_deliveries SET status='CLAIMED',attempts=attempts+1,claimed_at=now(),updated_at=now() WHERE id=$1", [row.id]);
        deliveries.push({ id: row.id, campaignId: id, email: row.recipient_email, name: row.recipient_name,
          sourceCategory: row.source_category, status: "CLAIMED", attempts: row.attempts + 1,
          providerMessageId: row.provider_message_id, errorSummary: row.error_summary, sentAt: row.sent_at });
      }
      return deliveries;
    });
  },

  async settle(id: string, accepted: boolean, providerMessageId: string | null, errorSummary: string | null): Promise<void> {
    await db().query(`UPDATE communication_deliveries SET status=$2::varchar,provider_message_id=$3,error_summary=$4,
      sent_at=CASE WHEN $2::varchar='SENT' THEN now() ELSE NULL END,updated_at=now()
      WHERE id=$1 AND status='CLAIMED'`, [id, accepted ? "SENT" : "FAILED", providerMessageId, errorSummary]);
  },

  async refreshStatus(reference: string): Promise<CommunicationCampaign | null> {
    await db().query(`UPDATE communication_campaigns c SET status=CASE
      WHEN EXISTS (SELECT 1 FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status IN ('PENDING','CLAIMED')) THEN 'SENDING'
      WHEN EXISTS (SELECT 1 FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status='FAILED')
        THEN CASE WHEN EXISTS (SELECT 1 FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status='SENT') THEN 'PARTIALLY_FAILED' ELSE 'FAILED' END
      ELSE 'SENT' END,
      sent_at=CASE WHEN c.sent_at IS NULL AND NOT EXISTS (SELECT 1 FROM communication_deliveries d WHERE d.campaign_id=c.id AND d.status IN ('PENDING','CLAIMED')) THEN now() ELSE c.sent_at END,
      updated_at=now() WHERE c.reference=$1 AND c.status<>'DRAFT'`, [reference]);
    return this.get(reference);
  },

  async deliveries(page: number, status?: string, campaign?: string): Promise<{ items: CommunicationDelivery[]; total: number }> {
    const clauses: string[] = [];
    const values: unknown[] = [];
    if (status) { values.push(status); clauses.push(`d.status=$${values.length}`); }
    if (campaign) { values.push(campaign); clauses.push(`c.reference=$${values.length}`); }
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const from = "FROM communication_deliveries d JOIN communication_campaigns c ON c.id=d.campaign_id";
    const count = await db().query(`SELECT count(*)::int AS total ${from} ${where}`, values);
    values.push((page - 1) * 20);
    const result = await db().query(`SELECT d.*,c.reference AS campaign_reference ${from} ${where} ORDER BY d.created_at DESC,d.id LIMIT 20 OFFSET $${values.length}`, values);
    return { total: count.rows[0].total, items: result.rows.map((row) => ({
      id: row.id, campaignId: row.campaign_id, campaignReference: row.campaign_reference,
      email: row.recipient_email, name: row.recipient_name, sourceCategory: row.source_category,
      status: row.status, attempts: row.attempts, providerMessageId: row.provider_message_id,
      errorSummary: row.error_summary, sentAt: row.sent_at,
    })) };
  },
};
