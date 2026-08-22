import { ActionLink } from "@/components/common/ActionButton";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SpeakerLoop } from "@/components/speakers/SpeakerLoop";
import { previousEdition } from "@/data/event";
import { allSpeakers } from "@/data/speakers";

const midpoint = Math.ceil(allSpeakers.length / 2);
const speakerRows = [allSpeakers.slice(0, midpoint), allSpeakers.slice(midpoint)];

export function SpeakerArchiveSection() {
  return (
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
  );
}
