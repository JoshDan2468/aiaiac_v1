import { AnimatedSection } from "@/components/common/AnimatedSection";
import { ActionLink } from "@/components/common/ActionButton";
import { MagneticCard } from "@/components/common/MagneticCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { previousEdition } from "@/data/event";
import { sponsorTiers, sponsors } from "@/data/sponsors";

export function PartnerArchiveSection() {
  return (
    <section className="bg-muted py-24 lg:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow={previousEdition.label}
          title="Partner and sponsor archive"
          description="These organisations and tier labels are retained as historical evidence only; they do not indicate confirmed 2027 participation or package structure."
        />
        <div className="mt-14 space-y-12">
          {sponsorTiers.map((tier) => {
            const items = sponsors.filter((sponsor) => sponsor.tier === tier.id);
            return (
              <AnimatedSection key={tier.id}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  <h2 className="eyebrow text-emerald-deep">Previous edition · {tier.label}</h2>
                  <span className="h-px flex-1 bg-border" aria-hidden />
                  <ActionLink
                    to={tier.archivePath}
                    variant="ghost"
                    size="sm"
                    className="text-[0.58rem] text-mineral"
                  >
                    View archive
                  </ActionLink>
                </div>
                <ul className="mt-7 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
                  {items.map((item) => (
                    <li key={item.id}>
                      <MagneticCard>
                        <div className="flex min-h-28 items-center justify-center bg-background p-5">
                          <img
                            src={item.logo}
                            alt={item.name ?? `${tier.label} organisation logo`}
                            width="180"
                            height="72"
                            loading="lazy"
                            decoding="async"
                            className="max-h-14 w-auto max-w-full object-contain"
                          />
                        </div>
                      </MagneticCard>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
