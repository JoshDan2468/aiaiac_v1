import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactDetails } from "@/data/contact";

export function ContactDetailsSection() {
  return (
    <section className="bg-bone py-20 lg:py-28">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <AnimatedSection className="lg:col-span-5">
          <p className="eyebrow text-emerald-deep">Direct contact</p>
          <h2 className="display-lg mt-6 max-w-2xl text-mineral">Direct routes. No detours.</h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Reach the conference team directly, or use the enquiry workspace below to prepare the
            details your email app needs.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <address className="not-italic">
            <div className="border-t border-mineral/20 py-7 sm:py-9">
              <p className="eyebrow text-muted-foreground">General conference enquiries</p>
              <a
                href={`mailto:${contactDetails.email}`}
                className="mt-4 inline-flex min-h-11 max-w-full items-center break-all font-display text-[clamp(1.3rem,3vw,2.7rem)] font-extrabold leading-tight tracking-[-0.03em] text-mineral transition-colors hover:text-emerald-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-deep sm:break-normal"
              >
                {contactDetails.email}
              </a>
            </div>

            <div className="border-y border-mineral/20 py-7 sm:py-9">
              <p className="eyebrow text-muted-foreground">Telephone</p>
              <a
                href={`tel:${contactDetails.phoneHref}`}
                className="mt-4 inline-flex min-h-11 items-center font-display text-[clamp(1.5rem,3vw,2.7rem)] font-extrabold leading-tight tracking-[-0.03em] text-mineral transition-colors hover:text-emerald-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-deep"
              >
                {contactDetails.phone}
              </a>
            </div>
          </address>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground">
            No unconfirmed venue or office address is published on this page.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
