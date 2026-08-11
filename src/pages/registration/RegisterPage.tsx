import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { conference } from "@/data/conference";
import { registrationOptions } from "@/data/registration";
import { ParticipationRequestForm } from "@/forms/participation/ParticipationRequestForm";

const title = "Register — AIAIAC West Africa 2026";
const description =
  "Register as a delegate, book an exhibition stand or enquire about sponsorship at AIAC West Africa 2026, 9–10 June, Lagos.";

export function RegisterPage() {
  const [intent, setIntent] = useState(registrationOptions[0]!.intent);

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.content;

    document.title = title;
    if (descriptionMeta) descriptionMeta.content = description;

    return () => {
      document.title = previousTitle;
      if (descriptionMeta && previousDescription) descriptionMeta.content = previousDescription;
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="on-navy pt-32 lg:pt-40">
        <div className="shell pb-24 lg:pb-32">
          <p className="eyebrow text-emerald">
            {conference.datesShort} · {conference.venue}
          </p>
          <h1 className="display-lg mt-6 max-w-3xl text-white">Register your participation</h1>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ul className="space-y-px bg-white/12">
                {registrationOptions.map((o) => (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setIntent(o.intent)}
                      aria-pressed={intent === o.intent}
                      className={`w-full p-6 text-left transition-colors duration-300 ${
                        intent === o.intent
                          ? "bg-emerald text-navy-900"
                          : "bg-navy hover:bg-navy-700"
                      }`}
                    >
                      <span className="font-display text-lg font-bold">{o.title}</span>
                      <span className="mt-2 block text-sm opacity-75">{o.description}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ParticipationRequestForm intent={intent} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
