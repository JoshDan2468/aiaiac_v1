import { AnimatedSection } from "@/components/common/AnimatedSection";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { aboutMedia } from "@/data/about";

export function HeroSection() {
  return (
    <section className="on-navy relative isolate overflow-hidden bg-mineral pb-12 pt-28 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40">
      <AuroraBackground className="opacity-35" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-20" aria-hidden />

      {/* Dark Industrial Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={aboutMedia.hero.src}
          alt={aboutMedia.hero.alt}
          width={aboutMedia.hero.width}
          height={aboutMedia.hero.height}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover opacity-25 saturate-50 filter"
          style={{ objectPosition: aboutMedia.hero.objectPosition }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#05190F]/90 via-[#05190F]/80 to-[#05190F]"
          aria-hidden
        />
      </div>

      <div className="shell relative z-10">
        <AnimatedSection className="mx-auto max-w-4xl text-center">
          <span className="eyebrow inline-block text-emerald">About AIAIAC Africa</span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Where industrial experience meets intelligent technology.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/78 sm:text-lg">
            Guarding infrastructure, powering innovation, and securing tomorrow across West Africa’s
            asset-intensive industries.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
