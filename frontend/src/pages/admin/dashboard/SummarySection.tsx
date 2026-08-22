import {
  BadgeCheck,
  CircleDollarSign,
  FileCheck2,
  Inbox,
  TicketCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

interface DashboardMetric {
  label: string;
  icon: LucideIcon;
}

const dashboardMetrics: DashboardMetric[] = [
  { label: "Total Registrations", icon: UsersRound },
  { label: "Paid Registrations", icon: BadgeCheck },
  { label: "Pending Payments", icon: CircleDollarSign },
  { label: "Sponsor Enquiries", icon: Inbox },
  { label: "Exhibitor Enquiries", icon: TicketCheck },
  { label: "Abstract Submissions", icon: FileCheck2 },
];

export function SummarySection() {
  return (
    <section className="py-8" aria-labelledby="summary-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-forest">
            At a glance
          </p>
          <h2 id="summary-heading" className="mt-2 font-display text-xl font-bold text-mineral">
            Conference summary
          </h2>
        </div>
        <p className="hidden text-xs text-muted-foreground sm:block">Placeholder values only</p>
      </div>

      <div className="mt-5 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 xl:grid-cols-3">
        {dashboardMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="group min-h-40 border-b border-r border-border bg-white p-5 transition-colors hover:bg-background sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-44 text-[0.66rem] font-bold uppercase leading-5 tracking-[0.14em] text-muted-foreground">
                  {metric.label}
                </p>
                <Icon className="size-5 text-forest" aria-hidden="true" />
              </div>
              <p className="mt-7 font-display text-4xl font-bold leading-none text-mineral">0</p>
              <p className="mt-3 text-xs text-muted-foreground">No live data connected</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
