import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia } from "@/data/about";

export function VisionPurposeSection() {
  return (
    <section className="bg-forest py-24 text-white lg:py-36">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <AnimatedSection className="lg:col-span-5">
          <p className="eyebrow text-emerald">Our purpose</p>
          <h2 className="mt-7 text-[clamp(2.5rem,5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
            <span className="block sm:inline">Turn </span>
            <span className="block sm:inline">exchange </span>
            <span>into stronger operational decisions.</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/72">
            AIAIAC creates a practical cross-disciplinary forum where regional experience, global
            methods and emerging technology can be examined together—so knowledge moves beyond the
            room and into the work.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <figure>
            <div className="image-cut aspect-[16/10] overflow-hidden bg-mineral">
              <img
                src={aboutMedia.technology.src}
                alt={aboutMedia.technology.alt}
                width={aboutMedia.technology.width}
                height={aboutMedia.technology.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: aboutMedia.technology.objectPosition }}
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-5 border-t border-white/25 pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/64">
              <span>Knowledge in practice</span>
              <span className="text-emerald">AIAIAC West Africa</span>
            </figcaption>
          </figure>
        </AnimatedSection>
      </div>
    </section>
  );
}
