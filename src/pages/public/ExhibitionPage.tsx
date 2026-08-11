import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CTASection } from "@/components/common/CTASection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { activeEventNotice } from "@/data/event";
import { exhibitionImage } from "@/data/media";

const opportunities = [
  [
    "Demonstrate",
    "Place working technology and practical capability in front of the professionals responsible for critical assets.",
  ],
  [
    "Connect",
    "Build direct relationships with operators, engineers, regulators, partners and technical decision-makers.",
  ],
  [
    "Position",
    "Show how your organisation contributes to safer, smarter and more resilient energy operations.",
  ],
];

export function ExhibitionPage() {
  return (
    <PublicPageLayout
      title="Exhibition | AIAIAC West Africa 2027"
      description="Explore the AIAIAC exhibition opportunity for technology providers and solution partners."
    >
      <PageHero
        eyebrow="Exhibition"
        title="Put capability where industry decisions happen"
        description="The AIAIAC exhibition connects solution providers with the professionals improving integrity, automation, intelligence and cyber resilience across critical operations."
        status={activeEventNotice}
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <MagneticCard>
              <figure className="image-cut relative aspect-[16/11] overflow-hidden bg-mineral">
                <img
                  src={exhibitionImage}
                  alt="Previous AIAIAC exhibition environment"
                  width="900"
                  height="620"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mineral/55 via-transparent to-forest/20" />
                <figcaption className="absolute bottom-6 left-6 border-l-2 border-emerald pl-4 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  Previous edition exhibition imagery
                </figcaption>
              </figure>
            </MagneticCard>
          </AnimatedSection>
          <SectionHeader
            eyebrow="Business opportunity"
            title="Technology. Connection. Visibility."
            description="AIAIAC is designed to support substantive technical conversations around products, services and solutions—not just passive brand exposure. The 2027 venue and floor plan remain unconfirmed."
            className="lg:col-span-4 lg:col-start-9"
          />
        </div>
      </section>

      <section className="bg-muted py-24 lg:py-32">
        <div className="shell">
          <SectionHeader eyebrow="Why exhibit" title="A focused industry platform" />
          <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-3">
            {opportunities.map(([title, description], index) => (
              <AnimatedSection key={title} delay={index * 0.08}>
                <MagneticCard className="h-full">
                  <article className="h-full bg-background p-8 lg:min-h-80">
                    <span className="numeral text-sm text-emerald-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display-md mt-20 text-mineral">{title}</h2>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </article>
                </MagneticCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Exhibitor enquiry"
        title="Start a 2027 exhibition conversation"
        description="Submit your contact details now; package, stand and venue requirements will follow only when confirmed."
        primaryLabel="Exhibitor enquiry"
        primaryTo="/registration/exhibitor"
        secondaryLabel="Sponsorship"
        secondaryTo="/sponsorship"
      />
    </PublicPageLayout>
  );
}
