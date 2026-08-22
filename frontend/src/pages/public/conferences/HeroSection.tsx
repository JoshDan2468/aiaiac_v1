import { PageHero } from "@/components/layout/PageHero";
import { activeEventNotice } from "@/data/event";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Conferences"
      title="A programme built around resilient operations"
      description="The 2027 conference structure is being developed as an extensible programme of technical tracks, exchanges and industry activities."
      status={activeEventNotice}
    />
  );
}
