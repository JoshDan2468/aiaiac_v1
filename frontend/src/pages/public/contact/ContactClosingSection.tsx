import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactMedia } from "@/data/contact";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

export function ContactClosingSection() {
  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-20 lg:py-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-[#214A36]/20 bg-[#071C13] shadow-lg">
              <img
                src={contactMedia.src}
                alt={contactMedia.alt}
                width={contactMedia.width}
                height={contactMedia.height}
                loading="lazy"
                decoding="async"
                className="aspect-16/10 w-full object-cover"
                style={{ objectPosition: contactMedia.objectPosition }}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="lg:col-span-5">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl">
              Join the Conversation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#58675F]">
              Whether you are preparing a paper abstract, exploring an exhibition stand, or booking
              a corporate delegation, our coordination team is on hand to assist.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ActionLink to="/registration" variant="primary">
                Register Interest
              </ActionLink>
              <a
                href={getWhatsAppEnquiryUrl("GENERAL")}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#102C20]/25 bg-transparent px-6 text-sm font-semibold text-[#102C20] transition-colors hover:bg-[#102C20]/5"
              >
                WhatsApp Desk
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
