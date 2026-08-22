import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";

const opportunities = [
  [
    "Demonstrate",
    "Place working technology and practical capability in front of the professionals responsible for critical assets.",
  ],
  [
    "Connect",
    "Build direct relationships with operators, engineers, regulators, partners and technical decision-makers.",
  ],
  [
    "Position",
    "Show how your organisation contributes to safer, smarter and more resilient energy operations.",
  ],
];

export function WhyExhibitSection() {
  return (
    <section className="bg-muted py-24 lg:py-32">
      <div className="shell">
        <SectionHeader eyebrow="Why exhibit" title="A focused industry platform" />
        <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-3">
          {opportunities.map(([title, description], index) => (
            <AnimatedSection key={title} delay={index * 0.08}>
              <MagneticCard className="h-full">
                <article className="h-full bg-background p-8 lg:min-h-80">
                  <span className="numeral text-sm text-emerald-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display-md mt-20 text-mineral">{title}</h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              </MagneticCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
