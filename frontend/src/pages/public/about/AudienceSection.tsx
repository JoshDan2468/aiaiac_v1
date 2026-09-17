import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia, whoAiaiacBringsTogether } from "@/data/about";

export function AudienceSection() {
  return (
    <section className="on-navy relative overflow-hidden bg-mineral py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />

      <div className="shell relative z-10">
        <AnimatedSection className="max-w-3xl">
          <span className="eyebrow text-emerald">Executive Assembly</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Who AIAIAC Africa Brings Together
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Connecting technical decision-makers, industrial operators, and technology pioneers
            across the energy and infrastructure value chain.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Delegate Assembly Photograph */}
          <AnimatedSection className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-forest shadow-2xl">
              <img
                src={aboutMedia.audience.src}
                alt={aboutMedia.audience.alt}
                width={aboutMedia.audience.width}
                height={aboutMedia.audience.height}
                loading="lazy"
                decoding="async"
                className="h-[28rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: aboutMedia.audience.objectPosition }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-mineral via-transparent to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block rounded-md bg-emerald/20 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-emerald backdrop-blur-md">
                  Cross-Sector Delegation
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  Over 1,200 delegates, 50+ technical speakers, and 60+ exhibiting companies across
                  Africa.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Structured Target Audience Groups */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {whoAiaiacBringsTogether.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={index * 0.05}
                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-lime/40 hover:bg-white/10"
              >
                <div>
                  <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-lime">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold text-white transition-colors group-hover:text-lime sm:text-lg">
                    {item.title}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
