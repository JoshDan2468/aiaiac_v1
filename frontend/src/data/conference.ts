/**
 * Single source of truth for conference-level copy.
 * Every string here comes from the official AIAC West Africa material.
 * Values marked PLACEHOLDER are editable and awaiting confirmed data.
 */
export const conference = {
  mark: "AIAIAC",
  shortName: "AIAC West Africa",
  edition: "AIAC West Africa 2026",
  title: "Asset Integrity, Automation & Cybersecurity Conference",
  pillarsLine: ["Asset Integrity", "Artificial Intelligence", "Automation", "Cybersecurity"],
  tagline: "Guarding Infrastructure",
  strapline: "Guarding Infrastructure, Powering Innovation, Securing Tomorrow",
  dates: "9–10 June 2026",
  datesShort: "JUNE 9 – 10, 2026",
  venue: "The Civic Centre, Lagos, Nigeria",
  city: "Lagos",
  country: "Nigeria",
  /** Local start: 09 June 2026, 09:00 West Africa Time (UTC+1). */
  startsAtISO: "2026-06-09T09:00:00+01:00",
  endsAtISO: "2026-06-10T17:00:00+01:00",
  partnerLine: "In partnership with GExperts Consutoria Limited",
  sectors: ["Oil & Gas", "Maritime", "Heavy Industries", "Utilities"],
  invitation: [
    "The Asset Integrity, Automation & Cybersecurity Conference (AIAC West Africa 2026) will be held from 9-10 June 2026 in Lagos, Nigeria, serving as a dedicated platform to address the technical challenges of maintaining safe, reliable, and digitally resilient operations in oil and gas. Bringing together operators, EPCs, regulators, and technology providers, the conference will highlight the latest innovations driving operational performance, asset integrity, and industrial resilience.",
    "AIAC West Africa is tailored for professionals in integrity management, corrosion control, process safety, automation, and OT cybersecurity. The agenda will highlight advances in inspection and monitoring technologies, digital twins, predictive maintenance, IIoT and SCADA systems, and cyber defense frameworks, supported by regional case studies and global best practices. Delegates will also gain insights into emerging regulatory standards and strategies to balance cost efficiency with sustainability in asset-intensive operations.",
    "We invite you to be part of this strategic gathering, where global expertise meets regional experience, to exchange knowledge, explore solutions, and strengthen collaboration for a safer, smarter, and more resilient future in energy operations.",
  ],
  overview: [
    "AIAC West Africa 2026, taking place 09–10 June 2026 in Lagos, Nigeria, is the premier platform for addressing the region's most pressing challenges in asset integrity, automation, and industrial cybersecurity. The event brings together professionals in integrity management, process safety, automation, and OT cybersecurity to share insights, explore case studies, and learn from global best practices.",
    "Featuring two dedicated conference halls — one for Automation & Cybersecurity and another for Asset Integrity — AIAC West Africa ensures focused discussions on each discipline while providing room to tackle broader challenges in critical infrastructure. A dynamic exhibition hall will showcase the latest technologies transforming the industry.",
    "Attendees will have the opportunity to experience emerging trends firsthand, exchange ideas with peers, contribute insights, participate in technical presentations and panel discussions, and network with key stakeholders shaping the future of energy operations in West Africa.",
  ],
  conferences: [
    {
      id: "asset-integrity",
      name: "Asset Integrity and Corrosion Conference",
      hall: "Conference Hall 1",
    },
    {
      id: "automation-cybersecurity",
      name: "Automation and Cybersecurity Conference",
      hall: "Conference Hall 2",
    },
  ],
  dualConferenceNote:
    "This dual-conference platform provides an unparalleled opportunity for industry professionals to exchange knowledge, explore cutting-edge solutions, and strengthen collaboration in safeguarding vital energy assets.",
  /** Figures are shown as placeholders until the organiser confirms final numbers. */
  stats: [
    { label: "Conference Delegates", value: "TBC", placeholder: true },
    { label: "Countries", value: "TBC", placeholder: true },
    { label: "Speakers", value: "23", placeholder: false },
    { label: "Exhibitors", value: "TBC", placeholder: true },
  ],
  contact: {
    email: "support@aldrich-energy.com",
    phone: "+971 4 837 4300",
    organiser: "Aldrich Energy",
    organiserBlurb:
      "Aldrich Energy is a global consulting and event organizing firm assisting in both international and private clients to plan, develop, design, construct, operate and maintain hundreds of critical infrastructures in Oil and Energy Industry around the world. We are an exciting, dynamic, and innovative firm that values diversity in our workforce.",
    copyright: "All copyrights @aiacafrica",
  },
} as const;

export const navigation = [
  { label: "About", href: "/#about" },
  { label: "Conference", href: "/#programme" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Exhibition", href: "/#exhibition" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Media", href: "/#media" },
  { label: "Contact", href: "/#contact" },
];

export const quickLinks = [
  "Home",
  "Cybersecurity",
  "Asset Conference",
  "Exhibitor Profile",
  "Participate",
  "Visit Us",
  "Exhibitor Enquiry",
  "Sponsorship Enquiry",
  "Download Brochure",
];
