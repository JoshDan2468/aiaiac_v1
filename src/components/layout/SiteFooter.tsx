import { Link } from "react-router-dom";
import { ActionLink } from "@/components/common/ActionButton";
import { conference } from "@/data/conference";
import { activeEvent, activeEventNotice } from "@/data/event";
import { footerNavigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="on-navy relative overflow-hidden bg-mineral pt-24">
      <div className="grid-lines absolute inset-0 opacity-25" aria-hidden />
      <img
        src="/brand/aiaiac_logo.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute -bottom-60 -left-48 hidden w-184 opacity-[0.04] mix-blend-screen lg:block"
      />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src="/brand/aiaiac_logo.png"
              alt="AIAIAC — Asset Integrity, Artificial Intelligence, Automation and Cybersecurity"
              loading="lazy"
              className="h-20 w-20 max-w-sm object-contain object-left mix-blend-screen"
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
              {activeEvent.name} {activeEvent.edition}. {activeEventNotice}
            </p>
            <div className="mt-8">
              <ActionLink to="/registration" size="lg">
                Registration options
              </ActionLink>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="eyebrow text-emerald">Navigate</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6">
              {footerNavigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline inline-flex min-h-11 min-w-11 items-center text-sm text-white/70 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic lg:col-span-4">
            <p className="eyebrow text-emerald">Contact</p>
            <p className="mt-6 text-sm text-white/70">{conference.contact.organiser}</p>
            <a
              href={`mailto:${conference.contact.email}`}
              className="link-underline mt-3 flex min-h-11 items-center text-sm text-white/70 hover:text-white"
            >
              {conference.contact.email}
            </a>
            <a
              href={`tel:${conference.contact.phone.replace(/\s/g, "")}`}
              className="link-underline mt-1 flex min-h-11 items-center text-sm text-white/70 hover:text-white"
            >
              {conference.contact.phone}
            </a>
          </address>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 py-8">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
            {conference.contact.copyright}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
            {activeEvent.name} · {activeEvent.edition}
          </p>
        </div>
      </div>
    </footer>
  );
}
