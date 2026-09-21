import { AnimatedSection } from "@/components/common/AnimatedSection";
import { sponsors } from "@/data/sponsors";

export function PartnerArchiveSection() {
  return (
    <section className="bg-[#F5F1E7] py-16 text-[#102C20] sm:py-20 lg:py-24">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl">
            Previous Partners and Participating Organisations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5D6D64]">
            Organisations and industry stakeholders that have supported and participated in AIAIAC
            Africa editions across energy, maritime, and infrastructure.
          </p>
        </AnimatedSection>

        {/* Clean white logo tiles with no borders and full brand representation */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-5">
          {sponsors.slice(0, 18).map((item, index) => (
            <AnimatedSection
              key={item.id}
              delay={(index % 6) * 0.03}
              className="flex h-24 items-center justify-center rounded-lg bg-[#FFFFFF] p-5 sm:h-28"
            >
              <img
                src={item.logo}
                alt={item.name ?? "Participating organisation logo"}
                width="160"
                height="60"
                loading="lazy"
                decoding="async"
                className="max-h-12 w-auto max-w-full object-contain"
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
