import { PageHero } from "@/components/layout/PageHero";
import { previousEdition } from "@/data/event";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Media"
      title="Inside the AIAIAC exchange"
      description="A visual archive of technical sessions, technology discovery and industry connection from the previous edition."
      status={previousEdition.label}
    />
  );
}
