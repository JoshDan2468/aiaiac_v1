import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { conference } from "@/data/conference";
import { AdvisoryBoardSection } from "./AdvisoryBoardSection";
import { CommitteeRailSection } from "./CommitteeRailSection";
import { ConferenceTeamSection } from "./ConferenceTeamSection";
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
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. INVITATION TO ATTEND */}
      <TechnicalChairmanMessageSection />

      {/* 3. ADVISORY BOARD */}
      <AdvisoryBoardSection />

      {/* 4. PARTICIPATING COMPANIES */}
      <ParticipatingCompaniesSection />

      {/* 5. FOUR SPECIALISED CONFERENCES */}
      <ConferenceTracksSection />

      {/* 6, 7 & 8. TECHNICAL COMMITTEES (Asset Integrity -> AI -> Automation & Cybersecurity) */}
      <CommitteeRailSection />

      {/* 9. PREVIOUS CONFERENCE HIGHLIGHTS */}
      <PreviousConferenceVideoSection />

      {/* 10. FEATURED SPEAKERS */}
      <SpeakerArchiveSection />

      {/* 11. EVENT OVERVIEW */}
      <EventOverviewSection />
      <OfficialThemeSection />

      {/* 12. CONFERENCE TEAM */}
      <ConferenceTeamSection />

      {/* 13. PARTNER ECOSYSTEM */}
      <SponsorArchiveSection />

      {/* 14. ORGANISING COMMITTEE */}
      <OrganisingCommitteeSection />

      {/* LOWER PAGE CONTENT & SHORTCUTS */}
      <RegistrationShortcutsSection />
    </PublicPageLayout>
  );
}
