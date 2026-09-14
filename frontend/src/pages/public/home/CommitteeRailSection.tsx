import { AnimatedSection } from "@/components/common/AnimatedSection";
import { committee, committeeIntro, technicalChairman } from "@/data/committee";
import type { CommitteeMember } from "@/types";

const committeeMembers = [technicalChairman, ...committee];

function CommitteeIdentity({
  member,
  clone = false,
}: {
  member: CommitteeMember;
  clone?: boolean;
}) {
  return (
    <article
      tabIndex={clone ? -1 : 0}
      className="committee-identity"
      aria-hidden={clone || undefined}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={clone ? "" : `Portrait of ${member.name}`}
          width={200}
          height={240}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-70"
        />
      ) : (
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,#0d2a1d,#06150e)]"
          aria-hidden
        />
      )}
      <div className="committee-identity__veil" aria-hidden />
      <div className="relative z-10 mt-auto p-5">
        <img
          src={member.flag}
          alt=""
          width={24}
          height={16}
          loading="lazy"
          decoding="async"
          className="h-4 w-6 object-cover"
        />
        <h3 className="mt-4 text-lg font-bold leading-[0.95] tracking-[-0.035em] text-bone">
          {member.name}
        </h3>
        <div className="committee-identity__detail mt-3 border-t border-white/18 pt-3">
          <p className="text-xs font-semibold leading-snug text-white/82">{member.role}</p>
          <p className="mt-1 text-[0.67rem] leading-relaxed text-white/58">{member.organisation}</p>
          <p className="mt-2 font-mono text-[0.52rem] uppercase tracking-[0.15em] text-lime/88">
            {member.country}
          </p>
        </div>
      </div>
    </article>
  );
}

export function CommitteeRailSection() {
  return (
    <section
      aria-labelledby="committee-rail-title"
      className="overflow-hidden bg-[#0b2117] py-16 text-white sm:py-20 lg:py-22"
    >
      <div className="shell">
        <AnimatedSection className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:items-end">
          <div>
            <h2
              id="committee-rail-title"
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Meet the Committees
            </h2>
          </div>
          <p className="max-w-2xl border-l border-lime/55 pl-4 text-sm leading-6 text-white/75 sm:pl-6 sm:text-base">
            {committeeIntro}
          </p>
        </AnimatedSection>
      </div>
      <div className="committee-rail mt-10" aria-label="AIAIAC Africa technical committee">
        <div className="committee-rail__track">
          <div className="committee-rail__group">
            {committeeMembers.map((member) => (
              <CommitteeIdentity key={member.name} member={member} />
            ))}
          </div>
          <div className="committee-rail__group" aria-hidden="true">
            {committeeMembers.map((member) => (
              <CommitteeIdentity key={`clone-${member.name}`} member={member} clone />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
