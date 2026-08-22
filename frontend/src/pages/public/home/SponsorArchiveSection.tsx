import { ActionLink } from "@/components/common/ActionButton";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LogoLoop } from "@/components/partners/LogoLoop";
import { previousEdition } from "@/data/event";
import { sponsorTiers, sponsors } from "@/data/sponsors";

const sponsorRows = [
  sponsors.filter((sponsor) => sponsor.tier !== "media"),
  sponsors.filter((sponsor) => sponsor.tier === "media"),
];

export function SponsorArchiveSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="shell">
        <SectionHeader
          eyebrow={previousEdition.label}
          title="Organisations across the industry wall"
          description="Historical sponsor, exhibitor and media-partner logos are shown only as a previous-edition archive."
        />
      </div>
      <div className="mt-12 space-y-4">
        <LogoLoop
          items={sponsorRows[0] ?? []}
          tierLabel="Previous-edition industry organisations"
          direction="right"
        />
        <LogoLoop
          items={sponsorRows[1] ?? []}
          tierLabel={sponsorTiers.find((tier) => tier.id === "media")?.label ?? "Media partners"}
          direction="left"
        />
      </div>
      <div className="shell mt-10">
        <ActionLink to="/sponsorship" variant="outline" className="text-mineral">
          Explore sponsorship
        </ActionLink>
      </div>
    </section>
  );
}
