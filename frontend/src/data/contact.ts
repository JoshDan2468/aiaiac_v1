import contactImage from "@/data/AIAC_images/image6.jpg";
import { conference } from "@/data/conference";

export const enquiryTypeValues = [
  "General Enquiry",
  "Delegate Enquiry",
  "Exhibition Enquiry",
  "Sponsorship Enquiry",
  "Speaker or Abstract Enquiry",
  "Media Partnership",
] as const;

export type EnquiryType = (typeof enquiryTypeValues)[number];

export const contactDetails = {
  email: conference.contact.email,
  phone: conference.contact.phone,
  phoneHref: conference.contact.phone.replace(/[^\d+]/g, ""),
} as const;

export const contactHero = {
  eyebrow: "Contact AIAIAC Africa",
  supporting:
    "Contact the team about conference participation, exhibition, sponsorship, speakers and abstracts, media partnership or general enquiries.",
} as const;

export const enquiryTypes = enquiryTypeValues.map((label, index) => ({
  index: String(index + 1).padStart(2, "0"),
  label,
}));

export const contactMedia = {
  src: contactImage,
  alt: "Two AIAIAC attendees at the conference.",
  width: 1968,
  height: 1461,
  objectPosition: "center 42%",
} as const;

export const contactClosing = {
  eyebrow: "The next exchange starts here",
  title: "We look forward to hearing from you.",
  body: "Bring your questions, participation plans or partnership ideas to the AIAIAC Africa team.",
} as const;
