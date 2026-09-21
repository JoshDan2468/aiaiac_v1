import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { ContactClosingSection } from "./ContactClosingSection";
import { ContactDetailsSection } from "./ContactDetailsSection";
import { ContactFormSection } from "./ContactFormSection";
import { HeroSection } from "./HeroSection";

export function ContactPage() {
  return (
    <PublicPageLayout
      title="Contact Us & Conference Enquiries | AIAIAC Africa 2027"
      description="Get in touch with the AIAIAC Africa 2027 organizing committee for delegate registration, sponsorship packages, exhibition booths, or general enquiries."
      canonical="/contact"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Contact", item: "/contact" },
      ])}
    >
      <HeroSection />
      <ContactDetailsSection />
      <ContactFormSection />
      <ContactClosingSection />
    </PublicPageLayout>
  );
}
