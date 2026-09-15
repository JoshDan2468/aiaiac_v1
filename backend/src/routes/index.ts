import { Router } from "express";
import {
  createGetReady,
  type DatabaseConnectionCheck,
} from "../controllers/ready.controller";
import { getHealth } from "../controllers/health.controller";

interface ApiRouterDependencies {
  readonly checkDatabaseConnection?: DatabaseConnectionCheck;
  readonly authRouter?: Router;
  readonly adminRouter?: Router;
  readonly adminInvitationRouter?: Router;
  readonly delegateRouter?: Router;
  readonly paymentRouter?: Router;
}

export function createApiRouter(
  dependencies: ApiRouterDependencies = {},
): Router {
  const router = Router();
  const getReady = dependencies.checkDatabaseConnection
    ? createGetReady(dependencies.checkDatabaseConnection)
    : createGetReady();

  router.get("/health", getHealth);
  router.get("/ready", getReady);
  if (dependencies.authRouter) router.use("/auth", dependencies.authRouter);
  if (dependencies.delegateRouter) router.use(dependencies.delegateRouter);
  if (dependencies.paymentRouter) router.use(dependencies.paymentRouter);
  if (dependencies.adminInvitationRouter)
    router.use("/admin/invitations", dependencies.adminInvitationRouter);
  if (dependencies.adminRouter) router.use("/admin", dependencies.adminRouter);

  return router;
}
