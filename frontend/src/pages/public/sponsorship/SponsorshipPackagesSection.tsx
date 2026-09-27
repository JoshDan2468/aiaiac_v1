import { AnimatedSection } from "@/components/common/AnimatedSection";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

interface SponsorshipTier {
  id: string;
  title: string;
  enquiryName: string;
  scope: string;
  highlights: readonly string[];
}

const sponsorshipTiers: readonly SponsorshipTier[] = [
  {
    id: "title",
    title: "Title Sponsor",
    enquiryName: "Title Sponsorship",
    scope: "Supreme Event Leadership",
    highlights: [
      "Keynote address slot during opening plenary",
      "Premium double exhibition stand in central atrium",
      "Prime logo placement on all mainstage and digital graphics",
      "VIP networking and executive boardroom access",
    ],
  },
  {
    id: "strategic",
    title: "Strategic Sponsor",
    enquiryName: "Strategic Sponsorship",
    scope: "Strategic Industry Partner",
    highlights: [
      "Plenary session speaking and panel contribution position",
      "Prominent exhibition stand in main hall",
      "Branded conference collateral and delegate materials",
      "Executive pass allocation and gala dinner access",
    ],
  },
  {
    id: "diamond",
    title: "Diamond Sponsor",
    enquiryName: "Diamond Sponsorship",
    scope: "Diamond Pillar Partner",
    highlights: [
      "Technical track session chairing and presentation slot",
      "Premium exhibition booth space",
      "High-visibility branding across digital media and badges",
      "Dedicated delegate invitations and VIP passes",
    ],
  },
  {
    id: "platinum",
    title: "Platinum Sponsor",
    enquiryName: "Platinum Sponsorship",
    scope: "Platinum Partner",
    highlights: [
      "Panel discussion participation in dedicated track",
      "Exhibition booth space in primary exhibition hall",
      "Brand visibility in official conference directory",
      "Complimentary delegate pass bundle",
    ],
  },
  {
    id: "gold",
    title: "Gold Sponsor",
    enquiryName: "Gold Sponsorship",
    scope: "Gold Partner",
    highlights: [
      "Specialist session recognition and digital presence",
      "Dedicated exhibition space",
      "Marketing collateral inclusion in delegate pack",
      "Corporate delegate passes",
    ],
  },
  {
    id: "silver",
    title: "Silver Sponsor",
    enquiryName: "Silver Sponsorship",
    scope: "Silver Partner",
    highlights: [
      "Brand listing across conference web portals",
      "Standard exhibition space",
      "Official conference directory recognition",
      "Delegate passes for company representatives",
    ],
  },
];

export function SponsorshipPackagesSection() {
  return (
    <section
      id="packages"
      aria-labelledby="sponsorship-opportunities-title"
      className="bg-[#E8EEE8] py-20 text-[#102C20] sm:py-24 lg:py-28"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="sponsorship-opportunities-title"
            className="font-display text-3xl font-extrabold tracking-tight text-[#102C20] sm:text-4xl lg:text-[44px]"
          >
            Sponsorship Opportunities
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#3F5347]">
            Structured partnership levels designed to align your corporate objectives with regional
            technical leadership and high-value industrial engagements.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 lg:gap-8">
          {sponsorshipTiers.map((tier, index) => (
            <AnimatedSection key={tier.id} delay={index * 0.04}>
              <article className="flex h-full flex-col justify-between rounded-[20px] border border-[#D8DDD5] bg-[#F6F2E8] p-7 sm:p-9 shadow-xs transition-shadow hover:shadow-md">
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#102C20] sm:text-[26px]">
                    {tier.title}
                  </h3>

                  <ul className="mt-6 space-y-3.5 text-[15.5px] leading-relaxed text-[#4F6258]">
                    {tier.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <svg
                          className="mt-1 size-4 shrink-0 text-[#3D5A47]"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M13.3334 4L6.00008 11.3333L2.66675 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 pt-2">
                  <a
                    href={getWhatsAppEnquiryUrl(
                      "SPONSORSHIP",
                      `Hello AIAIAC Africa team. I would like information about ${tier.enquiryName} for AIAIAC Africa 2027.`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-[50px] w-full items-center justify-center rounded-[14px] bg-[#173D2D] px-6 text-[15px] font-semibold text-[#F7F5EF] transition-colors hover:bg-[#102C20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173D2D]"
                  >
                    <span>Enquire About {tier.enquiryName}</span>
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
