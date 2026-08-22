import { AnimatedSection } from "@/components/common/AnimatedSection";
import { RegistrationTypeCard } from "@/components/registration/RegistrationTypeCard";
import { registrationOptions } from "@/data/registration";

export function OptionsSection() {
  return (
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
  );
}
