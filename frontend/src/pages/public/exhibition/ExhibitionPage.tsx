import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { EnquiryCtaSection } from "./EnquiryCtaSection";
import { HeroSection } from "./HeroSection";
import { OpportunitySection } from "./OpportunitySection";
import { ExhibitionPackagesSection } from "./ExhibitionPackagesSection";
import { WhyExhibitSection } from "./WhyExhibitSection";

export function ExhibitionPage() {
  return (
    <PublicPageLayout
      title="Exhibition | AIAIAC Africa 2027"
      description="Explore the AIAIAC exhibition opportunity for technology providers and solution partners."
    >
      <HeroSection />
      <OpportunitySection />
      <ExhibitionPackagesSection />
      <WhyExhibitSection />
      <EnquiryCtaSection />
    </PublicPageLayout>
  );
}
