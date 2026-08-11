import type { Sponsor, SponsorTier } from "@/types";

const img = (id: string) => `https://framerusercontent.com/images/${id}`;

export const sponsorTiers: SponsorTier[] = [
  { id: "associate", label: "Associate Sponsor" },
  { id: "knowledge", label: "Knowledge Partner" },
  { id: "exhibitor", label: "Exhibitors" },
  { id: "supporting", label: "Supporting Partners" },
  { id: "media", label: "Media Partners" },
];

/**
 * Logos taken directly from the official AIAC West Africa partner wall.
 * Company names are intentionally omitted where the source provides logo only.
 */
export const sponsors: Sponsor[] = [
  { id: "assoc-1", tier: "associate", logo: img("wHSZjSNdeTEwAUlLR0I1ZQQ4qc.png") },
  { id: "assoc-2", tier: "associate", logo: img("s0XKOUf1hHpMHerIPO2XyKGxrc.svg") },
  { id: "know-1", tier: "knowledge", logo: img("Sp72wvfLsXMWSPFXiP318pUO8.png") },
  { id: "exh-1", tier: "exhibitor", logo: img("05ob8t5byBm8hmoVNuFPOLKSQo.png") },
  { id: "exh-2", tier: "exhibitor", logo: img("67w08P9rr5GuKaxR7Uw0TOTT4o.jpg"), name: "Asset Integrity Engineering" },
  { id: "exh-3", tier: "exhibitor", logo: img("uQanYla2Nj2Qg8XqcDYKOlzExUQ.png") },
  { id: "exh-4", tier: "exhibitor", logo: img("c4lib6xRAzVFa9UihjSRlhpyk.svg") },
  { id: "sup-1", tier: "supporting", logo: img("rhbHlgBFIZkSFWNY7XQhgKFfsQs.svg") },
  { id: "sup-2", tier: "supporting", logo: img("6r3I4C3sJUqRRPmCPRNV1tsSNsE.png") },
  { id: "sup-3", tier: "supporting", logo: img("HVC8HzEWPwALCa2SJshYRMiAr1c.png") },
  { id: "med-1", tier: "media", logo: img("ysntJeGh19z3ypwPQFSRrpLJ00.png") },
  { id: "med-2", tier: "media", logo: img("0hWm3kPxm057Mj9z5eYZm17Nk9A.png") },
  { id: "med-3", tier: "media", logo: img("OgSjNu8aYOUaafXDRMvHJRIlI.jpeg") },
  { id: "med-4", tier: "media", logo: img("4Vh1CR6pXtlW3ykzP019ayZY2CY.png") },
  { id: "med-5", tier: "media", logo: img("8YDJk8V0SL8VFHWRhf6btET6EI.png"), name: "Energy Business Review" },
  { id: "med-6", tier: "media", logo: img("Y8CF8Z0FlYl1KdCalzZ9di3w.png"), name: "Oilfield Africa Review" },
  { id: "med-7", tier: "media", logo: img("WK15kwJFJAphOXOAnnhbMPiPsAE.png"), name: "Inspectioneering" },
  { id: "med-8", tier: "media", logo: img("Y5WppbTMLDvVLXJZnKaRi0by4Ew.png"), name: "NOG Energy Directory" },
];

export const organiserLogo = img("K9X6X1fitHlNG28Lhh2uZy14aTg.png");