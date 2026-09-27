import { useState } from "react";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { HeroSection } from "./HeroSection";
import { ParticipationChoiceSection } from "./ParticipationChoiceSection";
import { AttendConferenceSection } from "./AttendConferenceSection";
import { PartnerAiaiacSection } from "./PartnerAiaiacSection";
import { ContributeProgrammeSection } from "./ContributeProgrammeSection";
import { DynamicParticipationFormSection } from "./DynamicParticipationFormSection";
import { type ParticipationType } from "./types";
import { ProcessSection } from "./ProcessSection";
import { NeedHelpSection } from "./NeedHelpSection";

export function RegistrationPage() {
  const [selectedParticipationType, setSelectedParticipationType] = useState<ParticipationType>(
    "General Participation Enquiry",
  );

  const handleSelectParticipationType = (type: string) => {
    setSelectedParticipationType(type as ParticipationType);
    const formElement = document.getElementById("enquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PublicPageLayout
      title="Participate in AIAIAC Africa 2027 | Registration & Commercial Enquiries"
      description="Choose how you would like to participate in AIAIAC Africa 2027. Access delegate registration, sponsorship packages, exhibition spaces, and technical abstract submissions."
      canonical="/registration"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Registration", item: "/registration" },
      ])}
    >
      {/* 1. DARK / EDITORIAL HERO (#05190F) */}
      <HeroSection />

      {/* 2. WARM IVORY (#F5F2E9) — Participation choice */}
      <ParticipationChoiceSection />

      {/* 3. WHITE (#FFFFFF) — Attend the Conference */}
      <AttendConferenceSection onSelectEnquiryType={handleSelectParticipationType} />

      {/* 4. SOFT SAGE (#EAEFEA) — Partner with AIAIAC */}
      <PartnerAiaiacSection onSelectEnquiryType={handleSelectParticipationType} />

      {/* 5. WARM IVORY (#F5F2E9) — Contribute to the Programme */}
      <ContributeProgrammeSection onSelectEnquiryType={handleSelectParticipationType} />

      {/* 6. WHITE (#FFFFFF) — Dynamic Participation Enquiry Form */}
      <DynamicParticipationFormSection
        selectedType={selectedParticipationType}
        onSelectType={setSelectedParticipationType}
      />

      {/* 7. WHITE (#FFFFFF) — What Happens Next */}
      <ProcessSection />

      {/* 8. DARK GREEN (#05190F) — Need Help Choosing? */}
      <NeedHelpSection />
    </PublicPageLayout>
  );
}
