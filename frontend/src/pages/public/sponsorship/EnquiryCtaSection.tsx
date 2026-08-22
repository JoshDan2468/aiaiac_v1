import { CTASection } from "@/components/common/CTASection";

export function EnquiryCtaSection() {
  return (
    <CTASection
      eyebrow="Sponsor enquiry"
      title="Open a 2027 partnership conversation"
      description="Share your organisation and contact details without committing to an unconfirmed package or category."
      primaryLabel="Sponsor enquiry"
      primaryTo="/registration/sponsor"
      secondaryLabel="Contact the team"
      secondaryTo="/contact"
    />
  );
}
