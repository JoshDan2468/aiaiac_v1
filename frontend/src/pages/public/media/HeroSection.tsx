import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import mediaHeroImage from "@/data/AIAC_images/image6.jpg";

export function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-[#071C13] pb-16 pt-32 text-[#F7F5EF] sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#F7F5EF] sm:text-6xl lg:text-7xl">
              Media & <br />
              <span className="text-[#CFEA3B]">Highlights</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
              News, event updates, photographs and media resources from AIAIAC Africa.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#highlights"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#CFEA3B] px-6 text-sm font-semibold text-[#102C20] transition-colors hover:bg-[#b8d62c]"
              >
                View Highlights
              </a>
              <ActionLink to="/contact" variant="outline">
                Contact Media Team
              </ActionLink>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-[#214A36]/50 bg-[#123326] shadow-xl">
              <img
                src={mediaHeroImage}
                alt="AIAIAC Africa conference delegates and media engagement"
                width="1200"
                height="800"
                loading="eager"
                decoding="async"
                className="aspect-4/3 w-full object-cover sm:aspect-16/11 lg:aspect-4/3"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </header>
  );
}
