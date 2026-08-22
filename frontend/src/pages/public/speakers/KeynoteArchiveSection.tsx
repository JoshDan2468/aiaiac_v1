import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { previousEdition } from "@/data/event";
import { keynotes } from "@/data/speakers";

export function KeynoteArchiveSection() {
  return (
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
  );
}
