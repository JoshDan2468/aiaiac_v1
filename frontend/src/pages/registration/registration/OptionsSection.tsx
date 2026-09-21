import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import type { RegistrationCategoryId } from "@/data/registration";
import {
  Users,
  Building2,
  Award,
  Store,
  FileSpreadsheet,
  Newspaper,
  ArrowRight,
} from "lucide-react";

type OptionsSectionProps = {
  onOpenJourney: (categoryId: RegistrationCategoryId, launchElement: HTMLButtonElement) => void;
  onShowDownloadCentre: (launchElement: HTMLButtonElement) => void;
};

export function OptionsSection({ onOpenJourney }: OptionsSectionProps) {
  return (
    <section
      id="participation-options"
      className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28"
      aria-labelledby="participation-options-heading"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="participation-options-heading"
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl"
          >
            Participation Options
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Choose how you would like to participate in AIAIAC Africa 2027. All options include
            streamlined registration, venue access, and dedicated coordination support.
          </p>
        </AnimatedSection>

        <div className="mt-14 space-y-16">
          {/* GROUP 1: ATTEND */}
          <div>
            <div className="border-b border-white/15 pb-3">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#CFEA3B]">
                Conference Attendance
              </h3>
              <p className="mt-1 text-xs text-[#B6C2BA]">
                Individual &amp; Corporate Team Delegate Passes
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Option 1: Individual Delegate */}
              <article className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                      <Users className="size-5" />
                    </div>
                    <span className="rounded-md bg-[#214A36]/60 px-2.5 py-0.5 text-xs font-semibold text-[#CFEA3B]">
                      Full Delegate Pass
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    Individual Delegate Pass
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    Full conference access for engineers, inspectors, asset managers, and OT
                    specialists.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#F7F5EF] sm:text-sm">
                    <li className="flex items-center gap-2">
                      ✓ Access to 2 Technical Conference Halls
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Access to Innovation Showcase &amp; Exhibition Floor
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Official Delegate Kit &amp; Technical Proceedings
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Daily Lunch &amp; Executive Networking Receptions
                    </li>
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <Link
                    to="/registration/delegate"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#CFEA3B] px-4 text-xs font-bold uppercase tracking-wider text-[#102C20] transition-colors hover:bg-[#b8d62c]"
                  >
                    Register as Delegate <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>

              {/* Option 2: Corporate Group */}
              <article className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                      <Building2 className="size-5" />
                    </div>
                    <span className="rounded-md bg-[#214A36]/60 px-2.5 py-0.5 text-xs font-semibold text-[#CADB7E]">
                      Group Booking
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    Corporate Delegation (5+ Delegates)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    Dedicated account management, consolidated corporate invoicing, and team
                    accreditation for operating companies and EPCs.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#F7F5EF] sm:text-sm">
                    <li className="flex items-center gap-2">
                      ✓ Consolidated Corporate Invoicing &amp; Group Billing
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Dedicated Onsite Group Registration Desk
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Reserved Seating in Opening &amp; Plenary Keynotes
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Enterprise Delegate Briefing &amp; Materials
                    </li>
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={(e) => onOpenJourney("delegate", e.currentTarget)}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 text-xs font-bold uppercase tracking-wider text-[#F7F5EF] transition-colors hover:bg-white/10"
                  >
                    Book Corporate Delegation <ArrowRight className="size-4" />
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* GROUP 2: PARTNER & EXHIBIT */}
          <div>
            <div className="border-b border-white/15 pb-3">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#CFEA3B]">
                Commercial Partnership
              </h3>
              <p className="mt-1 text-xs text-[#B6C2BA]">
                Sponsorship Levels &amp; Exhibition Space
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Option 3: Exhibition Stand */}
              <article className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                      <Store className="size-5" />
                    </div>
                    <span className="rounded-md bg-[#214A36]/60 px-2.5 py-0.5 text-xs font-semibold text-[#CFEA3B]">
                      Exhibition Space
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    Exhibition Stand (9 – 36 sqm)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    Showcase engineering hardware, inspection tools, autonomous systems, or software
                    directly to operating decision-makers.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#F7F5EF] sm:text-sm">
                    <li className="flex items-center gap-2">
                      ✓ Shell Scheme or Custom Space-Only Formats
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Complimentary Exhibitor Delegate Passes
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Full Listing in Official Directory &amp; Floor Plan
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Standard Power, Fascia Board &amp; Spotlights
                    </li>
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={(e) => onOpenJourney("exhibitor", e.currentTarget)}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#CFEA3B] px-4 text-xs font-bold uppercase tracking-wider text-[#102C20] transition-colors hover:bg-[#b8d62c]"
                  >
                    Enquire for Exhibition Stand <ArrowRight className="size-4" />
                  </button>
                </div>
              </article>

              {/* Option 4: Sponsorship */}
              <article className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                      <Award className="size-5" />
                    </div>
                    <span className="rounded-md bg-[#214A36]/60 px-2.5 py-0.5 text-xs font-semibold text-[#CADB7E]">
                      Sponsorship
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    Strategic Sponsorship (Title – Silver)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    High-level positioning, thought leadership keynote alignment, and exclusive VIP
                    reception hosting.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#F7F5EF] sm:text-sm">
                    <li className="flex items-center gap-2">
                      ✓ Plenary Keynote / Panel Contribution Slot
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Mainstage &amp; Stage-Side Premium Branding
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ VIP Executive Networking Access &amp; Passes
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Comprehensive Press &amp; Media Campaign Coverage
                    </li>
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={(e) => onOpenJourney("sponsorship", e.currentTarget)}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 text-xs font-bold uppercase tracking-wider text-[#F7F5EF] transition-colors hover:bg-white/10"
                  >
                    Enquire for Sponsorship <ArrowRight className="size-4" />
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* GROUP 3: TECHNICAL & MEDIA */}
          <div>
            <div className="border-b border-white/15 pb-3">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#CFEA3B]">
                Technical &amp; Media Participation
              </h3>
              <p className="mt-1 text-xs text-[#B6C2BA]">
                Call for Papers &amp; Press Accreditation
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Option 5: Call for Papers */}
              <article className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                      <FileSpreadsheet className="size-5" />
                    </div>
                    <span className="rounded-md bg-[#214A36]/60 px-2.5 py-0.5 text-xs font-semibold text-[#CFEA3B]">
                      Authors &amp; Presenters
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    Submit an Abstract / Paper
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    Submit technical research, case studies, or operational methodologies across
                    Asset Integrity, AI, Automation, or Cybersecurity.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#F7F5EF] sm:text-sm">
                    <li className="flex items-center gap-2">✓ Technical Committee Review</li>
                    <li className="flex items-center gap-2">
                      ✓ Presentation in Dedicated Technical Session
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Publication in Official Conference Proceedings
                    </li>
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <Link
                    to="/conferences#submit-abstract"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#CFEA3B] px-4 text-xs font-bold uppercase tracking-wider text-[#102C20] transition-colors hover:bg-[#b8d62c]"
                  >
                    View Submission Guidelines <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>

              {/* Option 6: Media Partner */}
              <article className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                      <Newspaper className="size-5" />
                    </div>
                    <span className="rounded-md bg-[#214A36]/60 px-2.5 py-0.5 text-xs font-semibold text-[#CADB7E]">
                      Press &amp; Media
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    Media Partner &amp; Press Pass
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    Editorial accreditation, interview access with keynote authorities, and
                    dedicated press room facilities.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#F7F5EF] sm:text-sm">
                    <li className="flex items-center gap-2">
                      ✓ Official Press Accreditation Badge
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Access to Keynote Press Conferences &amp; Speakers
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Access to Media Centre &amp; High-Speed Workspaces
                    </li>
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={(e) => onOpenJourney("media-partnership", e.currentTarget)}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 text-xs font-bold uppercase tracking-wider text-[#F7F5EF] transition-colors hover:bg-white/10"
                  >
                    Apply for Media Pass <ArrowRight className="size-4" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
