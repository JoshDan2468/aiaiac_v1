import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { ContactClosingSection } from "./ContactClosingSection";
import { ContactDetailsSection } from "./ContactDetailsSection";
import { ContactFormSection } from "./ContactFormSection";
import { HeroSection } from "./HeroSection";

export function ContactPage() {
  return (
    <PublicPageLayout
      title="Contact | AIAIAC West Africa"
      description="Contact AIAIAC West Africa about conference participation, exhibition, sponsorship, speakers, media partnership or general enquiries."
    >
      <HeroSection />
      <ContactDetailsSection />
      <ContactFormSection />
      <ContactClosingSection />
    </PublicPageLayout>
  );
}
