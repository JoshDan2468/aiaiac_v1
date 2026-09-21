import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia } from "@/data/about";

const whyThemes = [
  {
    title: "Asset Performance and Reliability",
    description:
      "Addressing structural degradation, extending facility lifecycles, and maintaining mechanical integrity across ageing and mission-critical energy assets.",
  },
  {
    title: "Digital Transformation",
    description:
      "Transitioning from reactive maintenance regimes to automated, sensor-guided intelligence, digital twins, and predictive analytics that inform operational decisions.",
  },
  {
    title: "Automation and Operational Efficiency",
    description:
      "Integrating automated inspection robotics, smart instrumentation, and modern control architectures to streamline operations and reduce unplanned downtime.",
  },
  {
    title: "Industrial Cybersecurity",
    description:
      "Protecting SCADA systems, industrial control networks, and operational technology against sophisticated and rapidly evolving digital threats.",
  },
  {
    title: "Technical Knowledge Exchange",
    description:
      "Providing a dedicated technical forum where plant operators, service providers, regulators, and international authorities share proven methodologies and field case studies.",
  },
];

export function WhySection() {
  return (
    <section className="bg-[#FFFFFF] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left Column: One Strong Approved Conference Photograph */}
          <AnimatedSection className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg bg-[#F5F2E9]">
              <img
                src={aboutMedia.technology.src}
                alt={aboutMedia.technology.alt}
                width={aboutMedia.technology.width}
                height={aboutMedia.technology.height}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover sm:aspect-16/11 lg:aspect-4/5"
                style={{ objectPosition: aboutMedia.technology.objectPosition }}
              />
            </div>
          </AnimatedSection>

          {/* Right Column: Heading + Concise Intro + 5 Direct Heading/Paragraph Groups */}
          <AnimatedSection delay={0.08} className="lg:col-span-7">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
              Why AIAIAC Africa 2027
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5D6D64] sm:text-lg">
              Critical infrastructure operators face mounting operational pressures requiring
              collaborative engineering solutions, targeted digital adoption, and cross-sector
              technical standards.
            </p>

            {/* Editorial list: NO rectangular cards, NO borders */}
            <div className="mt-10 space-y-6 sm:space-y-8">
              {whyThemes.map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#102C20] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5D6D64] sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
