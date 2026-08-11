import { useState } from "react";
import { MagneticCard } from "@/components/common/MagneticCard";
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
  const [open, setOpen] = useState(false);

  return (
    <MagneticCard className={cn(compact ? "w-[11rem] sm:w-[12.5rem]" : "w-full")} strength={5}>
      <article
        className={cn(
          "speaker-card group relative isolate overflow-hidden bg-mineral",
          compact ? "aspect-[4/5]" : "aspect-[4/5]",
          open && "speaker-card--open",
        )}
      >
        <img
          src={speaker.image}
          alt={`Portrait of ${speaker.name}`}
          width={compact ? 200 : 320}
          height={compact ? 250 : 400}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.15] transition-[transform,filter] duration-700 group-hover:scale-[1.025] group-hover:grayscale-0 group-focus-within:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mineral via-mineral/10 to-transparent" />
        <button
          type="button"
          tabIndex={clone ? -1 : 0}
          aria-expanded={open}
          aria-label={`${open ? "Hide" : "Show"} details for ${speaker.name}`}
          onClick={() => setOpen((value) => !value)}
          className="absolute inset-0 z-10 min-h-11 w-full text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-emerald"
        >
          <span className="sr-only">
            {speaker.role}, {speaker.organisation}
          </span>
        </button>
        <div className="speaker-card__details absolute inset-x-0 bottom-0 z-[5] p-4 text-white sm:p-5">
          {archived && (
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-emerald">
              Previous edition
            </p>
          )}
          <h3 className="mt-2 font-display text-xl font-extrabold uppercase leading-none tracking-[-0.02em]">
            {speaker.name}
          </h3>
          <div className="speaker-card__meta mt-3 border-t border-white/18 pt-3">
            <p className="text-xs font-semibold leading-snug text-white/86">{speaker.role}</p>
            <p className="mt-1 text-[0.68rem] leading-relaxed text-white/62">
              {speaker.organisation}
            </p>
            <p className="mt-2 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-emerald/90">
              {speaker.track.replaceAll("-", " ")}
            </p>
          </div>
        </div>
      </article>
    </MagneticCard>
  );
}
