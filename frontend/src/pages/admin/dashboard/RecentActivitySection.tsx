import { Activity } from "lucide-react";
import type { AdminRecentActivity } from "@/services/admin/adminOverviewService";

export function RecentActivitySection({ items }: { items: AdminRecentActivity[] }) {
  return (
    <section
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7"
      aria-labelledby="recent-activity-heading"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-mineral text-lime">
          <Activity className="size-4" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-forest">
            Operational trail
          </p>
          <h2
            id="recent-activity-heading"
            className="font-display text-xl font-bold text-slate-900"
          >
            Recent Activity
          </h2>
        </div>
      </div>
      {items.length ? (
        <ol className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
          {items.map((item) => (
            <li
              className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:gap-4"
              key={`${item.type}-${item.occurredAt}`}
            >
              <p className="text-xs font-semibold text-slate-800">{item.summary}</p>
              <time className="text-xs text-slate-400" dateTime={item.occurredAt}>
                {new Date(item.occurredAt).toLocaleString()}
              </time>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-5 text-xs text-slate-500">No recorded operational activity yet.</p>
      )}
    </section>
  );
}
