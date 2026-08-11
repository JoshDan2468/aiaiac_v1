import { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AboutPage } from "@/pages/public/AboutPage";
import { ConferencesPage } from "@/pages/public/ConferencesPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { ExhibitionPage } from "@/pages/public/ExhibitionPage";
import { HomePage } from "@/pages/public/HomePage";
import { MediaPage } from "@/pages/public/MediaPage";
import { SpeakersPage } from "@/pages/public/SpeakersPage";
import { SponsorshipPage } from "@/pages/public/SponsorshipPage";
import { RegistrationFlowPage } from "@/pages/registration/RegistrationFlowPage";
import { RegistrationPage } from "@/pages/registration/RegistrationPage";

function NavigationEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <main className="on-navy flex min-h-screen items-center justify-center bg-mineral px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow text-emerald">Navigation error</p>
        <h1 className="display-xl mt-6 text-white">404</h1>
        <h2 className="mt-5 font-display text-2xl font-bold text-white">Page not found</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          The page you&apos;re looking for does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-emerald px-7 text-xs font-semibold uppercase tracking-[0.14em] text-mineral"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <NavigationEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/conferences" element={<ConferencesPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/exhibition" element={<ExhibitionPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration/delegate" element={<RegistrationFlowPage intent="delegate" />} />
        <Route
          path="/registration/exhibitor"
          element={<RegistrationFlowPage intent="exhibitor" />}
        />
        <Route path="/registration/sponsor" element={<RegistrationFlowPage intent="sponsor" />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Navigate to="/registration" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
