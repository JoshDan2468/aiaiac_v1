import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutIntroduction } from "@/data/about";

export function AboutIntroSection() {
  return (
    <section className="on-navy relative overflow-hidden bg-[#071F18] py-16 sm:py-20 lg:py-24">
      <div className="grid-lines absolute inset-0 opacity-15" aria-hidden />
      <div className="shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Left Column: Editorial Statement Heading */}
          <AnimatedSection className="lg:col-span-5">
            <span className="eyebrow text-lime">Brochure Rationale</span>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Shaping the Future of Industrial Excellence in Africa
            </h2>
            <div className="mt-6 border-l-2 border-lime pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">
                Premier Industrial Platform
              </p>
              <p className="mt-1 text-xs text-white/65">
                Connecting global methods with regional realities across asset-intensive sectors.
              </p>
            </div>
          </AnimatedSection>

          {/* Right Column: Brochure Paragraphs */}
          <AnimatedSection delay={0.1} className="space-y-6 lg:col-span-7">
            {aboutIntroduction.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-white/82 sm:text-lg sm:leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
