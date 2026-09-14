import { motion } from "motion/react";
import { ActionLink } from "@/components/common/ActionButton";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { FlipCard } from "@/components/common/FlipCard";
// @ts-expect-error The requested React Bits registry component is distributed as JSX.
import RotatingText from "@/components/RotatingText";
import { conference, eventSchedule } from "@/data/conference";
import { homeVideoMedia } from "@/data/media";
import { heroKeynoteSpeaker } from "@/data/speakers";
import { useCountdown } from "@/hooks/useCountdown";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const heroBackgroundVideo = homeVideoMedia.hero.videoSrc;
const heroBackgroundPoster = homeVideoMedia.hero.posterSrc;

const countdownUnits = [
  { key: "days", label: "Days", minimumDigits: 3 },
  { key: "hours", label: "Hours", minimumDigits: 2 },
  { key: "minutes", label: "Minutes", minimumDigits: 2 },
  { key: "seconds", label: "Seconds", minimumDigits: 2 },
] as const;

function formatCountdownValue(value: number | undefined, minimumDigits: number) {
  return value === undefined ? "--" : String(value).padStart(minimumDigits, "0");
}

/** Compact Event Date Card (Sitting at top of Right Column) */
function EventDateCard() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
      }
      className="relative isolate flex w-full flex-col items-center justify-center rounded-[1.5rem] border border-lime/30 bg-[#062014]/90 p-5 text-center text-white shadow-lg backdrop-blur-xs"
    >
      <div className="inline-flex items-center gap-1.5 rounded-full border border-lime/35 bg-lime/15 px-3.5 py-1 text-xs font-bold text-lime">
        <span>📍</span>
        <span>{eventSchedule.location}</span>
      </div>

      <div className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        22 <span className="font-sans text-lime/80">—</span> 23
      </div>

      <div className="mt-0.5 font-display text-lg font-bold tracking-wide text-white/90">June</div>

      <div className="font-mono text-xs font-semibold tracking-widest text-lime">2027</div>
    </motion.div>
  );
}

/** Compact 4-Tile Countdown (Sits directly underneath CTA buttons on Left Column) */
function CountdownCard() {
  const countdown = useCountdown(conference.countdown.targetISO);

  return (
    <div className="relative isolate max-w-xl rounded-[1.5rem] border border-white/12 bg-[#061f14]/80 p-5 shadow-lg backdrop-blur-xs">
      <p className="font-display text-xs font-semibold tracking-wide text-white/90">
        Get ready for AIAIAC Africa 2027
      </p>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-2.5">
        {countdownUnits.map((unit) => {
          const rawValue = countdown?.[unit.key];
          const formattedValue = formatCountdownValue(rawValue, unit.minimumDigits);
          return <FlipCard key={unit.key} value={formattedValue} label={unit.label} />;
        })}
      </div>
    </div>
  );
}

/** Large Hero Keynote Speaker Feature Card (Dominant Visual on Right Side) */
function KeynoteSpeakerCard() {
  return (
    <div className="group relative isolate w-full">
      {/* Restrained Lime/Forest Backplate Shift */}
      <div
        className="absolute inset-0 rounded-[1.75rem] bg-forest/40 opacity-80 transition-all duration-400 ease-out group-hover:translate-x-3.5 group-hover:-translate-y-3 group-hover:bg-lime group-hover:opacity-100 group-focus-within:translate-x-3.5 group-focus-within:-translate-y-3 group-focus-within:bg-lime group-focus-within:opacity-100"
        aria-hidden
      />

      {/* Main Rich Dark AIAIAC Gradient Surface */}
      <div className="relative z-10 flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/14 bg-gradient-to-br from-[#071F18] via-[#0C3828] to-[#18533B] p-6 text-white shadow-2xl transition-transform duration-400 ease-out group-hover:-translate-y-1 group-focus-within:-translate-y-1 sm:flex-row sm:items-end sm:p-8">
        {/* Left Column (Approx 52% Width): Speaker Info & AGPC Logo Tile */}
        <div className="flex min-w-0 flex-1 flex-col justify-between space-y-5 pr-2">
          <div>
            <span className="inline-block rounded-md bg-lime/15 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-wider text-lime">
              Keynote Speaker
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              {heroKeynoteSpeaker.name}
            </h3>
            <p className="mt-1.5 font-sans text-xs font-bold text-white/90 sm:text-sm">
              {heroKeynoteSpeaker.role}
            </p>
            <p className="mt-0.5 font-sans text-xs font-medium text-white/70">
              {heroKeynoteSpeaker.organisation}
            </p>
          </div>

          {/* AGPC Organization Dedicated White Mini-Card */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex h-11 items-center justify-center rounded-lg border border-white/15 bg-white px-3.5 shadow-xs">
              <span className="font-display text-xs font-black tracking-widest text-[#05190F]">
                AGPC
              </span>
            </div>
            <span className="font-sans text-[0.68rem] font-bold text-white/80">
              ANOH Gas Processing Company Limited
            </span>
          </div>
        </div>

        {/* Right Column (Approx 48% Width): Large Speaker Portrait */}
        <div className="relative mt-6 shrink-0 overflow-hidden sm:mt-0 sm:h-60 sm:w-48 lg:h-64 lg:w-52">
          <img
            src={heroKeynoteSpeaker.image}
            alt={`Portrait of ${heroKeynoteSpeaker.name}`}
            className="h-full w-full object-contain object-bottom transition-transform duration-400 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const rotatingHeadlines = ["Conference", "Innovation Showcase"];

  return (
    <section className="on-navy relative isolate min-h-120 overflow-hidden pb-16 pt-28 lg:min-h-120 lg:pb-20 lg:pt-36">
      <AuroraBackground className="opacity-40" />

      {/* Video Background with Poster Fallback */}
      {heroBackgroundVideo && !reducedMotion ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroBackgroundPoster}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60 saturate-75"
        />
      ) : (
        <img
          src={heroBackgroundPoster}
          alt="AIAIAC Africa event atmosphere"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60 saturate-75"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Tonal Dark Green Overlay for Text Contrast */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.12_0.03_157/.95)_0%,oklch(0.16_0.04_158/.82)_55%,oklch(0.24_0.07_150/.68)_100%)]" />

      <div className="shell relative flex flex-col justify-between">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,27rem)] lg:gap-14">
          {/* Main Hero Left Content (~55-60% width) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
            }
            className="min-w-0"
          >
            <h1 className="home-hero-title text-white">
              <span className="home-hero-pillars block max-w-xl font-sans text-lg font-semibold text-white/90 sm:text-xl">
                Asset Integrity, Artificial Intelligence,{" "}
                <span className="whitespace-nowrap">Automation &amp; Cybersecurity</span>
              </span>
              <span className="home-hero-conference block mt-3 font-display text-lime font-extrabold leading-[0.92] tracking-tight">
                {reducedMotion ? (
                  "Conference & Innovation Showcase"
                ) : (
                  <RotatingText
                    texts={rotatingHeadlines}
                    transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-105%", opacity: 0 }}
                    animatePresenceMode="wait"
                    rotationInterval={3200}
                    splitBy="words"
                    staggerDuration={0}
                    mainClassName="home-hero-rotating-text"
                  />
                )}
              </span>
            </h1>

            <p className="mt-6 max-w-lg border-l-2 border-lime pl-5 text-base leading-relaxed text-white/75 sm:text-md">
              Securing Assets, Empowering Intelligence. Automating the Future.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="/registration" size="lg">
                Registration Options
              </ActionLink>
              <ActionLink to="/about" variant="outline" size="lg" className="text-white">
                Explore AIAIAC
              </ActionLink>
            </div>

            {/* DIRECTLY UNDERNEATH CTAs: Countdown ONLY (28px spacing) */}
            <div className="mt-7 sm:mt-8">
              <CountdownCard />
            </div>
          </motion.div>

          {/* Right Side (~40-45% width): TOP = Date/Location Card, BELOW = Keynote Speaker Card */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }
            }
            className="flex flex-col gap-7 sm:gap-8"
          >
            <EventDateCard />
            <KeynoteSpeakerCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
