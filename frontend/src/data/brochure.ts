/**
 * Approved brochure-facing content for public presentation only.
 * These records are deliberately read-only: they do not enable payments,
 * bookings, submissions, quotations, or any backend workflow.
 */

export const abstractSubmissionGuidance = {
  deadline: "15 March 2027",
  maximumWords: 500,
  requiredDetails: [
    "Paper title",
    "Author(s)",
    "Professional affiliation",
    "Mailing address",
    "Email",
  ],
  reviewCriteria: [
    "Originality",
    "Technical relevance",
    "Practical value",
    "Likely delegate interest",
  ],
  speakerFee: "To Be Announced upon confirmation and acceptance",
  contactEmail: "aiaiac@aiac-africa.com",
  contactNotice:
    "Brochure source variants use different registration emails. The published AIAIAC Africa contact remains subject to organiser confirmation.",
} as const;

export const abstractTopics = [
  "Asset Integrity & Reliability",
  "Corrosion & Materials",
  "Digital Integrity & AI",
  "Automation & Control",
  "OT/ICS Cybersecurity",
  "Threat, Risk & Resilience",
] as const;

export type BrochurePricePackage = {
  id: string;
  title: string;
  priceUsd: number;
  detail?: string;
};

export const sponsorshipPackages: readonly BrochurePricePackage[] = [
  { id: "title", title: "Title Sponsor", priceUsd: 100_000 },
  { id: "strategic", title: "Strategic Sponsor", priceUsd: 75_000 },
  { id: "diamond", title: "Diamond Sponsor", priceUsd: 50_000 },
  { id: "platinum", title: "Platinum Sponsor", priceUsd: 40_000 },
  { id: "gold", title: "Gold Sponsor", priceUsd: 30_000 },
  { id: "silver", title: "Silver Sponsor", priceUsd: 20_000 },
];

export const exhibitionStandPackages: readonly BrochurePricePackage[] = [
  { id: "9sqm", title: "9 sqm stand", priceUsd: 6_990 },
  { id: "18sqm", title: "18 sqm stand", priceUsd: 13_980 },
  { id: "36sqm", title: "36 sqm stand", priceUsd: 27_960 },
];

export const exhibitionShellSchemeItems = [
  "Aluminium structure with white infill",
  "Fascia company name",
  "Brochure rack",
  "Information counter",
  "Two chairs",
  "One table",
  "Waste basket",
  "13A power socket",
  "Extension cord",
  "Three track spotlights",
] as const;

export const corporateGroupDelegatePackages: readonly BrochurePricePackage[] = [
  { id: "group-gold", title: "Gold", priceUsd: 15_000, detail: "15 passes" },
  { id: "group-silver", title: "Silver", priceUsd: 10_000, detail: "10 passes" },
  { id: "group-bronze", title: "Bronze", priceUsd: 5_000, detail: "5 passes" },
];

export const exhibitionCategories = [
  "Asset Integrity & NDT",
  "Corrosion & Coatings",
  "Maintenance & Reliability",
  "Automation & Instrumentation",
  "AI & Digital Transformation",
  "Cybersecurity",
] as const;

export const conferenceExperience = [
  "Executive Keynote Sessions",
  "Four Specialised Conference Tracks",
  "Technical Presentations",
  "Innovation Showcase",
  "Exhibition",
  "Executive Roundtables",
  "Strategic Networking",
] as const;

export const approvedAudiences = [
  "Asset Owners & Operators",
  "Government & Regulators",
  "Oil, Gas & Energy Companies",
  "Maritime & Heavy Industries",
  "AI & Technology Companies",
  "Engineering & Maintenance Providers",
  "Cybersecurity & Automation Specialists",
] as const;

export const aiaiacAfricaChallenges = [
  "Ageing Infrastructure",
  "Rising Operating Costs",
  "Rapid AI Adoption",
  "Growing Cybersecurity Threats",
  "Demand for Safer & More Efficient Operations",
  "Need for Local Skills, Technology & Investment",
] as const;
