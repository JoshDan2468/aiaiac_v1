import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { sponsorshipPackages } from "@/data/brochure";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

const tierAccents: Record<string, string> = {
  title: "#9FAF63",
  strategic: "#7E9C6E",
  diamond: "#AABAB2",
  platinum: "#C3C6C2",
  gold: "#B89B52",
  silver: "#A7ADB0",
};

export function SponsorshipPackagesSection() {
  return (
    <section
      aria-labelledby="sponsorship-packages-title"
      className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="sponsorship-packages-title"
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl"
          >
            Sponsorship Levels
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B7C3BA] sm:text-lg">
            Sponsorship tiers are designed for strategic market alignment. Explore available partner
            categories and speak with our commercial committee to confirm deliverables.
          </p>
        </AnimatedSection>

        {/* 3 cards per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 lg:gap-7">
          {sponsorshipPackages.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.04}>
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-[#F5F1E7] p-7 sm:p-8 shadow-xs">
                {/* Subtle small top accent line */}
                <div
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ backgroundColor: tierAccents[item.id] ?? "#9FAF63" }}
                  aria-hidden="true"
                />

                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#102C20] sm:text-[22px]">
                    {item.title}
                  </h3>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-6 space-y-3 text-[14px] leading-normal text-[#4F6258]">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5">
                          <span className="font-bold text-[#80954B] select-none" aria-hidden="true">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 pt-2">
                  <a
                    href={getWhatsAppEnquiryUrl("SPONSORSHIP", `${item.title} enquiry`)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-[48px] w-fit items-center justify-center gap-2 rounded-lg bg-[#173D2D] px-5 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-[#102C20]"
                  >
                    <span>Enquire About {item.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/registration/sponsor"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(247,245,239,0.28)] bg-transparent px-6 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-white/10"
          >
            Submit Sponsorship Registration Form
            <span aria-hidden="true">→</span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
