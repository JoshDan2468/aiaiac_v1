import type { RegistrationOption } from "@/types";

export type RegistrationLandingOption = {
  id: string;
  title: string;
  description: string;
  availability: "Available now" | "Opening soon" | "Coming soon";
  cta?: string;
  route?: RegistrationOption["route"];
  presentation: "delegate" | "active" | "pending" | "abstract";
};

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

/**
 * Presentation-only content for the public registration landing page.
 * The three operational routes continue to use `registrationOptions` above;
 * unavailable categories intentionally have no route until their flows exist.
 */
export const registrationLandingOptions: RegistrationLandingOption[] = [
  {
    id: "delegate",
    title: "Delegate registration",
    description:
      "Join the technical exchange, specialist sessions and peer conversations shaping resilient operations.",
    availability: "Available now",
    cta: "Start delegate registration",
    route: "/registration/delegate",
    presentation: "delegate",
  },
  {
    id: "exhibitor",
    title: "Book a stand / exhibitor",
    description:
      "Place your technology, services and expertise in front of operational decision-makers.",
    availability: "Available now",
    cta: "Send exhibitor enquiry",
    route: "/registration/exhibitor",
    presentation: "active",
  },
  {
    id: "sponsorship",
    title: "Sponsorship",
    description: "Create a credible partnership presence around the AIAIAC technical programme.",
    availability: "Available now",
    cta: "Send sponsorship enquiry",
    route: "/registration/sponsor",
    presentation: "active",
  },
  {
    id: "visitor",
    title: "Visitor pass",
    description:
      "A free visitor route for the exhibition and open programme moments is being prepared.",
    availability: "Opening soon",
    presentation: "pending",
  },
  {
    id: "media-partnership",
    title: "Media partnership",
    description:
      "Accreditation and editorial partnership information will be announced with the programme.",
    availability: "Opening soon",
    presentation: "pending",
  },
  {
    id: "download-centre",
    title: "Download centre",
    description:
      "Programme, prospectus and participation materials will be published here as they are approved.",
    availability: "Coming soon",
    presentation: "pending",
  },
  {
    id: "abstract-submissions",
    title: "Abstract submissions",
    description:
      "The call for abstracts and submission guidance will open with the technical programme.",
    availability: "Opening soon",
    presentation: "abstract",
  },
];
