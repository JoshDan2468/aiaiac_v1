export type AdminRole =
  "SUPER_ADMIN" | "ADMIN" | "FINANCE" | "REGISTRATION_MANAGER" | "COMMUNICATIONS";

export type Permission =
  | "users.read"
  | "users.invite"
  | "users.manage"
  | "delegates.read"
  | "delegates.manage"
  | "registrations.read"
  | "registrations.manage"
  | "payments.read"
  | "payments.manage"
  | "student_verifications.read"
  | "student_verifications.review"
  | "sponsors.read"
  | "sponsors.manage"
  | "communications.read"
  | "communications.send"
  | "reports.export"
  | "audit.read"
  | "settings.manage";

export interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
}

export interface AuthAdminResponse {
  success: true;
  message: string;
  data: {
    admin: AdminProfile;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthActionResult {
  ok: boolean;
  message?: string;
}
