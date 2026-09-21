import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { AudienceSection } from "./AudienceSection";
import { ConferenceExperienceSection } from "./ConferenceExperienceSection";
import { HeroSection } from "./HeroSection";
import { JoinCtaSection } from "./JoinCtaSection";
import { PillarsSection } from "./PillarsSection";
import { WhySection } from "./WhySection";

export function AboutPage() {
  return (
    <PublicPageLayout
      title="About AIAIAC Africa 2027 | Asset Integrity, AI, Automation & Cybersecurity"
      description="Learn about the mission, technical disciplines, conference experience, and industry leadership driving AIAIAC Africa 2027 in Lagos, Nigeria, 22–23 June 2027."
      canonical="/about"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "About", item: "/about" },
      ])}
    >
      <HeroSection />
      <PillarsSection />
      <WhySection />
      <ConferenceExperienceSection />
      <AudienceSection />
      <JoinCtaSection />
    </PublicPageLayout>
  );
}
