import { conference } from "@/data/conference";

export interface QuickReplyOption {
  id: string;
  label: string;
  topicId: string;
}

export interface AssistantAction {
  label: string;
  type: "route" | "whatsapp" | "topic";
  target?: string | undefined;
  topicId?: string | undefined;
}

export interface AssistantTopicResponse {
  id: string;
  title: string;
  text: string;
  secondaryText?: string | undefined;
  bulletPoints?: readonly string[] | undefined;
  actions: readonly AssistantAction[];
}

export const AIAIAC_WHATSAPP_NUMBER = conference.contact.phone.replace(/[^0-9]/g, "");

export const initialQuickReplies: readonly QuickReplyOption[] = [
  { id: "reg", label: "Register for AIAIAC", topicId: "registration" },
  { id: "spon", label: "Sponsorship Opportunities", topicId: "sponsorship" },
  { id: "exh", label: "Book an Exhibition Stand", topicId: "exhibition" },
  { id: "abs", label: "Submit an Abstract", topicId: "abstracts" },
  { id: "evt", label: "Event Information", topicId: "event-details" },
  { id: "prog", label: "Conference Programme", topicId: "programme" },
  { id: "team", label: "Speak with Our Team", topicId: "human-handoff" },
] as const;

export const topicResponses: Record<string, AssistantTopicResponse> = {
  registration: {
    id: "registration",
    title: "Register for AIAIAC",
    text: "Great! I can help you find the right participation option for AIAIAC Africa 2027.",
    bulletPoints: [
      "Access to 2 Specialised Technical Conference Halls",
      "Entry to Innovation Showcase & Exhibition Floor",
      "Delegate proceedings, kit, and executive networking sessions",
    ],
    actions: [
      { label: "Delegate Registration", type: "route", target: "/registration/delegate" },
      { label: "Exhibitor Registration", type: "route", target: "/exhibition" },
      { label: "Sponsorship Packages", type: "topic", topicId: "sponsorship" },
      { label: "Abstract Submission", type: "route", target: "/conferences" },
      { label: "Back to Options", type: "topic", topicId: "initial-options" },
    ],
  },

  sponsorship: {
    id: "sponsorship",
    title: "Sponsorship Opportunities",
    text: "Of course. AIAIAC Africa 2027 offers several sponsorship opportunities for organisations looking to engage industry leaders and decision-makers across West Africa and beyond.",
    secondaryText: "Would you like to view the packages or speak directly with our team?",
    bulletPoints: [
      "Title Sponsor — USD 100,000",
      "Strategic Sponsor — USD 75,000",
      "Diamond Sponsor — USD 50,000",
      "Platinum Sponsor — USD 40,000",
      "Gold Sponsor — USD 30,000",
      "Silver Sponsor — USD 20,000",
    ],
    actions: [
      { label: "View Sponsorship Packages", type: "route", target: "/sponsorship" },
      { label: "Speak with Our Team", type: "whatsapp", topicId: "sponsorship" },
      { label: "Back to Options", type: "topic", topicId: "initial-options" },
    ],
  },

  exhibition: {
    id: "exhibition",
    title: "Book an Exhibition Stand",
    text: "Showcase your technology, software, and industrial services directly to 1,200+ decision-makers on the AIAIAC Africa 2027 exhibition floor.",
    bulletPoints: [
      "9 sqm Stand — USD 6,990",
      "18 sqm Stand — USD 13,980",
      "36 sqm Stand — USD 27,960",
    ],
    actions: [
      { label: "View Exhibition Options", type: "route", target: "/exhibition" },
      { label: "Book a Stand / Speak to Team", type: "whatsapp", topicId: "exhibition" },
      { label: "Back to Options", type: "topic", topicId: "initial-options" },
    ],
  },

  abstracts: {
    id: "abstracts",
    title: "Submit an Abstract",
    text: "Share your operational experience, empirical research, or industrial case studies at AIAIAC Africa 2027.",
    bulletPoints: [
      "Maximum abstract length: 500 words",
      "Submission deadline: 15 March 2027",
      "Presentations covering Asset Integrity, AI, Automation & Cybersecurity",
    ],
    actions: [
      { label: "Abstract Submission Details", type: "route", target: "/conferences" },
      { label: "Speak to Programme Team", type: "whatsapp", topicId: "abstracts" },
      { label: "Back to Options", type: "topic", topicId: "initial-options" },
    ],
  },

  "event-details": {
    id: "event-details",
    title: "Event Information",
    text: `AIAIAC Africa 2027 will take place in ${conference.city}, ${conference.country}.`,
    secondaryText: `Dates: ${conference.dates} (22–23 June 2027).\n\nThe conference brings together Asset Integrity, Artificial Intelligence, Automation and Cybersecurity professionals.`,
    bulletPoints: [
      `Venue: ${conference.city}, ${conference.country}`,
      `Dates: 22–23 June 2027`,
      `Theme: "${conference.strapline}"`,
    ],
    actions: [
      { label: "Explore the Conference", type: "route", target: "/about" },
      { label: "Registration Options", type: "route", target: "/registration" },
      { label: "Ask Another Question", type: "topic", topicId: "initial-options" },
    ],
  },

  programme: {
    id: "programme",
    title: "Conference Programme",
    text: "AIAIAC Africa 2027 features four interconnected technical tracks over 2 comprehensive conference days:",
    bulletPoints: [
      "Asset Integrity — Reliability, corrosion control, and life extension",
      "Artificial Intelligence — Digital twins, machine learning, and predictive risk",
      "Automation — IIoT, SCADA, and process control engineering",
      "Cybersecurity — OT cyber-defence and critical infrastructure resilience",
    ],
    actions: [
      { label: "Explore Conference Tracks", type: "route", target: "/conferences" },
      { label: "Speak to Our Team", type: "whatsapp", topicId: "programme" },
      { label: "Back to Options", type: "topic", topicId: "initial-options" },
    ],
  },

  "human-handoff": {
    id: "human-handoff",
    title: "Speak with Our Team",
    text: "Absolutely. I can connect you directly with the AIAIAC team.",
    secondaryText: "Would you like to continue this enquiry on WhatsApp?",
    actions: [
      { label: "Continue on WhatsApp", type: "whatsapp", topicId: "general" },
      { label: "Stay Here / Back to Options", type: "topic", topicId: "initial-options" },
    ],
  },

  unmatched: {
    id: "unmatched",
    title: "Team Enquiry Recommended",
    text: "I may need a member of the AIAIAC team to help with that specific enquiry.",
    secondaryText: "Would you like to connect directly on WhatsApp?",
    actions: [
      { label: "Continue on WhatsApp", type: "whatsapp", topicId: "general" },
      { label: "Ask Something Else", type: "topic", topicId: "initial-options" },
    ],
  },
};

/** Pre-filled WhatsApp Context Message Templates */
export function getWhatsAppHandoffUrl(topicId?: string, queryContext?: string): string {
  let messageText =
    "Hello, I would like to make an enquiry about AIAIAC Africa 2027. I was referred from the AIAIAC website assistant.";

  switch (topicId) {
    case "sponsorship":
      messageText =
        "Hello, I would like to make an enquiry about sponsorship opportunities for AIAIAC Africa 2027. I was referred from the AIAIAC website assistant.";
      break;
    case "exhibition":
      messageText =
        "Hello, I would like to make an enquiry about exhibiting at AIAIAC Africa 2027. I was referred from the AIAIAC website assistant.";
      break;
    case "registration":
      messageText =
        "Hello, I need assistance with registration for AIAIAC Africa 2027. I was referred from the AIAIAC website assistant.";
      break;
    case "abstracts":
      messageText =
        "Hello, I would like to enquire about abstract submissions for AIAIAC Africa 2027. I was referred from the AIAIAC website assistant.";
      break;
    case "event-details":
    case "programme":
      messageText =
        "Hello, I would like to make an enquiry about the AIAIAC Africa 2027 conference venue and programme. I was referred from the AIAIAC website assistant.";
      break;
    default:
      if (queryContext && queryContext.trim().length > 0) {
        messageText = `Hello, I have a question regarding "${queryContext.slice(0, 60)}" for AIAIAC Africa 2027. I was referred from the AIAIAC website assistant.`;
      }
      break;
  }

  return `https://wa.me/${AIAIAC_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
}

/** Keyword/Intent Resolver Boundary (AI-ready interface) */
export function resolveAssistantMessage(input: string): AssistantTopicResponse {
  const query = input.toLowerCase().trim();
  const unmatched = topicResponses["unmatched"]!;

  if (!query) {
    return unmatched;
  }

  if (
    /\b(spon|sponsor|sponsorship|partner|pkg|price|cost)\b/.test(query) &&
    !/exhibit|stand|booth/.test(query)
  ) {
    return topicResponses["sponsorship"] ?? unmatched;
  }

  if (/\b(exhibit|exhibition|booth|stand|space|sqm)\b/.test(query)) {
    return topicResponses["exhibition"] ?? unmatched;
  }

  if (/\b(abstract|paper|submit|speaker|presentation|call for)\b/.test(query)) {
    return topicResponses["abstracts"] ?? unmatched;
  }

  if (/\b(date|when|where|venue|location|city|country|theme)\b/.test(query)) {
    return topicResponses["event-details"] ?? unmatched;
  }

  if (/\b(register|registration|ticket|pass|cost|fee|attend|delegate)\b/.test(query)) {
    return topicResponses["registration"] ?? unmatched;
  }

  if (
    /\b(prog|program|programme|track|integrity|ai|automation|cyber|topic|schedule)\b/.test(query)
  ) {
    return topicResponses["programme"] ?? unmatched;
  }

  if (/\b(human|person|whatsapp|team|contact|call|phone|email|chat|support)\b/.test(query)) {
    return topicResponses["human-handoff"] ?? unmatched;
  }

  return unmatched;
}
