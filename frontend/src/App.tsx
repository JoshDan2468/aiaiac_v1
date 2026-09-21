import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { PermissionRoute } from "@/components/admin/PermissionRoute";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin/dashboard/AdminDashboardPage";
import { AdminLoginPage } from "@/pages/admin/login/AdminLoginPage";
import { DelegateDetailPage } from "@/pages/admin/delegates/DelegateDetailPage";
import { DelegatesPage } from "@/pages/admin/delegates/DelegatesPage";
import { UsersPage } from "@/pages/admin/users/UsersPage";
import { AdminInvitationsPage } from "@/pages/admin/users/AdminInvitationsPage";
import { AcceptInvitationPage } from "@/pages/admin/invitations/AcceptInvitationPage";
import { ImageMapperPage } from "@/pages/admin/ImageMapperPage";
import { PaymentsPage } from "@/pages/admin/payments/PaymentsPage";
import { PaymentDetailPage } from "@/pages/admin/payments/PaymentDetailPage";
import { StudentVerificationsPage } from "@/pages/admin/student-verifications/StudentVerificationsPage";
import { AboutPage } from "@/pages/public/about/AboutPage";
import { ConferencesPage } from "@/pages/public/conferences/ConferencesPage";
import { ContactPage } from "@/pages/public/contact/ContactPage";
import { ExhibitionPage } from "@/pages/public/exhibition/ExhibitionPage";
import { HomePage } from "@/pages/public/home/HomePage";
import { MediaPage } from "@/pages/public/media/MediaPage";
import { SpeakersPage } from "@/pages/public/speakers/SpeakersPage";
import { PartnerArchiveCategoryPage } from "@/pages/public/sponsorship/PartnerArchiveCategoryPage";
import { SponsorshipPage } from "@/pages/public/sponsorship/SponsorshipPage";
import { RegistrationPage } from "@/pages/registration/registration/RegistrationPage";
import { DelegateRegistrationPage } from "@/pages/registration/delegate/DelegateRegistrationPage";
import { PaymentCallbackPage } from "@/pages/registration/payment/PaymentCallbackPage";
import { NotFoundPage } from "@/pages/system/not-found/NotFoundPage";

// Keep browser-wide behavior here so individual pages only own their page-specific work.
function NavigationEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function App() {
  // This is the website's route map: each URL selects the page React should display.
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
          <Route path="/registration/delegate" element={<DelegateRegistrationPage />} />
          <Route path="/registration/payment/callback" element={<PaymentCallbackPage />} />
          <Route
            path="/registration/exhibitor"
            element={<RegistrationPage initialCategoryId="exhibitor" />}
          />
          <Route
            path="/registration/sponsor"
            element={<RegistrationPage initialCategoryId="sponsorship" />}
          />
          <Route path="/sponsorship" element={<SponsorshipPage />} />
          <Route
            path="/sponsorship/associate-sponsor"
            element={<PartnerArchiveCategoryPage tierId="associate" />}
          />
          <Route
            path="/sponsorship/knowledge-partner"
            element={<PartnerArchiveCategoryPage tierId="knowledge" />}
          />
          <Route
            path="/sponsorship/exhibitors"
            element={<PartnerArchiveCategoryPage tierId="exhibitor" />}
          />
          <Route
            path="/sponsorship/supporting-partners"
            element={<PartnerArchiveCategoryPage tierId="supporting" />}
          />
          <Route
            path="/sponsorship/media-partners"
            element={<PartnerArchiveCategoryPage tierId="media" />}
          />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Navigate to="/registration" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/accept-invite" element={<AcceptInvitationPage />} />
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
            <Route
              path="delegates"
              element={
                <PermissionRoute permission="delegates.read">
                  <DelegatesPage />
                </PermissionRoute>
              }
            />
            <Route
              path="delegates/:id"
              element={
                <PermissionRoute permission="delegates.read">
                  <DelegateDetailPage />
                </PermissionRoute>
              }
            />
            <Route
              path="users"
              element={
                <PermissionRoute permission="users.read">
                  <UsersPage />
                </PermissionRoute>
              }
            />
            <Route
              path="users/invitations"
              element={
                <PermissionRoute permission="users.read">
                  <AdminInvitationsPage />
                </PermissionRoute>
              }
            />
            <Route
              path="payments"
              element={
                <PermissionRoute permission="payments.read">
                  <PaymentsPage />
                </PermissionRoute>
              }
            />
            <Route
              path="payments/:reference"
              element={
                <PermissionRoute permission="payments.read">
                  <PaymentDetailPage />
                </PermissionRoute>
              }
            />
            <Route
              path="student-verifications"
              element={
                <PermissionRoute permission="student_verifications.read">
                  <StudentVerificationsPage />
                </PermissionRoute>
              }
            />
            <Route path="image-mapper" element={<ImageMapperPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
