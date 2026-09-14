import { AnimatedSection } from "@/components/common/AnimatedSection";
import { abstractSubmissionGuidance, abstractTopics } from "@/data/brochure";

export function AbstractGuidanceSection() {
  return (
    <section
      aria-labelledby="abstract-guidance-title"
      className="bg-[#071b11] py-20 text-white sm:py-24"
    >
      <div className="shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end">
          <div>
            <p className="eyebrow text-lime">Technical programme guide</p>
            <h2
              id="abstract-guidance-title"
              className="mt-5 text-[clamp(2.35rem,5vw,4.75rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-bone"
            >
              Abstract submissions
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/66 sm:text-base">
            The public route prepares an abstract request only; it does not upload or submit a paper
            while the formal call process is confirmed.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid gap-8 border-y border-white/14 py-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <AnimatedSection className="border-l border-lime/65 pl-5 sm:pl-7">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/52">
              Deadline
            </p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-lime">
              {abstractSubmissionGuidance.deadline}
            </p>
            <p className="mt-7 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/52">
              Maximum length
            </p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-bone">
              {abstractSubmissionGuidance.maximumWords} words
            </p>
            <p className="mt-7 text-sm leading-6 text-white/62">
              Speaker registration fee: {abstractSubmissionGuidance.speakerFee}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow text-lime">Required details</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-white/76">
                  {abstractSubmissionGuidance.requiredDetails.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow text-lime">Review criteria</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-white/76">
                  {abstractSubmissionGuidance.reviewCriteria.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-white/14 pt-5">
              <h3 className="eyebrow text-lime">Topic groups</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {abstractTopics.map((topic) => (
                  <li
                    key={topic}
                    className="border border-white/18 px-3 py-2 text-xs text-white/76"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-5 text-white/52">
                Contact: {abstractSubmissionGuidance.contactEmail}.{" "}
                {abstractSubmissionGuidance.contactNotice}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
