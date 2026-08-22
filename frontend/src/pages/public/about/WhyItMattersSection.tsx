import { AnimatedSection } from "@/components/common/AnimatedSection";
import { whyItMatters } from "@/data/about";

export function WhyItMattersSection() {
  return (
    <section className="bg-background py-24 lg:py-36">
      <div className="shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-emerald-deep lg:col-span-3">Why it matters</p>
          <h2 className="display-lg max-w-5xl text-mineral lg:col-span-9">
            Operational risk does not respect disciplinary boundaries.
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-x-12 gap-y-14 lg:mt-24 lg:grid-cols-12">
          {whyItMatters.map((statement, index) => (
            <AnimatedSection
              key={statement.index}
              delay={index * 0.06}
              className={
                index === 0
                  ? "lg:col-span-4 lg:col-start-2"
                  : index === 1
                    ? "lg:col-span-4 lg:col-start-7 lg:mt-28"
                    : "lg:col-span-4 lg:col-start-3 lg:mt-8"
              }
            >
              <article className="border-t border-mineral/20 pt-6">
                <div className="flex items-start gap-5">
                  <span className="numeral text-sm text-emerald-deep">{statement.index}</span>
                  <div>
                    <h3 className="text-2xl font-bold leading-tight text-mineral lg:text-3xl">
                      {statement.title}
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
                      {statement.body}
                    </p>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
