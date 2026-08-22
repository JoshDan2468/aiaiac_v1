import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function OrganiserSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="shell">
        <AnimatedSection className="grid gap-10 border-y border-mineral/20 py-10 lg:grid-cols-12 lg:items-center lg:py-14">
          <div className="lg:col-span-3">
            <p className="eyebrow text-emerald-deep">Organised by</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The organising team behind AIAIAC West Africa.
            </p>
          </div>

          <div className="flex min-h-44 items-center justify-center bg-mineral p-7 sm:p-10 lg:col-span-4">
            <img
              src="/brand/G-expert-logo-invert.png"
              alt="Global Experts Consultoria"
              width="406"
              height="369"
              loading="lazy"
              decoding="async"
              className="h-32 w-full max-w-52 object-contain sm:h-36"
            />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-3xl font-extrabold uppercase leading-none text-mineral sm:text-4xl">
              Global Experts Consultoria
            </h2>
            <ActionLink to="/contact" variant="outline" className="mt-8 text-mineral">
              Contact the organising team
            </ActionLink>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
