export interface AdvisoryBoardMember {
  id: string;
  name: string;
  role: string;
  organisation: string;
  image?: string;
  countryCode?: string;
  organisationLogo?: string;
}

export const advisoryBoardMembers: AdvisoryBoardMember[] = [
  {
    id: "isaac-adekanye",
    name: "Dr. Engr. Isaac Adekanye",
    role: "Ex-Chair IEEE and Ex Production Manager, AGIP Nigeria",
    organisation: "AGIP Nigeria",
    image: "/assets/aiaiac-2027/advisory-board/isaac-adekanye.webp",
  },
  {
    id: "olalekan-oyeleye",
    name: "Engr. Olalekan Oyeleye",
    role: "Managing Director / CEO",
    organisation: "Candid Oil",
    image: "/assets/aiaiac-2027/advisory-board/olalekan-oyeleye.webp",
  },
  {
    id: "sooravan-tharmalingam",
    name: "Engr. Sooravan Tharmalingam",
    role: "Chief Inspection Consultant",
    organisation: "ExxonMobil Nigeria",
    image: "/assets/aiaiac-2027/advisory-board/sooravan-tharmalingam.webp",
  },
  {
    id: "ester-christopher",
    name: "Engr. Ester Christopher",
    role: "Managing Director",
    organisation: "MERITECH LTD",
    countryCode: "TZ",
    image: "/assets/aiaiac-2027/advisory-board/ester-christopher.webp",
  },
  {
    id: "omar-rugebani",
    name: "Omar Rugebani",
    role: "Partner and Alliance Director",
    organisation: "Cenosco Netherlands",
    image: "/assets/aiaiac-2027/advisory-board/omar-rugebani.webp",
  },
  {
    id: "nnanna-ukaegbu",
    name: "Engr. Nnanna Charles Ukaegbu",
    role: "MD / Chief Executive Officer",
    organisation: "Orashi Petroleum Development Company Limited",
    image: "/assets/aiaiac-2027/advisory-board/Nnana_photo-removebg-preview-720.webp",
  },
  {
    id: "tina-isichei",
    name: "Dr. Mrs. Tina Isichei",
    role: "Director, Research & Development",
    organisation: "Petroleum Training Institute",
    image: "/assets/aiaiac-2027/advisory-board/tina-isichei.webp",
  },
  {
    id: "abel-nwobodo",
    name: "Engr. Abel Onyemaechi Nwobodo",
    role: "Founder / Managing Director",
    organisation: "Phenomenal Energy Limited",
    image: "/assets/aiaiac-2027/advisory-board/abel-nwobodo.webp",
  },
  {
    id: "ayo-giwa",
    name: "Engr. Ayo Giwa",
    role: "President and CEO",
    organisation: "McAlpha Inc",
    countryCode: "CA",
    image: "/assets/aiaiac-2027/advisory-board/ayo-giwa.webp",
  },
  {
    id: "raj-mohandoss",
    name: "Raj Mohandoss",
    role: "Technical Manager",
    organisation: "Jotun Nigeria",
    image: "/assets/aiaiac-2027/advisory-board/raj-mohandoss.webp",
  },
  {
    id: "kayode-adeleke",
    name: "Kayode Adeleke",
    role: "Group Chief Executive Officer",
    organisation: "Arridex",
    image: "/assets/aiaiac-2027/advisory-board/kayode-adeleke.webp",
  },
  {
    id: "kola-fagbayi",
    name: "Dr. Kola Fagbayi",
    role: "Ex VP, Business Assurance",
    organisation: "BP Petroleum",
    countryCode: "US",
    image: "/assets/aiaiac-2027/advisory-board/kola-fagbayi.webp",
  },
];
