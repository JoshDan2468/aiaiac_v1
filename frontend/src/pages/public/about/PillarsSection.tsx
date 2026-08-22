import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutPillars } from "@/data/about";

export function PillarsSection() {
  return (
    <section className="on-navy relative overflow-hidden py-24 lg:py-36">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />
      <div className="shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="eyebrow text-emerald">Industry focus</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Four technical lenses on one operating environment.
            </p>
          </div>
          <h2 className="display-lg text-white lg:col-span-8">The four disciplines</h2>
        </AnimatedSection>

        <div className="relative mt-14 border-t border-white/18 lg:mt-20">
          {aboutPillars.map((pillar, index) => (
            <AnimatedSection key={pillar.index} delay={index * 0.04}>
              <article className="group grid gap-4 border-b border-white/18 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-12 lg:items-center lg:gap-7 lg:py-10">
                <span className="numeral text-xl text-emerald sm:row-span-2 lg:col-span-1 lg:row-auto">
                  {pillar.index}
                </span>
                <h3 className="text-[clamp(1.65rem,3.4vw,3.4rem)] font-extrabold uppercase leading-none text-white transition-colors duration-300 group-hover:text-emerald sm:col-start-2 lg:col-span-5 lg:col-start-auto">
                  {pillar.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-white/62 sm:col-start-2 lg:col-span-5 lg:col-start-8 lg:text-base">
                  {pillar.description}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
