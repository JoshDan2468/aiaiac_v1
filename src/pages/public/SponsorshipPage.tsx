import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CTASection } from "@/components/common/CTASection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { activeEventNotice, previousEdition } from "@/data/event";
import { sponsorTiers, sponsors } from "@/data/sponsors";

const valuePoints = [
  "Position your organisation within a specialist technical community.",
  "Create meaningful visibility around the disciplines shaping resilient operations.",
  "Connect with operators, engineering leaders, regulators and technology stakeholders.",
];

export function SponsorshipPage() {
  return (
    <PublicPageLayout
      title="Sponsorship | AIAIAC West Africa 2027"
      description="Explore AIAIAC sponsorship value and the clearly labelled previous-edition partner archive."
    >
      <PageHero
        eyebrow="Sponsorship"
        title="Align your brand with resilient infrastructure"
        description="AIAIAC sponsorship creates a credible platform for organisations contributing to integrity, intelligence, automation and industrial cybersecurity."
        status={activeEventNotice}
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <SectionHeader
            eyebrow="Partnership value"
            title="Visibility with technical relevance"
            description="The 2027 sponsorship packages and categories are not yet confirmed. The value framework is built around contribution, connection and credible positioning."
            className="lg:col-span-6"
          />
          <ol className="lg:col-span-5 lg:col-start-8">
            {valuePoints.map((value, index) => (
              <AnimatedSection as="li" key={value} delay={index * 0.07}>
                <div className="flex gap-6 border-b border-border py-6">
                  <span className="numeral text-base text-emerald-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value}</p>
                </div>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted py-24 lg:py-32">
        <div className="shell">
          <SectionHeader
            eyebrow={previousEdition.label}
            title="Partner and sponsor archive"
            description="These organisations and tier labels are retained as historical evidence only; they do not indicate confirmed 2027 participation or package structure."
          />
          <div className="mt-14 space-y-12">
            {sponsorTiers.map((tier) => {
              const items = sponsors.filter((sponsor) => sponsor.tier === tier.id);
              return (
                <AnimatedSection key={tier.id}>
                  <div className="flex items-center gap-5">
                    <h2 className="eyebrow text-emerald-deep">Previous edition · {tier.label}</h2>
                    <span className="h-px flex-1 bg-border" aria-hidden />
                  </div>
                  <ul className="mt-7 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
                    {items.map((item) => (
                      <li key={item.id}>
                        <MagneticCard>
                          <div className="flex min-h-28 items-center justify-center bg-background p-5">
                            <img
                              src={item.logo}
                              alt={item.name ?? `${tier.label} organisation logo`}
                              width="180"
                              height="72"
                              loading="lazy"
                              decoding="async"
                              className="max-h-14 w-auto max-w-full object-contain"
                            />
                          </div>
                        </MagneticCard>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Sponsor enquiry"
        title="Open a 2027 partnership conversation"
        description="Share your organisation and contact details without committing to an unconfirmed package or category."
        primaryLabel="Sponsor enquiry"
        primaryTo="/registration/sponsor"
        secondaryLabel="Contact the team"
        secondaryTo="/contact"
      />
    </PublicPageLayout>
  );
}
