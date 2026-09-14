import cors from "cors";
import express, { type RequestHandler, type Router } from "express";
import helmet from "helmet";
import { createAuthController } from "./controllers/auth.controller";
import { createDelegateController } from "./controllers/delegate.controller";
import { getDatabasePool } from "./config/database";
import { env } from "./config/env";
import { createSessionMiddleware } from "./config/session";
import { createPublicError, errorHandler } from "./middleware/error.middleware";
import { createLoginRateLimiter } from "./middleware/loginRateLimit.middleware";
import { createDelegateRegistrationRateLimiter } from "./middleware/delegateRegistrationRateLimit.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { createRequireAuth } from "./middleware/requireAuth.middleware";
import { requestLogger } from "./middleware/requestLogger.middleware";
import { postgresAdminRepository } from "./repositories/admin.repository";
import { postgresDelegateRepository } from "./repositories/delegate.repository";
import { createAdminRouter } from "./routes/admin.routes";
import { createAuthRouter } from "./routes/auth.routes";
import { createDelegateRouter } from "./routes/delegate.routes";
import { createApiRouter } from "./routes";
import { AuthService } from "./services/auth.service";
import { DelegateService } from "./services/delegate.service";

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
  app.use(express.json({ limit: "100kb" }));
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
  const delegateService = new DelegateService(postgresDelegateRepository);
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
  const delegateRouter = createDelegateRouter({
    controller: delegateController,
    registrationRateLimiter: createDelegateRegistrationRateLimiter({
      windowMs: env.delegateRegistrationRateLimitWindowMs,
      max: env.delegateRegistrationRateLimitMax,
    }),
  });
  const adminRouter = createAdminRouter(requireAuth, delegateController);
  const sessionMiddleware = createSessionMiddleware({
    pool,
    secret: env.sessionSecret,
    maxAgeMs: env.sessionMaxAgeMs,
    production: env.nodeEnv === "production",
  });

  return createApplication({
    sessionMiddleware,
    apiRouter: createApiRouter({ authRouter, adminRouter, delegateRouter }),
  });
}
