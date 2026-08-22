import audienceImage from "@/data/AIAC_images/image20.jpg";
import heroImage from "@/data/AIAC_images/image4.jpg";
import introductionImage from "@/data/AIAC_images/image30.jpg";
import regionalImage from "@/data/AIAC_images/image27.jpg";
import technologyImage from "@/data/AIAC_images/image16.jpg";

export interface AboutImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition: string;
}

export const aboutMedia = {
  hero: {
    src: heroImage,
    alt: "A panel discussion in progress on the AIAIAC West Africa conference stage",
    width: 1968,
    height: 1090,
    objectPosition: "center 48%",
  },
  introduction: {
    src: introductionImage,
    alt: "AIAIAC West Africa delegates taking part in the conference opening ceremony",
    width: 1968,
    height: 1970,
    objectPosition: "center 42%",
  },
  technology: {
    src: technologyImage,
    alt: "A technical speaker presenting on the AIAIAC West Africa stage",
    width: 1968,
    height: 1158,
    objectPosition: "center",
  },
  audience: {
    src: audienceImage,
    alt: "A group of participants gathered at an AIAIAC West Africa conference edition",
    width: 1968,
    height: 1076,
    objectPosition: "center",
  },
  regional: {
    src: regionalImage,
    alt: "AIAIAC participants at an international industry media stand",
    width: 1968,
    height: 1970,
    objectPosition: "center 45%",
  },
} satisfies Record<string, AboutImage>;

export const aboutIntroduction = [
  "AIAIAC West Africa is an industry-led exchange for the people protecting and modernising asset-intensive operations. It connects regional experience with global methods, practical technology and the realities of operating critical infrastructure.",
  "The conference is built around a simple operational truth: physical integrity, intelligent decision-making, automated control and cyber resilience can no longer be treated as separate conversations.",
] as const;

export const aboutPillars = [
  {
    index: "01",
    title: "Asset Integrity",
    description:
      "Integrity management, corrosion control and process safety, supported by inspection and monitoring technologies that keep assets safe and reliable.",
  },
  {
    index: "02",
    title: "Artificial Intelligence",
    description:
      "Digital twins and predictive maintenance that turn operational data into earlier, better-informed decisions across asset-intensive operations.",
  },
  {
    index: "03",
    title: "Automation",
    description:
      "IIoT and SCADA systems, process control engineering and the automation stack driving safer, more consistent operational performance.",
  },
  {
    index: "04",
    title: "Cybersecurity",
    description:
      "OT cyber-defence frameworks, industrial standards and practical approaches to strengthening the resilience of critical infrastructure.",
  },
] as const;

export const whyItMatters = [
  {
    index: "A",
    title: "Connected systems need connected thinking.",
    body: "As operational technology, data and physical assets converge, decisions in one discipline increasingly shape risk and performance in another.",
  },
  {
    index: "B",
    title: "Regional realities deserve practical answers.",
    body: "Peer experience, technical case studies and solution discovery help turn global methods into approaches that fit the operating context.",
  },
  {
    index: "C",
    title: "Resilience is built before it is tested.",
    body: "The exchange gives technical leaders space to compare methods, challenge assumptions and strengthen the decisions that support safe, reliable operations.",
  },
] as const;

export const aboutAudiences = [
  "Energy operators and asset owners",
  "Integrity, reliability and process-safety professionals",
  "Automation, digital and OT cybersecurity leaders",
  "Engineers, regulators and technical consultants",
  "Technology providers and industry partners",
  "Researchers, academics and emerging professionals",
] as const;
