import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutIntroduction, aboutMedia } from "@/data/about";

export function PurposeSection() {
  return (
    <section className="bg-bone py-24 lg:py-36">
      <div className="shell grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <AnimatedSection className="lg:col-span-7">
          <p className="eyebrow text-emerald-deep">The conference</p>
          <h2 className="mt-6 max-w-5xl text-[clamp(2.4rem,5.8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-mineral">
            The disciplines shaping modern operations belong in the same room.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:pt-20">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            {aboutIntroduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ActionLink to="/conferences" variant="outline" className="mt-9 text-mineral">
            Explore conference focus
          </ActionLink>
        </AnimatedSection>

        <AnimatedSection
          delay={0.12}
          className="relative mt-2 md:w-[74%] lg:col-span-7 lg:col-start-2 lg:mt-8 lg:w-auto"
        >
          <div className="image-cut aspect-[4/4.2] max-h-[46rem] overflow-hidden bg-mineral">
            <img
              src={aboutMedia.introduction.src}
              alt={aboutMedia.introduction.alt}
              width={aboutMedia.introduction.width}
              height={aboutMedia.introduction.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: aboutMedia.introduction.objectPosition }}
            />
          </div>
          <div className="absolute -bottom-5 right-0 bg-mineral px-5 py-4 text-white sm:-right-16 sm:px-8 sm:py-6 lg:-right-24">
            <p className="eyebrow text-emerald">Regional experience</p>
            <p className="mt-2 max-w-48 text-sm leading-relaxed text-white/68">
              Global methods. Practical exchange.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
