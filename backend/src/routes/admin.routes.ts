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
type AdminOverviewController = ReturnType<
  typeof import("../controllers/adminOverview.controller").createAdminOverviewController
>;
type StudentVerificationController = ReturnType<
  typeof import("../controllers/studentVerification.controller").createStudentVerificationController
>;

interface AdminRouterOptions {
  readonly requireAuth: RequestHandler;
  readonly mutationSecurity?: RequestHandler;
  readonly delegateController?: DelegateController;
  readonly adminUserController?: AdminUserController;
  readonly adminPaymentController?: AdminPaymentController;
  readonly adminOverviewController?: AdminOverviewController;
  readonly studentVerificationController?: StudentVerificationController;
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

  if (options.adminOverviewController) {
    router.get(
      "/overview",
      options.requireAuth,
      requirePermission("registrations.read"),
      options.adminOverviewController.getOverview,
    );
  }

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

  if (options.studentVerificationController) {
    router.get(
      "/student-verifications",
      options.requireAuth,
      requirePermission("student_verifications.read"),
      options.studentVerificationController.list,
    );
    router.get(
      "/student-verifications/:reference/evidence/:evidenceId/download",
      options.requireAuth,
      requirePermission("student_verifications.read"),
      options.studentVerificationController.downloadEvidence,
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
    router.post(
      "/payments/:reference/completion/retry",
      options.requireAuth,
      mutationSecurity,
      requirePermission("payments.manage"),
      options.adminPaymentController.retryCompletion,
    );
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
