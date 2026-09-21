import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import sponsorshipHeroImage from "@/data/AIAC_images/image3.jpg";
import { conference } from "@/data/conference";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

export function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-[#071C13] pb-16 pt-32 text-[#F7F5EF] sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#F7F5EF] sm:text-6xl lg:text-7xl">
              Partner with <br />
              <span className="text-[#CFEA3B]">AIAIAC Africa 2027</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
              Connect your organisation with professionals and decision-makers across asset
              integrity, artificial intelligence, automation and cybersecurity.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-[#CADB7E]">
              <span>22–23 June 2027</span>
              <span className="text-white/30">•</span>
              <span>{conference.venue}</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ActionLink to="/registration/sponsor" variant="primary">
                Make a Sponsorship Enquiry
              </ActionLink>
              <a
                href={getWhatsAppEnquiryUrl("SPONSORSHIP")}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(247,245,239,0.28)] bg-transparent px-5 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-white/10"
              >
                WhatsApp Commercial Desk
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-[#214A36]/50 bg-[#123326] shadow-xl">
              <img
                src={sponsorshipHeroImage}
                alt="AIAIAC Africa partnership presentation and industry leadership on stage"
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
