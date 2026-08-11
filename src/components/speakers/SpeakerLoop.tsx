import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { cn } from "@/lib/utils";
import type { Speaker } from "@/types";

export function SpeakerLoop({
  speakers,
  direction = "left",
  label,
}: {
  speakers: Speaker[];
  direction?: "left" | "right";
  label: string;
}) {
  if (!speakers.length) return null;

  return (
    <div className="industry-loop" aria-label={label}>
      <div
        className={cn(
          "industry-loop__track",
          direction === "right" && "industry-loop__track--right",
        )}
      >
        <ul className="industry-loop__group">
          {speakers.map((speaker) => (
            <li key={speaker.id}>
              <SpeakerCard speaker={speaker} compact />
            </li>
          ))}
        </ul>
        <ul className="industry-loop__group" aria-hidden="true">
          {speakers.map((speaker) => (
            <li key={`clone-${speaker.id}`}>
              <SpeakerCard speaker={speaker} compact clone />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
