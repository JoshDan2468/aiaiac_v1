/** Transactional email contracts kept independent from any provider SDK. */

export interface TransactionalEmail {
  readonly toEmail: string;
  readonly toName: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
}

export interface EmailProvider {
  send(message: TransactionalEmail): Promise<void>;
}

export interface AdminInvitationEmailInput {
  readonly email: string;
  readonly fullName: string;
  readonly role: string;
  readonly rawToken: string;
  readonly expiresAt: Date;
}

export interface PaymentConfirmationEmailInput {
  readonly email: string;
  readonly fullName: string;
  readonly registrationReference: string;
  readonly paymentReference: string;
  readonly packageName: string;
  readonly currency: string;
  readonly amountMinor: number;
}
