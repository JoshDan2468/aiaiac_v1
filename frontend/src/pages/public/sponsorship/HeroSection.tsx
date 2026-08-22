import { PageHero } from "@/components/layout/PageHero";
import { activeEventNotice } from "@/data/event";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Sponsorship"
      title="Align your brand with resilient infrastructure"
      description="AIAIAC sponsorship creates a credible platform for organisations contributing to integrity, intelligence, automation and industrial cybersecurity."
      status={activeEventNotice}
    />
  );
}
