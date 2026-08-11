import { committee, committeeIntro, technicalChairman } from "@/data/committee";
import { Reveal } from "@/components/common/Reveal";

export function Committee() {
  return (
    <section id="committee" className="on-navy relative overflow-hidden py-24 lg:py-32">
      <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-emerald">Technical Committee</p>
              <h2 className="display-lg mt-6 text-white">Setting the technical direction</h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/70">
                {committeeIntro}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <article className="image-cut relative min-h-[25rem] overflow-hidden bg-forest sm:min-h-[28rem]">
              <div className="absolute inset-0 grid-lines opacity-35" aria-hidden />
              {technicalChairman.image && (
                <img
                  src={technicalChairman.image}
                  alt={`Portrait of ${technicalChairman.name}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute bottom-0 right-[-5%] h-[88%] w-[66%] object-contain object-bottom grayscale sm:h-[96%]"
                />
              )}
              <div className="relative z-10 flex min-h-[25rem] max-w-[72%] flex-col justify-end p-8 sm:min-h-[28rem] sm:p-10">
                <p className="eyebrow text-emerald">Technical Committee Chairman</p>
                <h3 className="display-md mt-5 max-w-sm text-white">{technicalChairman.name}</h3>
                <p className="mt-4 text-sm font-semibold text-white/80">{technicalChairman.role}</p>
                <p className="mt-1 max-w-xs text-sm text-white/55">
                  {technicalChairman.organisation}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-16 flex items-center justify-between gap-6 border-y border-white/12 py-5">
          <p className="eyebrow text-white/50">Committee directory</p>
          <p className="numeral text-sm text-emerald">
            {String(committee.length).padStart(2, "0")}
          </p>
        </div>

        <ul className="mt-8 flex snap-x gap-3 overflow-x-auto pb-6 [scrollbar-color:var(--forest)_transparent]">
          {committee.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) * 0.05}>
              <article className="group flex min-h-[15rem] w-[18rem] shrink-0 snap-start flex-col justify-between border-l border-white/16 bg-white/[0.035] p-6 transition-colors duration-500 hover:bg-white/[0.075] sm:w-[21rem]">
                <img
                  src={m.flag}
                  alt={`${m.country} flag`}
                  loading="lazy"
                  decoding="async"
                  className="mt-1 h-6 w-9 shrink-0 object-cover"
                />
                <div className="mt-10">
                  <h3 className="font-display text-xl font-bold leading-tight text-white">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">{m.role}</p>
                  <p className="text-sm text-white/40">{m.organisation}</p>
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-emerald">
                    {m.country}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
