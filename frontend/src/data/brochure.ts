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

export type BrochurePackage = {
  id: string;
  title: string;
  detail?: string;
  scope?: string;
  highlights?: readonly string[];
};

export type BrochurePricePackage = BrochurePackage;

export const sponsorshipPackages: readonly BrochurePackage[] = [
  {
    id: "title",
    title: "Title Sponsor",
    scope: "Supreme Event Leadership",
    highlights: [
      "Keynote address slot",
      "Premium double exhibition stand",
      "Prime logo placement on all mainstage graphics",
      "VIP networking access",
    ],
  },
  {
    id: "strategic",
    title: "Strategic Sponsor",
    scope: "Strategic Industry Partner",
    highlights: [
      "Plenary session speaking position",
      "Prominent exhibition stand",
      "Branded conference collateral",
      "Executive pass allocation",
    ],
  },
  {
    id: "diamond",
    title: "Diamond Sponsor",
    scope: "Diamond Pillar Partner",
    highlights: [
      "Technical track session chairing",
      "Premium exhibition booth",
      "High-visibility branding across media",
      "Dedicated delegate invitations",
    ],
  },
  {
    id: "platinum",
    title: "Platinum Sponsor",
    scope: "Platinum Partner",
    highlights: [
      "Panel discussion participation",
      "Exhibition booth space",
      "Brand visibility in conference directory",
      "Delegate pass bundle",
    ],
  },
  {
    id: "gold",
    title: "Gold Sponsor",
    scope: "Gold Partner",
    highlights: [
      "Specialist session recognition",
      "Exhibition space",
      "Marketing collateral inclusion",
      "Delegate passes",
    ],
  },
  {
    id: "silver",
    title: "Silver Sponsor",
    scope: "Silver Partner",
    highlights: [
      "Brand listing on digital platforms",
      "Exhibition space",
      "Official conference recognition",
      "Delegate passes",
    ],
  },
];

export const exhibitionStandPackages: readonly BrochurePackage[] = [
  {
    id: "9sqm",
    title: "9 sqm stand",
    detail: "Standard Single Booth",
    scope: "Specialized technology and service demonstrations",
    highlights: [
      "Fitted aluminium shell scheme",
      "2 Exhibitor passes with conference access",
      "Company fascia board & lighting",
      "Listing in official exhibition directory",
    ],
  },
  {
    id: "18sqm",
    title: "18 sqm stand",
    detail: "Double Booth Space",
    scope: "Enhanced floor presence for hardware & software displays",
    highlights: [
      "Double shell scheme configuration",
      "4 Exhibitor passes with conference access",
      "Dual fascia nameboards & power",
      "Official directory & digital catalogue feature",
    ],
  },
  {
    id: "36sqm",
    title: "36 sqm stand",
    detail: "Premier Island Space",
    scope: "Maximum industry visibility for machinery & interactive demos",
    highlights: [
      "Prime island or corner positioning",
      "8 Exhibitor passes with conference access",
      "Custom build flexibility or shell scheme",
      "Priority media & buyer tour inclusion",
    ],
  },
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

export const corporateGroupDelegatePackages: readonly BrochurePackage[] = [
  {
    id: "group-gold",
    title: "Gold Group Pass",
    detail: "15 Passes",
    scope: "Full-organisation technical delegation",
    highlights: [
      "15 Full conference access passes",
      "Priority seating in plenary sessions",
      "Access to all technical tracks & exhibition floor",
      "Corporate recognition in delegate materials",
    ],
  },
  {
    id: "group-silver",
    title: "Silver Group Pass",
    detail: "10 Passes",
    scope: "Senior technical and engineering team",
    highlights: [
      "10 Full conference access passes",
      "Access to all technical tracks & exhibition floor",
      "Dedicated corporate check-in desk",
      "Networking reception access",
    ],
  },
  {
    id: "group-bronze",
    title: "Bronze Group Pass",
    detail: "5 Passes",
    scope: "Specialized project team",
    highlights: [
      "5 Full conference access passes",
      "Access to all technical tracks & exhibition floor",
      "Full access to conference technical proceedings",
    ],
  },
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
