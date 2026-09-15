import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { conference } from "@/data/conference";
import { AdvisoryBoardSection } from "./AdvisoryBoardSection";
import { CommitteeRailSection } from "./CommitteeRailSection";
import { ConferenceTracksSection } from "./ConferenceTracksSection";
import { EventOverviewSection } from "./EventOverviewSection";
import { HeroSection } from "./HeroSection";
import { OfficialThemeSection } from "./OfficialThemeSection";
import { OrganisingCommitteeSection } from "./OrganisingCommitteeSection";
import { ParticipatingCompaniesSection } from "./ParticipatingCompaniesSection";
import { PreviousConferenceVideoSection } from "./PreviousConferenceVideoSection";
import { RegistrationShortcutsSection } from "./RegistrationShortcutsSection";
import { SpeakerArchiveSection } from "./SpeakerArchiveSection";
import { SponsorArchiveSection } from "./SponsorArchiveSection";
import { TechnicalChairmanMessageSection } from "./TechnicalChairmanMessageSection";

export function HomePage() {
  return (
    <PublicPageLayout
      title="AIAIAC Africa 2027"
      description={`AIAIAC Africa 2027 connects asset integrity, artificial intelligence, automation and cybersecurity. ${conference.dates} in ${conference.venue}.`}
    >
      <HeroSection />
      <SpeakerArchiveSection />
      <TechnicalChairmanMessageSection />
      <ParticipatingCompaniesSection />
      <AdvisoryBoardSection />
      <ConferenceTracksSection />
      <CommitteeRailSection />
      <PreviousConferenceVideoSection />
      <EventOverviewSection />
      <OfficialThemeSection />
      <SponsorArchiveSection />
      <OrganisingCommitteeSection />
      <RegistrationShortcutsSection />
    </PublicPageLayout>
  );
}
