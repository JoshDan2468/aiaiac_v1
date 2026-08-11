import { motion } from "motion/react";
import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { CTASection } from "@/components/common/CTASection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { LogoLoop } from "@/components/partners/LogoLoop";
import { SpeakerLoop } from "@/components/speakers/SpeakerLoop";
import { activeEvent, activeEventNotice, previousEdition } from "@/data/event";
import { exhibitionImage, heroSlides, mediaItems, pillars } from "@/data/media";
import { allSpeakers, keynotes } from "@/data/speakers";
import { sponsorTiers, sponsors } from "@/data/sponsors";

const midpoint = Math.ceil(allSpeakers.length / 2);
const speakerRows = [allSpeakers.slice(0, midpoint), allSpeakers.slice(midpoint)];
const sponsorRows = [
  sponsors.filter((sponsor) => sponsor.tier !== "media"),
  sponsors.filter((sponsor) => sponsor.tier === "media"),
];

export function HomePage() {
  const keynote = keynotes[0]!;
  const [leadMedia, ...supportingMedia] = mediaItems;

  return (
    <PublicPageLayout
      title="AIAIAC West Africa 2027"
      description="AIAIAC West Africa 2027 connects asset integrity, artificial intelligence, automation and cybersecurity. Event details are being confirmed."
    >
      <section className="on-navy relative isolate min-h-184 overflow-hidden pb-16 pt-28 lg:min-h-208 lg:pb-20 lg:pt-32">
        <AuroraBackground className="opacity-75" />
        <img
          src={heroSlides[0]!.src}
          alt="Offshore energy infrastructure representing AIAIAC's industry focus"
          width="1558"
          height="1112"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-42 grayscale"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.15_0.025_157/.96)_0%,oklch(0.195_0.035_158/.76)_58%,oklch(0.195_0.035_158/.52)_100%)]" />
        <div className="grid-lines absolute inset-0 -z-10 opacity-25" aria-hidden />

        <div className="shell relative flex min-h-152 flex-col justify-between lg:min-h-168">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-between gap-5 border-b border-white/14 py-5"
          >
            <p className="eyebrow text-emerald">
              {activeEvent.name} · {activeEvent.edition}
            </p>
            <p className="max-w-xl text-right text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-white/58">
              Details being confirmed
            </p>
          </motion.div>

          <div className="grid items-end gap-12 pt-24 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              {/* <img
                // src="/brand/aiaiac-logo-dark.png"
                alt="AIAIAC — Asset Integrity, Artificial Intelligence, Automation and Cybersecurity"
                className="mb-8 h-auto w-full max-w-xl object-contain object-left mix-blend-screen"
              /> */}
              <h1 className="display-xl max-w-3xl text-white">
                Guarding infrastructure.
                <span className="block text-emerald">Powering intelligence.</span>
              </h1>
              <p className="mt-7 max-w-2xl border-l-2 border-emerald pl-5 text-sm leading-relaxed text-white/72">
                A technical platform connecting the disciplines, people and technologies building
                safer, smarter and more resilient energy operations.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ActionLink to="/registration" size="lg">
                  Registration options
                </ActionLink>
                <ActionLink to="/about" variant="outline" size="lg" className="text-white">
                  Explore AIAIAC
                </ActionLink>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/16 bg-mineral/55 p-6 backdrop-blur-sm lg:col-span-4 lg:mb-2"
            >
              <p className="eyebrow text-emerald">2027 status</p>
              <p className="mt-5 text-sm leading-relaxed text-white/72">{activeEventNotice}</p>
              <dl className="mt-7 grid grid-cols-2 gap-px bg-white/12">
                {[
                  ["Dates", activeEvent.dates ?? "Confirming"],
                  ["Venue", activeEvent.venue ?? "Confirming"],
                  ["Programme", "In development"],
                  ["Registration", "Being confirmed"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-mineral/92 p-4">
                    <dt className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/38">
                      {label}
                    </dt>
                    <dd className="mt-2 text-xs font-semibold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-5">
            <p className="eyebrow text-emerald-deep">{previousEdition.label}</p>
            <h2 className="display-lg mt-6 text-mineral">An industry voice from the archive</h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
              Previous-edition participation illustrates the calibre of technical leadership around
              AIAIAC; it does not indicate a confirmed 2027 return.
            </p>
            <ActionLink to="/speakers" variant="outline" className="mt-8 text-mineral">
              View speaker archive
            </ActionLink>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <article className="image-cut relative min-h-[25rem] overflow-hidden bg-forest">
              <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
              <img
                src={keynote.image}
                alt={`Portrait of previous-edition keynote ${keynote.name}`}
                width="500"
                height="620"
                loading="lazy"
                decoding="async"
                className="absolute bottom-0 right-0 h-[94%] w-[58%] object-contain object-bottom grayscale"
              />
              <div className="relative flex min-h-[25rem] max-w-[60%] flex-col justify-end p-8 sm:p-10">
                <p className="eyebrow text-emerald">Previous-edition keynote</p>
                <h3 className="display-md mt-5 text-white">{keynote.name}</h3>
                <p className="mt-4 text-sm font-semibold text-white/80">{keynote.role}</p>
                <p className="mt-1 text-sm text-white/55">{keynote.organisation}</p>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <SectionHeader
            eyebrow="About AIAIAC"
            title="Four disciplines. One operational reality."
            description="AIAIAC connects physical asset integrity with intelligent systems, automation and cyber resilience for the people responsible for critical operations."
            className="lg:col-span-7"
          />
          <AnimatedSection delay={0.12} className="flex items-end lg:col-span-4 lg:col-start-9">
            <ActionLink to="/about" variant="outline" size="lg" className="text-mineral">
              Explore AIAIAC
            </ActionLink>
          </AnimatedSection>
        </div>
      </section>

      <section className="on-navy overflow-hidden py-20 lg:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow={previousEdition.label}
            title="A moving wall of industry experience"
            description="Archived speakers move in two opposing streams. Hover, focus or tap a portrait for previous-edition role information."
            light
          />
        </div>
        <div className="mt-12 space-y-4">
          <SpeakerLoop
            speakers={speakerRows[0] ?? []}
            direction="right"
            label="Previous-edition speakers, row one"
          />
          <SpeakerLoop
            speakers={speakerRows[1] ?? []}
            direction="left"
            label="Previous-edition speakers, row two"
          />
        </div>
        <div className="shell mt-10">
          <ActionLink to="/speakers" variant="outline" className="text-white">
            View all archived speakers
          </ActionLink>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="shell">
          <SectionHeader
            eyebrow="Conference focus"
            title="A framework ready for the 2027 programme"
            description="Exact tracks and activities are being confirmed; the enduring focus remains the intersection of integrity, intelligence, automation and cybersecurity."
          />
          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <AnimatedSection key={pillar.index} delay={index * 0.055}>
                <MagneticCard className="h-full">
                  <article className="flex h-full min-h-72 flex-col bg-background p-7 transition-colors duration-500 hover:bg-muted">
                    <span className="numeral text-sm text-emerald-deep">{pillar.index}</span>
                    <h3 className="display-md mt-auto pt-16 text-mineral">{pillar.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </article>
                </MagneticCard>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-10">
            <ActionLink to="/conferences" variant="outline" className="text-mineral">
              Explore conferences
            </ActionLink>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <MagneticCard>
              <figure className="image-cut relative aspect-[16/10] overflow-hidden bg-mineral">
                <img
                  src={exhibitionImage}
                  alt="Previous-edition AIAIAC exhibition"
                  width="832"
                  height="520"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mineral/58 via-transparent to-forest/18" />
                <figcaption className="absolute bottom-6 left-6 border-l-2 border-emerald pl-4 text-xs uppercase tracking-[0.12em] text-white">
                  Previous edition exhibition
                </figcaption>
              </figure>
            </MagneticCard>
          </AnimatedSection>
          <div className="lg:col-span-4 lg:col-start-9">
            <SectionHeader
              eyebrow="Exhibition"
              title="Business opportunity, built around technical relevance"
              description="Showcase capability and connect with the professionals improving critical operations."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="/exhibition">Explore exhibition</ActionLink>
              <ActionLink to="/sponsorship" variant="outline" className="text-mineral">
                Sponsorship
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow={previousEdition.label}
            title="Organisations across the industry wall"
            description="Historical sponsor, exhibitor and media-partner logos are shown only as a previous-edition archive."
          />
        </div>
        <div className="mt-12 space-y-4">
          <LogoLoop
            items={sponsorRows[0] ?? []}
            tierLabel="Previous-edition industry organisations"
            direction="right"
          />
          <LogoLoop
            items={sponsorRows[1] ?? []}
            tierLabel={sponsorTiers.find((tier) => tier.id === "media")?.label ?? "Media partners"}
            direction="left"
          />
        </div>
        <div className="shell mt-10">
          <ActionLink to="/sponsorship" variant="outline" className="text-mineral">
            Explore sponsorship
          </ActionLink>
        </div>
      </section>

      {leadMedia && (
        <section className="bg-muted py-24 lg:py-32">
          <div className="shell">
            <SectionHeader
              eyebrow="Media archive"
              title="Inside the exchange"
              description="A concise view of previous-edition technical sessions, technology discovery and industry connection."
            />
            <div className="mt-14 grid gap-4 lg:grid-cols-12">
              <AnimatedSection className="lg:col-span-8">
                <MagneticCard>
                  <figure className="image-cut relative aspect-[16/9] overflow-hidden bg-mineral">
                    <img
                      src={leadMedia.src}
                      alt={leadMedia.caption}
                      width={leadMedia.width}
                      height={leadMedia.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mineral/80 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm text-white/72">
                      {leadMedia.caption} · previous edition
                    </figcaption>
                  </figure>
                </MagneticCard>
              </AnimatedSection>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
                {supportingMedia.slice(0, 2).map((item, index) => (
                  <AnimatedSection key={item.id} delay={0.08 + index * 0.06}>
                    <MagneticCard>
                      <figure className="relative aspect-[16/8] overflow-hidden bg-mineral">
                        <img
                          src={item.src}
                          alt={item.caption}
                          width={item.width}
                          height={item.height}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover opacity-88"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-mineral/82 to-transparent" />
                      </figure>
                    </MagneticCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>
            <AnimatedSection className="mt-10">
              <ActionLink to="/media" variant="outline" className="text-mineral">
                View media archive
              </ActionLink>
            </AnimatedSection>
          </div>
        </section>
      )}

      <CTASection
        title="Choose how you want to participate in 2027"
        description="Delegate, exhibitor and sponsor routes are separated so each can evolve safely when requirements are confirmed."
        primaryLabel="Registration options"
        primaryTo="/registration"
        secondaryLabel="Contact the team"
        secondaryTo="/contact"
      />
    </PublicPageLayout>
  );
}
