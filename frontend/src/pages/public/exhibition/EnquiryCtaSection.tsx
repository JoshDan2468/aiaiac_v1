import { CTASection } from "@/components/common/CTASection";

export function EnquiryCtaSection() {
  return (
    <CTASection
      eyebrow="Exhibitor enquiry"
      title="Start a 2027 exhibition conversation"
      description="Submit your contact details now; package, stand and venue requirements will follow only when confirmed."
      primaryLabel="Exhibitor enquiry"
      primaryTo="/registration/exhibitor"
      secondaryLabel="Sponsorship"
      secondaryTo="/sponsorship"
    />
  );
}
