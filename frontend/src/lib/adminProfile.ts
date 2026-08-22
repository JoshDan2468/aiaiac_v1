import type { AdminRole } from "@/types/auth";

export function formatAdminRole(role: AdminRole): string {
  return role === "SUPER_ADMIN" ? "Super Admin" : "Admin";
}

export function getAdminInitials(fullName: string): string {
  const initials = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "AD";
}
