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
  return (
    <div className="on-navy flex h-full flex-col bg-mineral text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <img
          src="/brand/aiaiac-logo-light.png"
          alt="AIAIAC"
          className="h-9 w-auto max-w-[11rem] object-contain object-left"
        />
        <p className="mt-4 border-l-2 border-lime pl-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/55">
          Administration
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Admin navigation">
        {adminNavigation.map((group) => {
          const items = group.items.filter(
            (item) => !item.roles || item.roles.includes(admin.role),
          );
          if (items.length === 0) return null;

          return (
            <div key={group.label} className="mb-6">
              <p className="px-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40">
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
                              "relative flex min-h-11 items-center gap-3 px-3 text-sm font-medium text-white/72 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
                              isActive &&
                                "bg-white/7 text-white before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-lime",
                            )
                          }
                        >
                          <Icon className="size-[1.1rem]" aria-hidden="true" />
                          <span>{item.label}</span>
                        </NavLink>
                      ) : (
                        <div
                          className="flex min-h-10 cursor-not-allowed items-center gap-3 px-3 text-sm text-white/35"
                          aria-disabled="true"
                        >
                          <Icon className="size-[1.05rem]" aria-hidden="true" />
                          <span className="min-w-0 flex-1">{item.label}</span>
                          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-lime/60">
                            Later
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

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <span className="flex size-9 shrink-0 items-center justify-center border border-white/15 bg-white/8 text-xs font-bold text-lime">
            {getAdminInitials(admin.fullName)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{admin.fullName}</p>
            <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/45">
              {formatAdminRole(admin.role)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="mt-2 flex min-h-10 w-full items-center gap-3 px-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime disabled:cursor-wait disabled:opacity-50"
        >
          <LogOut className="size-4" aria-hidden="true" />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
