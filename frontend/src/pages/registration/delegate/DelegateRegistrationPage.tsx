import { useEffect, useState } from "react";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
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
      title="Delegate Registration | AIAIAC West Africa 2027"
      description="Apply for an AIAIAC West Africa 2027 delegate package."
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
