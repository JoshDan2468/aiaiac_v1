import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, CircleAlert, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  getAdminDelegate,
  type DelegateRegistrationDetail,
} from "@/services/delegate/delegateService";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(value),
  );
}
function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function DelegateDetailPage() {
  const { id } = useParams();
  const [state, setState] = useState<"loading" | "ready" | "error" | "not-found">("loading");
  const [registration, setRegistration] = useState<DelegateRegistrationDetail | null>(null);
  const load = useCallback(async () => {
    if (!id) {
      setState("not-found");
      return;
    }
    setState("loading");
    const result = await getAdminDelegate(id);
    if (!result.ok) {
      setState(result.status === 404 ? "not-found" : "error");
      return;
    }
    setRegistration(result.registration);
    setState("ready");
  }, [id]);
  useEffect(() => {
    void load();
  }, [load]);
  if (state === "loading")
    return (
      <section className="flex min-h-80 items-center justify-center gap-3" role="status">
        <LoaderCircle className="size-5 animate-spin text-forest" /> Loading protected delegate
        record…
      </section>
    );
  if (state !== "ready" || !registration)
    return (
      <section className="border-l-4 border-destructive bg-white p-7" role="alert">
        <CircleAlert className="size-6 text-destructive" />
        <h1 className="display-md mt-4 text-mineral">
          {state === "not-found"
            ? "Delegate record not found."
            : "We could not load this delegate record."}
        </h1>
        <Link
          to="/admin/delegates"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest underline underline-offset-4"
        >
          <ArrowLeft className="size-4" /> Return to delegates
        </Link>
      </section>
    );
  return (
    <section aria-labelledby="delegate-detail-title">
      <Link
        to="/admin/delegates"
        className="inline-flex items-center gap-2 text-sm font-bold text-forest underline underline-offset-4"
      >
        <ArrowLeft className="size-4" /> Delegate directory
      </Link>
      <div className="mt-6 border-b border-mineral/18 pb-7 lg:flex lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow text-emerald-deep">Protected registration record</p>
          <h1 id="delegate-detail-title" className="display-md mt-4 text-mineral">
            {registration.firstName} {registration.lastName}
          </h1>
          <p className="numeral mt-3 text-lg text-forest">{registration.reference}</p>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-5 lg:mt-0">
          <Meta label="Registration" value={registration.registrationStatus.replace("_", " ")} />
          <Meta label="Payment" value={registration.paymentStatus} />
        </dl>
      </div>
      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <DetailGroup
          title="Identity and contact"
          rows={[
            ["Email", registration.email],
            ["Mobile", registration.mobile],
            ["Telephone", registration.telephone || "Not provided"],
            ["Country", registration.country],
          ]}
        />
        <DetailGroup
          title="Professional information"
          rows={[
            ["Job title", registration.jobTitle],
            ["Company", registration.companyName],
            ["Primary activity", registration.primaryActivity],
            ["Main objective", registration.mainObjective],
            ["How they heard", registration.heardAboutSource],
          ]}
        />
        <DetailGroup
          title="Package snapshot"
          rows={[
            ["Package", registration.packageName],
            ["Type", registration.packageType],
            ["Price", formatPrice(registration.priceMinor, registration.currency)],
            ["Description", registration.packageDescription],
          ]}
        >
          <ul className="mt-5 border-t border-mineral/12 pt-4 text-sm text-mineral/80">
            {registration.packageBenefits.map((benefit) => (
              <li key={benefit} className="mt-2">
                • {benefit}
              </li>
            ))}
          </ul>
        </DetailGroup>
        <DetailGroup
          title="Consent"
          rows={[
            ["Privacy consent", registration.privacyConsent ? "Given" : "Not given"],
            ["Partner data sharing", registration.dataSharingConsent ? "Given" : "Not given"],
          ]}
        />
        <DetailGroup
          title="Submission and payment metadata"
          rows={[
            ["Submitted", formatDate(registration.submittedAt)],
            ["Created", formatDate(registration.createdAt)],
            ["Last updated", formatDate(registration.updatedAt)],
            ["Payment status", registration.paymentStatus],
          ]}
        />
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-mineral/55">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold text-mineral">{value}</dd>
    </div>
  );
}
function DetailGroup({
  title,
  rows,
  children,
}: {
  title: string;
  rows: [string, string][];
  children?: React.ReactNode;
}) {
  return (
    <section className="border border-mineral/18 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold text-mineral">{title}</h2>
      <dl className="mt-5 divide-y divide-mineral/10">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
            <dt className="text-xs font-bold uppercase tracking-[0.1em] text-mineral/55">
              {label}
            </dt>
            <dd className="text-sm leading-relaxed text-mineral">{value}</dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  );
}
