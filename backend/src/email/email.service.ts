/**
 * Transactional email service
 *
 * Business services call this boundary rather than Mailjet directly. The raw
 * invitation token exists only long enough to build the recipient's URL.
 */

import type {
  AdminPaymentNotificationEmailInput,
  AdminInvitationEmailInput,
  EmailProvider,
  PaymentConfirmationEmailInput,
} from "./email.types";
import { adminPaymentNotificationTemplate } from "./templates/adminPaymentNotification.template";
import { adminInvitationTemplate } from "./templates/adminInvitation.template";
import { paymentConfirmationTemplate } from "./templates/paymentConfirmation.template";

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Transactional email provider is not configured");
    this.name = "EmailNotConfiguredError";
  }
}

export class EmailService {
  constructor(
    private readonly provider: EmailProvider | null,
    private readonly adminFrontendUrl: string,
  ) {}

  async sendAdminInvitation(input: AdminInvitationEmailInput): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    const invitationUrl = new URL(
      "/admin/accept-invite",
      this.adminFrontendUrl,
    );
    invitationUrl.searchParams.set("token", input.rawToken);
    const content = adminInvitationTemplate({
      fullName: input.fullName,
      role: input.role,
      invitationUrl: invitationUrl.toString(),
      expiresAt: input.expiresAt,
    });
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...content,
    });
  }

  async sendPaymentConfirmation(
    input: PaymentConfirmationEmailInput,
  ): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      inlineAttachments: [
        {
          contentType: "image/png",
          filename: "aiaiac-2027-event-pass.png",
          contentId: "aiaiac-event-pass-qr",
          base64Content: input.eventPassQrBase64,
        },
      ],
      ...paymentConfirmationTemplate(input),
    });
  }

  async sendAdminPaymentNotification(
    input: AdminPaymentNotificationEmailInput,
  ): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...adminPaymentNotificationTemplate(input),
    });
  }
}
