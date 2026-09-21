import { AnimatedSection } from "@/components/common/AnimatedSection";

const technicalAreas = [
  {
    title: "Asset Integrity",
    description:
      "Advanced engineering methodologies for asset reliability, non-destructive inspection, corrosion management, structural health monitoring, and sustained operational performance across critical facilities.",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Practical deployment of industrial AI models, machine learning, digital systems, sensor telemetry analytics, and predictive decision support in live operating environments.",
  },
  {
    title: "Automation",
    description:
      "Modern industrial automation, smart field instrumentation, autonomous inspection robotics, and distributed control systems driving operational efficiency and precision.",
  },
  {
    title: "Cybersecurity",
    description:
      "Operational technology (OT) network defence, SCADA resilience architectures, threat intelligence, and compliance frameworks safeguarding critical national infrastructure.",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            What AIAIAC Covers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5D6D64] sm:text-lg">
            The conference programme brings together four interrelated engineering and technology
            disciplines that directly determine operational performance, safety, and digital
            readiness across asset-intensive industries.
          </p>
        </AnimatedSection>

        {/* 2x2 Editorial layout with generous spacing: NO cards, NO borders, NO numbers */}
        <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:gap-x-20 lg:gap-y-16">
          {technicalAreas.map((area, index) => (
            <AnimatedSection key={area.title} delay={index * 0.05} className="space-y-3">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#102C20]">
                {area.title}
              </h3>
              <p className="text-base leading-relaxed text-[#5D6D64]">{area.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
