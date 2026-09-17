import { AnimatedSection } from "@/components/common/AnimatedSection";
import { industryStripSectors } from "@/data/about";

export function IndustryStripSection() {
  return (
    <section className="on-navy relative overflow-hidden border-y border-white/12 bg-[#04140D] py-8 text-white">
      <div className="shell">
        <AnimatedSection className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center font-display text-xs font-bold uppercase tracking-widest text-white/80 sm:text-sm sm:gap-x-10">
          {industryStripSectors.map((sector, index) => (
            <div key={sector} className="flex items-center gap-6">
              <span className="transition-colors hover:text-lime">{sector}</span>
              {index < industryStripSectors.length - 1 && (
                <span className="text-lime/60" aria-hidden>
                  ·
                </span>
              )}
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
