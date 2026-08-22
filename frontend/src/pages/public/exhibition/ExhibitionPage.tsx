import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { EnquiryCtaSection } from "./EnquiryCtaSection";
import { HeroSection } from "./HeroSection";
import { OpportunitySection } from "./OpportunitySection";
import { WhyExhibitSection } from "./WhyExhibitSection";

export function ExhibitionPage() {
  return (
    <PublicPageLayout
      title="Exhibition | AIAIAC West Africa 2027"
      description="Explore the AIAIAC exhibition opportunity for technology providers and solution partners."
    >
      <HeroSection />
      <OpportunitySection />
      <WhyExhibitSection />
      <EnquiryCtaSection />
    </PublicPageLayout>
  );
}
