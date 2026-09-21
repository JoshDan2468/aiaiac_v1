import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import heroPoster from "@/data/AIAC_images/image4.jpg";

export function HeroSection() {
  return (
    <header className="relative min-h-[540px] w-full overflow-hidden bg-[#071C13] pb-16 pt-32 text-[#F7F5EF] sm:min-h-[580px] sm:pb-20 sm:pt-36 lg:min-h-[620px] lg:pb-24 lg:pt-44">
      {/* Immersive Video / Poster Background with Dark Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          className="h-full w-full object-cover opacity-35"
        >
          <source src="/assets/aiaiac-2027/videos/aiaiac-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071C13] via-[#071C13]/85 to-[#071C13]/70" />
      </div>

      <div className="shell relative z-10">
        <AnimatedSection className="max-w-4xl">
          <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#F7F5EF] sm:text-6xl lg:text-7xl">
            AIAIAC Africa 2027 <br />
            <span className="text-[#CFEA3B]">Conferences</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            The 2027 programme brings together technical discussions across asset integrity,
            artificial intelligence, automation and cybersecurity.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-[#CADB7E]">
            <span>22–23 June 2027</span>
            <span className="text-white/30">•</span>
            <span>Landmark Centre, Lagos, Nigeria</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ActionLink to="/registration" variant="primary">
              Submit an Abstract
            </ActionLink>
            <a
              href="#conferences"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-transparent px-6 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10"
            >
              Explore Conferences
            </a>
          </div>
        </AnimatedSection>
      </div>
    </header>
  );
}
