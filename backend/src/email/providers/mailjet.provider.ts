/**
 * Mailjet transactional provider
 *
 * Converts provider-neutral messages to Mailjet Send API requests. Failure
 * details and credentials are intentionally not exposed to callers or logs.
 */

import type { EmailProvider, TransactionalEmail } from "../email.types";

interface MailjetProviderOptions {
  readonly apiKey: string;
  readonly secretKey: string;
  readonly fromEmail: string;
  readonly fromName: string;
  readonly fetchImplementation?: typeof fetch;
}

export class MailjetDeliveryError extends Error {
  constructor() {
    super("Transactional email delivery failed");
    this.name = "MailjetDeliveryError";
  }
}

export class MailjetProvider implements EmailProvider {
  private readonly request: typeof fetch;

  constructor(private readonly options: MailjetProviderOptions) {
    this.request = options.fetchImplementation ?? fetch;
  }

  async send(message: TransactionalEmail): Promise<void> {
    let response: Response;
    try {
      response = await this.request("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${this.options.apiKey}:${this.options.secretKey}`,
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: this.options.fromEmail,
                Name: this.options.fromName,
              },
              To: [{ Email: message.toEmail, Name: message.toName }],
              Subject: message.subject,
              TextPart: message.text,
              HTMLPart: message.html,
              ...(message.inlineAttachments?.length
                ? {
                    InlinedAttachments: message.inlineAttachments.map(
                      (attachment) => ({
                        ContentType: attachment.contentType,
                        Filename: attachment.filename,
                        ContentID: attachment.contentId,
                        Base64Content: attachment.base64Content,
                      }),
                    ),
                  }
                : {}),
            },
          ],
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      throw new MailjetDeliveryError();
    }

    if (!response.ok) throw new MailjetDeliveryError();
  }
}
