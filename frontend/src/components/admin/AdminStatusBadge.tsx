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
    case "CONFIRMED":
    case "RESOLVED":
      return "success";

    case "PENDING":
    case "UNDER_REVIEW":
    case "SUBMITTED":
    case "IN_PROGRESS":
      return "warning";

    case "DISABLED":
    case "REVOKED":
    case "REJECTED":
    case "FAILED":
    case "EXPIRED":
    case "CANCELLED":
    case "CLOSED":
      return "danger";

    case "NOT_SENT":
    case "NOT_SUBMITTED":
    case "REFUNDED":
      return "neutral";

    case "MORE_INFORMATION_REQUIRED":
    case "REVISION_REQUIRED":
    case "OPEN":
      return "info";

    default:
      return "neutral";
  }
}

const toneStyles: Record<BadgeTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-800",
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  info: "border-sky-200 bg-sky-50 text-sky-800",
};

const dotStyles: Record<BadgeTone, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
  neutral: "bg-slate-400",
  info: "bg-sky-500",
};

export function AdminStatusBadge({ status, tone, className }: AdminStatusBadgeProps) {
  const activeTone = tone ?? resolveTone(status);
  const formattedLabel = status.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize tracking-normal",
        toneStyles[activeTone],
        className,
      )}
    >
      <span
        className={cn("size-1.5 rounded-full shrink-0", dotStyles[activeTone])}
        aria-hidden="true"
      />
      {formattedLabel.toLowerCase()}
    </span>
  );
}
