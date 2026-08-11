import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CTASection } from "@/components/common/CTASection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { activeEventNotice, previousEdition } from "@/data/event";
import { allSpeakers, keynotes, speakers } from "@/data/speakers";

export function SpeakersPage() {
  return (
    <PublicPageLayout
      title="Speakers | AIAIAC West Africa 2027"
      description="2027 speakers are being confirmed. Explore the clearly labelled AIAIAC previous-edition speaker archive."
    >
      <PageHero
        eyebrow="Speakers"
        title="Industry voices, technical depth"
        description="AIAIAC brings operational leaders, engineers, researchers, regulators and technology experts into one focused exchange."
        status={activeEventNotice}
        variant="editorial"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="shell">
          <SectionHeader
            eyebrow={previousEdition.label}
            title="Keynote archive"
            description="These speakers appeared in the previous edition and are not presented as confirmed for 2027."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keynotes.map((speaker, index) => (
              <AnimatedSection as="li" key={speaker.id} delay={index * 0.08}>
                <SpeakerCard speaker={speaker} />
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted py-24 lg:py-32">
        <div className="shell">
          <SectionHeader
            eyebrow="Previous edition directory"
            title={`${allSpeakers.length} archived industry voices`}
            description="Use focus, hover or tap on a portrait to reveal the archived role, organisation and track."
          />
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {speakers.map((speaker, index) => (
              <AnimatedSection as="li" key={speaker.id} delay={(index % 6) * 0.035}>
                <SpeakerCard speaker={speaker} />
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="2027 participation"
        title="Join the next AIAIAC industry exchange"
        primaryLabel="Registration options"
        primaryTo="/registration"
        secondaryLabel="Contact the team"
        secondaryTo="/contact"
      />
    </PublicPageLayout>
  );
}
