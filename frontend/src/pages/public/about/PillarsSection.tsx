import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutPillars } from "@/data/about";

export function PillarsSection() {
  return (
    <section className="on-navy relative overflow-hidden bg-mineral py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />

      <div className="shell relative z-10">
        <AnimatedSection className="max-w-2xl">
          <span className="eyebrow text-emerald">Connected Disciplines</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The Four Pillars
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Physical integrity, artificial intelligence, automated control, and cybersecurity are
            interdependent pillars of modern industrial resilience.
          </p>
        </AnimatedSection>

        {/* Asymmetric 2x2 Editorial Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {aboutPillars.map((pillar, index) => (
            <AnimatedSection
              key={pillar.index}
              delay={index * 0.08}
              className="group relative isolate overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#0B2B20] via-[#071F18] to-[#04140D] p-6 text-white shadow-xl transition-all duration-300 hover:border-lime/40 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-lime/5 blur-2xl transition-opacity group-hover:opacity-100"
                aria-hidden
              />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-sm font-extrabold tracking-widest text-lime">
                  {pillar.index}
                </span>
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white/50">
                  {pillar.subtitle}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-lime sm:text-2xl">
                {pillar.title}
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-white/75 sm:text-sm">
                {pillar.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
