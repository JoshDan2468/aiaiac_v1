import { motion } from "motion/react";
import { ActionLink } from "@/components/common/ActionButton";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { CinematicMedia } from "@/components/common/CinematicMedia";
import { eventSchedule } from "@/data/conference";
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
        <div className="grid items-end gap-12 pt- lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23rem)]">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
            }
            className="min-w-0"
          >
            <h1 className="home-hero-title max-w-3md text-white">
              <span className="home-hero-pillars">
                Asset Integrity, Artificial Intelligence, Automation & Cybersecurity
              </span>
              <span className="home-hero-conference text-emerald">Conference.</span>
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
            className="border border-forest/80 bg-[linear-gradient(145deg,oklch(0.15_0.025_157/.96),oklch(0.195_0.035_158/.9))] p-5 sm:p-6 lg:mb-2 lg:ml-auto lg:w-full"
          >
            <p className="eyebrow text-emerald">Event details</p>
            <dl className="mt-6 border-y border-forest/80">
              <div className="border-b border-forest/70 py-5">
                <dt className="font-mono text-[0.56rem] font-medium uppercase tracking-[0.2em] text-white/56">
                  Date
                </dt>
                <dd className="mt-2 font-[var(--font-display)] text-[clamp(3.25rem,6vw,4.6rem)] font-semibold leading-[0.78] tracking-[-0.07em] text-white">
                  {eventSchedule.dateRange}
                </dd>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-emerald">
                  {eventSchedule.monthAndYear}
                </p>
              </div>
              <div className="py-5">
                <dt className="font-mono text-[0.56rem] font-medium uppercase tracking-[0.2em] text-white/56">
                  Location
                </dt>
                <dd className="mt-2 text-base font-semibold uppercase tracking-[0.04em] text-white">
                  {eventSchedule.location}
                </dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
