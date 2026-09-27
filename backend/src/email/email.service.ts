/**
 * Transactional email service
 *
 * Business services call this boundary rather than Mailjet directly. The raw
 * invitation token exists only long enough to build the recipient's URL.
 */

import type {
  AdminPaymentNotificationEmailInput,
  AdminInvitationEmailInput,
  CommercialApplicationEmailInput,
  AbstractNotificationEmailInput,
  AbstractRecoveryEmailInput,
  EmailProvider,
  EnquiryNotificationEmailInput,
  EmailProviderAcceptance,
  PaymentConfirmationEmailInput,
  StudentRecoveryEmailInput,
  StudentVerificationEmailInput,
  TransactionalEmail,
} from "./email.types";
import { adminPaymentNotificationTemplate } from "./templates/adminPaymentNotification.template";
import { delegateRegistrationTemplate } from "./templates/delegateRegistration.template";
import { adminInvitationTemplate } from "./templates/adminInvitation.template";
import { paymentConfirmationTemplate } from "./templates/paymentConfirmation.template";
import { commercialApplicationTemplate } from "./templates/commercialApplication.template";
import { enquiryTemplate } from "./templates/enquiry.template";
import {
  abstractRecoveryTemplate,
  abstractSubmissionTemplate,
} from "./templates/abstractSubmission.template";
import {
  studentRecoveryTemplate,
  studentVerificationTemplate,
} from "./templates/studentVerification.template";

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
    private readonly publicFrontendUrl: string = adminFrontendUrl,
  ) {}

  get isConfigured(): boolean { return this.provider !== null; }

  /** Campaign delivery uses the same provider but never invokes transactional triggers. */
  async sendCommunication(message: TransactionalEmail): Promise<void | EmailProviderAcceptance> {
    if (!this.provider) throw new EmailNotConfiguredError();
    return this.provider.send(message);
  }

  async sendDelegateRegistrationAcknowledgement(input: {
    email: string;
    fullName: string;
    registrationReference: string;
  }): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...delegateRegistrationTemplate(input),
    });
  }

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
  ): Promise<void | EmailProviderAcceptance> {
    if (!this.provider) throw new EmailNotConfiguredError();
    return this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...adminPaymentNotificationTemplate(input),
    });
  }

  async sendStudentRecovery(input: StudentRecoveryEmailInput): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    const recoveryUrl = new URL(
      "/registration/student-verification",
      this.publicFrontendUrl,
    );
    recoveryUrl.hash = new URLSearchParams({
      recoveryToken: input.rawToken,
    }).toString();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...studentRecoveryTemplate({
        fullName: input.fullName,
        registrationReference: input.registrationReference,
        recoveryUrl: recoveryUrl.toString(),
        expiresAt: input.expiresAt,
      }),
    });
  }

  async sendStudentVerification(
    input: StudentVerificationEmailInput,
  ): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    const portalUrl = new URL(
      "/registration/student-verification",
      this.publicFrontendUrl,
    ).toString();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...studentVerificationTemplate(input, portalUrl),
    });
  }

  async sendCommercialApplication(
    input: CommercialApplicationEmailInput,
  ): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...commercialApplicationTemplate(input),
    });
  }

  async sendAbstractNotification(
    input: AbstractNotificationEmailInput,
  ): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    let workspaceUrl: string | undefined;
    if (input.recoveryToken) {
      const url = new URL("/registration/abstract", this.publicFrontendUrl);
      url.hash = new URLSearchParams({
        recoveryToken: input.recoveryToken,
      }).toString();
      workspaceUrl = url.toString();
    }
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...abstractSubmissionTemplate(input, workspaceUrl),
    });
  }

  async sendAbstractRecovery(input: AbstractRecoveryEmailInput): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    const url = new URL("/registration/abstract", this.publicFrontendUrl);
    url.hash = new URLSearchParams({
      recoveryToken: input.rawToken,
    }).toString();
    await this.provider.send({
      toEmail: input.email,
      toName: input.fullName,
      ...abstractRecoveryTemplate({
        fullName: input.fullName,
        reference: input.reference,
        title: input.title,
        recoveryUrl: url.toString(),
        expiresAt: input.expiresAt,
      }),
    });
  }

  async sendEnquiryNotification(
    input: EnquiryNotificationEmailInput,
  ): Promise<void> {
    if (!this.provider) throw new EmailNotConfiguredError();
    await this.provider.send({
      toEmail: input.email,
      toName: input.name,
      ...enquiryTemplate(input),
    });
  }
}
