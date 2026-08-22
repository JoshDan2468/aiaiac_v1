import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { previousConferenceVideoMedia } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NavigatorConnection {
  saveData?: boolean;
}

function isDataSavingEnabled() {
  const navigatorWithConnection = navigator as Navigator & {
    connection?: NavigatorConnection;
  };

  return navigatorWithConnection.connection?.saveData === true;
}

export function PreviousConferenceVideoSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [hasEnded, setHasEnded] = useState(false);
  const { videoSrc, captionSrc, posterSrc, posterAlt, width, height, objectPosition } =
    previousConferenceVideoMedia;

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;

    if (!frame || !video || reducedMotion || isDataSavingEnabled()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.intersectionRatio >= 0.6 && !video.ended) {
          void video.play().catch(() => undefined);
        } else if (entry.intersectionRatio < 0.25) {
          video.pause();
        }
      },
      { threshold: [0, 0.25, 0.6, 1] },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion, videoSrc]);

  const replayVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setHasEnded(false);
    void video.play().catch(() => undefined);
  };

  return (
    <section
      aria-labelledby="previous-conference-video-title"
      className="relative isolate overflow-hidden bg-[#020b07] py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="grid-lines absolute inset-0 -z-20 opacity-[0.08]" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.31_0.07_151/.22),transparent_72%)]"
        aria-hidden
      />

      <div className="shell">
        <AnimatedSection className="mx-auto mb-10 grid max-w-6xl gap-6 border-l border-lime/55 pl-5 sm:mb-12 sm:grid-cols-[minmax(0,1fr)_minmax(15rem,0.52fr)] sm:items-end sm:pl-7">
          <div>
            <p className="eyebrow text-lime">Archive film · 01</p>
            <h2
              id="previous-conference-video-title"
              className="mt-4 max-w-4xl text-[clamp(2.15rem,6.4vw,5.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.055em] text-bone"
            >
              Previous conference
              <span className="block text-lime">highlights</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/64 sm:justify-self-end sm:pb-1 lg:text-base">
            Experience the conversations, connections and defining moments from the previous
            edition.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="mx-auto max-w-6xl">
          <div
            className="relative bg-lime/50 p-px"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - clamp(1.35rem, 5vw, 4.5rem)) 0, 100% clamp(1.35rem, 5vw, 4.5rem), 100% 100%, 0 100%)",
            }}
          >
            <div
              ref={frameRef}
              className="relative aspect-video overflow-hidden bg-mineral"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - clamp(1.35rem, 5vw, 4.5rem)) 0, 100% clamp(1.35rem, 5vw, 4.5rem), 100% 100%, 0 100%)",
              }}
            >
              {videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    aria-label="Previous AIAIAC conference highlights"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition }}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster={posterSrc}
                    onEnded={() => setHasEnded(true)}
                    onPlay={() => setHasEnded(false)}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    {captionSrc ? (
                      <track
                        kind="captions"
                        src={captionSrc}
                        srcLang="en"
                        label="English"
                        default
                      />
                    ) : null}
                    Your browser does not support embedded video. You can use the configured media
                    file directly instead.
                  </video>

                  {hasEnded ? (
                    <button
                      type="button"
                      onClick={replayVideo}
                      className="absolute left-1/2 top-1/2 flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-3 border border-bone/55 bg-[#020b07]/92 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-bone transition-colors hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden />
                      Replay film
                    </button>
                  ) : null}
                </>
              ) : (
                <>
                  <img
                    src={posterSrc}
                    alt={posterAlt}
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#020b07]/78 via-transparent to-[#020b07]/20"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-5">
                    <div className="flex min-h-11 items-center gap-3 border border-white/28 bg-[#020b07]/88 px-4 py-3 text-bone shadow-[0_1rem_3rem_rgba(0,0,0,.24)] sm:gap-4 sm:px-5">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center border border-lime/65 text-lime"
                        aria-hidden
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </span>
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] sm:text-xs">
                        Film source pending
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div
                className="pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-lime/80"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/42 sm:mt-5">
            <span>AIAIAC West Africa</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden />
            <span>Previous edition</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
