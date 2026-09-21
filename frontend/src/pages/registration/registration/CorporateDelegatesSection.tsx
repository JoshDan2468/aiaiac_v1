import { AnimatedSection } from "@/components/common/AnimatedSection";
import { corporateGroupDelegatePackages } from "@/data/brochure";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

export function CorporateDelegatesSection() {
  return (
    <section
      id="corporate-groups"
      aria-labelledby="corporate-delegate-title"
      className="bg-[#F7F5EF] py-16 text-[#102C20] sm:py-24"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="corporate-delegate-title"
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl"
          >
            Group Delegate Passes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
            Bring your technical teams, engineering specialists, and asset managers to AIAIAC Africa
            2027 under unified corporate packages with reserved seating and dedicated concierge
            support.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {corporateGroupDelegatePackages.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.06}>
              <article className="flex h-full flex-col justify-between rounded-xl border border-[#214A36]/15 bg-white p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5443]">
                      Corporate Tier
                    </span>
                    <span className="rounded-md bg-[#071C13] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#CFEA3B]">
                      {item.detail}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-bold uppercase tracking-tight text-[#102C20]">
                    {item.title}
                  </h3>
                  {item.scope && (
                    <p className="mt-2 text-xs font-medium text-[#2D5443] sm:text-sm">
                      {item.scope}
                    </p>
                  )}
                  {item.highlights && (
                    <ul className="mt-6 space-y-2.5 border-t border-[#214A36]/10 pt-4 text-xs text-[#102C20] sm:text-sm">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="text-[#2D5443] font-bold" aria-hidden="true">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 border-t border-[#214A36]/10 pt-5">
                  <a
                    href={getWhatsAppEnquiryUrl(
                      "CORPORATE",
                      `${item.title} (${item.detail}) enquiry`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#071C13] px-4 text-xs font-bold uppercase tracking-wider text-[#CFEA3B] transition-colors hover:bg-[#123326]"
                  >
                    Enquire About {item.title}
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
