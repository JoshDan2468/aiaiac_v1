import { cn } from "@/lib/utils";

export type BadgeTone = "success" | "warning" | "danger" | "neutral" | "info";

interface AdminStatusBadgeProps {
  status: string;
  tone?: BadgeTone;
  className?: string;
}

function resolveTone(status: string): BadgeTone {
  const normalized = status.toUpperCase().replace(/\s+/g, "_");
  switch (normalized) {
    case "ACTIVE":
    case "ACCEPTED":
    case "APPROVED":
    case "PAID":
    case "VERIFIED":
    case "SENT":
      return "success";

    case "PENDING":
    case "UNDER_REVIEW":
    case "SUBMITTED":
      return "warning";

    case "DISABLED":
    case "REVOKED":
    case "REJECTED":
    case "FAILED":
    case "EXPIRED":
    case "CANCELLED":
      return "danger";

    case "NOT_SENT":
    case "REFUNDED":
      return "neutral";

    default:
      return "info";
  }
}

const toneStyles: Record<BadgeTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-800",
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  info: "border-sky-200 bg-sky-50 text-sky-800",
};

export function AdminStatusBadge({ status, tone, className }: AdminStatusBadgeProps) {
  const activeTone = tone ?? resolveTone(status);
  const formattedLabel = status.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] transition-colors",
        toneStyles[activeTone],
        className,
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", {
          "bg-emerald-500": activeTone === "success",
          "bg-amber-500": activeTone === "warning",
          "bg-rose-500": activeTone === "danger",
          "bg-slate-400": activeTone === "neutral",
          "bg-sky-500": activeTone === "info",
        })}
        aria-hidden="true"
      />
      {formattedLabel}
    </span>
  );
}
