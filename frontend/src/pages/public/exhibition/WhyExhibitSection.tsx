import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Eye, Network, Cpu, TrendingUp, Handshake } from "lucide-react";

const valuePillars = [
  {
    icon: Eye,
    title: "Brand Visibility",
    tagline: "Premier Regional Positioning",
    description:
      "Position your organisation at the center of West Africa's industrial dialogue, featured prominently across event marketing, conference proceedings, and media channels.",
  },
  {
    icon: Network,
    title: "Industry Connections",
    tagline: "Direct Access to Decision-Makers",
    description:
      "Engage directly with asset owners, operators, EPC contractors, maintenance directors, and regulatory authorities seeking certified solutions for critical infrastructure.",
  },
  {
    icon: Cpu,
    title: "Technology Showcase",
    tagline: "Live Operational Demonstrations",
    description:
      "Present physical hardware, robotics, autonomous inspection tools, digital twins, and OT cybersecurity platforms in active operational application contexts.",
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    tagline: "Commercial Opportunity Generation",
    description:
      "Connect with enterprise procurement teams, asset integrity managers, and engineering heads planning active capex and maintenance budgets.",
  },
  {
    icon: Handshake,
    title: "Strategic Networking",
    tagline: "Executive Engagements",
    description:
      "Participate in dedicated networking breakfasts, plenary sessions, and specialized roundtables with industry authorities shaping Africa's energy and infrastructure landscape.",
  },
];

export function WhyExhibitSection() {
  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            Why Exhibit
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
            Exhibiting at AIAIAC Africa puts your engineering capability, products, and technical
            services directly where major infrastructure decisions are evaluated and executed.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valuePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection
                key={pillar.title}
                delay={index * 0.05}
                className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-7 shadow-xs"
              >
                <div>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-wider text-[#2D5443]">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-bold uppercase tracking-tight text-[#102C20]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#58675F]">
                    {pillar.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
