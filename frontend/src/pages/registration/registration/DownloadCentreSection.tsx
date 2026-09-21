import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FileText } from "lucide-react";

const eventDocuments = [
  {
    title: "Official Conference Brochure",
    description:
      "Detailed overview of conference disciplines, exhibition stands, and registration pathways.",
    actionLabel: "View Brochure",
    to: "/brochure",
  },
  {
    title: "Technical Abstract Guidance",
    description: "Information on submission guidelines, peer review criteria, and focus topics.",
    actionLabel: "Read Guidance",
    to: "/conferences",
  },
  {
    title: "Exhibitor & Floor Plan Guide",
    description: "Shell scheme specifications, booth inclusions, and commercial setup guidelines.",
    actionLabel: "Exhibition Details",
    to: "/exhibition",
  },
  {
    title: "Sponsorship & Partnership Tiers",
    description:
      "Comprehensive package descriptions across Title, Strategic, Diamond, and Gold tiers.",
    actionLabel: "Sponsorship Levels",
    to: "/sponsorship",
  },
];

export function DownloadCentreSection() {
  return (
    <section
      id="download-centre"
      tabIndex={-1}
      className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-20 lg:py-24 outline-none"
      aria-labelledby="download-centre-title"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="download-centre-title"
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl"
          >
            Event Literature &amp; Documents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F]">
            Review official event publications, technical guidance, and commercial brochures for
            AIAIAC Africa 2027.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventDocuments.map((doc, index) => (
            <AnimatedSection
              key={doc.title}
              delay={index * 0.05}
              className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
            >
              <div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                  <FileText className="size-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold uppercase tracking-tight text-[#102C20]">
                  {doc.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#58675F] sm:text-sm">
                  {doc.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#214A36]/10">
                <ActionLink
                  to={doc.to}
                  variant="outline"
                  className="w-full text-xs text-[#102C20] border-[#102C20]/25"
                >
                  {doc.actionLabel}
                </ActionLink>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
