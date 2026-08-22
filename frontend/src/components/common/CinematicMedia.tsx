import type { CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface CinematicMediaProps {
  source?: string | null;
  poster: string;
  posterAlt: string;
  width: number;
  height: number;
  decorative?: boolean;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
  mediaClassName?: string;
}

export function CinematicMedia({
  source,
  poster,
  posterAlt,
  width,
  height,
  decorative = false,
  priority = false,
  objectPosition = "center",
  className,
  mediaClassName,
}: CinematicMediaProps) {
  const reducedMotion = useReducedMotion();
  const mediaStyle: CSSProperties = { objectPosition };

  return (
    <div className={cn("cinematic-media", className)}>
      {source && !reducedMotion ? (
        <video
          src={source}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-hidden={decorative || undefined}
          aria-label={decorative ? undefined : posterAlt}
          className={cn("cinematic-media__visual", mediaClassName)}
          style={mediaStyle}
        />
      ) : (
        <img
          src={poster}
          alt={decorative ? "" : posterAlt}
          aria-hidden={decorative || undefined}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={cn("cinematic-media__visual cinematic-media__fallback", mediaClassName)}
          style={mediaStyle}
        />
      )}
    </div>
  );
}
