import { useMemo, useState, type ComponentProps, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  findRegistrationJourney,
  type RegistrationCategoryId,
  type RegistrationJourney,
  type RegistrationPackage,
} from "@/data/registration";
import { cn } from "@/lib/utils";

type DraftValues = Record<string, string | boolean>;
type FieldType = "text" | "email" | "tel" | "url" | "number" | "textarea" | "select" | "checkbox";

type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helper?: string;
};

type RegistrationExperienceProps = {
  categoryId: RegistrationCategoryId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDiscard: () => void;
};

const fieldGroups: Record<RegistrationCategoryId, FormField[]> = {
  delegate: [
    {
      name: "title",
      label: "Title",
      type: "select",
      required: true,
      options: ["Dr", "Engr", "Mr", "Mrs", "Ms", "Prof", "Other"],
    },
    { name: "firstName", label: "First name", type: "text", required: true },
    { name: "lastName", label: "Last name", type: "text", required: true },
    { name: "workEmail", label: "Work email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+234 ..." },
    { name: "organisation", label: "Organisation", type: "text", required: true },
    { name: "jobTitle", label: "Job title", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    {
      name: "dietaryRequirement",
      label: "Dietary requirement",
      type: "textarea",
      helper: "Optional",
    },
    {
      name: "accessibilityRequirement",
      label: "Accessibility requirement",
      type: "textarea",
      helper: "Optional",
    },
    {
      name: "terms",
      label: "I understand this preview does not create a registration, booking or payment.",
      type: "checkbox",
      required: true,
    },
  ],
  exhibitor: [
    { name: "organisationName", label: "Organisation name", type: "text", required: true },
    { name: "contactPerson", label: "Contact person", type: "text", required: true },
    { name: "workEmail", label: "Work email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+234 ..." },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "website", label: "Website", type: "url", helper: "Optional" },
    { name: "industry", label: "Industry", type: "text", required: true },
    { name: "numberOfStands", label: "Number of stands", type: "number", required: true },
    { name: "productsServices", label: "Products or services", type: "textarea", required: true },
    {
      name: "specialRequirements",
      label: "Special requirements",
      type: "textarea",
      helper: "Optional",
    },
    { name: "billingContact", label: "Billing contact", type: "text", required: true },
    {
      name: "terms",
      label: "I understand this preview does not create a booking, quotation or payment.",
      type: "checkbox",
      required: true,
    },
  ],
  sponsorship: [
    { name: "organisationName", label: "Organisation name", type: "text", required: true },
    { name: "contactPerson", label: "Contact person", type: "text", required: true },
    { name: "workEmail", label: "Work email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+234 ..." },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "website", label: "Website", type: "url", helper: "Optional" },
    { name: "industry", label: "Industry", type: "text", required: true },
    {
      name: "sponsorshipObjective",
      label: "Sponsorship objective",
      type: "textarea",
      required: true,
    },
    {
      name: "additionalRequirements",
      label: "Additional requirements",
      type: "textarea",
      helper: "Optional",
    },
    { name: "billingContact", label: "Billing contact", type: "text", helper: "Optional" },
    {
      name: "preferredContactMethod",
      label: "Preferred contact method",
      type: "select",
      required: true,
      options: ["Email", "Phone", "Video call"],
    },
    {
      name: "terms",
      label:
        "I understand this preview does not submit an enquiry or create a sponsorship agreement.",
      type: "checkbox",
      required: true,
    },
  ],
  visitor: [
    { name: "fullName", label: "Full name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+234 ..." },
    { name: "organisation", label: "Organisation", type: "text", required: true },
    { name: "jobTitle", label: "Job title", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    {
      name: "visitorType",
      label: "Visitor type",
      type: "select",
      required: true,
      options: ["Industry professional", "Student", "Government representative", "Other"],
    },
    { name: "areasOfInterest", label: "Areas of interest", type: "textarea", helper: "Optional" },
    {
      name: "terms",
      label: "I understand this preview does not create a visitor pass or confirm availability.",
      type: "checkbox",
      required: true,
    },
  ],
  "media-partnership": [
    { name: "mediaOrganisation", label: "Media organisation", type: "text", required: true },
    { name: "contactPerson", label: "Contact person", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+234 ..." },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "website", label: "Website", type: "url", helper: "Optional" },
    { name: "mediaType", label: "Media type", type: "text", required: true },
    { name: "audienceReach", label: "Audience reach", type: "text", required: true },
    { name: "coverageProposal", label: "Coverage proposal", type: "textarea", required: true },
    { name: "socialLinks", label: "Social links", type: "textarea", helper: "Optional" },
    {
      name: "additionalInformation",
      label: "Additional information",
      type: "textarea",
      helper: "Optional",
    },
    {
      name: "terms",
      label: "I understand this preview does not submit a media request or confirm accreditation.",
      type: "checkbox",
      required: true,
    },
  ],
  "abstract-submissions": [
    { name: "authorName", label: "Author name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "organisation", label: "Organisation", type: "text", required: true },
    { name: "jobTitle", label: "Job title", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "proposedPaperTitle", label: "Proposed paper title", type: "text", required: true },
    { name: "conferenceTrack", label: "Conference track", type: "text", required: true },
    { name: "shortAbstract", label: "Short abstract", type: "textarea", required: true },
    { name: "coAuthors", label: "Co-authors", type: "textarea", helper: "Optional" },
    {
      name: "terms",
      label: "I understand this preview does not submit an abstract or upload a file.",
      type: "checkbox",
      required: true,
    },
  ],
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[-().\s\d]{7,}$/;

export function RegistrationExperience({
  categoryId,
  open,
  onOpenChange,
  onDiscard,
}: RegistrationExperienceProps) {
  const journey = categoryId ? findRegistrationJourney(categoryId) : undefined;
  const [step, setStep] = useState(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [draftValues, setDraftValues] = useState<DraftValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectionError, setSelectionError] = useState("");
  const [handoffStatus, setHandoffStatus] = useState("");
  const [discardOpen, setDiscardOpen] = useState(false);

  const selectedPackage = useMemo(
    () => journey?.packages.find((item) => item.id === selectedPackageId),
    [journey, selectedPackageId],
  );

  if (!journey || !categoryId) {
    return null;
  }

  const hasPaymentStep = journey.paymentMode === "direct-payment";
  const totalSteps = hasPaymentStep ? 4 : 3;
  const isDirty =
    selectedPackageId !== null ||
    Object.values(draftValues).some((value) => value === true || value !== "");
  const quantity = getQuantity(journey, draftValues);

  const resetFlow = () => {
    setStep(1);
    setSelectedPackageId(null);
    setDraftValues({});
    setErrors({});
    setSelectionError("");
    setHandoffStatus("");
  };

  const requestClose = () => {
    if (isDirty) {
      setDiscardOpen(true);
      return;
    }

    resetFlow();
    onOpenChange(false);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
      return;
    }

    requestClose();
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId);
    setSelectionError("");
    setHandoffStatus("");
  };

  const updateValue = (name: string, value: string | boolean) => {
    setDraftValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }
      const { [name]: _removed, ...remaining } = current;
      return remaining;
    });
  };

  const moveToDetails = () => {
    if (!selectedPackage) {
      setSelectionError("Select the configured option before continuing.");
      return;
    }

    setStep(2);
    setHandoffStatus("");
  };

  const moveToReview = () => {
    const nextErrors = validateDraft(categoryId, draftValues);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setHandoffStatus("Review the highlighted fields before continuing.");
      return;
    }

    setStep(3);
    setHandoffStatus("");
  };

  const handlePaymentHandoff = () => {
    if (!selectedPackage || selectedPackage.price === null) {
      setHandoffStatus(
        "Pricing confirmation required before payment can begin. No payment has been initiated.",
      );
      return;
    }

    setHandoffStatus("Secure payment integration is not connected. No payment has been initiated.");
  };

  const handleEnquiryHandoff = () => {
    setHandoffStatus("Submission handoff is not connected. No information has been sent.");
  };

  const discardDraft = () => {
    setDiscardOpen(false);
    resetFlow();
    onDiscard();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        className="fixed left-1/2 top-1/2 z-50 grid h-[100dvh] w-screen max-w-none -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] gap-0 overflow-hidden border-0 bg-mineral p-0 text-white shadow-2xl sm:h-[90vh] sm:max-w-[78rem] sm:border sm:border-white/14 [&>button:last-child]:right-4 [&>button:last-child]:top-4 [&>button:last-child]:z-20 [&>button:last-child]:flex [&>button:last-child]:size-11 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:border [&>button:last-child]:border-white/18 [&>button:last-child]:bg-mineral [&>button:last-child]:text-white [&>button:last-child]:opacity-100 [&>button:last-child]:focus:ring-lime"
        onEscapeKeyDown={(event) => {
          if (isDirty) {
            event.preventDefault();
            setDiscardOpen(true);
          }
        }}
        onPointerDownOutside={(event) => {
          if (isDirty) {
            event.preventDefault();
            setDiscardOpen(true);
          }
        }}
      >
        <RegistrationProgress journey={journey} step={step} totalSteps={totalSteps} />

        <div className="min-h-0 overflow-y-auto bg-bone text-mineral">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
            <DialogTitle className="display-md max-w-3xl text-mineral">{journey.title}</DialogTitle>
            <DialogDescription className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {journey.description} This draft record stays in this browser only until you discard
              it, reload, or start another registration.
            </DialogDescription>

            <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_21rem]">
              <main className="min-w-0" aria-live="polite">
                {step === 1 && (
                  <PackageSelection
                    journey={journey}
                    selectedPackageId={selectedPackageId}
                    quantity={quantity}
                    selectionError={selectionError}
                    onSelect={handlePackageSelect}
                    onQuantityChange={(nextQuantity) =>
                      updateValue("numberOfStands", String(nextQuantity))
                    }
                    onContinue={moveToDetails}
                  />
                )}

                {step === 2 && (
                  <DetailsStep
                    categoryId={categoryId}
                    draftValues={draftValues}
                    errors={errors}
                    onValueChange={updateValue}
                    onBack={() => setStep(1)}
                    onContinue={moveToReview}
                  />
                )}

                {step === 3 && selectedPackage && (
                  <ReviewStep
                    journey={journey}
                    selectedPackage={selectedPackage}
                    draftValues={draftValues}
                    quantity={quantity}
                    onBack={() => setStep(2)}
                    onEditDetails={() => setStep(2)}
                    onContinue={() => {
                      if (hasPaymentStep) {
                        setStep(4);
                        return;
                      }
                      handleEnquiryHandoff();
                    }}
                  />
                )}

                {step === 4 && selectedPackage && (
                  <PaymentStep
                    journey={journey}
                    selectedPackage={selectedPackage}
                    quantity={quantity}
                    onBack={() => setStep(3)}
                    onPaymentHandoff={handlePaymentHandoff}
                  />
                )}

                <p className="mt-5 min-h-5 text-sm font-medium text-forest" aria-live="assertive">
                  {handoffStatus}
                </p>
              </main>

              <RegistrationSummary
                journey={journey}
                selectedPackage={selectedPackage}
                quantity={quantity}
                step={step}
                className="mt-8 hidden lg:block lg:self-start"
              />
            </div>
          </div>
        </div>
      </DialogContent>

      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent className="z-[70] max-w-md border-mineral bg-bone p-6 text-mineral sm:rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="display-md text-mineral">
              Discard this record?
            </AlertDialogTitle>
            <AlertDialogDescription className="leading-relaxed text-muted-foreground">
              Your selected option and entered details are stored only in this browser. Discarding
              removes them and returns you to the registration categories.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3 gap-3 sm:space-x-0">
            <AlertDialogCancel className="min-h-11 rounded-none border-mineral bg-transparent text-mineral hover:bg-white">
              Keep editing
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={discardDraft}
              className="min-h-11 rounded-none bg-mineral text-white hover:bg-forest"
            >
              Discard record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

function RegistrationProgress({
  journey,
  step,
  totalSteps,
}: {
  journey: RegistrationJourney;
  step: number;
  totalSteps: number;
}) {
  const steps = ["Select option", "Your details", "Review"];
  if (journey.paymentMode === "direct-payment") {
    steps.push("Payment");
  }

  return (
    <header className="relative border-b border-white/12 bg-mineral px-5 py-4 sm:px-8 lg:px-10">
      <p className="sr-only" aria-live="polite">
        Registration progress: step {step} of {totalSteps}
      </p>
      <div
        className="mr-14 flex items-center gap-2 overflow-x-auto pb-1 sm:gap-3"
        aria-label="Registration progress"
      >
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === step;
          const isComplete = stepNumber < step;

          return (
            <div key={label} className="flex shrink-0 items-center gap-2 sm:gap-3">
              {index > 0 && <span className="h-px w-4 bg-white/20 sm:w-8" aria-hidden />}
              <span
                className={cn(
                  "flex min-h-9 items-center gap-2 border px-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em]",
                  isCurrent
                    ? "border-lime bg-lime text-mineral"
                    : isComplete
                      ? "border-white/40 text-white"
                      : "border-white/14 text-white/45",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="numeral text-sm">{String(stepNumber).padStart(2, "0")}</span>
                <span className="hidden sm:inline">{label}</span>
              </span>
            </div>
          );
        })}
      </div>
    </header>
  );
}

function PackageSelection({
  journey,
  selectedPackageId,
  quantity,
  selectionError,
  onSelect,
  onQuantityChange,
  onContinue,
}: {
  journey: RegistrationJourney;
  selectedPackageId: string | null;
  quantity: number;
  selectionError: string;
  onSelect: (packageId: string) => void;
  onQuantityChange: (quantity: number) => void;
  onContinue: () => void;
}) {
  const standSelection = journey.packages.some((item) => item.quantityLabel === "stand");

  return (
    <section aria-labelledby="select-option-title">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-mineral/14 pb-5">
        <div>
          <p className="eyebrow text-emerald-deep">01 / Selection record</p>
          <h2 id="select-option-title" className="display-md mt-3 text-mineral">
            Select a configured option.
          </h2>
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          Only approved option names appear here. Prices and currencies remain unconfirmed.
        </p>
      </div>

      <fieldset
        className="mt-6 space-y-3"
        aria-describedby={selectionError ? "package-selection-error" : undefined}
      >
        <legend className="sr-only">Select a registration option</legend>
        {journey.packages.map((item) => {
          const selected = selectedPackageId === item.id;
          return (
            <label
              key={item.id}
              className={cn(
                "block cursor-pointer border bg-white p-5 transition-colors focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-forest sm:p-6",
                selected
                  ? "border-lime ring-1 ring-lime"
                  : "border-mineral/18 hover:border-forest/60",
              )}
            >
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  name="registration-package"
                  value={item.id}
                  checked={selected}
                  onChange={() => onSelect(item.id)}
                  className="mt-1 size-4 accent-forest"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-mineral">{item.name}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <span className="border border-mineral/18 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-forest">
                      {item.priceLabel}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-mineral/12 pt-4 text-xs font-medium text-muted-foreground">
                    <span>{item.availability}</span>
                    <span>Currency to be confirmed</span>
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </fieldset>

      {standSelection && <QuantityControl quantity={quantity} onChange={onQuantityChange} />}

      {selectionError && (
        <p
          id="package-selection-error"
          className="mt-4 border-l-2 border-destructive pl-3 text-sm font-medium text-destructive"
        >
          {selectionError}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-mineral/14 pt-5">
        <FlowButton onClick={onContinue}>Continue to your details</FlowButton>
      </div>
    </section>
  );
}

function QuantityControl({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-mineral/18 bg-white p-4">
      <div>
        <p className="text-sm font-bold text-mineral">Number of stands</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          This is a planning quantity only, not a reservation.
        </p>
      </div>
      <div className="flex items-center border border-mineral/20">
        <button
          type="button"
          className="flex size-11 items-center justify-center text-lg font-semibold text-mineral transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          aria-label="Decrease number of stands"
        >
          −
        </button>
        <output
          className="flex min-h-11 min-w-11 items-center justify-center border-x border-mineral/20 px-3 text-sm font-bold text-mineral"
          aria-live="polite"
        >
          {quantity}
        </output>
        <button
          type="button"
          className="flex size-11 items-center justify-center text-lg font-semibold text-mineral transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          onClick={() => onChange(quantity + 1)}
          aria-label="Increase number of stands"
        >
          +
        </button>
      </div>
    </div>
  );
}

function DetailsStep({
  categoryId,
  draftValues,
  errors,
  onValueChange,
  onBack,
  onContinue,
}: {
  categoryId: RegistrationCategoryId;
  draftValues: DraftValues;
  errors: Record<string, string>;
  onValueChange: (name: string, value: string | boolean) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const fields = fieldGroups[categoryId];

  return (
    <section aria-labelledby="details-title">
      <div className="border-b border-mineral/14 pb-5">
        <p className="eyebrow text-emerald-deep">02 / Your details</p>
        <h2 id="details-title" className="display-md mt-3 text-mineral">
          Build the participation record.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Required fields are marked. Your details stay in this browser and are not submitted.
        </p>
      </div>

      <form
        className="mt-6"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
          {fields.map((field) => (
            <RegistrationField
              key={field.name}
              field={field}
              value={draftValue(draftValues, field.name)}
              checked={draftValues[field.name] === true}
              error={errors[field.name]}
              onChange={onValueChange}
            />
          ))}
        </div>

        {categoryId === "abstract-submissions" && (
          <div className="mt-5 border border-dashed border-mineral/25 bg-white p-4">
            <p className="text-sm font-bold text-mineral">Supporting file</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              File upload is not available in this preview. Do not attach or submit a file here.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-mineral/14 pt-5">
          <FlowButton type="button" variant="secondary" onClick={onBack}>
            Back to selection
          </FlowButton>
          <FlowButton type="submit">Review record</FlowButton>
        </div>
      </form>
    </section>
  );
}

function RegistrationField({
  field,
  value,
  checked,
  error,
  onChange,
}: {
  field: FormField;
  value: string;
  checked: boolean;
  error: string | undefined;
  onChange: (name: string, value: string | boolean) => void;
}) {
  const id = `registration-${field.name}`;
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;
  const describedBy = [field.helper ? descriptionId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(" ");

  if (field.type === "checkbox") {
    return (
      <div className="sm:col-span-2">
        <label
          className="flex cursor-pointer items-start gap-3 border border-mineral/16 bg-white p-4 focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-forest"
          htmlFor={id}
        >
          <input
            id={id}
            name={field.name}
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(field.name, event.target.checked)}
            aria-describedby={error ? errorId : undefined}
            className="mt-0.5 size-4 shrink-0 accent-forest"
          />
          <span className="text-sm leading-relaxed text-mineral">
            {field.label} {field.required && <span className="text-destructive">*</span>}
          </span>
        </label>
        {error && (
          <p id={errorId} className="mt-2 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }

  const commonProps = {
    id,
    name: field.name,
    value,
    required: field.required,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy || undefined,
    className: cn(
      "mt-2 min-h-11 w-full border bg-white px-3 text-sm text-mineral outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-forest/20",
      error ? "border-destructive" : "border-mineral/20",
    ),
  };

  return (
    <div
      className={cn(
        field.type === "textarea" ? "sm:col-span-2" : "",
        field.name === "title" ? "sm:col-span-1" : "",
      )}
    >
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.1em] text-mineral">
        {field.label} {field.required && <span className="text-destructive">*</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          {...commonProps}
          rows={4}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={cn(commonProps.className, "min-h-28 py-3")}
        />
      ) : field.type === "select" ? (
        <select {...commonProps} onChange={(event) => onChange(field.name, event.target.value)}>
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...commonProps}
          type={field.type}
          min={field.type === "number" ? 1 : undefined}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      )}
      {field.helper && (
        <p id={descriptionId} className="mt-1.5 text-xs text-muted-foreground">
          {field.helper}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ReviewStep({
  journey,
  selectedPackage,
  draftValues,
  quantity,
  onBack,
  onEditDetails,
  onContinue,
}: {
  journey: RegistrationJourney;
  selectedPackage: RegistrationPackage;
  draftValues: DraftValues;
  quantity: number;
  onBack: () => void;
  onEditDetails: () => void;
  onContinue: () => void;
}) {
  const entries = fieldGroups[journey.id]
    .filter((field) => field.type !== "checkbox" && draftValue(draftValues, field.name))
    .map((field) => ({ label: field.label, value: draftValue(draftValues, field.name) }));
  const isDirectPayment = journey.paymentMode === "direct-payment";

  return (
    <section aria-labelledby="review-title">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-mineral/14 pb-5">
        <div>
          <p className="eyebrow text-emerald-deep">03 / Review</p>
          <h2 id="review-title" className="display-md mt-3 text-mineral">
            Check the record.
          </h2>
        </div>
        <button
          type="button"
          className="min-h-11 text-xs font-bold uppercase tracking-[0.11em] text-forest underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          onClick={onEditDetails}
        >
          Edit details
        </button>
      </div>

      <div className="mt-6 grid gap-5">
        <RecordBlock title="Participation">
          <ReviewRow label="Category" value={journey.title} />
          <ReviewRow label="Selected option" value={selectedPackage.name} />
          <ReviewRow label="Quantity" value={quantityLabel(selectedPackage, quantity)} />
        </RecordBlock>

        <RecordBlock title="Details">
          {entries.map((entry) => (
            <ReviewRow key={entry.label} label={entry.label} value={entry.value} />
          ))}
        </RecordBlock>

        <PriceSummary journey={journey} selectedPackage={selectedPackage} quantity={quantity} />
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-mineral/14 pt-5">
        <FlowButton type="button" variant="secondary" onClick={onBack}>
          Back to details
        </FlowButton>
        <FlowButton onClick={onContinue}>
          {isDirectPayment ? "Continue to payment" : journey.handoffLabel}
        </FlowButton>
      </div>
    </section>
  );
}

function PaymentStep({
  journey,
  selectedPackage,
  quantity,
  onBack,
  onPaymentHandoff,
}: {
  journey: RegistrationJourney;
  selectedPackage: RegistrationPackage;
  quantity: number;
  onBack: () => void;
  onPaymentHandoff: () => void;
}) {
  const unavailable = selectedPackage.price === null;

  return (
    <section aria-labelledby="payment-title">
      <div className="border-b border-mineral/14 pb-5">
        <p className="eyebrow text-emerald-deep">04 / Payment</p>
        <h2 id="payment-title" className="display-md mt-3 text-mineral">
          Secure handoff pending.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Payment can begin only after the organiser confirms the configured price and currency.
        </p>
      </div>

      <div className="mt-6">
        <PriceSummary journey={journey} selectedPackage={selectedPackage} quantity={quantity} />
        <div className="mt-5 border-l-2 border-forest bg-white p-4">
          <p className="text-sm font-bold text-mineral">
            Pricing confirmation required before payment can begin.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            No payment is being created, redirected or charged from this preview.
          </p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Prepared payment states: Preparing payment · Redirecting to payment · Payment pending ·
          Payment failed · Payment cancelled.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-mineral/14 pt-5">
        <FlowButton type="button" variant="secondary" onClick={onBack}>
          Back to review
        </FlowButton>
        <FlowButton disabled={unavailable} onClick={onPaymentHandoff}>
          {journey.handoffLabel}
        </FlowButton>
      </div>
    </section>
  );
}

function RegistrationSummary({
  journey,
  selectedPackage,
  quantity,
  step,
  className,
}: {
  journey: RegistrationJourney;
  selectedPackage: RegistrationPackage | undefined;
  quantity: number;
  step: number;
  className?: string;
}) {
  return (
    <aside
      className={cn("border border-mineral/18 bg-white p-5", className)}
      aria-label="Registration record summary"
    >
      <p className="eyebrow text-emerald-deep">Record summary</p>
      <p className="mt-4 text-lg font-bold text-mineral">{journey.shortTitle}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Step {step} of {journey.paymentMode === "direct-payment" ? 4 : 3}
      </p>
      <div className="mt-5 border-t border-mineral/14 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Selected option
        </p>
        <p className="mt-2 text-sm font-semibold text-mineral">
          {selectedPackage?.name ?? "Not selected"}
        </p>
      </div>
      <div className="mt-4 border-t border-mineral/14 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Price state
        </p>
        <p className="mt-2 text-sm font-semibold text-forest">
          {selectedPackage ? selectedPackage.priceLabel : "Pricing to be confirmed"}
        </p>
        {selectedPackage && (
          <p className="mt-1 text-xs text-muted-foreground">
            {quantityLabel(selectedPackage, quantity)}
          </p>
        )}
      </div>
      <p className="mt-5 border-l-2 border-lime pl-3 text-xs leading-relaxed text-muted-foreground">
        Nothing in this record is sent or stored outside this browser.
      </p>
    </aside>
  );
}

function PriceSummary({
  journey,
  selectedPackage,
  quantity,
}: {
  journey: RegistrationJourney;
  selectedPackage: RegistrationPackage;
  quantity: number;
}) {
  const directPayment = journey.paymentMode === "direct-payment";
  const unavailable = selectedPackage.price === null;

  return (
    <section
      className="border border-mineral/18 bg-white p-5"
      aria-labelledby="price-summary-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-emerald-deep">Price record</p>
          <h3 id="price-summary-title" className="mt-2 text-base font-bold text-mineral">
            Pricing status
          </h3>
        </div>
        <span className="border border-mineral/18 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-forest">
          {selectedPackage.priceLabel}
        </span>
      </div>

      {directPayment ? (
        <dl className="mt-5 divide-y divide-mineral/12 border-t border-mineral/12 text-sm">
          <PriceRow label="Price" value="Pricing to be confirmed" />
          <PriceRow label="Unit price" value="Pricing to be confirmed" />
          <PriceRow label="Quantity" value={quantityLabel(selectedPackage, quantity)} />
          <PriceRow label="Subtotal" value="Pricing to be confirmed" />
          <PriceRow label="Additional fees" value="Pricing to be confirmed" />
          <PriceRow label="Total" value="Pricing to be confirmed" emphasis />
        </dl>
      ) : (
        <p className="mt-5 border-t border-mineral/12 pt-4 text-sm leading-relaxed text-muted-foreground">
          {unavailable
            ? "This category is an enquiry or application route. The organising team must review the record before any next step."
            : "The configured category does not require payment."}
        </p>
      )}
    </section>
  );
}

function PriceRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-3",
        emphasis && "font-bold text-mineral",
      )}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("text-right", emphasis ? "text-mineral" : "text-forest")}>{value}</dd>
    </div>
  );
}

function RecordBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-mineral/18 bg-white p-5">
      <h3 className="text-xs font-bold uppercase tracking-[0.11em] text-emerald-deep">{title}</h3>
      <dl className="mt-4 divide-y divide-mineral/12 border-t border-mineral/12">{children}</dl>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">
        {label}
      </dt>
      <dd className="whitespace-pre-wrap text-sm leading-relaxed text-mineral">{value}</dd>
    </div>
  );
}

function FlowButton({
  children,
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: "primary" | "secondary" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-11 items-center justify-center border px-5 text-xs font-bold uppercase tracking-[0.11em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest disabled:cursor-not-allowed disabled:border-mineral/15 disabled:bg-mineral/10 disabled:text-muted-foreground",
        variant === "primary"
          ? "border-mineral bg-mineral text-white hover:bg-forest"
          : "border-mineral/30 bg-transparent text-mineral hover:bg-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

function validateDraft(categoryId: RegistrationCategoryId, values: DraftValues) {
  const nextErrors: Record<string, string> = {};

  fieldGroups[categoryId].forEach((field) => {
    const value = values[field.name];
    const textValue = typeof value === "string" ? value.trim() : "";

    if (field.required && field.type === "checkbox" && value !== true) {
      nextErrors[field.name] = "You must acknowledge this statement before continuing.";
      return;
    }

    if (field.required && field.type !== "checkbox" && !textValue) {
      nextErrors[field.name] = "This field is required.";
      return;
    }

    if (textValue && field.type === "email" && !emailPattern.test(textValue)) {
      nextErrors[field.name] = "Enter a valid email address.";
    }

    if (textValue && field.type === "tel" && !phonePattern.test(textValue)) {
      nextErrors[field.name] = "Enter a valid phone number.";
    }

    if (textValue && field.type === "number" && Number(textValue) < 1) {
      nextErrors[field.name] = "Enter a number of at least 1.";
    }
  });

  return nextErrors;
}

function draftValue(values: DraftValues, name: string) {
  const value = values[name];
  return typeof value === "string" ? value : "";
}

function getQuantity(journey: RegistrationJourney, values: DraftValues) {
  if (!journey.packages.some((item) => item.quantityLabel === "stand")) {
    return 1;
  }

  const value = Number(draftValue(values, "numberOfStands"));
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1;
}

function quantityLabel(selectedPackage: RegistrationPackage, quantity: number) {
  if (selectedPackage.quantityLabel === "stand") {
    return `${quantity} ${quantity === 1 ? "stand" : "stands"}`;
  }

  return `${quantity} registration`;
}
