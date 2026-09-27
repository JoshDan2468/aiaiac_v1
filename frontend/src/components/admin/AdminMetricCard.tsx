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
        "group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-slate-300",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <div className="flex size-8 items-center justify-center rounded-md border border-slate-200/70 bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#05190F] group-hover:text-white group-hover:border-[#05190F]">
            <Icon className="size-4" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-sans text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </span>
          {badge && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {badge}
            </span>
          )}
        </div>
      </div>
      {subtext && <p className="mt-2 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
}
