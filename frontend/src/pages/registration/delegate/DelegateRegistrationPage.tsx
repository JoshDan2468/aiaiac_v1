import { useEffect, useState } from "react";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import {
  getDelegatePackages,
  type DelegatePackage,
  type DelegateRegistrationConfirmation,
} from "@/services/delegate/delegateService";
import { DelegateRegistrationSection } from "./DelegateRegistrationSection";

type PageState = "loading" | "ready" | "empty" | "error";

export function DelegateRegistrationPage() {
  const [state, setState] = useState<PageState>("loading");
  const [packages, setPackages] = useState<DelegatePackage[]>([]);
  const [confirmation, setConfirmation] = useState<DelegateRegistrationConfirmation | null>(null);

  const loadPackages = async () => {
    setState("loading");
    const result = await getDelegatePackages();
    if (!result.ok) {
      setState("error");
      return;
    }
    setPackages(result.packages);
    setState(result.packages.length ? "ready" : "empty");
  };

  useEffect(() => {
    void loadPackages();
  }, []);

  return (
    <PublicPageLayout
      title="Delegate Registration | AIAIAC Africa 2027"
      description="Register as a Professional or Student Delegate for AIAIAC Africa 2027 in Lagos, Nigeria. Student applications require academic verification before payment."
      canonical="/registration/delegate"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Registration", item: "/registration" },
        { name: "Delegate Registration", item: "/registration/delegate" },
      ])}
    >
      <DelegateRegistrationSection
        state={state}
        packages={packages}
        confirmation={confirmation}
        onSubmitted={setConfirmation}
        onRetry={() => void loadPackages()}
      />
    </PublicPageLayout>
  );
}
