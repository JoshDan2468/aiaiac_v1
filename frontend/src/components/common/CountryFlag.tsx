import { cn } from "@/lib/utils";

interface CountryFlagProps {
  code?: string;
  className?: string;
}

const countryNames: Record<string, string> = {
  NG: "Nigeria",
  TZ: "Tanzania",
  US: "USA",
  USA: "USA",
  CA: "Canada",
  GH: "Ghana",
  NA: "Namibia",
};

export function getCountryName(code?: string): string {
  if (!code) return "";
  const upper = code.toUpperCase();
  return countryNames[upper] ?? upper;
}

export function CountryFlag({ code, className }: CountryFlagProps) {
  if (!code) return null;
  const upperCode = code.toUpperCase();
  const title = getCountryName(upperCode);

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 shrink-0", className)}
      title={title}
      aria-label={`Country: ${title}`}
    >
      {renderFlagSvg(upperCode)}
      <span className="text-xs font-medium text-white/80 leading-none">{title}</span>
    </span>
  );
}

function renderFlagSvg(code: string) {
  const commonClasses =
    "h-3.5 w-5 rounded-[3px] border border-white/20 shadow-xs shrink-0 object-cover";

  switch (code) {
    case "NG":
      // Nigeria: Green - White - Green vertical stripes
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={commonClasses}>
          <rect width="8" height="16" fill="#008751" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#008751" />
        </svg>
      );

    case "TZ":
      // Tanzania: Green top-left, Blue bottom-right, Black diagonal stripe with Yellow borders
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={commonClasses}>
          <rect width="24" height="16" fill="#1EB53A" />
          <polygon points="0,16 24,0 24,16" fill="#00A3E0" />
          <polygon points="0,16 24,0 24,5 0,16" fill="#FCD116" />
          <polygon points="0,16 20,0 24,0 0,16" fill="#FCD116" />
          <polygon points="0,16 22,0 24,0 0,14" fill="#000000" />
        </svg>
      );

    case "US":
    case "USA":
      // USA: Red/White horizontal stripes + Blue canton with white stars placeholder
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={commonClasses}>
          <rect width="24" height="16" fill="#BB133E" />
          <rect y="2.28" width="24" height="2.28" fill="#FFFFFF" />
          <rect y="6.85" width="24" height="2.28" fill="#FFFFFF" />
          <rect y="11.42" width="24" height="2.28" fill="#FFFFFF" />
          <rect width="10" height="8.56" fill="#002147" />
          <circle cx="2.5" cy="2.2" r="0.6" fill="#FFFFFF" />
          <circle cx="5" cy="2.2" r="0.6" fill="#FFFFFF" />
          <circle cx="7.5" cy="2.2" r="0.6" fill="#FFFFFF" />
          <circle cx="3.7" cy="4.2" r="0.6" fill="#FFFFFF" />
          <circle cx="6.2" cy="4.2" r="0.6" fill="#FFFFFF" />
          <circle cx="2.5" cy="6.2" r="0.6" fill="#FFFFFF" />
          <circle cx="5" cy="6.2" r="0.6" fill="#FFFFFF" />
          <circle cx="7.5" cy="6.2" r="0.6" fill="#FFFFFF" />
        </svg>
      );

    case "CA":
      // Canada: Red - White - Red with central Maple Leaf symbol
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={commonClasses}>
          <rect width="6" height="16" fill="#FF0000" />
          <rect x="6" width="12" height="16" fill="#FFFFFF" />
          <rect x="18" width="6" height="16" fill="#FF0000" />
          <path
            d="M12 4L13 6.5L15 6L14 8L15.5 9.5L13.5 10L12 13L10.5 10L8.5 9.5L10 8L9 6L11 6.5Z"
            fill="#FF0000"
          />
        </svg>
      );

    case "GH":
      // Ghana: Red - Yellow - Green horizontal tricolor with Black Star
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={commonClasses}>
          <rect width="24" height="5.33" fill="#CE1126" />
          <rect y="5.33" width="24" height="5.33" fill="#FCD116" />
          <rect y="10.66" width="24" height="5.34" fill="#006B3F" />
          <polygon
            points="12,5.5 12.8,7.8 15.2,7.8 13.3,9.2 14,11.5 12,10.1 10,11.5 10.7,9.2 8.8,7.8 11.2,7.8"
            fill="#000000"
          />
        </svg>
      );

    case "NA":
      // Namibia: Blue top, Red diagonal stripe with White borders, Green bottom
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={commonClasses}>
          <rect width="24" height="16" fill="#003580" />
          <polygon points="0,16 24,0 24,16" fill="#009543" />
          <polygon points="0,16 24,0 24,6 0,16" fill="#FFFFFF" />
          <polygon points="0,16 18,0 24,0 0,16" fill="#FFFFFF" />
          <polygon points="0,16 20,0 24,0 0,14" fill="#D21034" />
          <circle cx="5" cy="4.5" r="2" fill="#FFCE00" />
        </svg>
      );

    default:
      // Generic ISO code badge fallback
      return (
        <span className="inline-flex h-3.5 w-5 items-center justify-center rounded-[3px] border border-white/20 bg-lime/20 font-mono text-[0.55rem] font-black uppercase text-lime">
          {code.slice(0, 2)}
        </span>
      );
  }
}
