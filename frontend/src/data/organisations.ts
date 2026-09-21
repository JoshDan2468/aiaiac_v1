/**
 * Central Organisation Registry for AIAIAC Africa 2027.
 *
 * Reusable organisation metadata, normalisation, alias resolution,
 * and verified filesystem logo asset bindings.
 *
 * Rules:
 * 1. Logo paths MUST come from real assets existing in public/.
 * 2. Country flags are separate metadata (countryCode) and must NOT be derived from organisationKey.
 * 3. Organizations without a verified logo return undefined so UI falls back cleanly to typography.
 */

export interface Organisation {
  name: string;
  shortName?: string;
  logo?: string;
}

/**
 * Normalises an organisation or company string for consistent key lookup.
 * Handles casing, legal suffixes (Ltd, Limited, Inc, etc.), special characters,
 * punctuation, and spacing.
 */
export function normalizeOrganisationName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\.(svg|webp|png|jpe?g)$/i, "")
    .replace(/&/g, " and ")
    .replace(/[(),.'’"“”/–-]/g, " ")
    .replace(/\b(limited|ltd|plc|inc|incorporated|company|corp|corporation|companies)\b/g, " ")
    .replace(/[-_]/g, " ")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Controlled alias map binding naming variants and normalised forms
 * to the canonical organisation key.
 */
export const organisationAliases: Record<string, string> = {
  // Shell variants
  shell: "shell",
  "shell-nigeria": "shell",
  "shell-usa": "shell",
  "shell-nigeria-exploration-and-production": "shell",
  "shell-nigeria-exploration-and-production-snepco": "shell",

  // NLNG variants
  nlng: "nlng",
  "nigeria-lng": "nlng",
  "nigerian-lng": "nlng",

  // AGPC / ANOH Gas variants
  agpc: "agpc",
  "anoh-gas": "agpc",
  "anoh-gas-processing": "agpc",
  "anoh-gas-processing-agpc": "agpc",

  // Seplat variants
  seplat: "seplat",
  "seplat-energy": "seplat",

  // TotalEnergies variants
  totalenergies: "totalenergies",
  "totalenergies-nigeria": "totalenergies",

  // ExxonMobil variants
  exxonmobil: "exxonmobil",
  "exxonmobil-nigeria": "exxonmobil",

  // NNPC / NGIC variants
  nnpc: "nnpc",
  "nnpc-gas-infrastructure": "nnpc",
  "nigeria-gas-infrastructure": "nnpc",

  // Renaissance variants
  renaissance: "renaissance",
  "renaissance-africa": "renaissance",
  "renaissance-africa-energy": "renaissance",

  // CSEAN variants
  csean: "csean",
  "cybersecurity-experts-association-of-nigeria": "csean",
  "cybersecurity-experts-association-of-nigeria-csean": "csean",

  // Pan Ocean variants
  "pan-ocean": "pan-ocean",
  "pan-ocean-and-newcross": "pan-ocean",
  "pan-ocean-oil-nigeria": "pan-ocean",

  // Cenosco variants
  cenosco: "cenosco",
  "cenosco-netherlands": "cenosco",

  // BP variants
  bp: "bp",
  "bp-petroleum": "bp",
  "british-petroleum": "bp",

  // FUTA variants
  futa: "futa",
  "federal-university-of-technology-akure": "futa",
  "the-federal-university-of-technology-akure": "futa",

  // AGIP variants
  agip: "agip",
  "agip-nigeria": "agip",

  // Canonical identity mappings
  adnoc: "adnoc",
  "alpha-echo-energy": "alpha-echo-energy",
  aramco: "aramco",
  arridex: "arridex",
  "asb-valiant": "asb-valiant",
  "asset-integrity-engineering-aie": "aie",
  aie: "aie",
  "atlantic-lng": "atlantic-lng",
  "avetium-holdco": "avetium",
  avetium: "avetium",
  "batabank-ai-usa": "batabank",
  batabank: "batabank",
  "bg-technical": "bg-technical",
  "candid-oil": "candid-oil",
  cesra: "cesra",
  "co-founder-of-enatlas": "enatlas",
  enatlas: "enatlas",
  "dangote-petroleum-and-petrochemicals": "dangote",
  dangote: "dangote",
  "daptem-engineering": "daptem",
  daptem: "daptem",
  dpfluiteq: "dpfluiteq",
  fertiglobe: "fertiglobe",
  "gexperts-energy": "gexperts",
  gexperts: "gexperts",
  "ghana-national-gas": "ghana-gas",
  "ghana-gas": "ghana-gas",
  "hamwaltech-solutions": "hamwaltech",
  hamwaltech: "hamwaltech",
  "haslund-trading": "haslund",
  haslund: "haslund",
  "hitachi-energy": "hitachi",
  hitachi: "hitachi",
  "jotun-nigeria": "jotun",
  jotun: "jotun",
  mcalpha: "mcalpha",
  meritech: "meritech",
  "moduslights-technologies": "moduslights",
  moduslights: "moduslights",
  "navante-oil-and-gas": "navante",
  navante: "navante",
  nexridge: "nexridge",
  "nigerian-upstream-petroleum-regulatory-commission-nuprc": "nuprc",
  nuprc: "nuprc",
  "orashi-petroleum-development": "orashi",
  orashi: "orashi",
  "petroco-and-engineering": "petroco",
  petroco: "petroco",
  "petroleum-training-institute": "pti",
  pti: "pti",
  "phenomenal-energy": "phenomenal-energy",
  "platform-petroleum": "platform-petroleum",
  ptdf: "ptdf",
  "seapack-ventures": "seapack",
  seapack: "seapack",
  sonangol: "sonangol",
  spe: "spe",
  "transition-maritime": "transition-maritime",
  "tranter-it-infrastructure": "tranter-it",
  "tranter-it": "tranter-it",
  "university-utara-malaysia-uum": "uum",
  uum: "uum",
  "verte-energies": "verte-energies",
};

/**
 * Central registry of all known organisations.
 * Logos strictly point to real verified files in the asset directory.
 */
export const organisations: Record<string, Organisation> = {
  // Organisations with verified logo assets in frontend/public/assets/aiaiac-2027/logos
  adnoc: {
    name: "Abu Dhabi National Oil Company",
    shortName: "ADNOC",
    logo: "/assets/aiaiac-2027/logos/Adnoc-thumb.png",
  },
  "alpha-echo-energy": {
    name: "Alpha Echo Energy Limited",
    shortName: "Alpha Echo Energy",
    logo: "/assets/aiaiac-2027/logos/images (4).png",
  },
  aramco: {
    name: "Aramco",
    logo: "/assets/aiaiac-2027/logos/images (2).jpg",
  },
  "asb-valiant": {
    name: "ASB Valiant Company Limited",
    shortName: "ASB Valiant",
    logo: "/assets/aiaiac-2027/logos/images (6).jpg",
  },
  "bg-technical": {
    name: "BG Technical Ltd",
    shortName: "BGT",
    logo: "/assets/aiaiac-2027/logos/36321_company_logo.jpg",
  },
  csean: {
    name: "Cybersecurity Experts Association of Nigeria",
    shortName: "CSEAN",
    logo: "/assets/aiaiac-2027/logos/1630538037825.jpg",
  },
  dangote: {
    name: "Dangote Petroleum and Petrochemicals",
    shortName: "Dangote",
    logo: "/assets/aiaiac-2027/logos/images (1).png",
  },
  daptem: {
    name: "Daptem Engineering",
    logo: "/assets/aiaiac-2027/logos/1631362000018.jpg",
  },
  exxonmobil: {
    name: "ExxonMobil",
    logo: "/assets/aiaiac-2027/logos/ExxonMobil-Logo.wine.png",
  },
  gexperts: {
    name: "GExperts Energy Limited",
    shortName: "GExperts Energy",
    logo: "/brand/gexpert-main.png",
  },
  hamwaltech: {
    name: "HAMWALTECH SOLUTIONS",
    shortName: "HAMWALTECH",
    logo: "/assets/aiaiac-2027/logos/images (5).jpg",
  },
  jotun: {
    name: "Jotun",
    logo: "/assets/aiaiac-2027/logos/jotun-logo-png_seeklogo-76141.png",
  },
  moduslights: {
    name: "Moduslights Technologies",
    logo: "/assets/aiaiac-2027/logos/1754917826710.jpg",
  },
  nlng: {
    name: "Nigeria LNG Limited",
    shortName: "NLNG",
    logo: "/assets/aiaiac-2027/logos/images (1).jpg",
  },
  nnpc: {
    name: "Nigerian National Petroleum Company",
    shortName: "NNPC",
    logo: "/assets/aiaiac-2027/logos/images (2).png",
  },
  orashi: {
    name: "Orashi Petroleum Development Company Limited",
    shortName: "Orashi",
    logo: "/assets/aiaiac-2027/logos/images (4).jpg",
  },
  "pan-ocean": {
    name: "Pan Ocean and Newcross Companies",
    shortName: "Pan Ocean",
    logo: "/assets/aiaiac-2027/logos/pan_ocean_oil_corporation_nigeria_limited_logo.jpg",
  },
  "phenomenal-energy": {
    name: "Phenomenal Energy Limited",
    shortName: "Phenomenal Energy",
    logo: "/assets/aiaiac-2027/logos/image (1).png", // Preferred transparent PNG
  },
  ptdf: {
    name: "Petroleum Technology Development Fund",
    shortName: "PTDF",
    logo: "/assets/aiaiac-2027/logos/images (3).jpg",
  },
  pti: {
    name: "Petroleum Training Institute",
    shortName: "PTI",
    logo: "/assets/aiaiac-2027/logos/xT5NgohX7gIhq4zto9Q8gdUfupw2mq8ETVN96afC-1.jpg",
  },
  renaissance: {
    name: "Renaissance Africa",
    shortName: "Renaissance",
    logo: "/assets/aiaiac-2027/logos/Renaissance-Consortium.png",
  },
  seplat: {
    name: "Seplat Energy",
    shortName: "Seplat",
    logo: "/assets/aiaiac-2027/logos/Seplat-Energy.png",
  },
  shell: {
    name: "Shell",
    logo: "/assets/aiaiac-2027/logos/Shell_logo.svg.webp",
  },
  sonangol: {
    name: "Sonangol",
    logo: "/assets/aiaiac-2027/logos/sonangol-logo-png_seeklogo-435144.png",
  },
  spe: {
    name: "SPE International Gulf Coast Section",
    shortName: "SPE",
    logo: "/assets/aiaiac-2027/logos/images.png",
  },
  totalenergies: {
    name: "TotalEnergies",
    logo: "/assets/aiaiac-2027/logos/images.jpg",
  },
  uum: {
    name: "University Utara Malaysia",
    shortName: "UUM",
    logo: "/assets/aiaiac-2027/logos/images (3).png",
  },

  // Known conference organisations currently awaiting logo assets
  "add-value-consultancy": {
    name: "Add Value Consultancy",
  },
  agip: {
    name: "AGIP Nigeria",
    shortName: "AGIP",
  },
  agpc: {
    name: "ANOH Gas Processing Company Limited",
    shortName: "AGPC",
  },
  arridex: {
    name: "Arridex",
  },
  aie: {
    name: "Asset Integrity Engineering",
    shortName: "AIE",
  },
  "atlantic-lng": {
    name: "Atlantic LNG",
  },
  avetium: {
    name: "Avetium Holdco",
  },
  batabank: {
    name: "BataBank AI, USA",
    shortName: "BataBank",
  },
  bp: {
    name: "British Petroleum",
    shortName: "BP",
  },
  "candid-oil": {
    name: "Candid Oil",
  },
  cenosco: {
    name: "Cenosco",
  },
  cesra: {
    name: "Center for Space Research and Applications",
    shortName: "CESRA",
  },
  dpfluiteq: {
    name: "Dpfluiteq",
  },
  enatlas: {
    name: "ENATLAS",
  },
  futa: {
    name: "Federal University of Technology, Akure",
    shortName: "FUTA",
  },
  fertiglobe: {
    name: "Fertiglobe",
  },
  "ghana-gas": {
    name: "Ghana National Gas Limited Company",
    shortName: "Ghana Gas",
  },
  haslund: {
    name: "Haslund Trading",
  },
  hitachi: {
    name: "Hitachi Energy",
  },
  mcalpha: {
    name: "McAlpha Inc",
  },
  meritech: {
    name: "MERITECH LTD",
    shortName: "Meritech",
  },
  navante: {
    name: "Navante Oil & Gas Company Limited",
    shortName: "Navante",
  },
  nexridge: {
    name: "NexRidge Limited",
    shortName: "NexRidge",
  },
  nuprc: {
    name: "Nigerian Upstream Petroleum Regulatory Commission",
    shortName: "NUPRC",
  },
  petroco: {
    name: "Petroco and Engineering",
  },
  "platform-petroleum": {
    name: "Platform Petroleum Limited",
  },
  seapack: {
    name: "Seapack Ventures Ltd.",
    shortName: "Seapack",
  },
  "transition-maritime": {
    name: "Transition Maritime",
  },
  "tranter-it": {
    name: "Tranter IT Infrastructure",
  },
  "verte-energies": {
    name: "Verte Energies Ltd",
  },
};

/**
 * Resolves any company name or key to its canonical organisation key.
 */
export function resolveOrganisationKey(nameOrKey?: string): string | undefined {
  if (!nameOrKey) return undefined;
  const directKey = nameOrKey.toLowerCase().trim();
  if (organisations[directKey]) return directKey;
  if (organisationAliases[directKey]) return organisationAliases[directKey];
  const normalized = normalizeOrganisationName(nameOrKey);
  return organisationAliases[normalized] ?? (organisations[normalized] ? normalized : undefined);
}

/**
 * Returns the Organisation record for a given key or name.
 */
export function getOrganisation(keyOrName?: string): Organisation | undefined {
  if (!keyOrName) return undefined;
  const key = resolveOrganisationKey(keyOrName) || keyOrName.toLowerCase().trim();
  return organisations[key];
}

/**
 * Returns the logo URL for a given organisation key or name, or undefined if no logo exists.
 */
export function getOrganisationLogo(keyOrName?: string): string | undefined {
  if (!keyOrName) return undefined;
  const key = resolveOrganisationKey(keyOrName) || keyOrName.toLowerCase().trim();
  return organisations[key]?.logo;
}
