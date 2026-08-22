import { PageHero } from "@/components/layout/PageHero";
import { activeEvent, activeEventNotice } from "@/data/event";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Registration"
      title="Choose your route into AIAIAC"
      description="Explore the participation route that fits you or your organisation while the 2027 requirements and registration timetable are being confirmed."
      status={`${activeEvent.edition} registration status: ${activeEvent.registrationStatus.replaceAll("-", " ")}. ${activeEventNotice}`}
      variant="compact"
    />
  );
}
