import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Newspaper } from "lucide-react";

export function LatestUpdatesSection() {
  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-20 lg:py-24">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl">
            Latest Updates
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F]">
            Official news, press statements, and conference announcements for accredited media
            partners and industry delegates.
          </p>
        </AnimatedSection>

        {/* Clean Empty-Ready Component */}
        <AnimatedSection delay={0.06} className="mt-10">
          <div className="rounded-xl border border-[#214A36]/15 bg-white p-8 text-center sm:p-12 shadow-xs max-w-2xl mx-auto">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#071C13] text-[#CFEA3B]">
              <Newspaper className="size-6" aria-hidden="true" />
            </div>
            <h3 className="font-display mt-5 text-xl font-bold uppercase tracking-tight text-[#102C20]">
              Media Releases in Preparation
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#58675F]">
              Official press releases, plenary announcements, and partner statements will be
              published here leading up to AIAIAC Africa 2027.
            </p>
            <p className="mt-4 text-xs font-semibold text-[#2D5443]">
              For immediate press briefings or interviews, please contact the media communications
              desk.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
