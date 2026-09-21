import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { conference } from "@/data/conference";

export function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden bg-[#071C13] pb-16 pt-32 text-[#F7F5EF] sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="shell">
        <AnimatedSection className="max-w-4xl">
          <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#F7F5EF] sm:text-6xl lg:text-7xl">
            Register Your <br />
            <span className="text-[#CFEA3B]">Interest</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Choose how you would like to participate in AIAIAC Africa 2027.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-[#CADB7E]">
            <span>22–23 June 2027</span>
            <span className="text-white/30">•</span>
            <span>{conference.venue}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ActionLink to="/registration/delegate" variant="primary">
              Register as Delegate
            </ActionLink>
            <a
              href="#participation-options"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-transparent px-6 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10"
            >
              Explore Participation Options
            </a>
          </div>
        </AnimatedSection>
      </div>
    </header>
  );
}
