import type { AdminProfile } from "@/types/auth";
import { AdminMobileNav } from "./AdminMobileNav";
import { AdminProfileMenu } from "./AdminProfileMenu";

interface AdminTopbarProps {
  admin: AdminProfile;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export function AdminTopbar({ admin, isLoggingOut, onLogout }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex items-center gap-4">
        <AdminMobileNav admin={admin} isLoggingOut={isLoggingOut} onLogout={onLogout} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">
              AIAIAC 2027
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-emerald-800 border border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Live Portal
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <AdminProfileMenu admin={admin} isLoggingOut={isLoggingOut} onLogout={onLogout} />
      </div>
    </header>
  );
}
