import assert from "node:assert/strict";
import test from "node:test";
import { loadEnvironment } from "../src/config/env";

test("development defaults are safe and database configuration is optional outside production", () => {
  const config = loadEnvironment({});

  assert.equal(config.nodeEnv, "development");
  assert.equal(config.port, 5000);
  assert.deepEqual(config.clientOrigins, ["http://localhost:5173"]);
  assert.equal(config.databaseUrl, undefined);
  assert.equal(config.sessionMaxAgeMs, 28_800_000);
  assert.equal(config.loginRateLimitWindowMs, 900_000);
  assert.equal(config.loginRateLimitMax, 100);
  assert.equal(config.adminInvitationExpiryHours, 48);
  assert.deepEqual(config.adminAllowedEmailDomains, []);
  assert.equal(config.adminFrontendUrl, "http://localhost:5173");
});

test("configured client origins are normalized and deduplicated", () => {
  const config = loadEnvironment({
    CLIENT_URL:
      "https://aiaiac.example, https://aiaiac.example, http://localhost:5173",
  });

  assert.deepEqual(config.clientOrigins, [
    "https://aiaiac.example",
    "http://localhost:5173",
  ]);
});

test("production requires an explicit client origin", () => {
  assert.throws(
    () => loadEnvironment({ NODE_ENV: "production" }),
    /CLIENT_URL is required in production/,
  );
});

test("production requires an explicit database URL", () => {
  assert.throws(
    () =>
      loadEnvironment({
        NODE_ENV: "production",
        CLIENT_URL: "https://aiaiac.example",
      }),
    /DATABASE_URL is required in production/,
  );
});

test("production requires a strong session secret", () => {
  assert.throws(
    () =>
      loadEnvironment({
        NODE_ENV: "production",
        CLIENT_URL: "https://aiaiac.example",
        DATABASE_URL: "postgresql://app:password@example.invalid/aiaiac",
      }),
    /SESSION_SECRET is required in production/,
  );

  assert.throws(
    () =>
      loadEnvironment({ SESSION_SECRET: "REPLACE_WITH_A_LONG_RANDOM_VALUE" }),
    /SESSION_SECRET/,
  );
});

test("wildcard CORS and invalid database protocols fail without echoing values", () => {
  assert.throws(() => loadEnvironment({ CLIENT_URL: "*" }), /CLIENT_URL/);

  const secretValue = "mysql://user:secret@example.invalid/database";
  assert.throws(
    () => loadEnvironment({ DATABASE_URL: secretValue }),
    (error: unknown) =>
      error instanceof Error && !error.message.includes(secretValue),
  );
});

test("Admin invitation domains normalize and Mailjet configuration must be complete", () => {
  const config = loadEnvironment({
    ADMIN_ALLOWED_EMAIL_DOMAINS:
      "AIAIACAFRICA.COM, aiaiacafrica.com, staff.example",
  });
  assert.deepEqual(config.adminAllowedEmailDomains, [
    "aiaiacafrica.com",
    "staff.example",
  ]);

  assert.throws(
    () => loadEnvironment({ MAILJET_API_KEY: "only-one-value" }),
    /must be configured together/,
  );
});

test("Paystack uses one backend secret and validates the callback URL", () => {
  const config = loadEnvironment({
    PAYSTACK_SECRET_KEY: "sk_test_safe_placeholder",
    PAYSTACK_CALLBACK_URL:
      "https://conference.example/registration/payment/callback",
  });
  assert.equal(config.paystack?.secretKey, "sk_test_safe_placeholder");
  assert.equal(
    config.paystack?.callbackUrl,
    "https://conference.example/registration/payment/callback",
  );
  assert.throws(
    () => loadEnvironment({ PAYSTACK_SECRET_KEY: "short" }),
    /PAYSTACK_SECRET_KEY/,
  );
  assert.throws(
    () => loadEnvironment({ PAYSTACK_CALLBACK_URL: "javascript:alert(1)" }),
    /PAYSTACK_CALLBACK_URL/,
  );
});
