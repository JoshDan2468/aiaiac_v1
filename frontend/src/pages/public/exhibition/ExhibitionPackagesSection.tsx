import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import {
  exhibitionCategories,
  exhibitionShellSchemeItems,
  exhibitionStandPackages,
} from "@/data/brochure";

function usd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ExhibitionPackagesSection() {
  return (
    <section
      aria-labelledby="exhibition-packages-title"
      className="bg-bone py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <AnimatedSection className="grid gap-7 border-l border-forest/55 pl-5 sm:pl-7 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
          <div>
            <p className="eyebrow text-forest">Brochure package guide</p>
            <h2
              id="exhibition-packages-title"
              className="mt-5 text-[clamp(2.5rem,5.4vw,5.25rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-mineral"
            >
              Exhibition formats
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-mineral/68 sm:text-base">
            Stand figures and shell-scheme inclusions are reference information. Availability,
            layout and quotation remain subject to organiser confirmation.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.64fr)] lg:gap-14">
          <ol className="grid gap-3 sm:grid-cols-3">
            {exhibitionStandPackages.map((item, index) => (
              <AnimatedSection as="li" key={item.id} delay={index * 0.06}>
                <article className="technical-frame h-full bg-mineral p-6 text-white sm:min-h-56">
                  <span className="font-mono text-[0.56rem] tracking-[0.15em] text-lime">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-9 text-2xl font-bold uppercase leading-[0.9] tracking-[-0.04em] text-bone">
                    {item.title}
                  </h3>
                  <p className="numeral mt-5 text-3xl text-lime">{usd(item.priceUsd)}</p>
                </article>
              </AnimatedSection>
            ))}
          </ol>
          <AnimatedSection
            delay={0.12}
            className="editorial-panel bg-[#e3e1d7] p-7 text-mineral sm:p-8"
          >
            <p className="eyebrow text-forest">Shell scheme includes</p>
            <ul className="mt-5 grid gap-x-5 gap-y-3 text-sm leading-snug sm:grid-cols-2">
              {exhibitionShellSchemeItems.map((item) => (
                <li key={item} className="border-t border-mineral/14 pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-14 border-t border-mineral/14 pt-7">
          <p className="eyebrow text-forest">Exhibitor categories</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {exhibitionCategories.map((category) => (
              <li
                key={category}
                className="interactive-card border border-mineral/18 px-4 py-3 text-xs font-semibold text-mineral"
              >
                {category}
              </li>
            ))}
          </ul>
          <ActionLink to="/registration/exhibitor" variant="solidNavy" className="mt-8">
            Prepare exhibitor enquiry
          </ActionLink>
        </AnimatedSection>
      </div>
    </section>
  );
}
