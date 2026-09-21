import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia } from "@/data/about";

const audienceCategories = [
  {
    title: "Asset Owners & Operators",
    description:
      "Operating companies and facility leaders managing industrial plants, pipelines, offshore installations, and processing facilities.",
  },
  {
    title: "Government & Regulators",
    description:
      "Policy authorities, standard-setting bodies, and regulatory agencies overseeing safety, compliance, and industrial standards.",
  },
  {
    title: "Oil, Gas & Energy Companies",
    description:
      "Upstream, midstream, downstream, and power generation enterprises driving regional energy production and infrastructure.",
  },
  {
    title: "Maintenance & Reliability Professionals",
    description:
      "Engineers, inspectors, and reliability specialists responsible for facility uptime, structural integrity, and asset health.",
  },
  {
    title: "AI & Technology Companies",
    description:
      "Enterprise software developers, industrial AI providers, and digital twin innovators delivering operational intelligence.",
  },
  {
    title: "Engineering & Maintenance Providers",
    description:
      "EPC contractors, inspection service companies, and maintenance providers executing plant turnarounds and integrity programs.",
  },
  {
    title: "Cybersecurity & Automation Specialists",
    description:
      "OT security engineers, SCADA architects, and control systems professionals protecting mission-critical networks.",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Who Attends
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B7C3BA] sm:text-lg">
            AIAIAC Africa convenes technical decision-makers, engineering authorities, and executive
            stakeholders from across the industrial value chain.
          </p>
        </AnimatedSection>

        {/* Audience Groups in strong typography columns: 3 col desktop, 2 col tablet, 1 col mobile. NO cards, NO boxes */}
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-12">
          {audienceCategories.map((group, index) => (
            <AnimatedSection key={group.title} delay={index * 0.03} className="space-y-2">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#CFEA3B] sm:text-xl">
                {group.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#B7C3BA]">{group.description}</p>
            </AnimatedSection>
          ))}
        </div>

        {/* Wide Approved Conference Group Photograph Underneath */}
        <AnimatedSection delay={0.12} className="mt-16">
          <div className="overflow-hidden rounded-lg bg-[#0B2A1D]">
            <img
              src={aboutMedia.audience.src}
              alt={aboutMedia.audience.alt}
              width={aboutMedia.audience.width}
              height={aboutMedia.audience.height}
              loading="lazy"
              decoding="async"
              className="aspect-16/9 w-full object-cover sm:aspect-21/9"
              style={{ objectPosition: aboutMedia.audience.objectPosition }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
