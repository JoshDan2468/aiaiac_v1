import { useState } from "react";
import { CountryFlag } from "@/components/common/CountryFlag";
import { organisations, getOrganisationLogo } from "@/data/organisations";
import { cn } from "@/lib/utils";

export interface CircularPersonProfileProps {
  name: string;
  role: string;
  organisation: string;
  organisationKey?: string | undefined;
  image?: string | undefined;
  countryCode?: string | undefined;
  organisationLogo?: string | undefined;
  companyLogoKey?: string | undefined;
  className?: string | undefined;
  clone?: boolean | undefined;
  variant?: "default" | "compact" | "featured" | string | undefined;
  tone?: "light" | "dark" | undefined;
  size?: "keynote" | "standard" | "compact" | undefined;
  onClick?: (() => void) | undefined;
}

function getInitials(name: string): string {
  const cleaned = name
    .replace(/\b(Engr\.|Dr\.|Prof\.|Architect|Sir|\(Engr\.\)|Dr\)\.?)\b/gi, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!first) return "TC";
  if (parts.length === 1 || !last) return first.slice(0, 2).toUpperCase();
  const fChar = first[0] ?? "";
  const lChar = last[0] ?? "";
  return (fChar + lChar).toUpperCase() || "TC";
}

export function CircularPersonProfile({
  name,
  role,
  organisation,
  organisationKey,
  image,
  countryCode,
  organisationLogo,
  companyLogoKey,
  className,
  clone = false,
  variant = "default",
  tone = "dark",
  size = "standard",
  onClick,
}: CircularPersonProfileProps) {
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const initials = getInitials(name);
  const resolvedKey = organisationKey || companyLogoKey;
  const logoUrl =
    organisationLogo ||
    (resolvedKey ? organisations[resolvedKey]?.logo : undefined) ||
    getOrganisationLogo(resolvedKey || organisation) ||
    undefined;
  const hasValidImage = Boolean(image && !imageError);

  const isLight = tone === "light";

  const sizeClasses =
    size === "keynote"
      ? "size-34 sm:size-38 lg:size-44"
      : size === "compact"
        ? "size-26 sm:size-28 lg:size-32"
        : "size-30 sm:size-34 lg:size-38";

  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-hidden={clone ? "true" : undefined}
      className={cn(
        "group relative flex w-full max-w-[210px] shrink-0 flex-col items-center text-center transition-all duration-300",
        onClick &&
          "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFEA3B] focus-visible:ring-offset-2 rounded-2xl p-2",
        className,
      )}
    >
      {/* CIRCULAR PORTRAIT & ORBIT RING CONTAINER */}
      <div className={cn("relative mx-auto shrink-0", sizeClasses)}>
        {/* Base Ring (Outer ring #315847) */}
        <div
          className="absolute -inset-1.5 rounded-full border border-[#315847] opacity-90 transition-all duration-300 group-hover:scale-105"
          aria-hidden
        />
        {/* Accent Arc (Small lime arc #CFEA3B ~15-18% circumference, no glow) */}
        <div
          className="absolute -inset-1.5 rounded-full border-t-2 border-[#CFEA3B] transition-transform duration-500 ease-out group-hover:rotate-30"
          aria-hidden
        />

        {/* Inner Circular Image / Initials Frame */}
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#315847] bg-[#E5EBE5] shadow-md transition-transform duration-300 group-hover:-translate-y-1">
          {hasValidImage ? (
            <img
              src={image}
              alt={clone ? "" : `Portrait of ${name}`}
              width={220}
              height={220}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#E5EBE5] to-[#D5E0D5] text-center">
              <span className="font-display text-2xl font-black tracking-wider text-[#0A2A1D] sm:text-3xl">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* COUNTRY FLAG BADGE (Lower Left ~7 o'clock) */}
        {countryCode && (
          <div
            className="absolute -bottom-1 -left-1 z-20 flex size-8 items-center justify-center rounded-full border border-white/20 bg-[#061A11] shadow-md transition-transform duration-300 group-hover:scale-110 sm:size-9"
            title={countryCode}
          >
            <CountryFlag code={countryCode} />
          </div>
        )}

        {/* COMPANY LOGO BADGE (Lower Right ~4 o'clock) */}
        {logoUrl && !logoError && (
          <div
            className="absolute -bottom-1 -right-1 z-20 flex h-7 max-w-[65px] items-center justify-center rounded-[9px] border border-black/10 bg-[#F7F5EE] px-1.5 py-1 shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-8 sm:max-w-[70px]"
            title={organisation}
          >
            <img
              src={logoUrl}
              alt=""
              width={65}
              height={26}
              loading="lazy"
              decoding="async"
              onError={() => setLogoError(true)}
              className="max-h-[22px] max-w-[54px] object-contain sm:max-h-[24px] sm:max-w-[60px]"
            />
          </div>
        )}
      </div>

      {/* CENTERED IDENTITY TYPOGRAPHY BENEATH CIRCLE */}
      <div className="mt-3.5 flex w-full flex-col items-center text-center">
        <h3
          className={cn(
            "line-clamp-2 font-display text-[0.9375rem] font-bold leading-snug tracking-tight transition-colors sm:text-[1.0625rem] lg:text-[1.125rem]",
            isLight
              ? "text-[#092117] group-hover:text-[#153B2B]"
              : "text-[#F6F4EC] group-hover:text-[#CFEA3B]",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-1 line-clamp-2 text-xs font-normal leading-snug sm:text-[0.8125rem]",
            isLight ? "text-[#496158]" : "text-[#97B0A4]",
          )}
        >
          {role}
        </p>
        <p
          className={cn(
            "mt-1 line-clamp-2 font-sans text-[0.75rem] font-semibold leading-tight sm:text-[0.8125rem]",
            isLight ? "text-[#2D5443]" : "text-[#CADB7E]",
          )}
        >
          {organisation}
        </p>
      </div>
    </Component>
  );
}
