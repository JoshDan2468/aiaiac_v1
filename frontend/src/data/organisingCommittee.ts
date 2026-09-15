export interface OrganisingCommitteeMember {
  id: string;
  name: string;
  role: string;
  organisation: string;
  image?: string;
  countryCode?: string;
  organisationLogo?: string;
}

export const organisingCommitteeMembers: OrganisingCommitteeMember[] = [
  {
    id: "bunmi-daramola",
    name: "Bunmi Daramola",
    role: "Managing Director / CEO and Coordinator, AIAIAC Organising Committee",
    organisation: "GExperts Energy Limited",
    image: "/assets/aiaiac-2027/organising-committee/bunmi-daramola.webp",
  },
  {
    id: "omowunmi-oladele",
    name: "Omowunmi Oladele",
    role: "Multi-Award Winning AI Product Manager",
    organisation: "GExperts Energy Limited",
    image: "/assets/aiaiac-2027/organising-committee/omowunmi-oladele.webp",
  },
  {
    id: "brumilda-haslund",
    name: "Brumilda Haslund",
    role: "SME Trader, Event Planner, Accountant / Consultant, Managing Director",
    organisation: "Haslund Trading",
    countryCode: "NA",
    image: "/assets/aiaiac-2027/organising-committee/brumilda-haslund.webp",
  },
  {
    id: "joseph-fatoye",
    name: "Joseph Fatoye",
    role: "Junior Technical Officer — Robotics, AI & Automation",
    organisation: "GExperts Energy Limited",
    image: "/assets/aiaiac-2027/organising-committee/joseph-fatoye.webp",
  },
  {
    id: "nonye-nketa",
    name: "Nonye Nketa",
    role: "Technical Sales — Belzona",
    organisation: "Navante Oil & Gas Company Limited",
    image: "/assets/aiaiac-2027/organising-committee/nonye-nketa.webp",
  },
  {
    id: "ezeji-stephanie",
    name: "Ezeji Stephanie",
    role: "Business Development Executive",
    organisation: "GExperts Energy Limited",
    image: "/assets/aiaiac-2027/organising-committee/ezeji-stephanie.webp",
  },
  {
    id: "victory-adabhie",
    name: "Victory Adabhie",
    role: "Business Development Executive",
    organisation: "GExperts Energy Limited",
    image: "/assets/aiaiac-2027/organising-committee/victory-adabhie.webp",
  },
  {
    id: "wilbert-adri",
    name: "Wilbert Adri",
    role: "Technical Sales Engineer",
    organisation: "Seapack Ventures Ltd.",
    countryCode: "GH",
    image: "/assets/aiaiac-2027/organising-committee/wilbert-adri.webp",
  },
  {
    id: "emmanuel-samson",
    name: "Emmanuel Samson",
    role: "Founder",
    organisation: "Pipeborne",
    countryCode: "GH",
    image: "/assets/aiaiac-2027/organising-committee/emmanuel-samson.webp",
  },
  {
    id: "adedoyin-yusuf",
    name: "Adedoyin Yusuf",
    role: "Strategic Development and Partnerships",
    organisation: "Arridex",
    image: "/assets/aiaiac-2027/organising-committee/adedoyin-yusuf.webp",
  },
  {
    id: "maria-henshaw",
    name: "Maria Henshaw",
    role: "Business Development Executive",
    organisation: "NexRidge Limited",
    image: "/assets/aiaiac-2027/organising-committee/maria-henshaw.webp",
  },
];
