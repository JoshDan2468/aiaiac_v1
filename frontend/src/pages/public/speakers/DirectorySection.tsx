import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { allSpeakers, speakers } from "@/data/speakers";

export function DirectorySection() {
  return (
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
  );
}
