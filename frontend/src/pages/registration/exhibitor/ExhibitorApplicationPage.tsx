import { useState } from "react";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { CommercialApplicationForm } from "@/forms/commercial/CommercialApplicationForm";
import {
  exhibitorApplicationSchema,
  type ExhibitorApplicationValues,
} from "@/forms/commercial/commercialApplicationSchemas";
import { exhibitionStandPackages } from "@/data/brochure";
import {
  submitExhibitorApplication,
  type CommercialApplicationConfirmation as Confirmation,
} from "@/services/commercialApplication/commercialApplicationService";
import { CommercialApplicationConfirmation } from "../commercial/CommercialApplicationConfirmation";

const packages = exhibitionStandPackages.map((item) => ({
  code: item.code!,
  title: item.title,
  priceLabel: item.priceLabel!,
}));

export function ExhibitorApplicationPage() {
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  return (
    <PublicPageLayout
      title="Exhibitor Application | AIAIAC Africa 2027"
      description="Apply for an approved AIAIAC 2027 exhibition stand."
      canonical="/registration/exhibitor"
    >
      <section className="bg-[#F7F5EF] py-16 sm:py-24">
        <div className="shell max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest">AIAIAC 2027</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase text-mineral sm:text-5xl">
            Exhibitor application
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Select an approved USD stand option and submit your organization for commercial review.
            No payment or booth allocation occurs through this form.
          </p>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {confirmation ? (
              <CommercialApplicationConfirmation confirmation={confirmation} />
            ) : (
              <CommercialApplicationForm
                kind="Exhibitor"
                packages={packages}
                validate={(value) => exhibitorApplicationSchema.safeParse(value)}
                submit={(value) => submitExhibitorApplication(value as ExhibitorApplicationValues)}
                onSubmitted={setConfirmation}
              />
            )}
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
}
