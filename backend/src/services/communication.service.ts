import { createHash } from "node:crypto";
import { withTransaction } from "../config/database";
import { createPublicError } from "../middleware/error.middleware";
import type { AdminAuditRepository } from "../repositories/adminAudit.repository";
import { postgresCommunicationRepository } from "../repositories/communication.repository";
import type { CommunicationAudience, CommunicationContent } from "../types/communication";
import type { DatabaseExecutor, TransactionRunner } from "../types/database";
import { communicationTemplate } from "../email/templates/communication.template";
import type { EmailService } from "../email/email.service";

type Repository = typeof postgresCommunicationRepository;
const maxRecipients = 500;

export class CommunicationService {
  constructor(
    private readonly repository: Repository,
    private readonly email: EmailService,
    private readonly audits: AdminAuditRepository,
    private readonly bulkSendEnabled: boolean,
    private readonly transaction: TransactionRunner = withTransaction,
  ) {}

  async audience(audience: CommunicationAudience) {
    const recipients = await this.repository.recipients(audience);
    return { count: recipients.length, fingerprint: createHash("sha256").update(recipients.map((item) => item.email).join("\n")).digest("hex"),
      overLimit: recipients.length > maxRecipients, limit: maxRecipients };
  }

  preview(content: CommunicationContent) { return communicationTemplate(content); }

  async create(content: CommunicationContent, adminId: string) {
    return this.transaction(async (client) => {
      const campaign = await this.repository.create(content, adminId, client);
      await this.audit(adminId, "CAMPAIGN_CREATED", campaign, client);
      return campaign;
    });
  }

  async update(reference: string, content: CommunicationContent, adminId: string) {
    return this.transaction(async (client) => {
      const campaign = await this.repository.update(reference, content, client);
      if (!campaign) throw createPublicError(409, "Only draft campaigns can be updated");
      await this.audit(adminId, "CAMPAIGN_UPDATED", campaign, client);
      return campaign;
    });
  }

  async get(reference: string) {
    const campaign = await this.repository.get(reference);
    if (!campaign) throw createPublicError(404, "Campaign not found");
    return campaign;
  }

  list(page: number, status?: string) { return this.repository.list(page, status); }
  deliveries(page: number, status?: string, campaign?: string) { return this.repository.deliveries(page, status, campaign); }

  async testSend(reference: string, address: string, adminId: string) {
    const campaign = await this.get(reference);
    if (campaign.status !== "DRAFT") throw createPublicError(409, "Test sends require a draft campaign");
    if (!this.email.isConfigured) throw createPublicError(503, "Email provider is not configured");
    const rendered = communicationTemplate(campaign, { test: true });
    const result = await this.email.sendCommunication({
      toEmail: address.trim().toLowerCase(), toName: "AIAIAC test recipient",
      ...rendered,
    });
    await this.audit(adminId, "CAMPAIGN_TEST_SENT", campaign);
    return { accepted: true, providerMessageId: result?.messageId ?? null };
  }

  async confirm(reference: string, fingerprint: string, adminId: string) {
    if (!this.bulkSendEnabled) throw createPublicError(503, "Bulk communications are not enabled");
    if (!this.email.isConfigured) throw createPublicError(503, "Email provider is not configured");
    const campaign = await this.get(reference);
    if (campaign.status !== "DRAFT") throw createPublicError(409, "Campaign has already been confirmed");
    const recipients = await this.repository.recipients(campaign.audience);
    if (!recipients.length) throw createPublicError(422, "Audience is empty");
    if (recipients.length > maxRecipients) throw createPublicError(422, `Audience exceeds ${maxRecipients} recipients`);
    const actual = createHash("sha256").update(recipients.map((item) => item.email).join("\n")).digest("hex");
    if (actual !== fingerprint) throw createPublicError(409, "Audience changed; review the recipient count again");
    const confirmed = await this.repository.confirm(reference, recipients,
      (executor) => this.audit(adminId, "CAMPAIGN_CONFIRMED", campaign, executor));
    if (!confirmed) throw createPublicError(409, "Campaign has already been confirmed");
    return this.get(reference);
  }

  async deliver(reference: string, retry: boolean, adminId: string) {
    if (!this.bulkSendEnabled) throw createPublicError(503, "Bulk communications are not enabled");
    if (!this.email.isConfigured) throw createPublicError(503, "Email provider is not configured");
    const campaign = await this.get(reference);
    if (campaign.status === "DRAFT") throw createPublicError(409, "Review and confirm the campaign first");
    if (campaign.status === "SENT") return { processed: 0, campaign };
    if (retry) await this.audit(adminId, "CAMPAIGN_RETRIED", campaign);
    else if (campaign.sent === 0 && campaign.failed === 0 && campaign.claimed === 0 &&
      campaign.pending === campaign.recipientCount)
      await this.audit(adminId, "CAMPAIGN_SEND_STARTED", campaign);
    const batch = await this.repository.claim(reference, retry);
    const rendered = communicationTemplate(campaign);
    // Sequential delivery keeps provider concurrency bounded even for the full 500-recipient limit.
    for (const recipient of batch) {
      try {
        const result = await this.email.sendCommunication({ toEmail: recipient.email,
          toName: recipient.name, ...rendered });
        await this.repository.settle(recipient.id, true, result?.messageId ?? null, null);
      } catch (error) {
        // Never persist provider error text; it may contain credentials or sensitive data.
        await this.repository.settle(recipient.id, false, null,
          error instanceof Error ? error.name.slice(0, 120) : "DeliveryError");
      }
    }
    const updated = await this.repository.refreshStatus(reference);
    if (updated && !updated.pending && !updated.claimed &&
      (updated.status !== campaign.status || batch.length > 0))
      await this.audit(adminId, "CAMPAIGN_SEND_COMPLETED", updated);
    return { processed: batch.length, campaign: updated };
  }

  private audit(adminId: string, action: Parameters<AdminAuditRepository["create"]>[0]["action"], campaign: { id: string; reference: string }, executor?: DatabaseExecutor) {
    return this.audits.create({ adminId, action, entityType: "COMMUNICATION_CAMPAIGN", entityId: campaign.id,
      metadata: { reference: campaign.reference } }, executor);
  }
}
