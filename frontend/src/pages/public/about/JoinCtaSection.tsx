import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { conference } from "@/data/conference";

export function JoinCtaSection() {
  return (
    <section className="on-navy relative overflow-hidden bg-mineral py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />

      <div className="shell relative z-10 text-center">
        <AnimatedSection className="mx-auto max-w-3xl">
          <span className="eyebrow inline-block text-emerald">
            {conference.shortName} · {conference.dates} · {conference.city}, {conference.country}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Be Part of Africa's Industrial Future
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/78 sm:text-lg">
            Join energy ministers, asset owners, technology partners, and technical leaders in
            Lagos, Nigeria for West Africa’s premier industrial showcase.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
            <ActionLink to="/registration" size="lg" className="w-full sm:w-auto">
              Register for AIAIAC Africa 2027
            </ActionLink>
            <ActionLink
              to="/conferences"
              variant="outline"
              size="lg"
              className="w-full text-white sm:w-auto"
            >
              Explore the Conference
            </ActionLink>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
