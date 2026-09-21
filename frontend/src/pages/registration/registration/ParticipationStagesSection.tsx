import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CheckCircle2, UserCheck, FileText, CalendarCheck } from "lucide-react";

const stages = [
  {
    title: "Choose Participation Type",
    description:
      "Select the participation format aligned with your goals: attend as an individual delegate, book a corporate group, exhibit your technology, or partner as a sponsor.",
    icon: UserCheck,
  },
  {
    title: "Provide Your Details",
    description:
      "Complete the registration form or commercial enquiry brief. Supply your professional affiliation, industry sector, and technical areas of interest.",
    icon: FileText,
  },
  {
    title: "Receive Confirmation",
    description:
      "Our coordination team reviews your submission and issues official accreditation credentials, confirmation receipts, or commercial agreement documentation.",
    icon: CheckCircle2,
  },
  {
    title: "Prepare for AIAIAC Africa 2027",
    description:
      "Receive your event schedule, delegate pack, session catalog, exhibition floor map, and venue logistics guidance ahead of 22–23 June 2027 in Lagos.",
    icon: CalendarCheck,
  },
];

export function ParticipationStagesSection() {
  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            Participation Process
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
            How individual delegates, technical authors, and enterprise partners join the AIAIAC
            Africa 2027 conference.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <AnimatedSection
                key={stage.title}
                delay={index * 0.05}
                className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold uppercase tracking-tight text-[#102C20]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#58675F] sm:text-sm">
                    {stage.description}
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
