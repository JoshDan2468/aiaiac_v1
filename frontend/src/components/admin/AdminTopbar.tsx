import { LogOut } from "lucide-react";
import { formatAdminRole, getAdminInitials } from "@/lib/adminProfile";
import type { AdminProfile } from "@/types/auth";
import { AdminMobileNav } from "./AdminMobileNav";

interface AdminTopbarProps {
  admin: AdminProfile;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export function AdminTopbar({ admin, isLoggingOut, onLogout }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-border bg-white px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-4">
        <AdminMobileNav admin={admin} isLoggingOut={isLoggingOut} onLogout={onLogout} />
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Admin workspace
          </p>
          <p className="mt-1 font-display text-lg font-bold text-mineral">Overview</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="max-w-48 truncate text-sm font-semibold text-mineral">{admin.fullName}</p>
          <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {formatAdminRole(admin.role)}
          </p>
        </div>
        <span className="flex size-10 items-center justify-center bg-mineral text-xs font-bold text-lime">
          {getAdminInitials(admin.fullName)}
        </span>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="hidden min-h-10 items-center gap-2 border-l border-border pl-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-mineral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-50 md:flex"
        >
          <LogOut className="size-4" aria-hidden="true" />
          {isLoggingOut ? "Signing out" : "Sign out"}
        </button>
      </div>
    </header>
  );
}
