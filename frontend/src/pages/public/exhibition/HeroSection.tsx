import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import exhibitionHeroImage from "@/data/AIAC_images/image2.jpg";
import { conference } from "@/data/conference";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

export function HeroSection() {
  return (
    <header className="relative min-h-[540px] w-full overflow-hidden bg-[#071C13] pb-16 pt-32 text-[#F7F5EF] sm:min-h-[580px] sm:pb-20 sm:pt-36 lg:min-h-[620px] lg:pb-24 lg:pt-44">
      {/* Immersive Event Photography Background with Dark Green Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={exhibitionHeroImage}
          alt="AIAIAC Africa exhibition floor and technical demonstrations"
          className="h-full w-full object-cover opacity-35 filter saturate-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071C13] via-[#071C13]/85 to-[#071C13]/70" />
      </div>

      <div className="shell relative z-10">
        <AnimatedSection className="max-w-4xl">
          <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#F7F5EF] sm:text-6xl lg:text-7xl">
            Exhibit at <br />
            <span className="text-[#CFEA3B]">AIAIAC Africa 2027</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Present your products, services and technical solutions to industry professionals,
            decision-makers and organisations attending AIAIAC Africa 2027.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-[#CADB7E]">
            <span>22–23 June 2027</span>
            <span className="text-white/30">•</span>
            <span>{conference.venue}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ActionLink to="/registration/exhibitor" variant="primary">
              Make an Exhibition Enquiry
            </ActionLink>
            <ActionLink to="/brochure" variant="outline">
              Download Brochure
            </ActionLink>
            <a
              href={getWhatsAppEnquiryUrl("EXHIBITION")}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#25D366] px-5 text-sm font-semibold text-[#071C13] transition-transform hover:scale-[1.02] shadow-xs"
            >
              WhatsApp Exhibition Desk
            </a>
          </div>
        </AnimatedSection>
      </div>
    </header>
  );
}
