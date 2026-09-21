import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { aboutMedia } from "@/data/about";

export function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-[#05190F] pb-16 pt-32 text-[#F7F5EF] sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Left Column: Heading + Direct Introduction + CTAs */}
          <AnimatedSection className="lg:col-span-7">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-[#F7F5EF] sm:text-5xl lg:text-[62px]">
              About AIAIAC Africa 2027
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#C1CCC4] sm:text-lg">
              AIAIAC Africa 2027 is an industry conference and innovation showcase bringing together
              professionals across asset integrity, artificial intelligence, automation and
              cybersecurity.
            </p>
            <p className="mt-3 text-base font-medium text-[#CFEA3B]">
              The event will take place in Lagos, Nigeria, on 22–23 June 2027.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/registration"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#CFEA3B] px-6 text-sm font-semibold text-[#102C20] transition-colors hover:bg-[#b8d62c]"
              >
                <span>Register Interest</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/conferences"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(247,245,239,0.28)] bg-transparent px-6 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-white/10"
              >
                <span>Explore Conferences</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </AnimatedSection>

          {/* Right Column: Approved Conference Photo (Naturally integrated) */}
          <AnimatedSection delay={0.08} className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg bg-[#0A2417]">
              <img
                src={aboutMedia.hero.src}
                alt={aboutMedia.hero.alt}
                width={aboutMedia.hero.width}
                height={aboutMedia.hero.height}
                loading="eager"
                decoding="async"
                className="aspect-4/3 w-full object-cover sm:aspect-16/11 lg:aspect-4/3"
                style={{ objectPosition: aboutMedia.hero.objectPosition }}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </header>
  );
}
