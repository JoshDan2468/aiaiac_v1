import { motion } from "motion/react";
import { ActionLink } from "@/components/common/ActionButton";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { CinematicMedia } from "@/components/common/CinematicMedia";
import { activeEvent, activeEventNotice } from "@/data/event";
import { homeVideoMedia } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="on-navy relative isolate min-h-120 overflow-hidden pb-16 pt-28 lg:min-h-120 lg:pb-10 lg:pt-32">
      <AuroraBackground className="opacity-45" />
      <CinematicMedia
        source={homeVideoMedia.hero.videoSrc}
        poster={homeVideoMedia.hero.posterSrc}
        posterAlt={homeVideoMedia.hero.posterAlt}
        width={homeVideoMedia.hero.width}
        height={homeVideoMedia.hero.height}
        objectPosition={homeVideoMedia.hero.objectPosition}
        decorative
        priority
        className="absolute inset-0 -z-20"
        mediaClassName="opacity-68 saturate-75"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.15_0.025_157/.96)_0%,oklch(0.195_0.035_158/.82)_56%,oklch(0.455_0.135_148/.54)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-forest/16 mix-blend-color" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-25" aria-hidden />

      <div className="shell relative flex min-h-140 flex-col justify-between lg:min-h-120">
        {/* <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
          }
          className="flex flex-wrap items-center justify-between gap-5 border-b border-white/14 py-5"
        >
          <p className="eyebrow text-emerald">
            {activeEvent.name} · {activeEvent.edition}
          </p>
          <p className="w-full max-w-xl text-left text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-white/58 sm:w-auto sm:text-right">
            Details being confirmed
          </p>
        </motion.div> */}

        <div className="grid items-end gap-12 pt- lg:grid-cols-12">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
            }
            className="lg:col-span-8"
          >
            <h1 className="home-hero-title display-lg max-w-3md text-white">
              Asset Integrity, Artificial Intelligence, Automation & Cybersecurity
              <span className="block text-emerald">Conference.</span>
            </h1>
            <p className="mt-7 max-w-lg border-l-2 border-emerald pl-5 text-md leading-relaxed text-white/72">
              Securing Asset, Empowering Intelligence. Automating the Future.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink to="/registration" size="lg">
                Registration options
              </ActionLink>
              <ActionLink to="/about" variant="outline" size="lg" className="text-white">
                Explore AIAIAC
              </ActionLink>
            </div>
          </motion.div>

          <motion.aside
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }
            }
            className="border border-white/16 bg-mineral/55 p-6 backdrop-blur-sm lg:col-span-4 lg:mb-2"
          >
            <p className="eyebrow text-emerald">2027 status</p>
            <p className="mt-5 text-sm leading-relaxed text-white/72">{activeEventNotice}</p>
            <dl className="mt-7 grid grid-cols-2 gap-px bg-white/12">
              {[
                ["Dates", activeEvent.dates ?? "Confirming"],
                ["Venue", activeEvent.venue ?? "Confirming"],
                ["Programme", "In development"],
                ["Registration", "Being confirmed"],
              ].map(([label, value]) => (
                <div key={label} className="bg-mineral/92 p-4">
                  <dt className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/38">
                    {label}
                  </dt>
                  <dd className="mt-2 text-xs font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
