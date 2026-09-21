import {
  BadgeCheck,
  CircleDollarSign,
  FileCheck2,
  Inbox,
  TicketCheck,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import type { AdminOverview } from "@/services/admin/adminOverviewService";

interface DashboardMetric {
  label: string;
  icon: LucideIcon;
  subtext: string;
  value: string | number;
}

function formatRevenue(amountMinor: number, currency: "NGN" | "USD") {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountMinor / 100);
}

export function SummarySection({
  overview,
  state,
  onRetry,
}: {
  overview: AdminOverview | null;
  state: "loading" | "ready" | "error";
  onRetry: () => Promise<void>;
}) {
  const metrics = overview?.metrics;
  const unavailableValue = state === "loading" ? "…" : "—";
  const dashboardMetrics: DashboardMetric[] = [
    {
      label: "Total Registrations",
      icon: UsersRound,
      subtext: "Live delegate registrations",
      value: metrics?.totalRegistrations ?? unavailableValue,
    },
    {
      label: "Paid Registrations",
      icon: BadgeCheck,
      subtext: "Confirmed via Paystack",
      value: metrics?.paidRegistrations ?? unavailableValue,
    },
    {
      label: "Pending Payments",
      icon: CircleDollarSign,
      subtext: "Registrations awaiting payment",
      value: metrics?.pendingPayments ?? unavailableValue,
    },
    {
      label: "Confirmed NGN Revenue",
      icon: WalletCards,
      subtext: "Paid NGN transactions only",
      value: metrics ? formatRevenue(metrics.confirmedRevenue.NGN, "NGN") : unavailableValue,
    },
    {
      label: "Confirmed USD Revenue",
      icon: WalletCards,
      subtext: "Paid USD transactions only",
      value: metrics ? formatRevenue(metrics.confirmedRevenue.USD, "USD") : unavailableValue,
    },
    {
      label: "Sponsor Enquiries",
      icon: Inbox,
      subtext: "Future module",
      value: metrics?.sponsorEnquiries ?? unavailableValue,
    },
    {
      label: "Exhibitor Enquiries",
      icon: TicketCheck,
      subtext: "Future module",
      value: metrics?.exhibitorEnquiries ?? unavailableValue,
    },
    {
      label: "Abstract Submissions",
      icon: FileCheck2,
      subtext: "Future module",
      value: metrics?.abstractSubmissions ?? unavailableValue,
    },
  ];
  return (
    <section className="py-6" aria-labelledby="summary-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-forest">
            Metrics & Insights
          </p>
          <h2 id="summary-heading" className="mt-1 font-display text-xl font-bold text-slate-900">
            Conference Summary
          </h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          Real-Time Counters
        </span>
      </div>

      {state === "error" ? (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-semibold text-amber-900">
            Live overview metrics are temporarily unavailable.
          </p>
          <button
            className="text-xs font-bold text-forest hover:underline"
            type="button"
            onClick={() => void onRetry()}
          >
            Retry
          </button>
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <AdminMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            subtext={metric.subtext}
          />
        ))}
      </div>
    </section>
  );
}
