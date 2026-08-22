import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";

const valuePoints = [
  "Position your organisation within a specialist technical community.",
  "Create meaningful visibility around the disciplines shaping resilient operations.",
  "Connect with operators, engineering leaders, regulators and technology stakeholders.",
];

export function PartnershipValueSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <SectionHeader
          eyebrow="Partnership value"
          title="Visibility with technical relevance"
          description="The 2027 sponsorship packages and categories are not yet confirmed. The value framework is built around contribution, connection and credible positioning."
          className="lg:col-span-6"
        />
        <ol className="lg:col-span-5 lg:col-start-8">
          {valuePoints.map((value, index) => (
            <AnimatedSection as="li" key={value} delay={index * 0.07}>
              <div className="flex gap-6 border-b border-border py-6">
                <span className="numeral text-base text-emerald-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{value}</p>
              </div>
            </AnimatedSection>
          ))}
        </ol>
      </div>
    </section>
  );
}
