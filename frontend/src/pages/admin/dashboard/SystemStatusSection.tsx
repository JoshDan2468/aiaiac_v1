import { CheckCircle2, PanelsTopLeft, ShieldCheck } from "lucide-react";

export function SystemStatusSection() {
  return (
    <section
      className="rounded-2xl bg-mineral p-6 text-white shadow-lg sm:p-7"
      aria-labelledby="system-status-heading"
    >
      <div className="flex items-center justify-between">
        <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-lime">
          System Verification
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-lime/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase text-lime">
          <span className="size-1.5 rounded-full bg-lime animate-pulse" />
          Active Session
        </span>
      </div>
      <h2 id="system-status-heading" className="mt-2 font-display text-xl font-bold text-white">
        System Health &amp; Security
      </h2>

      <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
        <div className="flex items-center justify-between py-3.5">
          <dt className="flex items-center gap-2.5 text-xs font-medium text-white/80">
            <ShieldCheck className="size-4 text-lime" aria-hidden="true" />
            Admin RBAC Authorization
          </dt>
          <dd className="flex items-center gap-1.5 text-xs font-bold text-lime">
            <CheckCircle2 className="size-3.5" /> Enforced
          </dd>
        </div>
        <div className="flex items-center justify-between py-3.5">
          <dt className="flex items-center gap-2.5 text-xs font-medium text-white/80">
            <PanelsTopLeft className="size-4 text-lime" aria-hidden="true" />
            Backend API Session
          </dt>
          <dd className="flex items-center gap-1.5 text-xs font-bold text-lime">
            <CheckCircle2 className="size-3.5" /> Verified
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-[0.7rem] leading-relaxed text-white/50">
        All administrative actions are authenticated server-side and recorded in audit logs.
      </p>
    </section>
  );
}
