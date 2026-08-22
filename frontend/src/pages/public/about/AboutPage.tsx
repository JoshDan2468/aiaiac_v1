import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { AfricaGlobalSection } from "./AfricaGlobalSection";
import { AudienceSection } from "./AudienceSection";
import { HeroSection } from "./HeroSection";
import { JoinCtaSection } from "./JoinCtaSection";
import { OrganiserSection } from "./OrganiserSection";
import { PillarsSection } from "./PillarsSection";
import { PurposeSection } from "./PurposeSection";
import { VisionPurposeSection } from "./VisionPurposeSection";
import { WhyItMattersSection } from "./WhyItMattersSection";

export function AboutPage() {
  return (
    <PublicPageLayout
      title="About AIAIAC West Africa"
      description="AIAIAC West Africa connects the disciplines protecting and modernising critical energy infrastructure."
    >
      <HeroSection />
      <PurposeSection />
      <PillarsSection />
      <WhyItMattersSection />
      <VisionPurposeSection />
      <AudienceSection />
      <AfricaGlobalSection />
      <OrganiserSection />
      <JoinCtaSection />
    </PublicPageLayout>
  );
}
