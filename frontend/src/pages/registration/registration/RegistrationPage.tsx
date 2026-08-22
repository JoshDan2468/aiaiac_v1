import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { HeroSection } from "./HeroSection";
import { OptionsSection } from "./OptionsSection";

export function RegistrationPage() {
  return (
    <PublicPageLayout
      title="Registration | AIAIAC West Africa 2027"
      description="Choose the current AIAIAC delegate, exhibitor or sponsor participation route."
    >
      <HeroSection />
      <OptionsSection />
    </PublicPageLayout>
  );
}
