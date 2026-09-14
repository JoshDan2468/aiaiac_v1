import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import type { RegistrationCategoryId } from "@/data/registration";
import { DownloadCentreSection } from "./DownloadCentreSection";
import { AbstractGuidanceSection } from "./AbstractGuidanceSection";
import { CorporateDelegatesSection } from "./CorporateDelegatesSection";
import { HeroSection } from "./HeroSection";
import { OptionsSection } from "./OptionsSection";
import { RegistrationExperience } from "./RegistrationExperience";

type RegistrationPageProps = {
  initialCategoryId?: RegistrationCategoryId;
};

export function RegistrationPage({ initialCategoryId }: RegistrationPageProps) {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState<RegistrationCategoryId | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const launchElementRef = useRef<HTMLElement | null>(null);
  const openedInitialCategoryRef = useRef<RegistrationCategoryId | undefined>(undefined);

  useEffect(() => {
    if (!initialCategoryId || openedInitialCategoryRef.current === initialCategoryId) {
      return;
    }

    openedInitialCategoryRef.current = initialCategoryId;
    setActiveCategoryId(initialCategoryId);
    setDialogOpen(true);
  }, [initialCategoryId]);

  const openJourney = (categoryId: RegistrationCategoryId, launchElement: HTMLButtonElement) => {
    if (categoryId === "delegate") {
      navigate("/registration/delegate");
      return;
    }
    launchElementRef.current = launchElement;
    setActiveCategoryId(categoryId);
    setDialogOpen(true);
  };

  const showDownloadCentre = (launchElement: HTMLButtonElement) => {
    launchElementRef.current = launchElement;
    const section = document.getElementById("download-centre");
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const discardExperience = () => {
    setDialogOpen(false);
    setActiveCategoryId(null);
    window.setTimeout(() => launchElementRef.current?.focus(), 0);
  };

  const setExperienceOpen = (nextOpen: boolean) => {
    setDialogOpen(nextOpen);
    if (!nextOpen) {
      window.setTimeout(() => launchElementRef.current?.focus(), 0);
    }
  };

  return (
    <PublicPageLayout
      title="Registration | AIAIAC Africa 2027"
      description="Choose and prepare an AIAIAC Africa 2027 participation record."
    >
      <HeroSection />
      <OptionsSection onOpenJourney={openJourney} onShowDownloadCentre={showDownloadCentre} />
      <AbstractGuidanceSection />
      <CorporateDelegatesSection />
      <DownloadCentreSection />
      <RegistrationExperience
        key={activeCategoryId ?? "registration-experience"}
        categoryId={activeCategoryId}
        open={dialogOpen}
        onOpenChange={setExperienceOpen}
        onDiscard={discardExperience}
      />
    </PublicPageLayout>
  );
}
