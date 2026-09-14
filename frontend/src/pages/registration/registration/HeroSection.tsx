import { AnimatedSection } from "@/components/common/AnimatedSection";
import { activeEvent, activeEventNotice } from "@/data/event";

export function HeroSection() {
  return (
    <section className="on-navy relative isolate overflow-hidden border-b border-white/12 pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-44">
      <div className="grid-lines absolute inset-0 -z-20 opacity-25" aria-hidden />
      <div
        className="absolute -right-28 top-14 -z-10 h-72 w-72 border border-emerald/20 bg-forest/20 sm:h-[30rem] sm:w-[30rem]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-[8%] -z-10 h-px w-[min(72%,48rem)] bg-emerald/70"
        aria-hidden
      />

      <div className="shell">
        <AnimatedSection className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="eyebrow text-emerald">AIAIAC Africa / {activeEvent.edition}</p>
            <h1 className="display-xl mt-6 max-w-5xl text-white">
              Registration is a <span className="text-emerald">decision.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Select the participation route that matches the contribution you want to make to the
              technical programme, exhibition and industry exchange.
            </p>
          </div>

          <aside
            className="border-l border-white/18 pl-5 lg:col-span-4 lg:mb-1 lg:pl-7"
            aria-label="Registration status"
          >
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/48">
              Participation desk
            </p>
            <p className="mt-3 text-sm font-semibold uppercase leading-relaxed tracking-[0.08em] text-white">
              {activeEvent.edition}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              {activeEventNotice}
            </p>
          </aside>
        </AnimatedSection>
      </div>
    </section>
  );
}
