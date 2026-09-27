import { Clock } from "lucide-react";
import type { AdminRecentActivity } from "@/services/admin/adminOverviewService";

export function RecentActivitySection({ items }: { items: AdminRecentActivity[] }) {
  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs"
      aria-labelledby="recent-activity-heading"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            <Clock className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="recent-activity-heading" className="font-sans text-sm font-bold text-slate-900">
              Recent Operational Activity
            </h2>
            <p className="text-[11px] text-slate-500">
              Audit log of recent submissions and workflow changes
            </p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {items.length ? (
        <ol className="divide-y divide-slate-100">
          {items.map((item) => (
            <li
              className="grid gap-1 py-3 text-xs sm:grid-cols-[1fr_auto] sm:gap-4 sm:items-center hover:bg-slate-50/50 px-2 rounded-md transition-colors"
              key={`${item.type}-${item.occurredAt}`}
            >
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                <p className="font-medium text-slate-800">{item.summary}</p>
              </div>
              <time className="text-[11px] text-slate-400 font-mono" dateTime={item.occurredAt}>
                {new Date(item.occurredAt).toLocaleString("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </time>
            </li>
          ))}
        </ol>
      ) : (
        <p className="py-6 text-center text-xs text-slate-500">
          No recorded operational activity yet.
        </p>
      )}
    </section>
  );
}
