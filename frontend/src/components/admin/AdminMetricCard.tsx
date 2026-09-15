import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminMetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  badge?: string;
  className?: string;
}

export function AdminMetricCard({
  label,
  value,
  icon: Icon,
  subtext,
  badge,
  className,
}: AdminMetricCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-lg border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-150 hover:border-slate-300 hover:shadow-md",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-slate-500">
            {label}
          </p>
          <div className="flex size-8 items-center justify-center rounded-md bg-slate-100 text-mineral transition-colors group-hover:bg-mineral group-hover:text-lime">
            <Icon className="size-4" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </span>
          {badge && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] font-semibold text-slate-600">
              {badge}
            </span>
          )}
        </div>
      </div>
      {subtext && <p className="mt-3 text-xs font-medium text-slate-400">{subtext}</p>}
    </div>
  );
}
