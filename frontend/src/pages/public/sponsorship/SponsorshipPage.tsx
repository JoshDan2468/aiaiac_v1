import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { EnquiryCtaSection } from "./EnquiryCtaSection";
import { HeroSection } from "./HeroSection";
import { PartnerArchiveSection } from "./PartnerArchiveSection";
import { PartnershipValueSection } from "./PartnershipValueSection";
import { SponsorshipPackagesSection } from "./SponsorshipPackagesSection";

export function SponsorshipPage() {
  return (
    <PublicPageLayout
      title="Sponsorship | AIAIAC Africa 2027"
      description="Explore AIAIAC sponsorship value and the clearly labelled previous-edition partner archive."
    >
      <HeroSection />
      <PartnershipValueSection />
      <SponsorshipPackagesSection />
      <PartnerArchiveSection />
      <EnquiryCtaSection />
    </PublicPageLayout>
  );
}
