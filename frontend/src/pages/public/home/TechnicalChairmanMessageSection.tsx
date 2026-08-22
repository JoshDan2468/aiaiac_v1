import { AnimatedSection } from "@/components/common/AnimatedSection";
import { technicalChairman, technicalChairmanHomepageMessage } from "@/data/committee";

export function TechnicalChairmanMessageSection() {
  return (
    <section
      id="technical-chairman-message"
      aria-labelledby="technical-chairman-message-title"
      className="relative overflow-hidden bg-[#020b07] py-20 sm:py-24 lg:py-32"
    >
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />

      <div className="shell relative">
        <AnimatedSection>
          <article className="relative isolate pt-0 lg:pt-12">
            <div
              className="absolute inset-x-0 bottom-0 top-0 border border-lime bg-[#07170f] [clip-path:polygon(0_0,100%_0,100%_88%,calc(100%-2.5rem)_100%,0_100%)] lg:top-2 lg:[clip-path:polygon(0_0,100%_0,100%_76%,calc(100%-8rem)_100%,0_100%)]"
              aria-hidden
            />
            <div
              className="absolute bottom-0 right-0 top-0 hidden w-[37%] bg-[#0b2018] lg:block lg:top-12 lg:[clip-path:polygon(0_0,100%_0,100%_76%,calc(100%-8rem)_100%,0_100%)]"
              aria-hidden
            />
            {/* <div
              className="absolute left-0 right-0 top-77 z-10 h-px bg-lime/35 lg:top-47"
              aria-hidden
            /> */}

            <div className="relative z-20 grid px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 md:px-12 lg:min-h-124 lg:grid-cols-[minmax(0,1.7fr)_minmax(21rem,1fr)] lg:grid-rows-[auto_1fr_auto] lg:gap-x-12 lg:px-16 lg:pb-14 lg:pt-20 xl:px-20">
              <div className="order-1 max-w-4xl lg:col-start-1 lg:row-start-1">
                <div className="flex items-center justify-between gap-5">
                  {/* <p className="eyebrow text-lime">Leadership message · 02</p> */}
                  <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/35 lg:inline">
                    Executive foreword
                  </span>
                </div>
                <h2
                  id="technical-chairman-message-title"
                  className="mt-5 max-w-2md font-display text-[clamp(2rem,4.3vw,4.75rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-bone"
                >
                  An Invitation To Attend
                </h2>
              </div>

              <AnimatedSection
                delay={0.12}
                className="order-2 relative -mx-2 mt-8 min-h-[min(22rem,82vw)] sm:min-h-[30rem] lg:col-start-2 lg:row-[1/4] lg:mx-0 lg:-mt-24 lg:min-h-0 lg:[clip-path:inset(-12rem_-5rem_0_0)]"
              >
                {technicalChairman.image && (
                  <img
                    src={technicalChairman.image}
                    alt={`Portrait of ${technicalChairman.name}, Technical Chairman`}
                    width={350}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    className="absolute bottom-0 right-1/2 h-auto w-[min(94%,22rem)] translate-x-1/2 object-contain object-bottom sm:w-[min(86%,30rem)] lg:bottom-32 lg:right-[-2.5rem] lg:w-[32.5rem] lg:max-w-none lg:translate-x-0 xl:bottom-16 xl:right-[-8rem] xl:w-[37rem]"
                  />
                )}
                <div
                  className="absolute bottom-4 right-1/2 h-16 w-[72%] translate-x-1/2 border-b border-r border-lime/25 lg:bottom-6 lg:right-2 lg:w-[85%] lg:translate-x-0"
                  aria-hidden
                />
              </AnimatedSection>

              <AnimatedSection
                delay={0.18}
                className="order-3 mt-7 border-l border-lime/60 pl-5 lg:col-start-1 lg:row-start-3 lg:mt-8 lg:max-w-xl"
              >
                <h3 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                  {technicalChairman.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-white/78">{technicalChairman.role}</p>
                <p className="mt-1 text-sm text-white/52">{technicalChairman.organisation}</p>
              </AnimatedSection>

              <div className="order-4 mt-9 max-w-3xl lg:order-2 lg:col-start-1 lg:row-start-2 lg:mt-9 lg:self-start">
                <p className="font-mono text-[0.52rem] font-semibold uppercase tracking-widest text-lime/55">
                  {technicalChairmanHomepageMessage.status}
                </p>
                <p className="mt-4 max-w-[70ch] border-t border-white/12 pt-3 text-base leading-7 text-white/68 sm:text-md sm:leading-6">
                  {technicalChairmanHomepageMessage.text}
                </p>
              </div>
            </div>

            {/* <div
              className="absolute bottom-5 left-5 z-30 flex items-center gap-3 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/28 sm:left-8 lg:bottom-6 lg:left-auto lg:right-14"
              aria-hidden
            >
              <span>Leadership dossier</span>
              <span className="h-px w-9 bg-lime/35" />
              <span>WA—27</span>
            </div> */}
          </article>
        </AnimatedSection>
      </div>
    </section>
  );
}
