import { AnimatedSection } from "@/components/common/AnimatedSection";
import { ActionLink } from "@/components/common/ActionButton";

export function ParticipationCtaSection() {
  return (
    <section className="bg-[#071C13] py-20 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell text-center">
        <AnimatedSection className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Contribute to the Technical Dialogue
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Do you have operational case studies, integrity frameworks, or AI/OT cybersecurity
            advancements to share with West Africa&apos;s leading operators?
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ActionLink to="/conferences" variant="primary">
              Submit an Abstract
            </ActionLink>
            <ActionLink to="/registration" variant="outline">
              Explore Delegate Passes
            </ActionLink>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
