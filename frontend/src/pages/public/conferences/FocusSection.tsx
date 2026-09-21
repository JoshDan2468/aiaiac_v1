import { AnimatedSection } from "@/components/common/AnimatedSection";

const conferencesList = [
  {
    id: "asset-integrity",
    title: "Asset Integrity",
    subtitle: "Structural Health, Corrosion & Mechanical Integrity",
    description:
      "Focuses on maintaining operational reliability, preventing unplanned downtime, and managing lifecycle risk for pipelines, offshore structures, processing units, and mechanical assets.",
    topics: [
      "Risk-Based Inspection (RBI) & Fitness-For-Service (FFS)",
      "Advanced Non-Destructive Testing (NDT) & Remote Inspection",
      "Corrosion Monitoring, Cathodic Protection & Chemical Treatment",
      "Ageing Asset Life Extension & Structural Integrity Audits",
    ],
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    subtitle: "Industrial Machine Learning & Predictive Analytics",
    description:
      "Explores applied machine learning models, physics-informed neural networks, and automated diagnostic systems deployed directly within operational engineering environments.",
    topics: [
      "Predictive Maintenance & Remaining Useful Life (RUL) Estimation",
      "Computer Vision for Autonomous Visual & Thermal Inspection",
      "Industrial Digital Twins & Real-Time Operational Analytics",
      "AI Governance, Data Quality & Model Interpretability in Energy",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    subtitle: "Process Control, Robotics & Smart Instrumentation",
    description:
      "Covers modern industrial automation architectures, autonomous robotic inspection systems, edge computing units, and integrated instrumentation improving precision and safety.",
    topics: [
      "Distributed Control Systems (DCS) & Programmable Logic Controllers (PLC)",
      "Unmanned Aerial Vehicles (UAVs) & Crawlers for Confined Inspection",
      "Edge Computing, Industrial IoT Sensors & Real-Time Telemetry",
      "Autonomous Control Systems & Remote Operations Centers (ROC)",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    subtitle: "OT, SCADA & Industrial Control Systems Protection",
    description:
      "Examines defensive architectures, network segmentation, incident detection, and regulatory standards required to secure critical industrial infrastructure against physical disruption.",
    topics: [
      "Operational Technology (OT) Network Segmentation & Zero Trust",
      "SCADA & Safety Instrumented Systems (SIS) Security Hardening",
      "Industrial Incident Response, Forensics & Cyber Resilience",
      "Compliance with IEC 62443, NIST & Regional Energy Mandates",
    ],
  },
];

const programmeFormats = [
  {
    title: "Technical Sessions",
    description:
      "In-depth presentations on engineering methodologies, empirical studies, and deployment case studies.",
  },
  {
    title: "Panel Discussions",
    description:
      "Multi-stakeholder debates featuring operators, technology leaders, and regulatory bodies.",
  },
  {
    title: "Technical Presentations",
    description:
      "Peer-reviewed papers examining field data, technical breakthroughs, and operational lessons.",
  },
  {
    title: "Executive Discussions",
    description:
      "High-level dialogues addressing policy frameworks, capital allocation, and industry workforce development.",
  },
  {
    title: "Innovation Showcase",
    description:
      "Live demonstrations of functional software, inspection robotics, and industrial sensing systems.",
  },
  {
    title: "Professional Networking",
    description:
      "Curated bilateral exchanges connecting asset owners, engineers, EPC contractors, and specialists.",
  },
  {
    title: "Exhibition",
    description:
      "An active technology floor featuring international hardware, software, and engineering services.",
  },
];

export function FocusSection() {
  return (
    <section id="conferences" className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        {/* Main Section: Four Technical Conferences */}
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            Four Technical Conferences
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
            Each technical track addresses critical engineering challenges with focused
            presentations, real-world case studies, and technical problem solving.
          </p>
        </AnimatedSection>

        <div className="mt-12 space-y-8">
          {conferencesList.map((conf, index) => (
            <AnimatedSection
              key={conf.id}
              delay={index * 0.05}
              className="rounded-xl border border-[#214A36]/15 bg-white p-7 shadow-xs sm:p-9"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-5">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#102C20]">
                    {conf.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#2D5443]">{conf.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#58675F]">{conf.description}</p>
                </div>
                <div className="rounded-lg bg-[#F7F5EF] p-5 lg:col-span-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#102C20]">
                    Key Focus Topics
                  </p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {conf.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-xs text-[#2D5443] sm:text-sm"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2D5443]" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Next Section: Programme Formats */}
        <div id="formats" className="mt-20 pt-16 border-t border-[#214A36]/15 sm:mt-24 sm:pt-20">
          <AnimatedSection className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
              Programme Formats
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
              Structured session formats designed for technical engagement, peer exchange, and
              knowledge sharing.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmeFormats.map((format, idx) => (
              <AnimatedSection
                key={format.title}
                delay={idx * 0.04}
                className="rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
              >
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#102C20]">
                  {format.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#58675F]">{format.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
