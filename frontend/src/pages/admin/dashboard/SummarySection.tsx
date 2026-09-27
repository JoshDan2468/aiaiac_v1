import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  FileCheck2,
  Inbox,
  Store,
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

  const registrationMetrics: DashboardMetric[] = [
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
  ];

  const commercialMetrics: DashboardMetric[] = [
    {
      label: "Sponsor Applications",
      icon: Building2,
      subtext: "Submitted commercial applications",
      value: metrics?.sponsorApplications ?? unavailableValue,
    },
    {
      label: "Confirmed Sponsors",
      icon: BadgeCheck,
      subtext: "Business decision, not payment",
      value: metrics?.confirmedSponsors ?? unavailableValue,
    },
    {
      label: "Exhibitor Applications",
      icon: Store,
      subtext: "Submitted commercial applications",
      value: metrics?.exhibitorApplications ?? unavailableValue,
    },
    {
      label: "Confirmed Exhibitors",
      icon: BadgeCheck,
      subtext: "Business decision, not payment",
      value: metrics?.confirmedExhibitors ?? unavailableValue,
    },
  ];

  const programmeAndOperationsMetrics: DashboardMetric[] = [
    {
      label: "Abstract Submissions",
      icon: FileCheck2,
      subtext: "Submitted abstracts",
      value: metrics?.abstractSubmissions ?? unavailableValue,
    },
    {
      label: "Abstracts Pending Review",
      icon: FileCheck2,
      subtext: "Submitted or under review",
      value: metrics?.abstractPendingReview ?? unavailableValue,
    },
    {
      label: "Accepted Abstracts",
      icon: BadgeCheck,
      subtext: "Decision only, not payment",
      value: metrics?.acceptedAbstracts ?? unavailableValue,
    },
    {
      label: "Open Enquiries",
      icon: Inbox,
      subtext: "Open or in progress",
      value: metrics?.openEnquiries ?? unavailableValue,
    },
  ];

  return (
    <section className="space-y-6" aria-labelledby="summary-heading">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Metrics &amp; Insights
          </p>
          <h2 id="summary-heading" className="mt-0.5 font-sans text-lg font-bold text-slate-900">
            Conference Summary
          </h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
          Live Counters
        </span>
      </div>

      {state === "error" ? (
        <div className="flex items-center justify-between gap-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-medium text-amber-900">
            Live overview metrics are temporarily unavailable.
          </p>
          <button
            className="text-xs font-semibold text-[#05190F] hover:underline"
            type="button"
            onClick={() => void onRetry()}
          >
            Retry
          </button>
        </div>
      ) : null}

      {/* Primary Registration & Financial Metrics */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Registration &amp; Financial Overview
        </h3>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {registrationMetrics.map((metric) => (
            <AdminMetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              subtext={metric.subtext}
            />
          ))}
        </div>
      </div>

      {/* Commercial Application Pipeline */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Commercial Application Pipeline
        </h3>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {commercialMetrics.map((metric) => (
            <AdminMetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              subtext={metric.subtext}
            />
          ))}
        </div>
      </div>

      {/* Programme & Operational Flow */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Programme &amp; Operations
        </h3>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {programmeAndOperationsMetrics.map((metric) => (
            <AdminMetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              subtext={metric.subtext}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
