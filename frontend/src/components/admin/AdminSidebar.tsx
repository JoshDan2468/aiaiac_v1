import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { adminNavigation, getAdminHomePath } from "@/data/adminNavigation";
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
    <div className="flex h-full flex-col bg-[#05190F] text-white select-none">
      {/* Brand Header */}
      <div className="border-b border-white/10 px-6 py-5">
        <NavLink
          to={getAdminHomePath(admin.permissions)}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05190F] rounded"
        >
          <img
            src="/brand/aiaiac-logo-light.png"
            alt="AIAIAC 2027"
            className="h-8 w-auto max-w-[10.5rem] object-contain object-left"
          />
        </NavLink>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/50">
            Admin Workspace
          </p>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" aria-label="Admin navigation">
        {adminNavigation.map((group) => {
          const items = group.items.filter(
            (item) => !item.permission || admin.permissions.includes(item.permission),
          );
          if (items.length === 0) return null;

          return (
            <div key={group.label}>
              <p className="px-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/40">
                {group.label}
              </p>
              <ul className="mt-1.5 space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  if (!item.href) return null;

                  return (
                    <li key={item.label}>
                      <NavLink
                        to={item.href}
                        onClick={onNavigate}
                        aria-label={item.ariaLabel}
                        className={({ isActive }) =>
                          cn(
                            "group relative flex min-h-9 items-center gap-2.5 rounded-md px-3 text-xs font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
                            isActive &&
                              "bg-white/10 text-white font-semibold before:absolute before:inset-y-1.5 before:left-0 before:w-1 before:rounded-r-sm before:bg-emerald-400",
                          )
                        }
                      >
                        <Icon
                          className="size-4 shrink-0 text-white/60 group-hover:text-emerald-300 transition-colors"
                          aria-hidden="true"
                        />
                        {item.label === "Reports & Exports" ? (
                          <span className="truncate">
                            <span>Reports</span>
                            <span className="text-white/50 text-[11px]"> &amp; Exports</span>
                          </span>
                        ) : (
                          <span className="truncate">{item.label}</span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-white/10 p-3.5">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/10 border border-white/15 text-xs font-bold text-white shadow-xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">{admin.fullName}</p>
            <p className="mt-0.5 truncate text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/50">
              {formatAdminRole(admin.role)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="mt-2 flex min-h-8 w-full items-center justify-center gap-2 rounded-md border border-white/10 px-3 text-xs font-medium text-white/70 transition-colors hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-wait disabled:opacity-50"
        >
          <LogOut className="size-3.5" aria-hidden="true" />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
