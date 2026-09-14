import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { abstractTopics } from "@/data/brochure";
import { pillars } from "@/data/media";

export function FocusSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="2027 focus architecture"
          title="The structure remains open by design"
          description="Tracks can be added, removed or refined without redesigning this interface. The four enduring disciplines provide the organising framework; exact sessions and activities remain unconfirmed."
        />
        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={pillar.index} delay={index * 0.06}>
              <MagneticCard className="h-full">
                <article className="flex h-full min-h-72 flex-col bg-background p-7 transition-colors duration-500 hover:bg-muted">
                  <span className="numeral text-sm text-emerald-deep">{pillar.index}</span>
                  <h2 className="display-md mt-auto pt-16 text-mineral">{pillar.title}</h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </article>
              </MagneticCard>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-12 border-l border-forest/55 pl-5 sm:pl-7">
          <p className="eyebrow text-forest">Abstract topic groups</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {abstractTopics.map((topic) => (
              <li
                key={topic}
                className="interactive-card border border-mineral/16 px-4 py-3 text-xs font-semibold text-mineral"
              >
                {topic}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
