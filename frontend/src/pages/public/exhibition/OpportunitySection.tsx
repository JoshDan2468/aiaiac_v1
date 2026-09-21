import { AnimatedSection } from "@/components/common/AnimatedSection";
import exhibitionPhoto from "@/data/AIAC_images/image2.jpg";

export function OpportunitySection() {
  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-[#214A36]/20 bg-[#071C13] shadow-lg">
              <img
                src={exhibitionPhoto}
                alt="AIAIAC Africa exhibition environment and technology demonstration booths"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                className="aspect-16/10 w-full object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="lg:col-span-5">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl">
              The Exhibition Environment
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#58675F]">
              The exhibition floor is integrated alongside the conference halls, ensuring continuous
              delegate movement between plenary addresses, technical sessions, and technology
              booths.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#2D5443]">
              <p>
                • Shell scheme stands equipped with standard lighting, power, and company fascia
              </p>
              <p>• Space-only options available for custom technical demonstrations and rigs</p>
              <p>
                • Direct engagement with delegates during coffee breaks, lunches, and networking
                receptions
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
