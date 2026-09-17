import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia, conferenceExperienceList } from "@/data/about";

export function ConferenceExperienceSection() {
  return (
    <section className="on-navy relative overflow-hidden bg-[#071F18] py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-15" aria-hidden />

      <div className="shell relative z-10">
        <AnimatedSection className="max-w-2xl">
          <span className="eyebrow text-emerald">Brochure Showcase</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The Conference Experience
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            A comprehensive 2-day technical and strategic agenda designed for technical leaders,
            executives, and operational specialists.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Structured Experience Items */}
          <div className="space-y-4 lg:col-span-7">
            {conferenceExperienceList.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={index * 0.05}
                className="group flex flex-col rounded-xl border border-white/10 bg-mineral/50 p-4 transition-all duration-300 hover:border-lime/40 hover:bg-mineral sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-lime sm:text-lg">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[0.65rem] font-semibold tracking-wider text-emerald">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-sm">
                  {item.description}
                </p>
              </AnimatedSection>
            ))}
          </div>

          {/* Right Column: Conference Presentation Visual */}
          <AnimatedSection delay={0.15} className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-mineral shadow-2xl">
              <img
                src={aboutMedia.technology.src}
                alt={aboutMedia.technology.alt}
                width={aboutMedia.technology.width}
                height={aboutMedia.technology.height}
                loading="lazy"
                decoding="async"
                className="h-[32rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: aboutMedia.technology.objectPosition }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#05190F] via-transparent to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-base font-bold text-white">
                  Technical Disclosures &amp; Innovation
                </p>
                <p className="mt-1 text-xs text-white/75">
                  Peer-reviewed case studies, live software demos, and technical roundtables.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
