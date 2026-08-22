export const adminRoles = ["SUPER_ADMIN", "ADMIN"] as const;

export type AdminRole = (typeof adminRoles)[number];

export interface SafeAdmin {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: AdminRole;
}

export interface AdminRecord extends SafeAdmin {
  readonly passwordHash: string;
  readonly isActive: boolean;
  readonly lastLoginAt: Date | null;
}
