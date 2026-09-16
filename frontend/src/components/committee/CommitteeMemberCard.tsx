import { useState } from "react";
import { PersonMeta } from "@/components/common/PersonMeta";
import { cn } from "@/lib/utils";
import type { TechnicalCommitteeMember } from "@/types";

function getInitials(name: string): string {
  const cleaned = name
    .replace(/\b(Engr\.|Dr\.|Prof\.|Architect|Sir|\(Engr\.\)|Dr\)\.?)\b/gi, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!first) return "TC";
  if (parts.length === 1 || !last) return first.slice(0, 2).toUpperCase();
  const fChar = first[0] ?? "";
  const lChar = last[0] ?? "";
  return (fChar + lChar).toUpperCase() || "TC";
}

export function CommitteeMemberCard({
  member,
  clone = false,
}: {
  member: TechnicalCommitteeMember;
  clone?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(member.name);
  const cardWidthClass = "w-[12.75rem] sm:w-[13.75rem] lg:w-[15rem]";

  return (
    <div
      aria-hidden={clone ? "true" : undefined}
      className={cn("speaker-card-wrap group relative shrink-0", cardWidthClass)}
    >
      {/* Restrained Ivory/Lime Backplate (NO RED) */}
      <div className="speaker-card__backplate" aria-hidden />

      <article className="speaker-card relative z-10 isolate aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-mineral shadow-md transition-all duration-500 group-hover:-translate-y-1">
        {!imageError ? (
          <img
            src={member.image}
            alt={clone ? "" : `Portrait of ${member.name}`}
            width={320}
            height={400}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.1] transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0e3525] via-[#082318] to-[#04140d] p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lime/35 bg-lime/10 font-display text-2xl font-black tracking-wider text-lime shadow-inner">
              {initials}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#05190F] via-[#05190F]/30 to-transparent" />

        <div className="speaker-card__details absolute inset-x-0 bottom-0 z-[5] p-4 text-white sm:p-5">
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-lime sm:text-xl">
            {member.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-white/90">
            {member.role}
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs font-medium leading-relaxed text-lime/90">
            {member.organisation}
          </p>

          <PersonMeta
            countryCode={member.countryCode}
            organisationLogo={member.organisationLogo}
            organisation={member.organisation}
          />
        </div>
      </article>
    </div>
  );
}
