import { PanelsTopLeft, ShieldCheck } from "lucide-react";

export function SystemStatusSection() {
  return (
    <section className="bg-mineral p-6 text-white sm:p-7" aria-labelledby="system-status-heading">
      <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-lime">
        Session check
      </p>
      <h2 id="system-status-heading" className="mt-3 font-display text-xl font-bold text-white">
        System Status
      </h2>
      <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
        <div className="flex items-center justify-between gap-4 py-4">
          <dt className="flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="size-4 text-lime" aria-hidden="true" />
            Authentication
          </dt>
          <dd className="text-xs font-bold uppercase tracking-[0.13em] text-lime">Active</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <dt className="flex items-center gap-2 text-sm text-white/70">
            <PanelsTopLeft className="size-4 text-lime" aria-hidden="true" />
            API session
          </dt>
          <dd className="text-xs font-bold uppercase tracking-[0.13em] text-lime">Verified</dd>
        </div>
      </dl>
    </section>
  );
}
