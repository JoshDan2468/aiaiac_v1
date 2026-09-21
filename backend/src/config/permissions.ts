/**
 * Admin permission policy
 *
 * This is the single backend source of truth for role capabilities. Routes
 * enforce these permissions; frontend visibility is only a convenience.
 */

import type { AdminRole, Permission } from "../types/admin";
import { permissions } from "../types/admin";

export const rolePermissions = {
  SUPER_ADMIN: permissions,
  ADMIN: [
    "delegates.read",
    "delegates.manage",
    "registrations.read",
    "registrations.manage",
    "sponsors.read",
    "sponsors.manage",
    "reports.export",
  ],
  FINANCE: [
    "payments.read",
    "payments.manage",
    "registrations.read",
    "reports.export",
  ],
  REGISTRATION_MANAGER: [
    "delegates.read",
    "delegates.manage",
    "registrations.read",
    "registrations.manage",
    "student_verifications.read",
    "student_verifications.review",
    "sponsors.read",
    "sponsors.manage",
    "reports.export",
  ],
  COMMUNICATIONS: ["communications.read", "communications.send"],
} as const satisfies Record<AdminRole, readonly Permission[]>;

export function getPermissionsForRole(role: AdminRole): readonly Permission[] {
  return rolePermissions[role];
}

export function roleHasPermission(
  role: AdminRole,
  permission: Permission,
): boolean {
  return (rolePermissions[role] as readonly Permission[]).includes(permission);
}
