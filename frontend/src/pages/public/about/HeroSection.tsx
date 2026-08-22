import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia, aboutPillars } from "@/data/about";

export function HeroSection() {
  return (
    <section className="on-navy relative isolate overflow-hidden pb-10 pt-32 sm:pt-36 lg:pb-14 lg:pt-44">
      <div className="grid-lines absolute inset-0 -z-10 opacity-30" aria-hidden />
      <div
        className="absolute -right-40 top-12 -z-10 h-96 w-96 rounded-full bg-forest/25 blur-3xl"
        aria-hidden
      />

      <div className="shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3 lg:pb-3">
            <p className="eyebrow text-emerald">About AIAIAC West Africa</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/62">
              A cross-disciplinary conference for the people safeguarding and modernising critical
              operations.
            </p>
          </div>
          <h1 className="text-[clamp(2.7rem,7.5vw,7.5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.045em] text-white lg:col-span-9">
            <span className="block">Infrastructure, </span>
            <span className="block text-emerald">intelligence </span>
            <span className="block lg:text-right">and resilience.</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="relative mt-10 lg:mt-14">
          <div className="image-cut relative aspect-[16/8.3] min-h-72 overflow-hidden bg-forest sm:min-h-96 lg:min-h-[34rem]">
            <img
              src={aboutMedia.hero.src}
              alt={aboutMedia.hero.alt}
              width={aboutMedia.hero.width}
              height={aboutMedia.hero.height}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: aboutMedia.hero.objectPosition }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-mineral/75 via-transparent to-mineral/10"
              aria-hidden
            />
            <p className="absolute bottom-5 left-5 max-w-xs text-xs font-semibold uppercase tracking-[0.14em] text-white sm:bottom-8 sm:left-8">
              One exchange · Four connected disciplines
            </p>
          </div>

          <div className="mt-1 grid grid-cols-2 border-y border-white/14 md:grid-cols-4">
            {aboutPillars.map((pillar) => (
              <div
                key={pillar.index}
                className="flex min-h-20 items-center gap-3 border-white/14 px-3 py-4 odd:border-r md:border-r md:last:border-r-0 sm:px-5"
              >
                <span className="numeral text-xs text-emerald">{pillar.index}</span>
                <span className="text-[0.66rem] font-semibold uppercase leading-tight tracking-[0.1em] text-white/80 sm:text-xs">
                  {pillar.title}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
