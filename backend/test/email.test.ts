import assert from "node:assert/strict";
import test from "node:test";
import {
  MailjetDeliveryError,
  MailjetProvider,
} from "../src/email/providers/mailjet.provider";

const message = {
  toEmail: "jane@example.com",
  toName: "Jane Doe",
  subject: "Invitation",
  text: "Use the invitation link",
  html: "<p>Use the invitation link</p>",
};

test("Mailjet provider sends the expected transactional request without logging credentials", async () => {
  let requestUrl = "";
  let requestOptions: RequestInit | undefined;
  const provider = new MailjetProvider({
    apiKey: "test-api-key",
    secretKey: "test-secret-key",
    fromEmail: "no-reply@example.com",
    fromName: "AIAIAC",
    fetchImplementation: (async (url, options) => {
      requestUrl = String(url);
      requestOptions = options;
      return new Response("", { status: 200 });
    }) as typeof fetch,
  });

  await provider.send(message);

  assert.equal(requestUrl, "https://api.mailjet.com/v3.1/send");
  const body = JSON.parse(String(requestOptions?.body));
  assert.deepEqual(body.Messages[0].To[0], {
    Email: "jane@example.com",
    Name: "Jane Doe",
  });
  assert.deepEqual(body.Messages[0].From, {
    Email: "no-reply@example.com",
    Name: "AIAIAC",
  });
  assert.equal(body.Messages[0].Subject, "Invitation");
  assert.match(
    new Headers(requestOptions?.headers).get("Authorization") ?? "",
    /^Basic /,
  );
  assert.equal(JSON.stringify(body).includes("test-secret-key"), false);
});

test("Mailjet failures become a provider-neutral safe error", async () => {
  const provider = new MailjetProvider({
    apiKey: "test-api-key",
    secretKey: "test-secret-key",
    fromEmail: "no-reply@example.com",
    fromName: "AIAIAC",
    fetchImplementation: (async () =>
      new Response("provider detail", { status: 503 })) as typeof fetch,
  });

  await assert.rejects(provider.send(message), MailjetDeliveryError);
});

test("Mailjet maps an event-pass QR to a content-ID inline attachment", async () => {
  let requestOptions: RequestInit | undefined;
  const provider = new MailjetProvider({
    apiKey: "test-api-key",
    secretKey: "test-secret-key",
    fromEmail: "no-reply@example.com",
    fromName: "AIAIAC",
    fetchImplementation: (async (_url, options) => {
      requestOptions = options;
      return new Response("", { status: 200 });
    }) as typeof fetch,
  });
  await provider.send({
    ...message,
    inlineAttachments: [
      {
        contentType: "image/png",
        filename: "event-pass.png",
        contentId: "event-pass-qr",
        base64Content: "cG5n",
      },
    ],
  });
  const body = JSON.parse(String(requestOptions?.body));
  assert.deepEqual(body.Messages[0].InlinedAttachments, [
    {
      ContentType: "image/png",
      Filename: "event-pass.png",
      ContentID: "event-pass-qr",
      Base64Content: "cG5n",
    },
  ]);
});
