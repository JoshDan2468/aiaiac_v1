import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { GallerySection } from "./GallerySection";
import { HeroSection } from "./HeroSection";
import { ParticipationCtaSection } from "./ParticipationCtaSection";

export function MediaPage() {
  return (
    <PublicPageLayout
      title="Media | AIAIAC West Africa"
      description="Explore the AIAIAC previous-edition media archive and technical exchange."
    >
      <HeroSection />
      <GallerySection />
      <ParticipationCtaSection />
    </PublicPageLayout>
  );
}
