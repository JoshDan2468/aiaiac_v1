import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactDetails } from "@/data/contact";
import { EVENT_CONTACT_CONFIG, getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export function ContactDetailsSection() {
  return (
    <section className="bg-[#F7F5EF] py-16 text-[#102C20] sm:py-20 lg:py-24">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl">
            Contact Channels
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F]">
            Reach our event management, delegate coordination, and commercial teams directly through
            official communication channels.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Email */}
          <AnimatedSection className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs">
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                <Mail className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-base font-bold uppercase tracking-tight text-[#102C20]">
                Email Enquiries
              </h3>
              <p className="mt-2 text-xs text-[#58675F]">
                General, speaker, and delegate communication
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#214A36]/10">
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-sm font-bold text-[#102C20] hover:text-[#2D5443] transition-colors break-all"
              >
                {contactDetails.email}
              </a>
            </div>
          </AnimatedSection>

          {/* Telephone */}
          <AnimatedSection
            delay={0.04}
            className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                <Phone className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-base font-bold uppercase tracking-tight text-[#102C20]">
                Telephone
              </h3>
              <p className="mt-2 text-xs text-[#58675F]">Direct line for conference operations</p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#214A36]/10">
              <a
                href={`tel:${EVENT_CONTACT_CONFIG.phoneFormatted}`}
                className="text-sm font-bold text-[#102C20] hover:text-[#2D5443] transition-colors"
              >
                {EVENT_CONTACT_CONFIG.phoneFormatted}
              </a>
            </div>
          </AnimatedSection>

          {/* WhatsApp */}
          <AnimatedSection
            delay={0.08}
            className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#25D366] text-[#071C13]">
                <MessageSquare className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-base font-bold uppercase tracking-tight text-[#102C20]">
                WhatsApp Desk
              </h3>
              <p className="mt-2 text-xs text-[#58675F]">
                Verified customer service &amp; commercial support
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#214A36]/10">
              <a
                href={getWhatsAppEnquiryUrl("GENERAL")}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-bold text-[#071C13] hover:underline"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </AnimatedSection>

          {/* Office Address */}
          <AnimatedSection
            delay={0.12}
            className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                <MapPin className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-base font-bold uppercase tracking-tight text-[#102C20]">
                Event Office
              </h3>
              <p className="mt-2 text-xs text-[#58675F]">Landmark Centre, Victoria Island</p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#214A36]/10">
              <span className="text-sm font-bold text-[#102C20]">Lagos, Nigeria</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
