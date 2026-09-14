import { AnimatedSection } from "@/components/common/AnimatedSection";
import { corporateGroupDelegatePackages } from "@/data/brochure";

function usd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CorporateDelegatesSection() {
  return (
    <section aria-labelledby="corporate-delegate-title" className="bg-background py-20 sm:py-24">
      <div className="shell">
        <AnimatedSection className="grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
          <div>
            <p className="eyebrow text-forest">Corporate attendance</p>
            <h2
              id="corporate-delegate-title"
              className="mt-5 text-[clamp(2.25rem,4.7vw,4.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-mineral"
            >
              Group delegate guide
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-mineral/68 sm:text-base">
            Published corporate group figures are reference information only. They do not create a
            booking or payment through this registration interface.
          </p>
        </AnimatedSection>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {corporateGroupDelegatePackages.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.06}>
              <article className="interactive-card border border-mineral/16 bg-bone p-7">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-forest">
                  {item.detail}
                </p>
                <h3 className="mt-8 text-3xl font-bold uppercase tracking-[-0.045em] text-mineral">
                  {item.title}
                </h3>
                <p className="numeral mt-5 text-3xl text-forest">{usd(item.priceUsd)}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
