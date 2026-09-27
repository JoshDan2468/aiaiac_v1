import type { CommunicationContent } from "../../types/communication";
import { aiaiacEmailLayout, escapeEmailHtml } from "./aiaiacEmailLayout";

export const communicationPresets = [
  { id: "GENERAL_ANNOUNCEMENT", label: "General Announcement", heading: "Conference announcement", body: "We have an update for the AIAIAC Africa 2027 community." },
  { id: "REGISTRATION_REMINDER", label: "Registration Reminder", heading: "Your conference registration", body: "Please review the latest information about AIAIAC Africa 2027 registration." },
  { id: "PROGRAMME_UPDATE", label: "Programme Update", heading: "Programme update", body: "Explore the latest AIAIAC Africa 2027 programme news." },
  { id: "VENUE_CHECK_IN", label: "Venue & Check-in Information", heading: "Venue and check-in", body: "Here is what to know before arriving at AIAIAC Africa 2027." },
  { id: "EVENT_REMINDER", label: "Event Reminder", heading: "The conference is coming", body: "We look forward to welcoming you to AIAIAC Africa 2027." },
] as const;

export function communicationTemplate(input: CommunicationContent, options: { test?: boolean } = {}): { subject: string; text: string; html: string } {
  const subject = options.test ? `[TEST] ${input.subject}` : input.subject;
  const body = escapeEmailHtml(input.body).replace(/\r?\n/g, "<br>");
  const cta = input.ctaLabel && input.ctaUrl
    ? `<p style="margin:28px 0"><a href="${escapeEmailHtml(input.ctaUrl)}" style="display:inline-block;background:#08703b;color:#ffffff;padding:12px 20px;text-decoration:none;font-weight:700">${escapeEmailHtml(input.ctaLabel)}</a></p>`
    : "";
  const html = aiaiacEmailLayout({
    title: subject,
    preview: input.preheader,
    bodyHtml: `${options.test ? '<p style="padding:10px;background:#fff4d6;font-weight:700">TEST EMAIL — not a campaign delivery.</p>' : ""}<h1 style="font-size:24px;line-height:1.3">${escapeEmailHtml(input.heading)}</h1><p>${body}</p>${cta}`,
    footerText: "Conference communication from AIAIAC Africa 2027.",
  });
  const text = `${options.test ? "TEST EMAIL — not a campaign delivery.\n\n" : ""}AIAIAC Africa 2027\n\n${input.heading}\n\n${input.body}${input.ctaLabel && input.ctaUrl ? `\n\n${input.ctaLabel}: ${input.ctaUrl}` : ""}\n\nConference communication from AIAIAC Africa 2027.`;
  return { subject, text, html };
}
