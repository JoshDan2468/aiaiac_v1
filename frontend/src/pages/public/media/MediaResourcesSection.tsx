import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Download, FileText, Image as ImageIcon, Mail } from "lucide-react";

const resources = [
  {
    icon: FileText,
    title: "Conference Brochure",
    description:
      "Overview of conference disciplines, exhibition shell schemes, and commercial participation guidelines.",
    actionLabel: "View Brochure",
    href: "/brochure",
  },
  {
    icon: ImageIcon,
    title: "Official Brand Assets",
    description:
      "Approved AIAIAC Africa vector logos, typography guidelines, and approved event imagery for press use.",
    actionLabel: "Request Brand Kit",
    href: "/contact?type=media",
  },
  {
    icon: Mail,
    title: "Media Accreditation",
    description:
      "Press pass credentials for journalists, trade publication editors, and accredited regional media crews.",
    actionLabel: "Apply for Accreditation",
    href: "/contact?type=media",
  },
  {
    icon: Download,
    title: "Technical Call for Papers",
    description:
      "Abstract submission terms, focus topics, formatting requirements, and editorial review criteria.",
    actionLabel: "View Guidance",
    href: "/conferences",
  },
];

export function MediaResourcesSection() {
  return (
    <section className="bg-[#E5EBE5] py-16 text-[#102C20] sm:py-20 lg:py-24">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl">
            Media Resources
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F]">
            Official downloads, press kits, and accreditation materials for journalists, editors,
            and industry media partners.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection
                key={item.title}
                delay={index * 0.05}
                className="flex flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#071C13] text-[#CFEA3B]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold uppercase tracking-tight text-[#102C20]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#58675F] sm:text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#214A36]/10">
                  <ActionLink
                    to={item.href}
                    variant="outline"
                    className="w-full text-xs text-[#102C20] border-[#102C20]/25"
                  >
                    {item.actionLabel}
                  </ActionLink>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
