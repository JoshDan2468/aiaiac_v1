import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutAudiences, aboutMedia } from "@/data/about";

export function AudienceSection() {
  return (
    <section className="bg-bone py-24 lg:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-start">
        <AnimatedSection className="lg:sticky lg:top-32 lg:col-span-6">
          <p className="eyebrow text-emerald-deep">Who it is for</p>
          <h2 className="display-lg mt-6 text-mineral">
            The people carrying operational responsibility.
          </h2>
          <div className="image-cut mt-10 aspect-[16/10] overflow-hidden bg-mineral">
            <img
              src={aboutMedia.audience.src}
              alt={aboutMedia.audience.alt}
              width={aboutMedia.audience.width}
              height={aboutMedia.audience.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: aboutMedia.audience.objectPosition }}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-32">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            AIAIAC is built for those who make, influence and enable technical decisions across the
            infrastructure lifecycle.
          </p>
          <ul className="mt-10 border-t border-mineral/20">
            {aboutAudiences.map((audience, index) => (
              <li
                key={audience}
                className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-mineral/20 py-6 text-base font-semibold leading-snug text-mineral"
              >
                <span className="numeral text-emerald-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {audience}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
