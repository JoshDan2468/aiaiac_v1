import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { ArchiveSection } from "./ArchiveSection";
import { ContributionCtaSection } from "./ContributionCtaSection";
import { FocusSection } from "./FocusSection";
import { HeroSection } from "./HeroSection";

export function ConferencesPage() {
  return (
    <PublicPageLayout
      title="Conferences | AIAIAC West Africa 2027"
      description="Explore the AIAIAC conference disciplines and the clearly labelled previous-edition programme archive."
    >
      <HeroSection />
      <FocusSection />
      <ArchiveSection />
      <ContributionCtaSection />
    </PublicPageLayout>
  );
}
