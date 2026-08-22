import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactDetails, contactHero } from "@/data/contact";

export function HeroSection() {
  return (
    <section className="on-navy relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="grid-lines absolute inset-0 -z-10 opacity-30" aria-hidden />
      <div
        className="absolute -right-32 top-12 -z-10 h-96 w-96 rounded-full bg-forest/25 blur-3xl"
        aria-hidden
      />

      <div className="shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3 lg:pb-3">
            <p className="eyebrow text-emerald">{contactHero.eyebrow}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {contactHero.supporting}
            </p>
          </div>

          <h1 className="text-[clamp(2.65rem,8.1vw,8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.05em] text-white lg:col-span-9 lg:text-[clamp(4rem,6.5vw,7rem)]">
            <span className="block">Let&apos;s start</span>{" "}
            <span className="block text-emerald lg:text-right">a conversation.</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection
          delay={0.08}
          className="mt-12 border-y border-white/15 lg:ml-[25%] lg:mt-16"
        >
          <div className="grid sm:grid-cols-3">
            <div className="border-b border-white/15 px-1 py-5 sm:border-b-0 sm:border-r sm:px-5">
              <span className="numeral text-xs text-emerald">01</span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
                Conference enquiries
              </p>
            </div>
            <div className="border-b border-white/15 px-1 py-5 sm:border-b-0 sm:border-r sm:px-5">
              <span className="numeral text-xs text-emerald">02</span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
                {contactDetails.email}
              </p>
            </div>
            <div className="px-1 py-5 sm:px-5">
              <span className="numeral text-xs text-emerald">03</span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
                Email-app hand-off
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
