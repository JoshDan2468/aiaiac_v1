import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { EnquiryCtaSection } from "./EnquiryCtaSection";
import { HeroSection } from "./HeroSection";
import { PartnerArchiveSection } from "./PartnerArchiveSection";
import { PartnershipValueSection } from "./PartnershipValueSection";
import { SponsorshipPackagesSection } from "./SponsorshipPackagesSection";

export function SponsorshipPage() {
  return (
    <PublicPageLayout
      title="AIAIAC Africa 2027 Sponsorship Opportunities | Partner Packages"
      description="Position your brand as an industry leader. Explore headline, track, and strategic sponsorship packages for AIAIAC Africa 2027 in Lagos, Nigeria."
      canonical="/sponsorship"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Sponsorship", item: "/sponsorship" },
      ])}
    >
      <HeroSection />
      <PartnershipValueSection />
      <SponsorshipPackagesSection />
      <PartnerArchiveSection />
      <EnquiryCtaSection />
    </PublicPageLayout>
  );
}
