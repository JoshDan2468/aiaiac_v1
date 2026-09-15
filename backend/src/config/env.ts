import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const rawEnvironmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(5000),
  CLIENT_URL: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  SESSION_SECRET: z.string().optional(),
  SESSION_MAX_AGE_MS: z.coerce
    .number()
    .int()
    .min(60_000)
    .max(86_400_000)
    .default(28_800_000),
  LOGIN_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .min(60_000)
    .max(3_600_000)
    .default(900_000),
  LOGIN_RATE_LIMIT_MAX: z.coerce.number().int().min(1).max(10_000).optional(),
  DELEGATE_REGISTRATION_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .min(60_000)
    .max(3_600_000)
    .default(900_000),
  DELEGATE_REGISTRATION_RATE_LIMIT_MAX: z.coerce
    .number()
    .int()
    .min(1)
    .max(10_000)
    .optional(),
  ADMIN_INVITATION_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .min(60_000)
    .max(3_600_000)
    .default(900_000),
  ADMIN_INVITATION_VALIDATE_RATE_LIMIT_MAX: z.coerce
    .number()
    .int()
    .min(1)
    .max(10_000)
    .optional(),
  ADMIN_INVITATION_ACCEPT_RATE_LIMIT_MAX: z.coerce
    .number()
    .int()
    .min(1)
    .max(10_000)
    .optional(),
  ADMIN_INVITATION_EXPIRY_HOURS: z.coerce
    .number()
    .int()
    .min(1)
    .max(168)
    .default(48),
  ADMIN_ALLOWED_EMAIL_DOMAINS: z.string().optional(),
  ADMIN_FRONTEND_URL: z.string().optional(),
  MAILJET_API_KEY: z.string().optional(),
  MAILJET_SECRET_KEY: z.string().optional(),
  MAILJET_FROM_EMAIL: z.string().optional(),
  MAILJET_FROM_NAME: z.string().default("AIAIAC"),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_CALLBACK_URL: z.string().optional(),
  INITIAL_SUPER_ADMIN_NAME: z.string().optional(),
  INITIAL_SUPER_ADMIN_EMAIL: z.string().optional(),
  INITIAL_SUPER_ADMIN_PASSWORD: z.string().optional(),
});

export interface EnvironmentConfig {
  readonly nodeEnv: "development" | "test" | "production";
  readonly port: number;
  readonly clientOrigins: readonly string[];
  readonly databaseUrl?: string;
  readonly sessionSecret?: string;
  readonly sessionMaxAgeMs: number;
  readonly loginRateLimitWindowMs: number;
  readonly loginRateLimitMax: number;
  readonly delegateRegistrationRateLimitWindowMs: number;
  readonly delegateRegistrationRateLimitMax: number;
  readonly adminInvitationRateLimitWindowMs: number;
  readonly adminInvitationValidateRateLimitMax: number;
  readonly adminInvitationAcceptRateLimitMax: number;
  readonly adminInvitationExpiryHours: number;
  readonly adminAllowedEmailDomains: readonly string[];
  readonly adminFrontendUrl: string;
  readonly mailjet?: {
    readonly apiKey: string;
    readonly secretKey: string;
    readonly fromEmail: string;
    readonly fromName: string;
  };
  readonly paystack?: {
    readonly secretKey: string;
    readonly callbackUrl: string;
  };
  readonly initialSuperAdmin: {
    readonly fullName?: string;
    readonly email?: string;
    readonly password?: string;
  };
}

function configurationError(variable: string, requirement: string): Error {
  return new Error(
    `Invalid environment configuration: ${variable} ${requirement}`,
  );
}

function parseClientOrigins(value: string): string[] {
  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0 || origins.includes("*")) {
    throw configurationError(
      "CLIENT_URL",
      "must contain explicit HTTP(S) origins",
    );
  }

  const normalized = origins.map((origin) => {
    let url: URL;
    try {
      url = new URL(origin);
    } catch {
      throw configurationError(
        "CLIENT_URL",
        "must contain valid HTTP(S) origins",
      );
    }

    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      throw configurationError(
        "CLIENT_URL",
        "must contain origin-only HTTP(S) URLs",
      );
    }

    return url.origin;
  });

  return [...new Set(normalized)];
}

function parseDatabaseUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  if (!candidate) return undefined;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw configurationError("DATABASE_URL", "must be a valid PostgreSQL URL");
  }

  if (!["postgres:", "postgresql:"].includes(url.protocol)) {
    throw configurationError(
      "DATABASE_URL",
      "must use the postgres or postgresql protocol",
    );
  }

  return candidate;
}

function parseOrigin(variable: string, value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw configurationError(variable, "must be a valid HTTP(S) origin");
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw configurationError(variable, "must be an origin-only HTTP(S) URL");
  }
  return url.origin;
}

function parseHttpUrl(variable: string, value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw configurationError(variable, "must be a valid HTTP(S) URL");
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.hash
  ) {
    throw configurationError(variable, "must be a safe HTTP(S) URL");
  }
  return url.toString();
}

function parseAllowedEmailDomains(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  const domains = value
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
  if (
    domains.some((domain) => !/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(domain))
  ) {
    throw configurationError(
      "ADMIN_ALLOWED_EMAIL_DOMAINS",
      "contains an invalid domain",
    );
  }
  return [...new Set(domains)];
}

export function loadEnvironment(
  source: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): EnvironmentConfig {
  const parsed = rawEnvironmentSchema.safeParse(source);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => issue.path.join("."))
      .join(", ");
    throw new Error(`Invalid environment configuration: ${issues}`);
  }

  const clientUrl = parsed.data.CLIENT_URL?.trim();
  if (parsed.data.NODE_ENV === "production" && !clientUrl) {
    throw configurationError("CLIENT_URL", "is required in production");
  }

  const databaseUrl = parseDatabaseUrl(parsed.data.DATABASE_URL);
  if (parsed.data.NODE_ENV === "production" && !databaseUrl) {
    throw configurationError("DATABASE_URL", "is required in production");
  }

  const sessionSecret = parsed.data.SESSION_SECRET?.trim();
  if (
    sessionSecret &&
    (sessionSecret.length < 32 || /^REPLACE_/i.test(sessionSecret))
  ) {
    throw configurationError(
      "SESSION_SECRET",
      "must be at least 32 characters and not a placeholder",
    );
  }
  if (parsed.data.NODE_ENV === "production" && !sessionSecret) {
    throw configurationError("SESSION_SECRET", "is required in production");
  }

  const adminFrontendUrl = parseOrigin(
    "ADMIN_FRONTEND_URL",
    parsed.data.ADMIN_FRONTEND_URL?.trim() ||
      parseClientOrigins(clientUrl || "http://localhost:5173")[0]!,
  );
  const mailjetValues = [
    parsed.data.MAILJET_API_KEY?.trim(),
    parsed.data.MAILJET_SECRET_KEY?.trim(),
    parsed.data.MAILJET_FROM_EMAIL?.trim().toLowerCase(),
  ];
  const hasAnyMailjetValue = mailjetValues.some(Boolean);
  const hasAllMailjetValues = mailjetValues.every(Boolean);
  if (hasAnyMailjetValue && !hasAllMailjetValues) {
    throw configurationError(
      "MAILJET_API_KEY, MAILJET_SECRET_KEY, and MAILJET_FROM_EMAIL",
      "must be configured together",
    );
  }
  if (parsed.data.NODE_ENV === "production" && !hasAllMailjetValues) {
    throw configurationError(
      "Mailjet credentials",
      "are required in production",
    );
  }
  const paystackSecretKey = parsed.data.PAYSTACK_SECRET_KEY?.trim();
  if (paystackSecretKey && paystackSecretKey.length < 16) {
    throw configurationError("PAYSTACK_SECRET_KEY", "is invalid");
  }
  if (parsed.data.NODE_ENV === "production" && !paystackSecretKey) {
    throw configurationError(
      "PAYSTACK_SECRET_KEY",
      "is required in production",
    );
  }
  const paystackCallbackUrl = parseHttpUrl(
    "PAYSTACK_CALLBACK_URL",
    parsed.data.PAYSTACK_CALLBACK_URL?.trim() ||
      "http://localhost:5173/registration/payment/callback",
  );

  const config: EnvironmentConfig = {
    nodeEnv: parsed.data.NODE_ENV,
    port: parsed.data.PORT,
    clientOrigins: parseClientOrigins(clientUrl || "http://localhost:5173"),
    sessionMaxAgeMs: parsed.data.SESSION_MAX_AGE_MS,
    loginRateLimitWindowMs: parsed.data.LOGIN_RATE_LIMIT_WINDOW_MS,
    loginRateLimitMax:
      parsed.data.LOGIN_RATE_LIMIT_MAX ??
      (parsed.data.NODE_ENV === "production" ? 10 : 100),
    delegateRegistrationRateLimitWindowMs:
      parsed.data.DELEGATE_REGISTRATION_RATE_LIMIT_WINDOW_MS,
    delegateRegistrationRateLimitMax:
      parsed.data.DELEGATE_REGISTRATION_RATE_LIMIT_MAX ??
      (parsed.data.NODE_ENV === "production" ? 20 : 100),
    adminInvitationRateLimitWindowMs:
      parsed.data.ADMIN_INVITATION_RATE_LIMIT_WINDOW_MS,
    adminInvitationValidateRateLimitMax:
      parsed.data.ADMIN_INVITATION_VALIDATE_RATE_LIMIT_MAX ??
      (parsed.data.NODE_ENV === "production" ? 60 : 500),
    adminInvitationAcceptRateLimitMax:
      parsed.data.ADMIN_INVITATION_ACCEPT_RATE_LIMIT_MAX ??
      (parsed.data.NODE_ENV === "production" ? 10 : 100),
    adminInvitationExpiryHours: parsed.data.ADMIN_INVITATION_EXPIRY_HOURS,
    adminAllowedEmailDomains: parseAllowedEmailDomains(
      parsed.data.ADMIN_ALLOWED_EMAIL_DOMAINS,
    ),
    adminFrontendUrl,
    initialSuperAdmin: {
      ...(parsed.data.INITIAL_SUPER_ADMIN_NAME
        ? { fullName: parsed.data.INITIAL_SUPER_ADMIN_NAME }
        : {}),
      ...(parsed.data.INITIAL_SUPER_ADMIN_EMAIL
        ? { email: parsed.data.INITIAL_SUPER_ADMIN_EMAIL }
        : {}),
      ...(parsed.data.INITIAL_SUPER_ADMIN_PASSWORD
        ? { password: parsed.data.INITIAL_SUPER_ADMIN_PASSWORD }
        : {}),
    },
    ...(databaseUrl ? { databaseUrl } : {}),
    ...(sessionSecret ? { sessionSecret } : {}),
    ...(hasAllMailjetValues
      ? {
          mailjet: {
            apiKey: mailjetValues[0]!,
            secretKey: mailjetValues[1]!,
            fromEmail: mailjetValues[2]!,
            fromName: parsed.data.MAILJET_FROM_NAME.trim() || "AIAIAC",
          },
        }
      : {}),
    ...(paystackSecretKey
      ? {
          paystack: {
            secretKey: paystackSecretKey,
            callbackUrl: paystackCallbackUrl,
          },
        }
      : {}),
  };

  return Object.freeze(config);
}

export const env = loadEnvironment();
