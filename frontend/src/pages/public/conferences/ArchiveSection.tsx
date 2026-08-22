import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { conference } from "@/data/conference";
import { previousEdition } from "@/data/event";
import { programme } from "@/data/programme";

export function ArchiveSection() {
  return (
    <section className="on-navy py-24 lg:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow={previousEdition.label}
          title="Previous programme archive"
          description="The tracks and sessions below document the previous edition only. They are not the confirmed 2027 programme."
          light
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {conference.conferences.map((track, index) => (
            <AnimatedSection key={track.id} delay={index * 0.08}>
              <article className="border border-white/14 bg-white/[0.035] p-7 sm:p-9">
                <p className="eyebrow text-emerald">
                  Archived track {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display-md mt-6 text-white">{track.name}</h2>
                <p className="mt-5 text-sm text-white/55">{track.hall} · previous edition</p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          {programme.map((day) => (
            <AnimatedSection key={day.id}>
              <article className="grid gap-8 border-t border-white/16 pt-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <p className="eyebrow text-emerald">Archive · {day.date}</p>
                  <h2 className="display-md mt-5 text-white">{day.label}</h2>
                  <p className="mt-5 text-sm leading-relaxed text-white/55">{day.summary}</p>
                </div>
                <ol className="lg:col-span-8 lg:col-start-5">
                  {day.sessions.map((session, index) => (
                    <li
                      key={`${day.id}-${session.time}-${index}`}
                      className="grid grid-cols-[4.5rem_1fr] gap-5 border-b border-white/10 py-5"
                    >
                      <span className="numeral text-base text-emerald">{session.time}</span>
                      <div>
                        <h3 className="font-display text-lg font-bold leading-tight text-white">
                          {session.title}
                        </h3>
                        {session.detail && (
                          <p className="mt-2 text-xs leading-relaxed text-white/50">
                            {session.detail}
                          </p>
                        )}
                        {session.hall && (
                          <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/35">
                            {session.hall}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
