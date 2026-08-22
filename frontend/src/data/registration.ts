import type { RegistrationOption } from "@/types";

export const registrationOptions: RegistrationOption[] = [
  {
    id: "delegate",
    intent: "delegate",
    title: "Delegate Registration",
    description:
      "Enhance your knowledge, build strategic connections, and discover actionable ideas to drive success in your field by attending insightful sessions and networking events.",
    benefits: [
      "Technical knowledge exchange",
      "Industry peer connections",
      "Expert-led discussion",
      "Technology discovery",
    ],
    cta: "Prepare delegate details",
    route: "/registration/delegate",
  },
  {
    id: "exhibitor",
    intent: "exhibitor",
    title: "Exhibitor Enquiry",
    description:
      "Showcase your latest products and innovations to a targeted audience, gain valuable leads, and boost brand visibility at the industry's leading exhibition.",
    benefits: [
      "Technology showcase enquiry",
      "Industry audience connection",
      "Brand visibility conversation",
      "Participation details to follow",
    ],
    cta: "Prepare exhibitor enquiry",
    route: "/registration/exhibitor",
  },
  {
    id: "sponsor",
    intent: "sponsor",
    title: "Sponsor Enquiry",
    description:
      "Maximize your brand exposure, position your company as a market leader, and connect with decision-makers through high-impact sponsorship opportunities.",
    benefits: [
      "Technical audience alignment",
      "Industry visibility conversation",
      "Partnership enquiry route",
      "Package details to follow",
    ],
    cta: "Prepare sponsor enquiry",
    route: "/registration/sponsor",
  },
];
