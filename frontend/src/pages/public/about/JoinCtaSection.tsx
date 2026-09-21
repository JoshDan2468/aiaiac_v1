import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function JoinCtaSection() {
  return (
    <section className="bg-[#05190F] py-20 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell text-center">
        <AnimatedSection className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Join AIAIAC Africa 2027
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#C1CCC4] sm:text-lg">
            Join industry professionals in Lagos for two days of technical discussion, knowledge
            exchange, exhibition and professional networking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/registration"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#CFEA3B] px-6 text-sm font-semibold text-[#102C20] transition-colors hover:bg-[#b8d62c]"
            >
              <span>Register Interest</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/conferences"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(247,245,239,0.28)] bg-transparent px-6 text-sm font-semibold text-[#F7F5EF] transition-colors hover:bg-white/10"
            >
              <span>Explore Conferences</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
