import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { EventHighlightsSection } from "./EventHighlightsSection";
import { GallerySection } from "./GallerySection";
import { HeroSection } from "./HeroSection";
import { LatestUpdatesSection } from "./LatestUpdatesSection";
import { MediaResourcesSection } from "./MediaResourcesSection";
import { ParticipationCtaSection } from "./ParticipationCtaSection";

export function MediaPage() {
  return (
    <PublicPageLayout
      title="Media & Highlights | AIAIAC Africa 2027"
      description="News, event updates, video highlights, photographs and media resources from AIAIAC Africa."
      canonical="/media"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Media", item: "/media" },
      ])}
    >
      <HeroSection />
      <LatestUpdatesSection />
      <EventHighlightsSection />
      <GallerySection />
      <MediaResourcesSection />
      <ParticipationCtaSection />
    </PublicPageLayout>
  );
}
