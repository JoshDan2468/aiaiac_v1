import { AnimatedSection } from "@/components/common/AnimatedSection";
import {
  ShieldCheck,
  Search,
  Paintbrush,
  Wrench,
  Sparkles,
  Binary,
  Gauge,
  Lock,
  Boxes,
} from "lucide-react";

const sectors = [
  {
    icon: ShieldCheck,
    title: "Asset Integrity",
    description:
      "Structural health monitoring, lifecycle management, risk assessment, and fitness-for-service analysis.",
  },
  {
    icon: Search,
    title: "Inspection & NDT",
    description:
      "Advanced non-destructive testing, acoustic emission, ultrasonic phased array, radiographic and subsea robotics.",
  },
  {
    icon: Paintbrush,
    title: "Corrosion & Coatings",
    description:
      "Cathodic protection systems, protective barrier coatings, corrosion inhibitors, and chemical treatment.",
  },
  {
    icon: Wrench,
    title: "Reliability & Maintenance",
    description:
      "Predictive maintenance regimes, vibration diagnostics, lubrication management, and shutdown optimization.",
  },
  {
    icon: Sparkles,
    title: "Artificial Intelligence",
    description:
      "Industrial machine learning, vision analytics, neural optimization, and anomaly detection algorithms.",
  },
  {
    icon: Binary,
    title: "Digital Transformation",
    description:
      "Digital twins, IoT sensor networks, cloud engineering architectures, and immersive operational visualization.",
  },
  {
    icon: Gauge,
    title: "Automation & Instrumentation",
    description:
      "DCS, PLC, SCADA systems, smart field transmitters, emergency shutdown valves, and robotics.",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description:
      "OT security architecture, IEC 62443 compliance, air-gap isolation, threat monitoring, and cyber incident response.",
  },
  {
    icon: Boxes,
    title: "Industrial Technology",
    description:
      "Turbomachinery, flow metering, pipeline integrity equipment, safety apparatus, and specialized tooling.",
  },
];

export function ExhibitionSectorsSection() {
  return (
    <section className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Industry Areas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            The exhibition floor brings together hardware, software, and engineering providers
            across 9 critical disciplines.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <AnimatedSection
                key={sector.title}
                delay={index * 0.04}
                className="flex flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-6"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold uppercase tracking-tight text-[#F7F5EF]">
                    {sector.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                    {sector.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
