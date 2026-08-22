import { PageHero } from "@/components/layout/PageHero";
import { activeEventNotice } from "@/data/event";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Speakers"
      title="Industry voices, technical depth"
      description="AIAIAC brings operational leaders, engineers, researchers, regulators and technology experts into one focused exchange."
      status={activeEventNotice}
      variant="editorial"
    />
  );
}
