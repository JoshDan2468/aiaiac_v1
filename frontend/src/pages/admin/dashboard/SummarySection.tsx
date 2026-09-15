import {
  BadgeCheck,
  CircleDollarSign,
  FileCheck2,
  Inbox,
  TicketCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AdminMetricCard } from "@/components/admin/AdminMetricCard";

interface DashboardMetric {
  label: string;
  icon: LucideIcon;
  subtext: string;
}

const dashboardMetrics: DashboardMetric[] = [
  { label: "Total Registrations", icon: UsersRound, subtext: "Live delegate registrations" },
  { label: "Paid Registrations", icon: BadgeCheck, subtext: "Confirmed via Paystack" },
  { label: "Pending Payments", icon: CircleDollarSign, subtext: "Awaiting payment verification" },
  { label: "Sponsor Enquiries", icon: Inbox, subtext: "Corporate partnership requests" },
  { label: "Exhibitor Enquiries", icon: TicketCheck, subtext: "Booth allocation enquiries" },
  { label: "Abstract Submissions", icon: FileCheck2, subtext: "Technical papers submitted" },
];

export function SummarySection() {
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

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardMetrics.map((metric) => (
          <AdminMetricCard
            key={metric.label}
            label={metric.label}
            value="0"
            icon={metric.icon}
            subtext={metric.subtext}
          />
        ))}
      </div>
    </section>
  );
}
