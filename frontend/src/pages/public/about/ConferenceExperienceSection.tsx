import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia } from "@/data/about";

const expectedExperiences = [
  {
    title: "Executive Sessions",
    description:
      "Strategic ministerial briefings, industry panels, and policy dialogues addressing Africa's energy transition, infrastructure modernization, and industrial governance.",
  },
  {
    title: "Technical Conferences",
    description:
      "Dual dedicated tracks delivering specialized technical presentations across Asset Integrity & Corrosion Management and Industrial Automation & OT Cybersecurity.",
  },
  {
    title: "Technical Presentations",
    description:
      "Rigorous, peer-reviewed engineering case studies, field methodologies, and practical solutions presented by operational practitioners.",
  },
  {
    title: "Innovation Showcase",
    description:
      "Live demonstrations of industrial robotics, sensor telemetry, autonomous inspection tools, and enterprise AI software in active operational settings.",
  },
  {
    title: "Exhibition",
    description:
      "A focused exhibition floor featuring international technology developers, equipment manufacturers, and specialist engineering service providers.",
  },
  {
    title: "Executive Roundtables",
    description:
      "Closed-door, Chatham House-style discussions bringing together asset operators, EPC contractors, and regulators to tackle pressing operational challenges.",
  },
  {
    title: "Professional Networking",
    description:
      "Facilitated bilateral meetings, executive receptions, and structured networking sessions connecting delegates across two high-impact conference days.",
  },
];

export function ConferenceExperienceSection() {
  const col1 = expectedExperiences.slice(0, 4);
  const col2 = expectedExperiences.slice(4);

  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            What to Expect
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5D6D64] sm:text-lg">
            A comprehensive two-day programme combining strategic industry perspective with deep
            technical investigation, practical demonstrations, and high-value networking.
          </p>
        </AnimatedSection>

        {/* Asymmetric layout: 7 editorial items + substantial real conference photo (35-45% width) */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Left Column: 7 editorial items in 2 sub-columns, NO borders, NO cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              <div className="space-y-9">
                {col1.map((item, index) => (
                  <AnimatedSection key={item.title} delay={index * 0.04}>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#102C20] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D6D64]">
                      {item.description}
                    </p>
                  </AnimatedSection>
                ))}
              </div>

              <div className="space-y-9">
                {col2.map((item, index) => (
                  <AnimatedSection key={item.title} delay={(index + 4) * 0.04}>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#102C20] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5D6D64]">
                      {item.description}
                    </p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Substantial Conference Photo (~42% desktop width) */}
          <AnimatedSection delay={0.1} className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg bg-[#E5E0D5]">
              <img
                src={aboutMedia.introduction.src}
                alt={aboutMedia.introduction.alt}
                width={aboutMedia.introduction.width}
                height={aboutMedia.introduction.height}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover sm:aspect-16/11 lg:aspect-3/4"
                style={{ objectPosition: aboutMedia.introduction.objectPosition }}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
