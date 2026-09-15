import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { adminNavigation } from "@/data/adminNavigation";
import { formatAdminRole, getAdminInitials } from "@/lib/adminProfile";
import type { AdminProfile } from "@/types/auth";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  admin: AdminProfile;
  isLoggingOut: boolean;
  onLogout: () => void;
  onNavigate?: () => void;
}

export function AdminSidebar({ admin, isLoggingOut, onLogout, onNavigate }: AdminSidebarProps) {
  const initials = getAdminInitials(admin.fullName);

  return (
    <div className="flex h-full flex-col bg-mineral text-white select-none">
      {/* Brand Header */}
      <div className="border-b border-white/10 px-6 py-5">
        <NavLink
          to="/admin/dashboard"
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <img
            src="/brand/aiaiac-logo-light.png"
            alt="AIAIAC 2027"
            className="h-8 w-auto max-w-[10.5rem] object-contain object-left"
          />
        </NavLink>
        <div className="mt-3 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-lime animate-pulse" />
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white/60">
            Admin Workspace
          </p>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6" aria-label="Admin navigation">
        {adminNavigation.map((group) => {
          const items = group.items.filter(
            (item) => !item.permission || admin.permissions.includes(item.permission),
          );
          if (items.length === 0) return null;

          return (
            <div key={group.label}>
              <p className="px-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/40">
                {group.label}
              </p>
              <ul className="mt-2 space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <NavLink
                          to={item.href}
                          onClick={onNavigate}
                          className={({ isActive }) =>
                            cn(
                              "group relative flex min-h-10 items-center gap-3 rounded-lg px-3 text-xs font-semibold text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
                              isActive &&
                                "bg-white/10 text-white font-bold before:absolute before:inset-y-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-lime",
                            )
                          }
                        >
                          <Icon
                            className="size-4 shrink-0 text-white/60 group-hover:text-lime transition-colors"
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.label}</span>
                        </NavLink>
                      ) : (
                        <div
                          className="flex min-h-9 cursor-not-allowed items-center gap-3 rounded-lg px-3 text-xs text-white/35"
                          aria-disabled="true"
                        >
                          <Icon className="size-4 shrink-0 opacity-50" aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-lime/70">
                            Soon
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-xs font-bold text-lime shadow-xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">{admin.fullName}</p>
            <p className="mt-0.5 truncate text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/50">
              {formatAdminRole(admin.role)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="mt-2.5 flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-bold text-white/70 transition-colors hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime disabled:cursor-wait disabled:opacity-50"
        >
          <LogOut className="size-3.5" aria-hidden="true" />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
