import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { AboutIntroSection } from "./AboutIntroSection";
import { AudienceSection } from "./AudienceSection";
import { ConferenceExperienceSection } from "./ConferenceExperienceSection";
import { HeroSection } from "./HeroSection";
import { IndustryStripSection } from "./IndustryStripSection";
import { JoinCtaSection } from "./JoinCtaSection";
import { PillarsSection } from "./PillarsSection";
import { WhySection } from "./WhySection";

export function AboutPage() {
  return (
    <PublicPageLayout
      title="About AIAIAC Africa 2027"
      description="AIAIAC Africa is the premier platform connecting asset integrity, artificial intelligence, automation, and cybersecurity across West Africa."
    >
      <HeroSection />
      <AboutIntroSection />
      <PillarsSection />
      <WhySection />
      <ConferenceExperienceSection />
      <AudienceSection />
      <IndustryStripSection />
      <JoinCtaSection />
    </PublicPageLayout>
  );
}
