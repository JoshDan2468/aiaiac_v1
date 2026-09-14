import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { sponsorshipPackages } from "@/data/brochure";

function usd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SponsorshipPackagesSection() {
  return (
    <section
      aria-labelledby="sponsorship-packages-title"
      className="bg-[#071b11] py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="shell">
        <AnimatedSection className="grid gap-7 border-b border-white/14 pb-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-end">
          <div>
            <p className="eyebrow text-lime">Brochure package guide</p>
            <h2
              id="sponsorship-packages-title"
              className="mt-5 text-[clamp(2.5rem,5.4vw,5.25rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-bone"
            >
              Sponsorship levels
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
            Published package figures are a reference for organiser discussion only. Selecting a
            sponsorship route does not create an agreement, quotation or payment.
          </p>
        </AnimatedSection>

        <ol className="mt-8 grid border-y border-white/14 sm:grid-cols-2 lg:grid-cols-3">
          {sponsorshipPackages.map((item, index) => (
            <AnimatedSection
              as="li"
              key={item.id}
              delay={index * 0.04}
              className="border-b border-white/14 p-6 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r lg:[&:nth-last-child(-n+3)]:border-b-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(4)]:border-r"
            >
              <span className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-lime/75">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-2xl font-bold uppercase leading-[0.92] tracking-[-0.035em] text-bone">
                {item.title}
              </h3>
              <p className="numeral mt-5 text-3xl text-lime">{usd(item.priceUsd)}</p>
            </AnimatedSection>
          ))}
        </ol>
        <AnimatedSection className="mt-9">
          <ActionLink to="/registration/sponsor" variant="outline" className="text-white">
            Prepare sponsorship enquiry
          </ActionLink>
        </AnimatedSection>
      </div>
    </section>
  );
}
