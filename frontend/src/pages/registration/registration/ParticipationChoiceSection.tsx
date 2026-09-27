import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function ParticipationChoiceSection() {
  return (
    <section
      id="participation-choice"
      className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-20 lg:py-24"
    >
      <div className="shell max-w-[1240px]">
        <AnimatedSection once className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#102C20] sm:text-4xl lg:text-[44px]">
            How Would You Like to Participate?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#3F5347] sm:text-[17px]">
            Select the option that best describes your interest in AIAIAC Africa 2027.
          </p>
        </AnimatedSection>

        {/* Clean Editorial Navigation — No Cards, No Borders, No Shadows */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {/* Column 1: Attend the Conference */}
          <AnimatedSection delay={0.05} once className="flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#102C20] sm:text-[26px]">
                Attend the Conference
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[#3F5347] sm:text-[16.5px]">
                Join industry operators, asset managers, and technical specialists attending the
                two-day technical conference, exhibition, and networking programme.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="#attend-conference"
                className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#173D2D] hover:underline"
              >
                <span>Explore options</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </AnimatedSection>

          {/* Column 2: Partner with AIAIAC */}
          <AnimatedSection delay={0.1} once className="flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#102C20] sm:text-[26px]">
                Partner with AIAIAC
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[#3F5347] sm:text-[16.5px]">
                Position your organisation at the forefront of African industrial technology through
                high-impact sponsorship packages and exhibition booth showcases.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="#partner-aiaiac"
                className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#173D2D] hover:underline"
              >
                <span>Explore options</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </AnimatedSection>

          {/* Column 3: Contribute to the Programme */}
          <AnimatedSection delay={0.15} once className="flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#102C20] sm:text-[26px]">
                Contribute
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[#3F5347] sm:text-[16.5px]">
                Submit technical papers for peer-reviewed conference inclusion or connect as an
                accredited media organisation covering event highlights.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="#contribute-programme"
                className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#173D2D] hover:underline"
              >
                <span>Explore options</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
