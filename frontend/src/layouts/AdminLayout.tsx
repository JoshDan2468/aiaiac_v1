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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <a
        href="#admin-main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-lg bg-lime px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-mineral shadow-lg transition-transform focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-mineral"
      >
        Skip to content
      </a>

      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 shadow-lg lg:block">
        <AdminSidebar
          admin={admin}
          isLoggingOut={isLoggingOut}
          onLogout={() => void handleLogout()}
        />
      </aside>

      {/* Main Canvas Area */}
      <div className="min-h-screen lg:pl-64">
        <AdminTopbar
          admin={admin}
          isLoggingOut={isLoggingOut}
          onLogout={() => void handleLogout()}
        />
        <main
          id="admin-main"
          tabIndex={-1}
          className="px-4 py-6 outline-none sm:px-6 lg:px-8 lg:py-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
