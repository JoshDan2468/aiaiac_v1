import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { DirectorySection } from "./DirectorySection";
import { HeroSection } from "./HeroSection";
import { KeynoteArchiveSection } from "./KeynoteArchiveSection";
import { ParticipationCtaSection } from "./ParticipationCtaSection";

export function SpeakersPage() {
  return (
    <PublicPageLayout
      title="Keynote & Featured Speakers | AIAIAC Africa 2027"
      description="Meet the distinguished keynote speakers, technical authorities, and industry panelists presenting at AIAIAC Africa 2027 in Lagos, Nigeria."
      canonical="/speakers"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Speakers", item: "/speakers" },
      ])}
    >
      <HeroSection />
      <KeynoteArchiveSection />
      <DirectorySection />
      <ParticipationCtaSection />
    </PublicPageLayout>
  );
}
