import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { useAuth } from "@/hooks/useAuth";

export function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!admin) return null;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-bone text-mineral">
      <a
        href="#admin-main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 bg-lime px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-mineral transition-transform focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to content
      </a>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <AdminSidebar
          admin={admin}
          isLoggingOut={isLoggingOut}
          onLogout={() => void handleLogout()}
        />
      </aside>
      <div className="min-h-screen lg:pl-72">
        <AdminTopbar
          admin={admin}
          isLoggingOut={isLoggingOut}
          onLogout={() => void handleLogout()}
        />
        <main
          id="admin-main"
          tabIndex={-1}
          className="px-4 py-8 outline-none sm:px-6 lg:px-10 lg:py-10"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
