import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export function OverviewSection({ firstName }: { firstName: string }) {
  return (
    <AdminPageHeader
      eyebrow="Operations Overview"
      title={`Welcome back, ${firstName}`}
      description="Your administration workspace is active. Manage registrations, monitor live system status, and administer staff access."
      actions={
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/80 bg-white px-3.5 py-2 shadow-xs">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <div className="text-left">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-slate-400">
              Data Pipeline
            </p>
            <p className="text-xs font-bold text-slate-800">Operational & Connected</p>
          </div>
        </div>
      }
    />
  );
}
