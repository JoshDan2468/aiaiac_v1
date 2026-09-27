import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import type { CommercialApplicationConfirmation } from "@/services/commercialApplication/commercialApplicationService";

interface PackageOption {
  code: string;
  title: string;
  priceLabel: string;
}

interface ValidationResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: { issues: { path: (string | number)[]; message: string }[] };
}

export function CommercialApplicationForm({
  kind,
  packages,
  validate,
  submit,
  onSubmitted,
}: {
  kind: "Sponsor" | "Exhibitor";
  packages: readonly PackageOption[];
  validate: (value: unknown) => ValidationResult;
  submit: (
    value: Record<string, unknown>,
  ) => Promise<
    { ok: true; confirmation: CommercialApplicationConfirmation } | { ok: false; error: string }
  >;
  onSubmitted: (confirmation: CommercialApplicationConfirmation) => void;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const packageField = kind === "Sponsor" ? "sponsorshipTier" : "exhibitionOption";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const raw: Record<string, unknown> = Object.fromEntries(form.entries());
    raw["consent"] = form.get("consent") === "on";
    const parsed = validate(raw);
    if (!parsed.success || !parsed.data) {
      setErrors(
        Object.fromEntries(
          (parsed.error?.issues ?? []).map((issue) => [String(issue.path[0]), issue.message]),
        ),
      );
      return;
    }
    setErrors({});
    setState("submitting");
    const result = await submit(parsed.data);
    if (!result.ok) {
      setState("error");
      return;
    }
    onSubmitted(result.confirmation);
  };

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-forest focus:ring-2 focus:ring-forest/20";
  const input = (name: string, label: string, required = false, type = "text") => (
    <label className="text-sm font-bold text-slate-800">
      {label}
      {required ? " *" : ""}
      <input className={fieldClass} name={name} type={type} aria-invalid={Boolean(errors[name])} />
      {errors[name] && <span className="mt-1 block text-xs text-red-700">{errors[name]}</span>}
    </label>
  );

  return (
    <form className="space-y-8" noValidate onSubmit={(event) => void handleSubmit(event)}>
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold text-forest">Organization</legend>
        <div className="sm:col-span-2">
          {input("organizationName", "Organization / company", true)}
        </div>
        {input("country", "Country", true)}
        {input("industry", "Industry / sector")}
        {input("website", "Website", false, "url")}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold text-forest">Primary contact</legend>
        {input("contactFirstName", "First name", true)}
        {input("contactLastName", "Last name", true)}
        {input("contactEmail", "Work email", true, "email")}
        {input("contactPhone", "Phone number", true, "tel")}
        {input("contactJobTitle", "Job title / position")}
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl font-bold text-forest">
          {kind === "Sponsor" ? "Sponsorship tier" : "Exhibition space"}
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((option) => (
            <label
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 text-sm transition hover:border-forest has-[:checked]:border-forest has-[:checked]:bg-emerald-50"
              key={option.code}
            >
              <input name={packageField} type="radio" value={option.code} className="mr-2" />
              <span className="font-bold text-slate-900">{option.title}</span>
              <span className="mt-1 block text-xs font-semibold text-forest">
                {option.priceLabel}
              </span>
            </label>
          ))}
        </div>
        {errors[packageField] && (
          <p className="mt-2 text-xs text-red-700">Select an approved package.</p>
        )}
      </fieldset>

      <label className="block text-sm font-bold text-slate-800">
        Business message / requirements (optional)
        <textarea className={`${fieldClass} min-h-32 py-3`} name="notes" maxLength={2000} />
      </label>

      <label className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <input className="mt-1" name="consent" type="checkbox" />
        <span>
          I confirm that the information is accurate and acknowledge that this is an application.
          Submission or confirmation does not mean payment has been completed.
          {errors["consent"] && (
            <span className="mt-1 block text-xs text-red-700">{errors["consent"]}</span>
          )}
        </span>
      </label>

      {state === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800" role="alert">
          The application could not be submitted. Check your connection and try again.
        </p>
      )}
      <button
        className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-forest px-6 text-sm font-bold text-white disabled:opacity-60"
        disabled={state === "submitting"}
        type="submit"
      >
        {state === "submitting" && <LoaderCircle className="size-4 animate-spin" />}
        Submit {kind} application
      </button>
    </form>
  );
}
