import { PageHero } from "@/components/layout/PageHero";
import { activeEventNotice } from "@/data/event";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Exhibition"
      title="Put capability where industry decisions happen"
      description="The AIAIAC exhibition connects solution providers with the professionals improving integrity, automation, intelligence and cyber resilience across critical operations."
      status={activeEventNotice}
    />
  );
}
