import type { ReactNode } from "react";
import { CircleAlert, Inbox, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminTableProps {
  children: ReactNode;
  className?: string;
  minWidth?: string;
}

export function AdminTable({ children, className, minWidth = "min-w-[50rem]" }: AdminTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-xs",
        className,
      )}
    >
      <table className={cn("w-full text-left border-collapse", minWidth)}>{children}</table>
    </div>
  );
}

export function AdminTableHeader({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {children}
    </thead>
  );
}

export function AdminTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-slate-100 text-sm text-slate-700">{children}</tbody>;
}

export function AdminTableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("transition-colors hover:bg-slate-50/70 group", className)}>{children}</tr>
  );
}

export function AdminTableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-3.5 align-middle", className)}>{children}</td>;
}

export function AdminTableHeaderCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th scope="col" className={cn("px-4 py-3 font-semibold", className)}>
      {children}
    </th>
  );
}

export function AdminTableLoadingState({ message = "Loading data…" }: { message?: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 bg-white py-12 text-slate-500">
      <LoaderCircle className="size-5 animate-spin text-[#05190F]" />
      <p className="text-xs font-medium text-slate-600">{message}</p>
    </div>
  );
}

export function AdminTableErrorState({
  message = "Failed to load data.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center bg-white py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <CircleAlert className="size-5" />
      </div>
      <p className="mt-3 font-sans text-sm font-semibold text-slate-900">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function AdminTableEmptyState({
  title = "No records found",
  description = "There are no entries matching your query.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center bg-white py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Inbox className="size-5" />
      </div>
      <p className="mt-3 font-sans text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p>
      {action && <div className="mt-3.5">{action}</div>}
    </div>
  );
}
