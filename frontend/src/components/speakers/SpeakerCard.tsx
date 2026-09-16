import { useState } from "react";
import { MagneticCard } from "@/components/common/MagneticCard";
import { PersonMeta } from "@/components/common/PersonMeta";
import { cn } from "@/lib/utils";
import type { Speaker } from "@/types";

export function SpeakerCard({
  speaker,
  archived = true,
  clone = false,
  compact = false,
}: {
  speaker: Speaker;
  archived?: boolean;
  clone?: boolean;
  compact?: boolean;
}) {
  const cardWidthClass = compact ? "w-[12.75rem] sm:w-[13.75rem] lg:w-[15rem]" : "w-full";

  if (clone) {
    return (
      <div aria-hidden="true" className={cardWidthClass}>
        <SpeakerCardSurface speaker={speaker} archived={archived} compact={compact} />
      </div>
    );
  }

  return (
    <InteractiveSpeakerCard
      speaker={speaker}
      archived={archived}
      compact={compact}
      cardWidthClass={cardWidthClass}
    />
  );
}

function InteractiveSpeakerCard({
  speaker,
  archived,
  compact,
  cardWidthClass,
}: {
  speaker: Speaker;
  archived: boolean;
  compact: boolean;
  cardWidthClass: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <MagneticCard className={cardWidthClass} strength={4}>
      <SpeakerCardSurface
        speaker={speaker}
        archived={archived}
        compact={compact}
        open={open}
        onToggle={() => setOpen((value) => !value)}
      />
    </MagneticCard>
  );
}

function SpeakerCardSurface({
  speaker,
  compact,
  open = false,
  onToggle,
}: {
  speaker: Speaker;
  archived: boolean;
  compact: boolean;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className={cn("speaker-card-wrap group relative", open && "speaker-card-wrap--open")}>
      {/* Restrained Ivory/Lime Shaped Backplate (NO RED) */}
      <div className="speaker-card__backplate" aria-hidden />

      <article
        className={cn(
          "speaker-card relative z-10 isolate overflow-hidden rounded-[1.5rem] bg-mineral",
          compact ? "aspect-[4/5]" : "aspect-[4/5]",
        )}
      >
        <img
          src={speaker.image}
          alt={`Portrait of ${speaker.name}`}
          width={compact ? 280 : 360}
          height={compact ? 350 : 450}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.1] transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-within:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05190F] via-[#05190F]/20 to-transparent" />

        {onToggle && (
          <button
            type="button"
            aria-expanded={open}
            aria-label={`${open ? "Hide" : "Show"} details for ${speaker.name}`}
            onClick={onToggle}
            className="absolute inset-0 z-10 min-h-11 w-full text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-emerald"
          >
            <span className="sr-only">
              {speaker.role}, {speaker.organisation}
            </span>
          </button>
        )}

        <div className="speaker-card__details absolute inset-x-0 bottom-0 z-[5] p-4 text-white sm:p-5">
          <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            {speaker.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-white/90">
            {speaker.role}
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs font-medium leading-relaxed text-lime/90">
            {speaker.organisation}
          </p>

          <PersonMeta
            countryCode={speaker.countryCode}
            organisationLogo={speaker.organisationLogo}
            organisation={speaker.organisation}
          />
        </div>
      </article>
    </div>
  );
}
