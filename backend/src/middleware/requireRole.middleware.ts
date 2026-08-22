import type { RequestHandler } from "express";
import type { AdminRole, SafeAdmin } from "../types/admin";
import { createPublicError } from "./error.middleware";

export function requireRole(...allowedRoles: readonly AdminRole[]): RequestHandler {
  return (_request, response, next) => {
    const admin = response.locals.admin as SafeAdmin | undefined;
    if (!admin || !allowedRoles.includes(admin.role)) {
      next(createPublicError(403, "Insufficient permissions"));
      return;
    }
    next();
  };
}
