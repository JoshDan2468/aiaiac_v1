import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LogoLoop } from "@/components/partners/LogoLoop";
import { sponsorTiers, sponsors } from "@/data/sponsors";

const sponsorsByTier = (tier: (typeof sponsorTiers)[number]["id"]) =>
  sponsors.filter((sponsor) => sponsor.tier === tier);
const educationalPartner = sponsorsByTier("knowledge")[0];

export function SponsorArchiveSection() {
  const associateSponsors = sponsorsByTier("associate");
  const exhibitors = sponsorsByTier("exhibitor");
  const supportingPartners = sponsorsByTier("supporting");
  const mediaPartners = sponsorsByTier("media");

  // Combine exhibitors and supporting partners for a rich marquee
  const allExhibitors = [...exhibitors, ...supportingPartners];

  return (
    <section
      id="sponsors"
      aria-label="Sponsors, exhibitors and partners"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="shell">
        <SectionHeader
          title="Partner Ecosystem"
          description="Leading industry organisations, technology providers, and media institutions shaping the future of industrial safety."
        />

        {/* Educational Partner Feature Card */}
        {educationalPartner ? (
          <AnimatedSection
            delay={0.1}
            className="mt-10 overflow-hidden rounded-2xl border border-lime/30 bg-[#071F18] text-white shadow-xl sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(14rem,0.4fr)] sm:items-center"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="text-xs font-bold uppercase tracking-widest text-lime">
                Educational Partner
              </span>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Asset Governance & Reliability Centre
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Pioneering research, technical standards, and executive education in asset integrity
                and AI-driven industrial risk management.
              </p>
            </div>
            <div className="flex min-h-36 items-center justify-center border-t border-white/12 bg-white/5 p-6 sm:min-h-44 sm:border-l sm:border-t-0">
              <img
                src={educationalPartner.logo}
                alt="Educational Partner logo"
                width={240}
                height={100}
                loading="lazy"
                decoding="async"
                className="max-h-20 w-auto max-w-[14rem] object-contain drop-shadow-md"
              />
            </div>
          </AnimatedSection>
        ) : null}
      </div>

      <div className="mt-12 space-y-10">
        {/* Associate Sponsors */}
        {associateSponsors.length > 0 && (
          <div>
            <div className="shell mb-4 flex items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-forest">
                Associate Sponsors
              </p>
              <span className="h-px flex-1 bg-mineral/15" aria-hidden />
            </div>
            <LogoLoop items={associateSponsors} tierLabel="Associate Sponsor" direction="right" />
          </div>
        )}

        {/* Exhibitors & Technology Partners */}
        {allExhibitors.length > 0 && (
          <div>
            <div className="shell mb-4 flex items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-forest">
                Exhibitors & Technology Partners
              </p>
              <span className="h-px flex-1 bg-mineral/15" aria-hidden />
            </div>
            <LogoLoop
              items={allExhibitors}
              tierLabel="Exhibitors & Technology Partners"
              direction="left"
            />
          </div>
        )}

        {/* Media Partners */}
        {mediaPartners.length > 0 && (
          <div>
            <div className="shell mb-4 flex items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-forest">
                Official Media Partners
              </p>
              <span className="h-px flex-1 bg-mineral/15" aria-hidden />
            </div>
            <LogoLoop items={mediaPartners} tierLabel="Media Partners" direction="right" />
          </div>
        )}
      </div>

      <div className="shell mt-12 flex justify-center">
        <ActionLink to="/registration/sponsor" variant="solidNavy" className="px-8 py-3 text-base">
          Explore Sponsorship Opportunities
        </ActionLink>
      </div>
    </section>
  );
}
