import { AnimatedSection } from "@/components/common/AnimatedSection";
import { conference } from "@/data/conference";

export function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden bg-[#071C13] pb-16 pt-32 text-[#F7F5EF] sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="shell">
        <AnimatedSection className="max-w-4xl">
          <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#F7F5EF] sm:text-6xl lg:text-7xl">
            Speakers & <br />
            <span className="text-[#CFEA3B]">Thought Leaders</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Meet the industry leaders, technical specialists and professionals contributing to
            AIAIAC Africa 2027.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-[#CADB7E]">
            <span>22–23 June 2027</span>
            <span className="text-white/30">•</span>
            <span>{conference.venue}</span>
          </div>
        </AnimatedSection>
      </div>

      {/* Grounding Strip */}
      <div className="mt-12 border-t border-white/10 bg-[#04140D] py-4 text-[#F7F5EF] sm:py-5">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#CFEA3B]">
              AIAIAC Africa 2027
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
            <span className="text-xs text-[#B6C2BA] sm:text-sm">
              Asset Integrity • Artificial Intelligence • Automation • Cybersecurity
            </span>
          </div>
          <span className="text-xs font-medium text-[#CADB7E]">
            Confirmed Leadership &amp; Technical Directory
          </span>
        </div>
      </div>
    </header>
  );
}
