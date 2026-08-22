import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function JoinCtaSection() {
  return (
    <section className="on-navy relative overflow-hidden py-24 lg:py-36">
      <div className="grid-lines absolute inset-0 opacity-25" aria-hidden />
      <div className="shell relative">
        <AnimatedSection className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-emerald">Join the exchange</p>
            <h2 className="mt-7 text-[clamp(2.7rem,7vw,7rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.045em] text-white">
              Bring your perspective into the room.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-base leading-relaxed text-white/68">
              Explore the conference focus, choose a participation route or speak with the team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="/registration" size="lg">
                Registration options
              </ActionLink>
              <ActionLink to="/contact" size="lg" variant="outline" className="text-white">
                Contact the team
              </ActionLink>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
