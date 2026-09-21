import { AnimatedSection } from "@/components/common/AnimatedSection";
import { abstractSubmissionGuidance, abstractTopics } from "@/data/brochure";

export function AbstractGuidanceSection() {
  return (
    <section
      aria-labelledby="abstract-guidance-title"
      className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24"
    >
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2
            id="abstract-guidance-title"
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl"
          >
            Abstract Submissions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            Technical specialists are invited to submit abstracts across asset integrity, artificial
            intelligence, automation, and cybersecurity for peer review.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <AnimatedSection className="rounded-xl border border-[#214A36]/40 bg-[#0D2C20] p-6 lg:col-span-4 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#CFEA3B]">
              Key Deadlines
            </span>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#F7F5EF]">
              {abstractSubmissionGuidance.deadline}
            </p>

            <span className="mt-6 block text-xs font-semibold uppercase tracking-wider text-[#CFEA3B]">
              Maximum Length
            </span>
            <p className="mt-2 text-2xl font-bold tracking-tight text-[#F7F5EF]">
              {abstractSubmissionGuidance.maximumWords} words
            </p>
          </AnimatedSection>

          <AnimatedSection
            delay={0.08}
            className="rounded-xl border border-[#214A36]/30 bg-[#071C13] p-6 lg:col-span-8 sm:p-8"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#CFEA3B]">
                  Required Details
                </h3>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                  {abstractSubmissionGuidance.requiredDetails.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#CFEA3B]">
                  Review Criteria
                </h3>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#B6C2BA] sm:text-sm">
                  {abstractSubmissionGuidance.reviewCriteria.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-[#214A36]/30 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#CFEA3B]">
                Topic Areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {abstractTopics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md border border-[#214A36] bg-[#0D2C20] px-3 py-1.5 text-xs text-[#F7F5EF]"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
