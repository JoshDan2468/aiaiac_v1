import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CTASection } from "@/components/common/CTASection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { activeEventNotice } from "@/data/event";
import { pillars } from "@/data/media";

const audiences = [
  "Energy operators and asset owners",
  "Integrity, reliability and process safety professionals",
  "Automation, digital and OT cybersecurity leaders",
  "Regulators, engineers and technical consultants",
  "Technology providers, exhibitors and industry partners",
];

export function AboutPage() {
  return (
    <PublicPageLayout
      title="About AIAIAC West Africa 2027"
      description="AIAIAC West Africa connects the disciplines protecting and modernising critical energy infrastructure."
    >
      <PageHero
        eyebrow="About AIAIAC"
        title="One platform. Four critical disciplines."
        description="AIAIAC West Africa brings asset integrity, artificial intelligence, automation and cybersecurity into one industry conversation for safer, smarter and more resilient operations."
        status={activeEventNotice}
        variant="editorial"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <SectionHeader
            eyebrow="Purpose"
            title="Where operational resilience is engineered"
            description="AIAIAC is an industry-led exchange for practical knowledge, regional experience, global methods and the technologies transforming asset-intensive operations."
            className="lg:col-span-5"
          />
          <AnimatedSection delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <p>
                The platform is designed around the shared reality of modern infrastructure:
                physical integrity, intelligent decision-making, automated control and cyber
                resilience can no longer be treated in isolation.
              </p>
              <p>
                Through technical exchange, peer connection and solution discovery, AIAIAC supports
                the people responsible for maintaining safe, reliable and digitally resilient
                operations across West Africa and beyond.
              </p>
            </div>
            <ActionLink to="/conferences" variant="outline" className="mt-9 text-mineral">
              Explore conference focus
            </ActionLink>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted py-24 lg:py-32">
        <div className="shell">
          <SectionHeader eyebrow="Industry focus" title="Four connected pillars" />
          <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <AnimatedSection key={pillar.index} delay={index * 0.06}>
                <MagneticCard>
                  <article className="group relative min-h-[28rem] overflow-hidden border-border bg-mineral sm:border-r">
                    <img
                      src={pillar.image}
                      alt=""
                      width="500"
                      height="650"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-38 grayscale transition-[transform,filter,opacity] duration-700 group-hover:scale-[1.03] group-hover:opacity-55 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mineral via-mineral/45 to-mineral/10" />
                    <div className="relative flex min-h-[28rem] flex-col justify-between p-7">
                      <span className="numeral text-sm text-emerald">{pillar.index}</span>
                      <div>
                        <h2 className="display-md text-white">{pillar.title}</h2>
                        <p className="mt-5 text-sm leading-relaxed text-white/70">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </MagneticCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <SectionHeader
            eyebrow="Who should attend"
            title="Built for the people carrying operational responsibility"
            className="lg:col-span-6"
          />
          <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t border-border">
              {audiences.map((audience, index) => (
                <li
                  key={audience}
                  className="flex gap-5 border-b border-border py-5 text-sm text-muted-foreground"
                >
                  <span className="numeral text-emerald-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {audience}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        eyebrow="Join the exchange"
        title="Prepare for AIAIAC West Africa 2027"
        description="Choose the participation route that fits your organisation while programme details are being confirmed."
        primaryLabel="Registration options"
        primaryTo="/registration"
        secondaryLabel="Contact the team"
        secondaryTo="/contact"
      />
    </PublicPageLayout>
  );
}
