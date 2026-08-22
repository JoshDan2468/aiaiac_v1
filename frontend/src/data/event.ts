export interface ActiveEventConfig {
  name: string;
  edition: number;
  status: "details-being-confirmed" | "registration-open" | "registration-closed";
  dates: string | null;
  venue: string | null;
  duration: string | null;
  programmeStatus: "being-confirmed" | "published";
  registrationStatus: "being-confirmed" | "open" | "closed";
}

/**
 * Single source of truth for the active edition. Nullable values are intentional:
 * organisers have confirmed the 2027 edition, but not its operating details.
 */
export const activeEvent: ActiveEventConfig = {
  name: "AIAIAC West Africa",
  edition: 2027,
  status: "details-being-confirmed",
  dates: null,
  venue: null,
  duration: null,
  programmeStatus: "being-confirmed",
  registrationStatus: "being-confirmed",
};

export const activeEventNotice =
  "Dates, venue, speakers and programme are being confirmed for the 2027 edition.";

export const previousEdition = {
  label: "Previous edition · 2026 archive",
  year: 2026,
} as const;
