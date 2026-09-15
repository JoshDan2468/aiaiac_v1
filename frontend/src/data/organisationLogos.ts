/**
 * Central registry for organisation / company logos.
 * Only existing, verified logo assets are registered here.
 * Missing logos return undefined so the UI renders organisation names cleanly without broken image placeholders.
 */

export const organisationLogos: Record<string, string> = {
  // Known verified logos (mapped by normalised organisation key)
  "asset integrity engineering":
    "https://framerusercontent.com/images/67w08P9rr5GuKaxR7Uw0TOTT4o.jpg",
  "energy business review": "https://framerusercontent.com/images/8YDJk8V0SL8VFHWRhf6btET6EI.png",
  "oilfield africa review": "https://framerusercontent.com/images/Y8CF8Z0FlYl1KdCalzZ9di3w.png",
  inspectioneering: "https://framerusercontent.com/images/WK15kwJFJAphOXOAnnhbMPiPsAE.png",
  "nog energy directory": "https://framerusercontent.com/images/Y5WppbTMLDvVLXJZnKaRi0by4Ew.png",
  "gexperts energy limited": "/brand/gexpert-main.png",
  "gexperts energy": "/brand/gexpert-main.png",
};

export function getOrganisationLogo(organisation: string): string | undefined {
  if (!organisation) return undefined;
  const key = organisation.trim().toLowerCase();
  return organisationLogos[key];
}
