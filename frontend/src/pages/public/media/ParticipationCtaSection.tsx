import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

export function ParticipationCtaSection() {
  return (
    <section className="bg-[#071C13] py-20 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell text-center">
        <AnimatedSection className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Media Enquiries
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            For press credentials, interviews with committee members, media partnerships, or
            high-resolution event photography, reach out to our communications team.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ActionLink to="/contact" variant="primary">
              Contact the Media Team
            </ActionLink>
            <a
              href={getWhatsAppEnquiryUrl("GENERAL", "Media partner enquiry")}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#25D366] px-6 text-sm font-semibold text-[#071C13] transition-transform hover:scale-[1.02]"
            >
              WhatsApp Media Desk
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
