import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia } from "@/data/about";

export function AfricaGlobalSection() {
  return (
    <section className="on-navy relative overflow-hidden py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />
      <div className="shell grid gap-0 lg:grid-cols-12 lg:items-stretch">
        <AnimatedSection className="relative z-10 bg-mineral px-6 py-12 sm:px-10 lg:col-span-5 lg:px-12 lg:py-20">
          <p className="eyebrow text-emerald">West Africa · Global exchange</p>
          <h2 className="mt-7 text-[clamp(2.5rem,5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-white">
            Regionally grounded. Globally connected.
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/68">
            The platform gives West Africa’s operating context a central place in the conversation
            while opening the room to methods, technologies and experience from across the wider
            industry.
          </p>
          <div className="mt-12 h-px w-full bg-white/18" aria-hidden>
            <div className="h-px w-20 bg-emerald" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-7">
          <div className="image-cut h-[30rem] overflow-hidden bg-forest sm:h-[38rem] lg:h-full lg:min-h-[43rem]">
            <img
              src={aboutMedia.regional.src}
              alt={aboutMedia.regional.alt}
              width={aboutMedia.regional.width}
              height={aboutMedia.regional.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: aboutMedia.regional.objectPosition }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
