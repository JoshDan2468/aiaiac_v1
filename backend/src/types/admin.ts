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
  "student_verifications.read",
  "student_verifications.review",
  "sponsors.read",
  "sponsors.manage",
  "exhibitors.read",
  "exhibitors.manage",
  "abstracts.read",
  "abstracts.review",
  "enquiries.read",
  "enquiries.manage",
  "communications.read",
  "communications.create",
  "communications.send",
  "communications.manage",
  "reports.read",
  "reports.export",
  "reports.financial",
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
  "ADMIN_LOGIN",
  "ADMIN_LOGOUT",
  "ADMIN_SESSION_EXPIRED",
  "CAMPAIGN_CREATED",
  "CAMPAIGN_UPDATED",
  "CAMPAIGN_TEST_SENT",
  "CAMPAIGN_CONFIRMED",
  "CAMPAIGN_SEND_STARTED",
  "CAMPAIGN_SEND_COMPLETED",
  "CAMPAIGN_RETRIED",
] as const;

export type AuditAction = (typeof auditActions)[number];
