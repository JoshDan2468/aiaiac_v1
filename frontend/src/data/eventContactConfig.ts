import { conference } from "./conference";

export const AIAIAC_WHATSAPP_RAW = conference.contact.phone;
export const AIAIAC_WHATSAPP_NUMBER = conference.contact.phone.replace(/[^0-9]/g, "");
export const AIAIAC_CONTACT_EMAIL = conference.contact.email;

export const EVENT_CONTACT_CONFIG = {
  phoneFormatted: AIAIAC_WHATSAPP_RAW,
  phoneRaw: AIAIAC_WHATSAPP_NUMBER,
  email: AIAIAC_CONTACT_EMAIL,
};

export type EnquiryIntent =
  "SPONSORSHIP" | "EXHIBITION" | "DELEGATE" | "CORPORATE" | "ABSTRACT" | "GENERAL";

const ENQUIRY_MESSAGES: Record<EnquiryIntent, string> = {
  SPONSORSHIP:
    "Hello AIAIAC Africa Team, I am interested in exploring sponsorship opportunities for AIAIAC Africa 2027. Please share available packages and partnership details.",
  EXHIBITION:
    "Hello AIAIAC Africa Team, I would like to enquire about booking an exhibition stand for AIAIAC Africa 2027. Please provide floor plan and stand options.",
  DELEGATE:
    "Hello AIAIAC Africa Team, I would like to enquire about delegate participation and attendance options for AIAIAC Africa 2027.",
  CORPORATE:
    "Hello AIAIAC Africa Team, our organisation is interested in corporate group delegate passes for AIAIAC Africa 2027. Please provide corporate booking guidance.",
  ABSTRACT:
    "Hello AIAIAC Africa Team, I have an enquiry regarding abstract submission and technical paper presentation at AIAIAC Africa 2027.",
  GENERAL:
    "Hello AIAIAC Africa Team, I have an enquiry regarding the AIAIAC Africa 2027 conference.",
};

export function getWhatsAppEnquiryUrl(intent: EnquiryIntent = "GENERAL", detail?: string): string {
  let message = ENQUIRY_MESSAGES[intent] || ENQUIRY_MESSAGES.GENERAL;
  if (detail) {
    message += ` Details: ${detail}`;
  }
  return `https://wa.me/${AIAIAC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
