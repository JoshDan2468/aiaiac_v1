import { useEffect, type ReactNode } from "react";
import { ConferenceAssistant } from "@/components/assistant/ConferenceAssistant";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PublicPageLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = title;
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.content = description;
  }, [description, title]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-70 flex min-h-11 -translate-y-24 items-center bg-emerald px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-mineral transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <ConferenceAssistant />
    </>
  );
}
