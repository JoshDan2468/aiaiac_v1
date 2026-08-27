import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin/dashboard/AdminDashboardPage";
import { AdminLoginPage } from "@/pages/admin/login/AdminLoginPage";
import { AboutPage } from "@/pages/public/about/AboutPage";
import { ConferencesPage } from "@/pages/public/conferences/ConferencesPage";
import { ContactPage } from "@/pages/public/contact/ContactPage";
import { ExhibitionPage } from "@/pages/public/exhibition/ExhibitionPage";
import { HomePage } from "@/pages/public/home/HomePage";
import { MediaPage } from "@/pages/public/media/MediaPage";
import { SpeakersPage } from "@/pages/public/speakers/SpeakersPage";
import { SponsorshipPage } from "@/pages/public/sponsorship/SponsorshipPage";
import { RegistrationPage } from "@/pages/registration/registration/RegistrationPage";
import { NotFoundPage } from "@/pages/system/not-found/NotFoundPage";

function NavigationEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationEffects />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/conferences" element={<ConferencesPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/registration/delegate"
            element={<RegistrationPage initialCategoryId="delegate" />}
          />
          <Route
            path="/registration/exhibitor"
            element={<RegistrationPage initialCategoryId="exhibitor" />}
          />
          <Route
            path="/registration/sponsor"
            element={<RegistrationPage initialCategoryId="sponsorship" />}
          />
          <Route path="/sponsorship" element={<SponsorshipPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Navigate to="/registration" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
