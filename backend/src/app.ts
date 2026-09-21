import cors from "cors";
import express, {
  type Request,
  type RequestHandler,
  type Router,
} from "express";
import helmet from "helmet";
import { createAuthController } from "./controllers/auth.controller";
import { createAdminInvitationController } from "./controllers/adminInvitation.controller";
import { createAdminUserController } from "./controllers/adminUser.controller";
import { createDelegateController } from "./controllers/delegate.controller";
import { createPaymentController } from "./controllers/payment.controller";
import { createAdminPaymentController } from "./controllers/adminPayment.controller";
import { createAdminOverviewController } from "./controllers/adminOverview.controller";
import { createStudentVerificationController } from "./controllers/studentVerification.controller";
import { getDatabasePool } from "./config/database";
import { env } from "./config/env";
import { createSessionMiddleware } from "./config/session";
import { createPublicError, errorHandler } from "./middleware/error.middleware";
import { createLoginRateLimiter } from "./middleware/loginRateLimit.middleware";
import { createInvitationRateLimiter } from "./middleware/invitationRateLimit.middleware";
import { createAdminMutationSecurity } from "./middleware/adminMutationSecurity.middleware";
import { createDelegateRegistrationRateLimiter } from "./middleware/delegateRegistrationRateLimit.middleware";
import { createPaymentRateLimiter } from "./middleware/paymentRateLimit.middleware";
import { createPaystackWebhookSignatureMiddleware } from "./middleware/paystackWebhookSignature.middleware";
import { createStudentEvidenceUploadRateLimiter } from "./middleware/studentEvidenceRateLimit.middleware";
import {
  enforceStudentEvidenceRequestSize,
  parseStudentEvidenceMultipart,
} from "./middleware/studentEvidenceUpload.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { createRequireAuth } from "./middleware/requireAuth.middleware";
import { requestLogger } from "./middleware/requestLogger.middleware";
import { postgresAdminRepository } from "./repositories/admin.repository";
import { postgresAdminAuditRepository } from "./repositories/adminAudit.repository";
import { postgresAdminInvitationRepository } from "./repositories/adminInvitation.repository";
import { postgresDelegateRepository } from "./repositories/delegate.repository";
import { postgresPaymentRepository } from "./repositories/payment.repository";
import { postgresPaymentCompletionRepository } from "./repositories/paymentCompletion.repository";
import { postgresAdminOverviewRepository } from "./repositories/adminOverview.repository";
import { postgresStudentVerificationRepository } from "./repositories/studentVerification.repository";
import { postgresStudentEvidenceRepository } from "./repositories/studentEvidence.repository";
import { createAdminRouter } from "./routes/admin.routes";
import { createAdminInvitationRouter } from "./routes/adminInvitation.routes";
import { createAuthRouter } from "./routes/auth.routes";
import { createDelegateRouter } from "./routes/delegate.routes";
import { createPaymentRouter } from "./routes/payment.routes";
import { createStudentVerificationRouter } from "./routes/studentVerification.routes";
import { createApiRouter } from "./routes";
import { AuthService } from "./services/auth.service";
import { AdminInvitationService } from "./services/adminInvitation.service";
import { AdminUserService } from "./services/adminUser.service";
import { DelegateService } from "./services/delegate.service";
import { DelegatePaymentService } from "./services/delegatePayment.service";
import { PaymentCompletionService } from "./services/paymentCompletion.service";
import { AdminOverviewService } from "./services/adminOverview.service";
import { StudentVerificationService } from "./services/studentVerification.service";
import { StudentEvidenceService } from "./services/studentEvidence.service";
import { LocalStudentEvidenceStorage } from "./studentEvidence/local.storage";
import { UnavailableMalwareScanner } from "./studentEvidence/malwareScanner";
import { PaymentService } from "./payments/payment.service";
import { PaystackProvider } from "./payments/providers/paystack.provider";
import { EmailService } from "./email/email.service";
import { MailjetProvider } from "./email/providers/mailjet.provider";

interface ApplicationOptions {
  readonly apiRouter?: Router;
  readonly sessionMiddleware?: RequestHandler;
  readonly clientOrigins?: readonly string[];
}

// Build the middleware pipeline. Optional dependencies keep health/error behavior easy to test.
export function createApplication(
  options: ApplicationOptions = {},
): express.Express {
  const app = express();
  const clientOrigins = options.clientOrigins ?? env.clientOrigins;

  app.disable("x-powered-by");
  app.set("json escape", true);

  app.use(requestLogger);
  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || clientOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(createPublicError(403, "Origin not allowed"));
      },
      credentials: true,
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  );
  app.use(
    express.json({
      limit: "100kb",
      verify(request, _response, buffer) {
        // Paystack signs these exact bytes; parsing/re-serializing would invalidate the signature.
        const expressRequest = request as Request;
        if (
          expressRequest.originalUrl.split("?")[0] ===
          "/api/payments/paystack/webhook"
        ) {
          expressRequest.rawBody = Buffer.from(buffer);
        }
      },
    }),
  );
  app.use(express.urlencoded({ extended: false, limit: "100kb" }));
  if (options.sessionMiddleware) app.use(options.sessionMiddleware);

  app.use("/api", options.apiRouter ?? createApiRouter());
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

// Wire the real database, session store, authentication service, and protected routes for startup.
export function createConfiguredApplication(): express.Express {
  const pool = getDatabasePool();
  if (!pool)
    throw new Error(
      "DATABASE_URL is required to configure admin authentication",
    );
  if (!env.sessionSecret) {
    throw new Error(
      "SESSION_SECRET is required to configure admin authentication",
    );
  }

  const authService = new AuthService(postgresAdminRepository);
  const emailProvider = env.mailjet ? new MailjetProvider(env.mailjet) : null;
  const emailService = new EmailService(emailProvider, env.adminFrontendUrl);
  const invitationService = new AdminInvitationService({
    invitations: postgresAdminInvitationRepository,
    admins: postgresAdminRepository,
    audits: postgresAdminAuditRepository,
    emailService,
    expiryHours: env.adminInvitationExpiryHours,
    allowedEmailDomains: env.adminAllowedEmailDomains,
  });
  const adminUserService = new AdminUserService(
    postgresAdminRepository,
    postgresAdminAuditRepository,
  );
  const delegateService = new DelegateService(postgresDelegateRepository);
  const studentVerificationService = new StudentVerificationService(
    postgresStudentVerificationRepository,
    undefined,
    env.studentEvidenceTokenTtlHours,
  );
  const studentEvidenceService = new StudentEvidenceService(
    postgresStudentEvidenceRepository,
    new LocalStudentEvidenceStorage(env.studentEvidenceStorageDirectory),
    new UnavailableMalwareScanner(),
  );
  const paystackProvider = env.paystack
    ? new PaystackProvider(env.paystack.secretKey)
    : null;
  const completionService = new PaymentCompletionService(
    postgresPaymentCompletionRepository,
    emailService,
    env.paymentNotificationRoles,
  );
  const paymentService = new DelegatePaymentService(
    postgresPaymentRepository,
    new PaymentService(paystackProvider),
    completionService,
    env.paystack?.callbackUrl ||
      "http://localhost:5173/registration/payment/callback",
  );
  const requireAuth = createRequireAuth(authService);
  const controller = createAuthController({
    authService,
    sessionMaxAgeMs: env.sessionMaxAgeMs,
    production: env.nodeEnv === "production",
  });
  const authRouter = createAuthRouter({
    controller,
    requireAuth,
    loginRateLimiter: createLoginRateLimiter({
      windowMs: env.loginRateLimitWindowMs,
      max: env.loginRateLimitMax,
    }),
  });
  const delegateController = createDelegateController({ delegateService });
  const adminUserController = createAdminUserController({
    invitations: invitationService,
    users: adminUserService,
  });
  const adminInvitationController =
    createAdminInvitationController(invitationService);
  const paymentController = createPaymentController(paymentService);
  const adminPaymentController = createAdminPaymentController(paymentService);
  const adminOverviewController = createAdminOverviewController(
    new AdminOverviewService(postgresAdminOverviewRepository),
  );
  const studentVerificationController = createStudentVerificationController(
    studentVerificationService,
    studentEvidenceService,
  );
  const delegateRouter = createDelegateRouter({
    controller: delegateController,
    registrationRateLimiter: createDelegateRegistrationRateLimiter({
      windowMs: env.delegateRegistrationRateLimitWindowMs,
      max: env.delegateRegistrationRateLimitMax,
    }),
  });
  const adminRouter = createAdminRouter({
    requireAuth,
    mutationSecurity: createAdminMutationSecurity(env.clientOrigins),
    delegateController,
    adminUserController,
    adminPaymentController,
    adminOverviewController,
    studentVerificationController,
  });
  const paymentRouter = createPaymentRouter({
    controller: paymentController,
    rateLimiter: createPaymentRateLimiter({
      windowMs: env.delegateRegistrationRateLimitWindowMs,
      max: env.delegateRegistrationRateLimitMax,
    }),
    webhookSignature: createPaystackWebhookSignatureMiddleware(
      env.paystack?.secretKey,
    ),
  });
  const studentVerificationRouter = createStudentVerificationRouter({
    controller: studentVerificationController,
    rateLimiter: createDelegateRegistrationRateLimiter({
      windowMs: env.delegateRegistrationRateLimitWindowMs,
      max: env.delegateRegistrationRateLimitMax,
    }),
    uploadRateLimiter: createStudentEvidenceUploadRateLimiter({
      windowMs: env.studentEvidenceRateLimitWindowMs,
      max: env.studentEvidenceRateLimitMax,
    }),
    requestSizeLimit: enforceStudentEvidenceRequestSize,
    multipartParser: parseStudentEvidenceMultipart,
  });
  const adminInvitationRouter = createAdminInvitationRouter({
    controller: adminInvitationController,
    validateRateLimiter: createInvitationRateLimiter({
      windowMs: env.adminInvitationRateLimitWindowMs,
      max: env.adminInvitationValidateRateLimitMax,
    }),
    acceptRateLimiter: createInvitationRateLimiter({
      windowMs: env.adminInvitationRateLimitWindowMs,
      max: env.adminInvitationAcceptRateLimitMax,
    }),
  });
  const sessionMiddleware = createSessionMiddleware({
    pool,
    secret: env.sessionSecret,
    maxAgeMs: env.sessionMaxAgeMs,
    production: env.nodeEnv === "production",
  });

  return createApplication({
    sessionMiddleware,
    apiRouter: createApiRouter({
      authRouter,
      adminRouter,
      adminInvitationRouter,
      delegateRouter,
      paymentRouter,
      studentVerificationRouter,
    }),
  });
}
