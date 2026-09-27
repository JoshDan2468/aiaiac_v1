import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { PermissionRoute } from "@/components/admin/PermissionRoute";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AuthLoadingScreen } from "@/components/admin/AuthLoadingScreen";
import { AboutPage } from "@/pages/public/about/AboutPage";
import { ConferencesPage } from "@/pages/public/conferences/ConferencesPage";
import { ContactPage } from "@/pages/public/contact/ContactPage";
import { ExhibitionPage } from "@/pages/public/exhibition/ExhibitionPage";
import { HomePage } from "@/pages/public/home/HomePage";
import { MediaPage } from "@/pages/public/media/MediaPage";
import { SpeakersPage } from "@/pages/public/speakers/SpeakersPage";
import { SpeakersArchivePage } from "@/pages/public/speakers/SpeakersArchivePage";
import { PartnerArchiveCategoryPage } from "@/pages/public/sponsorship/PartnerArchiveCategoryPage";
import { SponsorshipPage } from "@/pages/public/sponsorship/SponsorshipPage";
import { RegistrationPage } from "@/pages/registration/registration/RegistrationPage";
import { DelegateRegistrationPage } from "@/pages/registration/delegate/DelegateRegistrationPage";
import { PaymentCallbackPage } from "@/pages/registration/payment/PaymentCallbackPage";
import { StudentVerificationAccessPage } from "@/pages/registration/student-verification/StudentVerificationAccessPage";
import { SponsorApplicationPage } from "@/pages/registration/sponsor/SponsorApplicationPage";
import { ExhibitorApplicationPage } from "@/pages/registration/exhibitor/ExhibitorApplicationPage";
import { AbstractSubmissionPage } from "@/pages/registration/abstract/AbstractSubmissionPage";
import { NotFoundPage } from "@/pages/system/not-found/NotFoundPage";

const AdminDashboardPage = lazy(() =>
  import("@/pages/admin/dashboard/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminLoginPage = lazy(() =>
  import("@/pages/admin/login/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage })),
);
const DelegateDetailPage = lazy(() =>
  import("@/pages/admin/delegates/DelegateDetailPage").then((m) => ({
    default: m.DelegateDetailPage,
  })),
);
const DelegatesPage = lazy(() =>
  import("@/pages/admin/delegates/DelegatesPage").then((m) => ({ default: m.DelegatesPage })),
);
const UsersPage = lazy(() =>
  import("@/pages/admin/users/UsersPage").then((m) => ({ default: m.UsersPage })),
);
const AdminInvitationsPage = lazy(() =>
  import("@/pages/admin/users/AdminInvitationsPage").then((m) => ({
    default: m.AdminInvitationsPage,
  })),
);
const AcceptInvitationPage = lazy(() =>
  import("@/pages/admin/invitations/AcceptInvitationPage").then((m) => ({
    default: m.AcceptInvitationPage,
  })),
);
const PaymentsPage = lazy(() =>
  import("@/pages/admin/payments/PaymentsPage").then((m) => ({ default: m.PaymentsPage })),
);
const PaymentDetailPage = lazy(() =>
  import("@/pages/admin/payments/PaymentDetailPage").then((m) => ({
    default: m.PaymentDetailPage,
  })),
);
const StudentVerificationsPage = lazy(() =>
  import("@/pages/admin/student-verifications/StudentVerificationsPage").then((m) => ({
    default: m.StudentVerificationsPage,
  })),
);
const StudentVerificationDetailPage = lazy(() =>
  import("@/pages/admin/student-verifications/StudentVerificationDetailPage").then((m) => ({
    default: m.StudentVerificationDetailPage,
  })),
);
const CommercialApplicationsPage = lazy(() =>
  import("@/pages/admin/commercial/CommercialApplicationsPage").then((m) => ({
    default: m.CommercialApplicationsPage,
  })),
);
const CommercialApplicationDetailPage = lazy(() =>
  import("@/pages/admin/commercial/CommercialApplicationDetailPage").then((m) => ({
    default: m.CommercialApplicationDetailPage,
  })),
);
const AbstractSubmissionsPage = lazy(() =>
  import("@/pages/admin/abstracts/AbstractSubmissionsPage").then((m) => ({
    default: m.AbstractSubmissionsPage,
  })),
);
const AbstractSubmissionDetailPage = lazy(() =>
  import("@/pages/admin/abstracts/AbstractSubmissionDetailPage").then((m) => ({
    default: m.AbstractSubmissionDetailPage,
  })),
);
const EnquiriesPage = lazy(() =>
  import("@/pages/admin/enquiries/EnquiriesPage").then((m) => ({ default: m.EnquiriesPage })),
);
const EnquiryDetailPage = lazy(() =>
  import("@/pages/admin/enquiries/EnquiryDetailPage").then((m) => ({
    default: m.EnquiryDetailPage,
  })),
);
const ReportsPage = lazy(() =>
  import("@/pages/admin/reports/ReportsPage").then((m) => ({ default: m.ReportsPage })),
);
const EmailCentrePage = lazy(() =>
  import("@/pages/admin/communications/CommunicationsPages").then((m) => ({
    default: m.EmailCentrePage,
  })),
);
const CampaignsPage = lazy(() =>
  import("@/pages/admin/communications/CommunicationsPages").then((m) => ({
    default: m.CampaignsPage,
  })),
);
const CampaignDetailPage = lazy(() =>
  import("@/pages/admin/communications/CommunicationsPages").then((m) => ({
    default: m.CampaignDetailPage,
  })),
);
const TemplatesPage = lazy(() =>
  import("@/pages/admin/communications/CommunicationsPages").then((m) => ({
    default: m.TemplatesPage,
  })),
);
const DeliveryActivityPage = lazy(() =>
  import("@/pages/admin/communications/CommunicationsPages").then((m) => ({
    default: m.DeliveryActivityPage,
  })),
);

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
          <Route path="/speakers/archive" element={<SpeakersArchivePage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/registration/delegate" element={<DelegateRegistrationPage />} />
          <Route path="/registration/payment/callback" element={<PaymentCallbackPage />} />
          <Route
            path="/registration/student-verification"
            element={<StudentVerificationAccessPage />}
          />
          <Route path="/registration/exhibitor" element={<ExhibitorApplicationPage />} />
          <Route path="/registration/sponsor" element={<SponsorApplicationPage />} />
          <Route path="/registration/abstract" element={<AbstractSubmissionPage />} />
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
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<AuthLoadingScreen />}>
                <AdminLoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/accept-invite"
            element={
              <Suspense fallback={<AuthLoadingScreen />}>
                <AcceptInvitationPage />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="communications"
              element={
                <PermissionRoute permission="communications.read">
                  <EmailCentrePage />
                </PermissionRoute>
              }
            />
            <Route
              path="communications/campaigns"
              element={
                <PermissionRoute permission="communications.read">
                  <CampaignsPage />
                </PermissionRoute>
              }
            />
            <Route
              path="communications/campaigns/:reference"
              element={
                <PermissionRoute permission="communications.read">
                  <CampaignDetailPage />
                </PermissionRoute>
              }
            />
            <Route
              path="communications/templates"
              element={
                <PermissionRoute permission="communications.read">
                  <TemplatesPage />
                </PermissionRoute>
              }
            />
            <Route
              path="communications/deliveries"
              element={
                <PermissionRoute permission="communications.read">
                  <DeliveryActivityPage />
                </PermissionRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PermissionRoute permission="registrations.read">
                  <AdminDashboardPage />
                </PermissionRoute>
              }
            />
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
            <Route
              path="student-verifications/:reference"
              element={
                <PermissionRoute permission="student_verifications.read">
                  <StudentVerificationDetailPage />
                </PermissionRoute>
              }
            />
            <Route
              path="sponsor-applications"
              element={
                <PermissionRoute permission="sponsors.read">
                  <CommercialApplicationsPage kind="SPONSOR" />
                </PermissionRoute>
              }
            />
            <Route
              path="sponsor-applications/:reference"
              element={
                <PermissionRoute permission="sponsors.read">
                  <CommercialApplicationDetailPage kind="SPONSOR" />
                </PermissionRoute>
              }
            />
            <Route
              path="exhibitor-applications"
              element={
                <PermissionRoute permission="exhibitors.read">
                  <CommercialApplicationsPage kind="EXHIBITOR" />
                </PermissionRoute>
              }
            />
            <Route
              path="exhibitor-applications/:reference"
              element={
                <PermissionRoute permission="exhibitors.read">
                  <CommercialApplicationDetailPage kind="EXHIBITOR" />
                </PermissionRoute>
              }
            />
            <Route
              path="abstract-submissions"
              element={
                <PermissionRoute permission="abstracts.read">
                  <AbstractSubmissionsPage />
                </PermissionRoute>
              }
            />
            <Route
              path="abstract-submissions/:reference"
              element={
                <PermissionRoute permission="abstracts.read">
                  <AbstractSubmissionDetailPage />
                </PermissionRoute>
              }
            />
            <Route
              path="reports"
              element={
                <PermissionRoute permission="reports.read">
                  <ReportsPage />
                </PermissionRoute>
              }
            />
            <Route
              path="enquiries"
              element={
                <PermissionRoute permission="enquiries.read">
                  <EnquiriesPage />
                </PermissionRoute>
              }
            />
            <Route
              path="enquiries/:reference"
              element={
                <PermissionRoute permission="enquiries.read">
                  <EnquiryDetailPage />
                </PermissionRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
