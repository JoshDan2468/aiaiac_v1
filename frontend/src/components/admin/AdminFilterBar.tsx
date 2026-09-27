import type { ReactNode } from "react";
import { FilterX } from "lucide-react";

interface AdminFilterBarProps {
  children: ReactNode;
  onReset?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  resultCount?: string | number;
  title?: string;
}

export function AdminFilterBar({
  children,
  onReset,
  onSubmit,
  resultCount,
  title = "Filter records",
}: AdminFilterBarProps) {
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
            {title}
          </span>
          {resultCount !== undefined && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {resultCount}{" "}
              {typeof resultCount === "number" ? (resultCount === 1 ? "record" : "records") : ""}
            </span>
          )}
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FilterX className="size-3.5" aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </form>
  );
}

export const adminFilterInputClass =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-normal text-slate-800 shadow-2xs outline-none transition-colors placeholder:text-slate-400 focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F]";
