import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function EnquiryCtaSection() {
  return (
    <section className="bg-[#071C13] py-20 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell text-center">
        <AnimatedSection className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Discuss a Partnership
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B7C3BA] sm:text-lg">
            Contact the AIAIAC team to discuss sponsorship opportunities and available partnership
            options.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/registration/sponsor"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#CFEA3B] px-6 text-sm font-semibold text-[#102C20] transition-colors hover:bg-[#b8d62c]"
            >
              <span>Make a Sponsorship Enquiry</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(247,245,239,0.28)] bg-transparent px-6 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-white/10"
            >
              <span>Contact the Team</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
