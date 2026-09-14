import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Music2, Phone, Youtube } from "lucide-react";
import { conference } from "@/data/conference";

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram,
  Facebook,
  YouTube: Youtube,
  TikTok: Music2,
} as const;

const socialButtonClasses =
  "inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-lime hover:text-mineral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Conferences", to: "/conferences" },
  { label: "Speakers", to: "/speakers" },
  { label: "Exhibition", to: "/exhibition" },
  { label: "Media", to: "/media" },
  { label: "Contact", to: "/contact" },
];

const participateLinks = [
  { label: "Delegate Registration", to: "/registration/delegate" },
  { label: "Sponsorship Enquiry", to: "/registration/sponsor" },
  { label: "Book a Stand / Exhibitor", to: "/exhibition" },
  { label: "Visitor Application", to: "/registration" },
  { label: "Abstract Submission", to: "/conferences" },
];

const offices = [
  {
    city: "Lagos, Nigeria",
    address: "31 Ademola Street, Ikoyi, Lagos State, Nigeria",
  },
  {
    city: "Abuja, Nigeria",
    address: "Plot 3031 Mariam Ikejiani Clark Crescent, Asokoro, Abuja, FCT, Nigeria",
  },
  {
    city: "Richmond, Texas, USA",
    address: "77406, Richmond, Texas, USA",
  },
];

export function SiteFooter() {
  return (
    <footer className="on-navy relative overflow-hidden border-t border-white/10 bg-[#031008] pt-16 text-white sm:pt-20">
      {/* 3-7% Opacity Watermark Background Emblem */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 z-0 select-none opacity-[0.04]"
        aria-hidden
      >
        <img
          src="/brand/aiaiac_logo.png"
          alt=""
          width="600"
          height="600"
          className="h-[36rem] w-[36rem] object-contain filter invert"
        />
      </div>

      <div className="shell relative z-10">
        {/* Top Footer Grid */}
        <div className="grid gap-10 border-b border-white/12 pb-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/brand/aiaiac_logo.png"
                alt="AIAIAC Africa"
                width="140"
                height="140"
                loading="lazy"
                className="h-14 w-auto object-contain mix-blend-screen"
              />
            </Link>
            <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-white">
              AIAIAC Africa 2027
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-lime">
              Conference &amp; Innovation Showcase
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/70">
              Guarding Infrastructure, Powering Innovation, Securing Tomorrow. Connecting asset
              integrity, artificial intelligence, automation, and cybersecurity across West Africa.
            </p>

            <nav className="mt-6" aria-label="Social media channels">
              <ul className="flex flex-wrap gap-2">
                {conference.socialMedia.map((channel) => {
                  const Icon =
                    channel.platform === "X"
                      ? null
                      : socialIcons[channel.platform as keyof typeof socialIcons];

                  return (
                    <li key={channel.platform}>
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit AIAIAC Africa on ${channel.platform}`}
                        title={channel.platform}
                        className={socialButtonClasses}
                      >
                        {Icon ? (
                          <Icon className="size-4" aria-hidden="true" />
                        ) : (
                          <span
                            className="text-[0.85rem] font-bold leading-none"
                            aria-hidden="true"
                          >
                            X
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-lime">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex text-xs text-white/75 transition-colors hover:text-lime"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Participate */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-lime">
              Participate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {participateLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="inline-flex text-xs text-white/75 transition-colors hover:text-lime"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Event Date & Venue */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-lime">
              Event Details
            </h4>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/50">
                  Dates
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">{conference.dates}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/50">
                  Location
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">{conference.venue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Office Locations Grid */}
        <div className="border-b border-white/12 py-10">
          <h4 className="text-xs font-bold uppercase tracking-widest text-lime">
            Global Secretariat &amp; Office Locations
          </h4>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {offices.map((office) => (
              <div
                key={office.city}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs"
              >
                <div className="flex items-center gap-2 font-bold text-white">
                  <MapPin className="size-4 shrink-0 text-lime" />
                  <span>{office.city}</span>
                </div>
                <p className="mt-2 leading-relaxed text-white/70">{office.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Organiser Band */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/12 py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/brand/G-expert-logo-invert.png"
              alt="GExperts Global Events"
              width="140"
              height="50"
              loading="lazy"
              className="h-10 w-auto object-contain"
            />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-lime">
                Official Event Organiser
              </p>
              <p className="mt-0.5 text-xs font-bold text-white">{conference.contact.organiser}</p>
              <p className="mt-0.5 max-w-lg text-[0.7rem] text-white/60">
                International energy, engineering, and management consulting firm.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/85">
            <a
              href="mailto:aiaiac@aiac-africa.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-lime"
            >
              <Mail className="size-4 text-lime" />
              <span>aiaiac@aiac-africa.com</span>
            </a>
            <a
              href="tel:+2347014934538"
              className="inline-flex items-center gap-2 transition-colors hover:text-lime"
            >
              <Phone className="size-4 text-lime" />
              <span>+234 701 493 4538</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 font-mono text-[0.68rem] text-white/50 sm:flex-row">
          <p>© 2027 AIAIAC Africa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link to="/about" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
