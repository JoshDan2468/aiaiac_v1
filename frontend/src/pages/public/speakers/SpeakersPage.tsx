import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { DirectorySection } from "./DirectorySection";
import { HeroSection } from "./HeroSection";
import { KeynoteArchiveSection } from "./KeynoteArchiveSection";
import { ParticipationCtaSection } from "./ParticipationCtaSection";

export function SpeakersPage() {
  return (
    <PublicPageLayout
      title="Speakers | AIAIAC Africa 2027"
      description="2027 speakers are being confirmed. Explore the clearly labelled AIAIAC previous-edition speaker archive."
    >
      <HeroSection />
      <KeynoteArchiveSection />
      <DirectorySection />
      <ParticipationCtaSection />
    </PublicPageLayout>
  );
}
