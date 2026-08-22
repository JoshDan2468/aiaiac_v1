import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "@/context/authContextValue";
import { getCurrentAdmin, loginAdmin, logoutAdmin } from "@/services/auth/authService";
import type { AdminProfile, LoginCredentials } from "@/types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCurrentAdmin = useCallback(async () => {
    setIsLoading(true);
    const currentAdmin = await getCurrentAdmin();
    setAdmin(currentAdmin);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refreshCurrentAdmin();
  }, [refreshCurrentAdmin]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await loginAdmin(credentials);
    if (result.ok && result.admin) setAdmin(result.admin);
    return { ok: result.ok, ...(result.message ? { message: result.message } : {}) };
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } finally {
      setAdmin(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin,
      isAuthenticated: admin !== null,
      isLoading,
      login,
      logout,
      refreshCurrentAdmin,
    }),
    [admin, isLoading, login, logout, refreshCurrentAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
