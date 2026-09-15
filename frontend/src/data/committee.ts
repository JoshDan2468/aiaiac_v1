import { conference } from "@/data/conference";
import type { CommitteeMember, TechnicalCommittee } from "@/types";

export const technicalChairman: CommitteeMember = {
  name: "Dr. (Engr.) Gbenga Ayodele Owolabi",
  role: "Commercial Manager",
  organisation: "ANOH Gas Processing Company",
  country: "Nigeria",
  chair: true,
  image:
    "/assets/aiaiac-2027/technical-chairman/WhatsApp_Image_2026-09-06_at_20.57.22__1_-removebg-preview-720.webp",
};

export const technicalChairmanHomepageMessage = {
  status: "",
  text: `The Asset Integrity, Artificial Intelligence Automation & Cybersecurity Conference (AIAIAC Africa 2027) will be held from ${conference.dates} in ${conference.venue}, serving as a dedicated platform to address the technical challenges of maintaining safe, reliable, and digitally resilient operations in oil and gas. Bringing together operators, EPCs, regulators, and technology providers, the conference will highlight the latest innovations driving operational performance, asset integrity, and industrial resilience.`,
} as const;

export const committeeIntro =
  "The Technical Committees of AIAIAC Africa are driven by renowned industry leaders, technical authorities, and innovators. These specialists set the direction for technical excellence, research, and operational frameworks across asset integrity, artificial intelligence, automation, and cybersecurity.";

export const technicalCommittees: TechnicalCommittee[] = [
  {
    id: "asset-integrity",
    name: "Asset Integrity Technical Committee",
    slug: "asset-integrity",
    members: [
      {
        id: "david-oni",
        name: "Engr. David Oni",
        role: "Head, Subsea Intervention & Construction",
        organisation: "Shell Nigeria",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/egnr-David.webp",
      },
      {
        id: "ikenna-ikonta",
        name: "Engr. Ikenna Ikonta",
        role: "Head Asset Integrity & Plant Optimization",
        organisation: "Nigerian LNG Limited",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/IkennaIkonta.webp",
      },
      {
        id: "olalekan-adeaga",
        name: "Engr. Olalekan Adeaga",
        role: "Offshore Installation Manager",
        organisation: "Seplat",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/OlalekanAdeaga.webp",
      },
      {
        id: "olawale-onasoga",
        name: "Engr. Olawale Onasoga",
        role: "Reliability Engineering Manager",
        organisation: "Atlantic LNG",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/OlawaleOnasoga.webp",
      },
      {
        id: "paul-aminadokiruaru",
        name: "Engr. Paul Aminadokiruaru",
        role: "Erha MIA Superintendent",
        organisation: "ExxonMobil",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/PaulAminadokiruaru.webp",
      },
      {
        id: "mavis-sika-okyere",
        name: "Dr. (Engr.) Mavis Sika Okyere",
        role: "Assistant Manager, Pipeline Integrity",
        organisation: "Ghana National Gas Limited Company",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/MavisSika.webp",
      },
      {
        id: "eric-oguama",
        name: "Engr. Eric Oguama",
        role: "Manager, Deep Water Assets Inspection",
        organisation: "TotalEnergies Nigeria",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/EricOguama.webp",
      },
      {
        id: "razaq-shuaib",
        name: "Engr. Razaq Shuaib",
        role: "Asset Operations Support (SMART) Manager",
        organisation: "TotalEnergies Nigeria",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Razaq.webp",
      },
      {
        id: "collins-okaru",
        name: "Engr. Collins Okaru",
        role: "General Manager – Technical",
        organisation: "Verte Energies Ltd",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/collin.webp",
      },
      {
        id: "henry-osabohien",
        name: "Engr. (Dr.) Henry Osabohien",
        role: "Pipeline Expert",
        organisation: "ADNOC",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Henry.webp",
      },
      {
        id: "tamuonemi-efebeli",
        name: "Dr. Tamuonemi Efebeli",
        role: "Pipelines Operations Manager",
        organisation: "Renaissance Africa",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Tamuonemi.webp",
      },
      {
        id: "abduganiyu-teslim",
        name: "Engr. Abduganiyu Teslim",
        role: "Lead, Procurement",
        organisation: "ANOH Gas Processing Company – AGPC",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Abduganiyu.webp",
      },
      {
        id: "ikedi-uche",
        name: "Engr. Ikedi Uche",
        role: "Principal Materials, Corrosion & Inspection Engineer",
        organisation: "Shell",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Ikedi.webp",
      },
      {
        id: "albert-okechukwu-echibe",
        name: "Engr. Albert Okechukwu Echibe",
        role: "Senior Manager, Development and Production Department",
        organisation: "Nigerian Upstream Petroleum Regulatory Commission (NUPRC)",
        image: "",
      },
      {
        id: "franklin-okafor",
        name: "Engr. Franklin Okafor",
        role: "Principal Corrosion Engineer",
        organisation: "Shell Nigeria Exploration and Production Company (SNEPCO)",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Franklin.webp",
      },
      {
        id: "olusola-aina",
        name: "Engr. Olusola Aina",
        role: "Manager HSSE/QA",
        organisation: "ANOH Gas",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Olusola.webp",
      },
      {
        id: "jeremiah-amodu-peter",
        name: "Engr. Jeremiah Amodu Peter",
        role: "Production / Process Engineer",
        organisation: "Dangote Petroleum and Petrochemicals",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Jeremiah.webp",
      },
      {
        id: "edgar-njeje",
        name: "Engr. Edgar Njeje",
        role: "Managing Director",
        organisation: "Petroco and Engineering",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Edgar.webp",
      },
      {
        id: "chukwu-emeke",
        name: "Dr. Chukwu Emeke",
        role: "Base Office Superintendent",
        organisation: "Platform Petroleum Limited",
        image: "",
      },
      {
        id: "oluwasegun-lamidi",
        name: "Engr. Oluwasegun Lamidi",
        role: "Facility Engineering Management",
        organisation: "Shell, USA",
        image: "",
      },
      {
        id: "allison-gabriel",
        name: "Allison Gabriel",
        role: "Research and Development Engineer",
        organisation: "BG Technical",
        image: "/assets/aiaiac-2027/technical-committees/asset-integrity/Allison.webp",
      },
    ],
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence Technical Committee",
    slug: "artificial-intelligence",
    members: [
      {
        id: "olugbenga-abimbola-oredeko",
        name: "Engr. Olugbenga Abimbola Oredeko",
        role: "Founder / CEO / AI Strategist",
        organisation: "BataBank AI, USA",
        image:
          "/assets/aiaiac-2027/technical-committees/artificial-intelligence/olugbenga-abimbola-oredeko.webp",
      },
      {
        id: "opubo-edwin-atiegoba",
        name: "Engr. Opubo Edwin Atiegoba",
        role: "Managing Director / Chief Strategy Officer",
        organisation: "Alpha Echo Energy Limited",
        image:
          "/assets/aiaiac-2027/technical-committees/artificial-intelligence/opubo-edwin-atiegoba.webp",
      },
      {
        id: "onasoga-olukayode",
        name: "Dr. Engr. Onasoga Olukayode A",
        role: "Research Associate and AI Specialist",
        organisation: "University Utara Malaysia (UUM)",
        image:
          "/assets/aiaiac-2027/technical-committees/artificial-intelligence/onasoga-olukayode.webp",
      },
      {
        id: "taiwo-lawal",
        name: "Engr. Taiwo Lawal",
        role: "Founder & CEO",
        organisation: "HAMWALTECH SOLUTIONS",
        image: "",
      },
      {
        id: "oluwatomisin-asere",
        name: "Oluwatomisin Asere",
        role: "Managing Director / Lead Consultant",
        organisation: "Moduslights Technologies",
        image: "",
      },
      {
        id: "effiong-okwong",
        name: "Effiong Okwong",
        role: "VP, Digital Solutions",
        organisation: "Arridex",
        image: "",
      },
    ],
  },
  {
    id: "automation-cybersecurity",
    name: "Automation & Cybersecurity Technical Committee",
    slug: "automation-cybersecurity",
    members: [
      {
        id: "joseph-s-ojo",
        name: "Prof. Joseph S. Ojo",
        role: "Director, Center for Space Research and Applications",
        organisation: "CESRA",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/joseph-s-ojo.webp",
      },
      {
        id: "umar-saad",
        name: "Dr. Umar Sa’ad",
        role: "Manager, Information Technology",
        organisation: "AGPC",
        image: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/umar-saad.webp",
      },
      {
        id: "emmanuel-omoke",
        name: "Emmanuel Omoke",
        role: "Regulatory Compliance & Business Ethics",
        organisation: "Nigeria Gas Infrastructure Company",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/emmanuel-omoke.webp",
      },
      {
        id: "ahmed-barrak",
        name: "Ahmed Barrak",
        role: "CTO / Cybersecurity Leader",
        organisation: "Aramco",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ahmed-barrak.webp",
      },
      {
        id: "ademola-agboola",
        name: "Dr. Ademola Agboola",
        role: "Group Head, Information Technology",
        organisation: "Pan Ocean and Newcross Companies",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ademola-agboola.webp",
      },
      {
        id: "desmond-inyamah",
        name: "Engr. Desmond Inyamah",
        role: "Manager, Refinery Audit",
        organisation: "NNPC",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/desmond-inyamah.webp",
      },
      {
        id: "olabode-agboola",
        name: "Olabode Agboola",
        role: "President",
        organisation: "Cybersecurity Experts Association of Nigeria (CSEAN)",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/olabode-agboola.webp",
      },
      {
        id: "marshal-abraham",
        name: "Engr. Marshal Abraham",
        role: "Instrumentation, Control & Automation Engineer",
        organisation: "ASB Valiant Company Limited",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/marshal-abraham.webp",
      },
      {
        id: "tolulope-longe",
        name: "Tolulope Longe",
        role: "Manager, Commercial Contract Management",
        organisation: "NLNG",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/tolulope-longe.webp",
      },
      {
        id: "cynthia-kevin-nwahiri",
        name: "Cynthia Kevin-Nwahiri",
        role: "Senior IT Governance / IT Budget & Cost Control / Cyber Security Personnel",
        organisation: "Tranter IT Infrastructure",
        image:
          "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/cynthia-kevin-nwahiri.webp",
      },
      {
        id: "boniface-kayode-alese",
        name: "Prof. Boniface Kayode Alese",
        role: "Professor, Department of Cybersecurity",
        organisation: "The Federal University of Technology, Akure",
        image: "",
      },
      {
        id: "mohammed-al-abbadi",
        name: "Mohammed Al Abbadi",
        role: "Group CIO",
        organisation: "Fertiglobe",
        image: "",
      },
      {
        id: "belarmino-van-dunem",
        name: "Belarmino Van Dunem",
        role: "Automation Expert",
        organisation: "Sonangol",
        image: "",
      },
      {
        id: "oladapo-ojo",
        name: "Engr. Oladapo Ojo",
        role: "Managing Director",
        organisation: "Daptem Engineering",
        image: "",
      },
      {
        id: "emmanuel-eno",
        name: "Engr. Emmanuel Eno",
        role: "HVDC SCADA & Control Systems Engineer / ICSS Specialist / Researcher / IA Trainer",
        organisation: "Hitachi Energy",
        image: "",
      },
      {
        id: "awe-afolabi-thomas",
        name: "Engr. Awe Afolabi Thomas",
        role: "Principal Process, Automation, Control and Optimization (PACO) Engineer – Technical Authority Level 2",
        organisation: "Renaissance Africa Energy Company",
        image: "",
      },
      {
        id: "wasiu-abiola-salami",
        name: "Engr. Wasiu Abiola Salami",
        role: "Senior Program Engineer",
        organisation: "Seplat",
        image: "",
      },
    ],
  },
];

// Flat export of all members for convenience if needed elsewhere
export const allCommitteeMembers = technicalCommittees.flatMap((c) => c.members);

// Legacy export compatibility if referenced in existing components
export const committee: CommitteeMember[] = allCommitteeMembers.map((m) => ({
  name: m.name,
  role: m.role,
  organisation: m.organisation,
  image: m.image,
}));
