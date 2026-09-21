import { useState } from "react";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CircularPersonProfile } from "@/components/common/CircularPersonProfile";
import { SpeakerDetailModal } from "@/components/speakers/SpeakerDetailModal";
import { keynotes } from "@/data/speakers";
import { unifiedSpeakersRoster, type RosterPerson } from "@/data/speakersRoster";

export function KeynoteArchiveSection() {
  const [activeModalSpeaker, setActiveModalSpeaker] = useState<RosterPerson | null>(null);

  const handleSpeakerClick = (id: string) => {
    const person = unifiedSpeakersRoster.find((p) => p.id === id) || null;
    setActiveModalSpeaker(person);
  };

  return (
    <section className="border-b border-[#214A36]/40 bg-[#071C13] py-20 text-[#F6F4EC] lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F6F4EC] sm:text-4xl lg:text-5xl">
            Strategic Plenary Leadership
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#97B0A4] sm:text-lg">
            Executive directors, vice presidents, and senior engineering authorities addressing
            critical operational challenges across African energy and infrastructure.
          </p>
        </AnimatedSection>

        <ul className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
          {keynotes.map((speaker, index) => (
            <AnimatedSection as="li" key={speaker.id} delay={index * 0.08}>
              <CircularPersonProfile
                name={speaker.name}
                role={speaker.role}
                organisation={speaker.organisation}
                organisationKey={speaker.organisationKey}
                countryCode={speaker.countryCode}
                image={speaker.image}
                tone="dark"
                size="keynote"
                onClick={() => handleSpeakerClick(speaker.id)}
              />
            </AnimatedSection>
          ))}
        </ul>
      </div>

      <SpeakerDetailModal
        speaker={activeModalSpeaker}
        open={Boolean(activeModalSpeaker)}
        onOpenChange={(open) => {
          if (!open) setActiveModalSpeaker(null);
        }}
      />
    </section>
  );
}
