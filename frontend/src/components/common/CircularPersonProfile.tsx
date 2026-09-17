import { useState } from "react";
import { CountryFlag } from "@/components/common/CountryFlag";
import { getOrganisationLogo } from "@/data/organisationLogos";
import { cn } from "@/lib/utils";

export interface CircularPersonProfileProps {
  name: string;
  role: string;
  organisation: string;
  image?: string | undefined;
  countryCode?: string | undefined;
  organisationLogo?: string | undefined;
  companyLogoKey?: string | undefined;
  className?: string | undefined;
  clone?: boolean | undefined;
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
  image,
  countryCode,
  organisationLogo,
  companyLogoKey,
  className,
  clone = false,
}: CircularPersonProfileProps) {
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const initials = getInitials(name);
  const logoUrl =
    organisationLogo || getOrganisationLogo(companyLogoKey || organisation) || undefined;
  const hasValidImage = Boolean(image && !imageError);

  return (
    <div
      aria-hidden={clone ? "true" : undefined}
      className={cn(
        "group relative flex w-[12rem] shrink-0 flex-col items-center text-center transition-all duration-300 sm:w-[13rem] lg:w-[14rem]",
        className,
      )}
    >
      {/* CIRCULAR PORTRAIT & ORBIT RING CONTAINER */}
      <div className="relative mx-auto size-36 shrink-0 sm:size-40 lg:size-44">
        {/* Outer Orbit Ring with Accent Segment */}
        <div
          className="absolute -inset-1.5 rounded-full border border-forest/70 opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:border-lime/60"
          aria-hidden
        />
        <div
          className="absolute -inset-1.5 rounded-full border-t-2 border-lime transition-transform duration-700 ease-out group-hover:rotate-45"
          aria-hidden
        />

        {/* Inner Circular Image / Initials Frame */}
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#05190F] bg-[#05190F] shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
          {hasValidImage ? (
            <img
              src={image}
              alt={clone ? "" : `Portrait of ${name}`}
              width={220}
              height={220}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top grayscale-[0.1] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0C3828] via-[#071F18] to-[#04140D] text-center">
              <span className="font-display text-2xl font-black tracking-widest text-lime sm:text-3xl">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* COUNTRY FLAG BADGE (Lower Left ~7 o'clock) */}
        {countryCode && (
          <div
            className="absolute -bottom-1 -left-1 z-20 flex size-8 items-center justify-center rounded-full border border-white/20 bg-[#05190F] shadow-md transition-transform duration-300 group-hover:scale-110 sm:size-9"
            title={countryCode}
          >
            <CountryFlag code={countryCode} />
          </div>
        )}

        {/* COMPANY LOGO BADGE (Lower Right ~4 o'clock) */}
        {logoUrl && !logoError && (
          <div className="absolute -bottom-1 -right-1 z-20 flex h-7 max-w-[70px] items-center justify-center rounded-lg border border-white/20 bg-white/95 px-2 py-0.5 shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-8 sm:max-w-[76px]">
            <img
              src={logoUrl}
              alt=""
              width={70}
              height={24}
              loading="lazy"
              decoding="async"
              onError={() => setLogoError(true)}
              className="max-h-[20px] max-w-[58px] object-contain sm:max-h-[22px] sm:max-w-[64px]"
            />
          </div>
        )}
      </div>

      {/* CENTERED IDENTITY TYPOGRAPHY BENEATH CIRCLE */}
      <div className="mt-3.5 flex flex-col items-center text-center">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-lime sm:text-lg">
          {name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs font-normal leading-snug text-white/70 sm:text-sm">
          {role}
        </p>
        <p className="mt-0.5 line-clamp-1 font-sans text-[0.72rem] font-medium leading-tight text-lime/90 sm:text-xs">
          {organisation}
        </p>
      </div>
    </div>
  );
}
