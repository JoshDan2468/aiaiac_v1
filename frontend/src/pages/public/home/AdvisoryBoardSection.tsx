import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CommitteeLoop } from "@/components/committee/CommitteeLoop";
import { advisoryBoardMembers } from "@/data/advisoryBoard";
import type { TechnicalCommitteeMember } from "@/types";

export function AdvisoryBoardSection() {
  const mappedMembers: TechnicalCommitteeMember[] = advisoryBoardMembers.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    organisation: m.organisation,
    image: m.image ?? "",
    ...(m.countryCode ? { countryCode: m.countryCode } : {}),
    ...(m.organisationLogo ? { organisationLogo: m.organisationLogo } : {}),
  }));

  // 12 members split into 2 rows of 6
  const row1 = mappedMembers.slice(0, 6);
  const row2 = mappedMembers.slice(6);

  return (
    <section
      id="advisory-board"
      aria-labelledby="advisory-board-title"
      className="on-navy relative overflow-hidden bg-[#031008] py-16 text-white lg:py-24 border-t border-white/10"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl border-l-2 border-lime pl-5 sm:pl-7">
          <h2
            id="advisory-board-title"
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Advisory Board
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Distinguished industry leaders and senior experts guiding the strategic direction and
            technical excellence of AIAIAC 2027.
          </p>
        </AnimatedSection>
      </div>

      <div className="mt-12 space-y-6 lg:mt-16">
        <CommitteeLoop
          members={row1}
          direction="right"
          durationSeconds={56}
          label="Advisory Board Row 1"
        />
        <CommitteeLoop
          members={row2}
          direction="left"
          durationSeconds={64}
          label="Advisory Board Row 2"
        />
      </div>
    </section>
  );
}
