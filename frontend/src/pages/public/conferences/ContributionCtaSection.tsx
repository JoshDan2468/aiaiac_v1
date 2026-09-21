import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { abstractSubmissionGuidance } from "@/data/brochure";

export function ContributionCtaSection() {
  return (
    <section className="bg-[#071C13] py-20 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-7">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
              Submit an Abstract
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
              Authors and technical specialists are invited to submit abstracts for presentation at
              AIAIAC Africa 2027. Selected papers will be delivered across the four technical
              tracks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ActionLink to="/registration" variant="primary">
                Submit an Abstract
              </ActionLink>
              <ActionLink to="/contact" variant="outline">
                Contact Technical Committee
              </ActionLink>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="lg:col-span-5">
            <div className="rounded-xl border border-[#214A36]/40 bg-[#0D2C20] p-6 text-sm sm:p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#CFEA3B]">
                Submission Details
              </h3>
              <dl className="mt-4 space-y-3 text-xs sm:text-sm">
                <div>
                  <dt className="text-[#97B0A4]">Submission Deadline</dt>
                  <dd className="font-bold text-[#F7F5EF]">
                    {abstractSubmissionGuidance.deadline}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#97B0A4]">Maximum Word Count</dt>
                  <dd className="font-bold text-[#F7F5EF]">
                    {abstractSubmissionGuidance.maximumWords} words
                  </dd>
                </div>
                <div>
                  <dt className="text-[#97B0A4]">Review Criteria</dt>
                  <dd className="text-[#F7F5EF]">
                    {abstractSubmissionGuidance.reviewCriteria.join(" • ")}
                  </dd>
                </div>
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
