import { AnimatedSection } from "@/components/common/AnimatedSection";
import { PageHero } from "@/components/layout/PageHero";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { RegistrationTypeCard } from "@/components/registration/RegistrationTypeCard";
import { activeEvent, activeEventNotice } from "@/data/event";
import { registrationOptions } from "@/data/registration";

export function RegistrationPage() {
  return (
    <PublicPageLayout
      title="Registration | AIAIAC West Africa 2027"
      description="Choose the current AIAIAC delegate, exhibitor or sponsor participation route."
    >
      <PageHero
        eyebrow="Registration"
        title="Choose your route into AIAIAC"
        description="Explore the participation route that fits you or your organisation while the 2027 requirements and registration timetable are being confirmed."
        status={`${activeEvent.edition} registration status: ${activeEvent.registrationStatus.replaceAll("-", " ")}. ${activeEventNotice}`}
        variant="compact"
      />

      <section className="bg-muted py-24 lg:py-32">
        <div className="shell">
          <AnimatedSection>
            <p className="eyebrow text-emerald-deep">Participation categories</p>
            <h2 className="display-lg mt-6 max-w-4xl text-mineral">
              One clear flow for each participation intent
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Delegate, exhibitor and sponsor interest routes are currently available. Additional
              participation categories will appear here when approved by the organiser.
            </p>
          </AnimatedSection>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {registrationOptions.map((option, index) => (
              <AnimatedSection key={option.id} delay={index * 0.08}>
                <RegistrationTypeCard option={option} index={index} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
}
