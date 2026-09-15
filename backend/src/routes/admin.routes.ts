/** Protected Admin routes and their authentication/permission/security checkpoints. */

import { Router, type RequestHandler } from "express";
import { requirePermission } from "../middleware/requirePermission.middleware";

type DelegateController = ReturnType<
  typeof import("../controllers/delegate.controller").createDelegateController
>;
type AdminUserController = ReturnType<
  typeof import("../controllers/adminUser.controller").createAdminUserController
>;
type AdminPaymentController = ReturnType<
  typeof import("../controllers/adminPayment.controller").createAdminPaymentController
>;

interface AdminRouterOptions {
  readonly requireAuth: RequestHandler;
  readonly mutationSecurity?: RequestHandler;
  readonly delegateController?: DelegateController;
  readonly adminUserController?: AdminUserController;
  readonly adminPaymentController?: AdminPaymentController;
}

// The legacy positional form keeps small isolated route tests straightforward.
export function createAdminRouter(
  optionsOrAuth: AdminRouterOptions | RequestHandler,
  legacyDelegateController?: DelegateController,
): Router {
  const options: AdminRouterOptions =
    typeof optionsOrAuth === "function"
      ? {
          requireAuth: optionsOrAuth,
          ...(legacyDelegateController
            ? { delegateController: legacyDelegateController }
            : {}),
        }
      : optionsOrAuth;
  const mutationSecurity: RequestHandler =
    options.mutationSecurity ?? ((_request, _response, next) => next());
  const router = Router();

  router.get("/test", options.requireAuth, (_request, response) => {
    response
      .status(200)
      .json({ success: true, message: "Protected admin endpoint accessible" });
  });

  router.get(
    "/super-admin-test",
    options.requireAuth,
    requirePermission("users.read"),
    (_request, response) => {
      response
        .status(200)
        .json({ success: true, message: "Super Admin endpoint accessible" });
    },
  );

  if (options.delegateController) {
    router.get(
      "/delegates",
      options.requireAuth,
      requirePermission("delegates.read"),
      options.delegateController.listAdminRegistrations,
    );
    router.get(
      "/delegates/:id",
      options.requireAuth,
      requirePermission("delegates.read"),
      options.delegateController.getAdminRegistration,
    );
  }

  if (options.adminUserController) {
    router.get(
      "/users",
      options.requireAuth,
      requirePermission("users.read"),
      options.adminUserController.listUsers,
    );
    router.get(
      "/users/invitations",
      options.requireAuth,
      requirePermission("users.read"),
      options.adminUserController.listInvitations,
    );
    router.post(
      "/users/invitations",
      options.requireAuth,
      mutationSecurity,
      requirePermission("users.invite"),
      options.adminUserController.createInvitation,
    );
    router.post(
      "/users/invitations/:id/revoke",
      options.requireAuth,
      mutationSecurity,
      requirePermission("users.manage"),
      options.adminUserController.revokeInvitation,
    );
    router.post(
      "/users/invitations/:id/resend",
      options.requireAuth,
      mutationSecurity,
      requirePermission("users.invite"),
      options.adminUserController.resendInvitation,
    );
    router.patch(
      "/users/:id/status",
      options.requireAuth,
      mutationSecurity,
      requirePermission("users.manage"),
      options.adminUserController.updateStatus,
    );
    router.patch(
      "/users/:id/role",
      options.requireAuth,
      mutationSecurity,
      requirePermission("users.manage"),
      options.adminUserController.updateRole,
    );
  }

  if (options.adminPaymentController) {
    router.get(
      "/payments",
      options.requireAuth,
      requirePermission("payments.read"),
      options.adminPaymentController.listPayments,
    );
    router.get(
      "/payments/:reference",
      options.requireAuth,
      requirePermission("payments.read"),
      options.adminPaymentController.getPayment,
    );
  }

  return router;
}
