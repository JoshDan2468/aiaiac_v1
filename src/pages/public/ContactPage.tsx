import { AnimatedSection } from "@/components/common/AnimatedSection";
import { PageHero } from "@/components/layout/PageHero";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { conference } from "@/data/conference";
import { activeEventNotice } from "@/data/event";

export function ContactPage() {
  return (
    <PublicPageLayout
      title="Contact | AIAIAC West Africa 2027"
      description="Contact the approved AIAIAC organiser for conference, exhibition and sponsorship enquiries."
    >
      <PageHero
        eyebrow="Contact"
        title="Start a conversation with the AIAIAC team"
        description="Use the organiser contact details below for conference, exhibition, sponsorship and participation questions."
        status={activeEventNotice}
        variant="compact"
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-5">
            <p className="eyebrow text-emerald-deep">Organiser</p>
            <h2 className="display-lg mt-6 text-mineral">{conference.contact.organiser}</h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              {conference.contact.organiserBlurb}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <address className="not-italic">
              <div className="border-t border-border py-7">
                <p className="eyebrow text-muted-foreground">Email</p>
                <a
                  href={`mailto:${conference.contact.email}`}
                  className="mt-3 inline-flex min-h-11 items-center font-display text-2xl font-bold text-mineral hover:text-emerald-deep"
                >
                  {conference.contact.email}
                </a>
              </div>
              <div className="border-y border-border py-7">
                <p className="eyebrow text-muted-foreground">Telephone</p>
                <a
                  href={`tel:${conference.contact.phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex min-h-11 items-center font-display text-2xl font-bold text-mineral hover:text-emerald-deep"
                >
                  {conference.contact.phone}
                </a>
              </div>
            </address>
            <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
              No unconfirmed venue address or social account is published on this page.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </PublicPageLayout>
  );
}
