import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { exhibitionImage } from "@/data/media";

export function OpportunitySection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <AnimatedSection className="lg:col-span-7">
          <MagneticCard>
            <figure className="image-cut relative aspect-[16/11] overflow-hidden bg-mineral">
              <img
                src={exhibitionImage}
                alt="Previous AIAIAC exhibition environment"
                width="900"
                height="620"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mineral/55 via-transparent to-forest/20" />
              <figcaption className="absolute bottom-6 left-6 border-l-2 border-emerald pl-4 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                Previous edition exhibition imagery
              </figcaption>
            </figure>
          </MagneticCard>
        </AnimatedSection>
        <SectionHeader
          eyebrow="Business opportunity"
          title="Technology. Connection. Visibility."
          description="AIAIAC is designed to support substantive technical conversations around products, services and solutions—not just passive brand exposure. The 2027 venue and floor plan remain unconfirmed."
          className="lg:col-span-4 lg:col-start-9"
        />
      </div>
    </section>
  );
}
