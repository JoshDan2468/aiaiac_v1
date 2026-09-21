import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Eye, Users, Presentation, Building2, Megaphone } from "lucide-react";

const opportunities = [
  {
    icon: Eye,
    title: "Brand Visibility",
    description:
      "Prominent placement across mainstage graphics, digital programmes, delegate materials, and official event publications.",
  },
  {
    icon: Users,
    title: "Industry Engagement",
    description:
      "Direct engagement with facility managers, chief engineers, and operations heads from across African energy sectors.",
  },
  {
    icon: Presentation,
    title: "Conference Participation",
    description:
      "Speaking slots and panel contributions delivering case studies and thought leadership directly to conference delegates.",
  },
  {
    icon: Building2,
    title: "Exhibition Visibility",
    description:
      "Prime exhibition booth positioning in the main hall to showcase physical solutions, robotics, and software platforms.",
  },
  {
    icon: Megaphone,
    title: "Professional Audience",
    description:
      "Access to a targeted delegation of engineering specialists, asset integrity authorities, and cybersecurity professionals.",
  },
];

export function PartnershipValueSection() {
  return (
    <section className="bg-[#F5F1E7] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            Sponsorship Opportunities
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5D6D64] sm:text-lg">
            AIAIAC Africa sponsorship connects your organisation with operational leaders, senior
            engineers, and technical authorities shaping regional asset infrastructure.
          </p>
        </AnimatedSection>

        {/* Editorial grid: 3-column layout without cards, borders or background tiles */}
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {opportunities.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={index * 0.04}>
                <div className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-[#173D2D]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#102C20] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#5D6D64]">{item.description}</p>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
