import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { ArchiveSection } from "./ArchiveSection";
import { ContributionCtaSection } from "./ContributionCtaSection";
import { FocusSection } from "./FocusSection";
import { HeroSection } from "./HeroSection";

export function ConferencesPage() {
  return (
    <PublicPageLayout
      title="Conferences | AIAIAC Africa 2027"
      description="The 2027 programme brings together technical discussions across asset integrity, artificial intelligence, automation and cybersecurity."
      canonical="/conferences"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Conferences", item: "/conferences" },
      ])}
    >
      <HeroSection />
      <FocusSection />
      <ArchiveSection />
      <ContributionCtaSection />
    </PublicPageLayout>
  );
}
