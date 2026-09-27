import { useLocation } from "react-router-dom";
import type { AdminProfile } from "@/types/auth";
import { AdminMobileNav } from "./AdminMobileNav";
import { AdminProfileMenu } from "./AdminProfileMenu";

interface AdminTopbarProps {
  admin: AdminProfile;
  isLoggingOut: boolean;
  onLogout: () => void;
}

function getModuleInfo(pathname: string): { section: string; title: string } {
  if (pathname.startsWith("/admin/delegates"))
    return { section: "Registration", title: "Delegates" };
  if (pathname.startsWith("/admin/student-verifications"))
    return { section: "Registration", title: "Student Verification" };
  if (pathname.startsWith("/admin/sponsor-applications"))
    return { section: "Commercial", title: "Sponsors" };
  if (pathname.startsWith("/admin/exhibitor-applications"))
    return { section: "Commercial", title: "Exhibitors" };
  if (pathname.startsWith("/admin/abstract-submissions"))
    return { section: "Programme", title: "Abstracts" };
  if (pathname.startsWith("/admin/enquiries")) return { section: "Operations", title: "Enquiries" };
  if (pathname.startsWith("/admin/payments")) return { section: "Finance", title: "Payments" };
  if (pathname.startsWith("/admin/reports"))
    return { section: "Reporting", title: "Reports & Exports" };
  if (pathname.startsWith("/admin/users/invitations"))
    return { section: "Administration", title: "Invitations" };
  if (pathname.startsWith("/admin/users")) return { section: "Administration", title: "Users" };

  return { section: "Overview", title: "Dashboard" };
}

export function AdminTopbar({ admin, isLoggingOut, onLogout }: AdminTopbarProps) {
  const location = useLocation();
  const moduleInfo = getModuleInfo(location.pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <AdminMobileNav admin={admin} isLoggingOut={isLoggingOut} onLogout={onLogout} />
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
            {moduleInfo.section}
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">{moduleInfo.title}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <AdminProfileMenu admin={admin} isLoggingOut={isLoggingOut} onLogout={onLogout} />
      </div>
    </header>
  );
}
