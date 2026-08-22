export type AdminRole = "ADMIN" | "SUPER_ADMIN";

export interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
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
