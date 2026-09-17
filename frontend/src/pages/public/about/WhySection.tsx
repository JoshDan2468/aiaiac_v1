import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia, whyAiaiacPoints, whyAiaiacRationale } from "@/data/about";

export function WhySection() {
  return (
    <section className="on-navy relative overflow-hidden bg-[#05190F] py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-15" aria-hidden />

      <div className="shell relative z-10">
        <AnimatedSection className="max-w-3xl">
          <span className="eyebrow text-lime">Brochure Rationale</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why AIAIAC? Why Africa? Why Now?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            {whyAiaiacRationale}
          </p>
        </AnimatedSection>

        {/* Split Layout: Real Industrial Visual (Left) + 6 Staggered Rationale Points (Right) */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: High-Impact Event & Industrial Plant Photograph */}
          <AnimatedSection className="sticky top-28 lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-forest shadow-2xl">
              <img
                src={aboutMedia.introduction.src}
                alt={aboutMedia.introduction.alt}
                width={aboutMedia.introduction.width}
                height={aboutMedia.introduction.height}
                loading="lazy"
                decoding="async"
                className="h-[28rem] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#05190F] via-transparent to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block rounded-md bg-lime/20 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-lime backdrop-blur-md">
                  African Industrial Imperative
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  Bridging technical capacity, digital transformation, and asset security across
                  West Africa.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: 6 Vertical Staggered Blocks */}
          <div className="space-y-6 lg:col-span-7">
            {whyAiaiacPoints.map((point, index) => (
              <AnimatedSection
                key={point.index}
                delay={index * 0.06}
                className="group relative flex gap-5 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-lime/35 hover:bg-white/8 sm:p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-lime/30 bg-lime/10 font-mono text-xs font-bold text-lime shadow-inner">
                  {point.index}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-lime sm:text-lg">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/72 sm:text-sm">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
