import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { AboutSection } from "./AboutSection";
import { ConferenceFocusSection } from "./ConferenceFocusSection";
import { ExhibitionSection } from "./ExhibitionSection";
import { HeroSection } from "./HeroSection";
import { KeynoteSpeakersSection } from "./KeynoteSpeakersSection";
import { MediaArchiveSection } from "./MediaArchiveSection";
import { ParticipationCtaSection } from "./ParticipationCtaSection";
import { PreviousConferenceVideoSection } from "./PreviousConferenceVideoSection";
import { SpeakerArchiveSection } from "./SpeakerArchiveSection";
import { SponsorArchiveSection } from "./SponsorArchiveSection";
import { TechnicalChairmanMessageSection } from "./TechnicalChairmanMessageSection";

export function HomePage() {
  return (
    <PublicPageLayout
      title="AIAIAC West Africa 2027"
      description="AIAIAC West Africa 2027 connects asset integrity, artificial intelligence, automation and cybersecurity. Event details are being confirmed."
    >
      <HeroSection />
      <KeynoteSpeakersSection />
      <PreviousConferenceVideoSection />
      <TechnicalChairmanMessageSection />
      <AboutSection />
      <SpeakerArchiveSection />
      <ConferenceFocusSection />
      <ExhibitionSection />
      <SponsorArchiveSection />
      <MediaArchiveSection />
      <ParticipationCtaSection />
    </PublicPageLayout>
  );
}
