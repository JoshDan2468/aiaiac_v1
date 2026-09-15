/**
 * Admin access contracts
 *
 * Central TypeScript vocabulary for staff roles, permissions, invitations,
 * users, and security audit events. Role-to-permission policy lives in config.
 */

export const adminRoles = [
  "SUPER_ADMIN",
  "ADMIN",
  "FINANCE",
  "REGISTRATION_MANAGER",
  "COMMUNICATIONS",
] as const;

export type AdminRole = (typeof adminRoles)[number];

export const permissions = [
  "users.read",
  "users.invite",
  "users.manage",
  "delegates.read",
  "delegates.manage",
  "registrations.read",
  "registrations.manage",
  "payments.read",
  "payments.manage",
  "sponsors.read",
  "sponsors.manage",
  "communications.read",
  "communications.send",
  "reports.export",
  "audit.read",
  "settings.manage",
] as const;

export type Permission = (typeof permissions)[number];

export interface SafeAdmin {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: AdminRole;
  readonly permissions: readonly Permission[];
}

export interface AdminRecord {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: AdminRole;
  readonly passwordHash: string;
  readonly isActive: boolean;
  readonly lastLoginAt: Date | null;
}

export interface AdminUser {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: AdminRole;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly lastLoginAt: Date | null;
}

export const assignableAdminRoles = [
  "ADMIN",
  "FINANCE",
  "REGISTRATION_MANAGER",
  "COMMUNICATIONS",
] as const satisfies readonly AdminRole[];

export type AssignableAdminRole = (typeof assignableAdminRoles)[number];

export const adminInvitationStatuses = [
  "PENDING",
  "ACCEPTED",
  "EXPIRED",
  "REVOKED",
] as const;

export type AdminInvitationStatus = (typeof adminInvitationStatuses)[number];

export interface AdminInvitation {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: AssignableAdminRole;
  readonly invitedByAdminId: string;
  readonly status: AdminInvitationStatus;
  readonly expiresAt: Date;
  readonly acceptedAt: Date | null;
  readonly revokedAt: Date | null;
  readonly emailSentAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface AdminInvitationRecord extends AdminInvitation {
  readonly tokenHash: string;
}

export const auditActions = [
  "USER_INVITED",
  "INVITATION_RESENT",
  "INVITATION_REVOKED",
  "INVITATION_ACCEPTED",
  "USER_ROLE_CHANGED",
  "USER_DISABLED",
  "USER_ENABLED",
] as const;

export type AuditAction = (typeof auditActions)[number];
