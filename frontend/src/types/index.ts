export type Track = string;

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organisation: string;
  image: string;
  track: Track;
  keynote?: boolean;
}

export interface CommitteeMember {
  name: string;
  role: string;
  organisation: string;
  country: string;
  flag: string;
  chair?: boolean;
  image?: string;
}

export interface Sponsor {
  id: string;
  logo: string;
  tier: SponsorTier["id"];
  name?: string;
}

export interface SponsorTier {
  id: "associate" | "knowledge" | "exhibitor" | "supporting" | "media";
  label: string;
  archivePath: `/sponsorship/${string}`;
}

export interface ProgrammeSession {
  time: string;
  title: string;
  detail?: string;
  hall?: string;
  placeholder?: boolean;
}

export interface ProgrammeDay {
  id: string;
  date: string;
  label: string;
  summary: string;
  sessions: ProgrammeSession[];
}

export interface MediaItem {
  id: string;
  src: string;
  caption: string;
  width: number;
  height: number;
}

export interface Pillar {
  index: string;
  title: string;
  description: string;
  image: string;
}

export interface RegistrationOption {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
  intent: "delegate" | "exhibitor" | "sponsor";
  route: `/registration/${"delegate" | "exhibitor" | "sponsor"}`;
}
