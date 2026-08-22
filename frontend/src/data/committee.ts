import type { CommitteeMember } from "@/types";

const flag = (id: string) => `https://framerusercontent.com/images/${id}`;
const NG = flag("t7LiRRWJLgPWJTE2hvaqAhbGPrI.svg");
const TZ = flag("J8EHwRsQbzkLVx8tTN82IGmoDE.svg");
const US = flag("Mn5sVmyzI6m5nLGaL32ogeROsPA.svg");
const UAE = flag("HvQmoLS5i99JYFgSDodADRA.svg");
const TT = flag("mEcDqwRSJrtu35nv97g2SwptQ.svg");
const GH = flag("KdcuiqaStK99NqPlrkbmCzrpRvU.svg");
const IE = flag("wbRVE63XA7tcwcBITgdh0EfFHuM.svg");
const AO = flag("pOoZtpXcedSOTZiOtdINTmQ5yak.svg");
const MY = flag("bHnFHklAhyqRmmrvUL3nD67uHf4.svg");
const NL = flag("2ovqqPQGtvIyjJ6xq5cuNMrc.png");

export const technicalChairman: CommitteeMember = {
  name: "Dr. (Engr.) Gbenga Ayodele Owolabi",
  role: "Commercial Manager",
  organisation: "ANOH Gas Processing Company",
  country: "Nigeria",
  flag: NG,
  chair: true,
  image: "https://framerusercontent.com/images/h3v8KX5KsdcNILAvbiGltxWa2o8.png",
};

export const technicalChairmanHomepageMessage = {
  status: "",
  text: "The Asset Integrity, Artificial Intelligence Automation & Cybersecurity Conference (AIAIAC Africa 2027) will be held from 9-10 June 2027 in Lagos, Nigeria, serving as a dedicated platform to address the technical challenges of maintaining safe, reliable, and digitally resilient operations in oil and gas. Bringing together operators, EPCs, regulators, and technology providers, the conference will highlight the latest innovations driving operational performance, asset integrity, and industrial resilience.",
} as const;

export const committeeIntro =
  "The Technical Committee of AIAIAC Africa is driven by renowned industry leaders, experts, and innovators. These visionaries shape the conversation, setting the direction for breakthrough solutions in asset integrity, process automation, and industrial cybersecurity.";

export const committee: CommitteeMember[] = [
  { name: "Engr. Edgar Njeje", role: "Managing Director", organisation: "Petroconsult and Engineering", country: "Tanzania", flag: TZ },
  { name: "Dr. Isaac Adekanye", role: "IEEE Chair", organisation: "Africa Council", country: "Nigeria", flag: NG },
  { name: "Oluwatomisin Asere", role: "Managing Director", organisation: "Moduslights Technologies", country: "USA", flag: US },
  { name: "Olubunmi Daramola", role: "Group Managing Director", organisation: "GExperts Consutoria Limited", country: "Nigeria", flag: NG },
  { name: "Engr. Olalekan Oyeleye", role: "Managing Director", organisation: "Candid Oil", country: "Nigeria", flag: NG },
  { name: "Eng. Ester Christopher", role: "Managing Director", organisation: "Meritech Ltd", country: "Tanzania", flag: TZ },
  { name: "Engr. Olugbenga Abimbola Oredeko", role: "SAP Specialist", organisation: "Eaton", country: "USA", flag: US },
  { name: "Taiwo Lawal", role: "Founder & CEO", organisation: "HAMWAL TECH Solution", country: "Nigeria", flag: NG },
  { name: "Omar Rugebani", role: "Partner and Alliance Director", organisation: "Cenosco", country: "Netherlands", flag: NL },
  { name: "Abel Onyemaechi Nwobodo", role: "Founder and Managing Director", organisation: "Phenomenal Energy Limited", country: "Nigeria", flag: NG },
  { name: "Engr. Razaq Shuaib", role: "Asset Operations Support (SMART) Manager", organisation: "TotalEnergies EP", country: "Nigeria", flag: NG },
  { name: "Engr. Olawale Onasoga", role: "Reliability Engineering Manager", organisation: "Atlantic", country: "Trinidad and Tobago", flag: TT },
  { name: "Engr. David Oni", role: "Head, Subsea Intervention & Construction", organisation: "Shell", country: "Nigeria", flag: NG },
  { name: "Eric Oguama", role: "Manager, Deep Water Assets Inspection", organisation: "TotalEnergies", country: "Nigeria", flag: NG },
  { name: "Engr. Olalekan Adeaga", role: "Offshore Installation Manager", organisation: "Seplat", country: "Nigeria", flag: NG },
  { name: "Engr. (Dr.) Henry Osabohien", role: "Pipeline Expert", organisation: "ADNOC", country: "UAE", flag: UAE },
  { name: "Dr. Tina Isichei", role: "Director of Innovation, Research and Development", organisation: "Petroleum Training Institute", country: "Nigeria", flag: NG },
  { name: "Dr. (Engr.) Mavis Sika Okyere", role: "Assistant Manager of Pipeline Integrity", organisation: "Ghana Gas", country: "Ghana", flag: GH },
  { name: "Engr. Ikenna Ikonta", role: "Head, Asset Integrity & Plant Optimization", organisation: "NLNG", country: "Nigeria", flag: NG },
  { name: "Engr. Paul Aminadokiruaru", role: "Erha MTE Superintendent", organisation: "ExxonMobil", country: "Nigeria", flag: NG },
  { name: "Dr. Tamunoemi Efebeli", role: "Pipelines Operations Manager", organisation: "Renaissance Africa Energy Company", country: "Nigeria", flag: NG },
  { name: "Abdulganiyu Teslim", role: "Lead, Procurement", organisation: "NNPC", country: "Nigeria", flag: NG },
  { name: "Ikedi Uche", role: "Principal Materials, Corrosion & Inspection Engineer", organisation: "Shell", country: "Nigeria", flag: NG },
  { name: "Franklin Okafor", role: "Principal Corrosion & Inspection Engineer", organisation: "Shell Nigeria Exploration and Production Company (SNEPCo)", country: "Nigeria", flag: NG },
  { name: "Engr. Albert Okechukwu Echibe", role: "Senior Manager, Development and Production Department", organisation: "NUPRC — Nigerian Upstream Petroleum Regulatory Commission", country: "Nigeria", flag: NG },
  { name: "Umar Sa'ad", role: "Manager, Information Technology", organisation: "ANOH Gas Processing Company Limited", country: "Nigeria", flag: NG },
  { name: "Emmanuel Omoke", role: "Regulatory Compliance & Business Ethics", organisation: "Nigeria Gas Infrastructure Company", country: "Nigeria", flag: NG },
  { name: "Prof. Joseph S. Ojo", role: "Director", organisation: "Centre for Space Research and Applications (CESRA)", country: "Nigeria", flag: NG },
  { name: "Ahmed Barrak", role: "OT Cybersecurity Leader", organisation: "Aramco", country: "Saudi Arabia", flag: UAE },
  { name: "Desmond Inyamah", role: "Manager, Refineries Audit", organisation: "NNPC", country: "Nigeria", flag: NG },
  { name: "Dr. James Atiti", role: "CEO, Senior BizOps/DevOps Engineer", organisation: "DoweeGas", country: "Ireland", flag: IE },
  { name: "Olabode Agboola", role: "President", organisation: "CSEAN", country: "Nigeria", flag: NG },
  { name: "Belarmino Van Dunem", role: "Automation Expert", organisation: "Sonangol", country: "Angola", flag: AO },
  { name: "Mohammed Al Abbadi", role: "Group CISO", organisation: "Fertiglobe", country: "UAE", flag: UAE },
  { name: "Engr. Dr. Onasoga, Olukayode A.", role: "Research Associate and AI Specialist", organisation: "Universiti Utara Malaysia (UUM)", country: "Malaysia", flag: MY },
  { name: "Tolulope Longe", role: "Manager, Commercial Contract Management", organisation: "NLNG", country: "Nigeria", flag: NG },
  { name: "Cynthia Kevin-Nwahiri", role: "Senior IT Governance / Cyber Security", organisation: "Tranter IT Infrastructure", country: "Nigeria", flag: NG },
  { name: "Dr. Ademola Agboola", role: "Group Head, Information Technology", organisation: "Pan Ocean and Newcross Companies", country: "Nigeria", flag: NG },
  { name: "Prof. Boniface Kayode Alese", role: "Professor, Department of Cybersecurity", organisation: "The Federal University of Technology", country: "Nigeria", flag: NG },
];
