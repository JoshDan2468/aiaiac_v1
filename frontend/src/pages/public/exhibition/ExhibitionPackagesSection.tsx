import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { exhibitionShellSchemeItems, exhibitionStandPackages } from "@/data/brochure";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";

export function ExhibitionPackagesSection() {
  return (
    <section
      id="exhibition-stands"
      aria-labelledby="exhibition-packages-title"
      className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="exhibition-packages-title"
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl"
          >
            Exhibition Options
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Stand configurations range from standard 9 sqm units to larger double and island stands.
            Every package includes a fully fitted shell scheme, power supply, and exhibitor passes.
          </p>
        </AnimatedSection>

        {/* 3 Stand Cards without prices */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {exhibitionStandPackages.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.06}>
              <article className="flex h-full flex-col justify-between rounded-xl border border-[#214A36]/40 bg-[#0D2C20]/70 p-7 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#CFEA3B]">
                      Shell Scheme
                    </span>
                    {item.detail && (
                      <span className="rounded-md bg-[#123326] px-2.5 py-0.5 text-xs font-semibold text-[#CADB7E]">
                        {item.detail}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-bold uppercase tracking-tight text-[#F7F5EF]">
                    {item.title}
                  </h3>
                  {item.scope && (
                    <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                      {item.scope}
                    </p>
                  )}
                  {item.highlights && (
                    <ul className="mt-6 space-y-2 border-t border-[#214A36]/30 pt-4 text-xs text-[#B6C2BA] sm:text-sm">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="text-[#CFEA3B] font-bold" aria-hidden="true">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 border-t border-[#214A36]/30 pt-5">
                  <a
                    href={getWhatsAppEnquiryUrl("EXHIBITION", `${item.title} stand enquiry`)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#CFEA3B] px-4 text-xs font-bold uppercase tracking-wider text-[#102C20] transition-colors hover:bg-[#b8d62c]"
                  >
                    Enquire About This Stand
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* Shell Scheme Standard Inclusions Panel */}
        <AnimatedSection
          delay={0.12}
          className="mt-12 rounded-xl border border-[#214A36]/30 bg-[#0D2C20] p-7 sm:p-9"
        >
          <div className="max-w-xl">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#F7F5EF]">
              Every Shell Scheme Stand Includes
            </h3>
            <p className="mt-2 text-xs text-[#B6C2BA] sm:text-sm">
              All shell scheme stands are delivered constructed prior to exhibitor setup day.
            </p>
          </div>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-xs text-[#B6C2BA] sm:text-sm">
            {exhibitionShellSchemeItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg bg-[#071C13] p-3 border border-[#214A36]/30"
              >
                <span className="size-1.5 rounded-full bg-[#CFEA3B]" />
                <span className="font-medium text-[#F7F5EF]">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {/* Action Handoff Strip */}
        <AnimatedSection className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#214A36]/30 pt-8">
          <div>
            <p className="font-display text-lg font-bold text-[#F7F5EF]">
              Ready to secure your exhibition stand?
            </p>
            <p className="text-xs text-[#B6C2BA] sm:text-sm">
              Floor plans and booth positions are allocated on a first-confirmed basis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink to="/registration/exhibitor" variant="primary">
              Submit Exhibitor Form
            </ActionLink>
            <a
              href={getWhatsAppEnquiryUrl("EXHIBITION")}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#25D366] px-5 text-xs font-bold uppercase tracking-wider text-[#071C13] transition-transform hover:scale-[1.02]"
            >
              WhatsApp Commercial Desk
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
