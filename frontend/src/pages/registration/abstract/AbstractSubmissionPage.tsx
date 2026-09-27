import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { abstractSubmissionGuidance, abstractTopics } from "@/data/brochure";
import {
  countAbstractWords,
  createAbstractIdempotencyKey,
  exchangeAbstractRecovery,
  getAbstractWorkspace,
  requestAbstractRecovery,
  resubmitAbstract,
  saveAbstractRevision,
  submitAbstract,
  type AbstractAccess,
  type AbstractContent,
  type AbstractWorkspace,
} from "@/services/abstractSubmission/abstractSubmissionService";

const inputClass =
  "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20";

function ContentFields({
  value,
  onChange,
}: {
  value: AbstractContent;
  onChange: (value: AbstractContent) => void;
}) {
  const wordCount = countAbstractWords(value.abstractBody);
  return (
    <div className="space-y-5">
      <label className="block text-sm font-bold text-slate-800">
        Abstract title *
        <input
          className={inputClass}
          maxLength={300}
          required
          value={value.title}
          onChange={(event) => onChange({ ...value, title: event.target.value })}
        />
      </label>
      <label className="block text-sm font-bold text-slate-800">
        Abstract body *
        <textarea
          className={`${inputClass} min-h-64 py-3 leading-6`}
          maxLength={10000}
          required
          value={value.abstractBody}
          aria-describedby="abstract-word-count"
          aria-invalid={wordCount > 500}
          onChange={(event) => onChange({ ...value, abstractBody: event.target.value })}
        />
      </label>
      <p
        id="abstract-word-count"
        className={`text-sm font-semibold ${wordCount > 500 ? "text-red-700" : "text-slate-600"}`}
        role="status"
      >
        {wordCount} / 500 words
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-slate-800">
          Keywords (optional)
          <input
            className={inputClass}
            maxLength={500}
            value={value.keywords ?? ""}
            onChange={(event) => onChange({ ...value, keywords: event.target.value })}
          />
        </label>
        <label className="text-sm font-bold text-slate-800">
          Topic area (optional)
          <select
            className={inputClass}
            value={value.topic ?? ""}
            onChange={(event) => onChange({ ...value, topic: event.target.value })}
          >
            <option value="">No topic selected</option>
            {abstractTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function AuthorWorkspace({ access }: { access: AbstractAccess }) {
  const [workspace, setWorkspace] = useState<AbstractWorkspace | null>(null);
  const [content, setContent] = useState<AbstractContent>({ title: "", abstractBody: "" });
  const [state, setState] = useState<"loading" | "ready" | "working" | "error">("loading");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void getAbstractWorkspace(access).then((result) => {
      if (!result.ok) {
        setState("error");
        setMessage("This secure workspace link has expired. Request a new link below.");
        return;
      }
      setWorkspace(result.workspace);
      setContent({
        title: result.workspace.title,
        abstractBody: result.workspace.abstractBody,
        keywords: result.workspace.keywords ?? "",
        topic: result.workspace.topic ?? "",
      });
      setState("ready");
    });
  }, [access]);

  const save = async () => {
    if (countAbstractWords(content.abstractBody) > 500) {
      setMessage("Shorten the abstract to 500 words or fewer.");
      return;
    }
    setState("working");
    const result = await saveAbstractRevision(access, content);
    setState(result.ok ? "ready" : "error");
    setMessage(
      result.ok
        ? "Revision saved. Explicitly resubmit it when ready."
        : (result.error ?? "Revision could not be saved."),
    );
    if (result.ok) {
      setWorkspace(result.workspace);
      setSaved(true);
    }
  };

  const resubmit = async () => {
    setState("working");
    const result = await resubmitAbstract(access);
    setState(result.ok ? "ready" : "error");
    setMessage(
      result.ok
        ? "Abstract revision resubmitted successfully."
        : (result.error ?? "Resubmission failed."),
    );
    if (result.ok) {
      setWorkspace(result.workspace);
      setSaved(false);
    }
  };

  if (state === "loading") return <p role="status">Loading your abstract workspace…</p>;
  if (!workspace) return <p role="alert">{message}</p>;
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-forest">Author workspace</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">{workspace.reference}</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Status: {workspace.status.replaceAll("_", " ")}
      </p>
      {workspace.status === "SUBMITTED" && (
        <p className="mt-5 text-sm">Your abstract has been submitted.</p>
      )}
      {workspace.status === "UNDER_REVIEW" && (
        <p className="mt-5 text-sm">Your abstract is currently under review.</p>
      )}
      {workspace.status === "ACCEPTED" && (
        <p className="mt-5 text-sm">
          Your abstract has been accepted. Further speaker information will be communicated
          separately.
        </p>
      )}
      {workspace.status === "REJECTED" && (
        <p className="mt-5 text-sm">
          We are unable to accept your abstract at this time. {workspace.currentReviewReason}
        </p>
      )}
      {workspace.status === "REVISION_REQUIRED" && (
        <div className="mt-6 space-y-6">
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Revision instruction: {workspace.currentReviewReason}
          </p>
          <ContentFields
            value={content}
            onChange={(value) => {
              setContent(value);
              setSaved(false);
            }}
          />
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg bg-forest px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
              disabled={state === "working" || countAbstractWords(content.abstractBody) > 500}
              onClick={() => void save()}
              type="button"
            >
              Save revision
            </button>
            <button
              className="rounded-lg border border-forest px-5 py-3 text-sm font-bold text-forest disabled:opacity-50"
              disabled={!saved || state === "working"}
              onClick={() => void resubmit()}
              type="button"
            >
              Resubmit for review
            </button>
          </div>
        </div>
      )}
      {message && (
        <p className="mt-5 text-sm font-semibold" role={state === "error" ? "alert" : "status"}>
          {message}
        </p>
      )}
    </section>
  );
}

export function AbstractSubmissionPage() {
  const submissionKey = useRef<string | null>(null);
  const [access, setAccess] = useState<AbstractAccess | null>(null);
  const [content, setContent] = useState<AbstractContent>({ title: "", abstractBody: "" });
  const [state, setState] = useState<"ready" | "submitting" | "requesting" | "exchanging">("ready");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get("recoveryToken");
    if (!token) return;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setState("exchanging");
    void exchangeAbstractRecovery(token).then((result) => {
      setState("ready");
      if (result.ok) setAccess(result.access);
      else setMessage("This recovery link is invalid or expired. Request a new link below.");
    });
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (countAbstractWords(content.abstractBody) > 500) {
      setMessage("Shorten the abstract to 500 words or fewer.");
      return;
    }
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (fields["consent"] !== "on") {
      setMessage("Please acknowledge the submission statement.");
      return;
    }
    submissionKey.current ??= createAbstractIdempotencyKey();
    setState("submitting");
    setMessage("");
    const result = await submitAbstract({
      idempotencyKey: submissionKey.current,
      authorFirstName: String(fields["authorFirstName"] ?? ""),
      authorLastName: String(fields["authorLastName"] ?? ""),
      authorEmail: String(fields["authorEmail"] ?? ""),
      authorPhone: String(fields["authorPhone"] ?? ""),
      organizationName: String(fields["organizationName"] ?? ""),
      jobTitle: String(fields["jobTitle"] ?? ""),
      country: String(fields["country"] ?? ""),
      ...content,
      consent: true,
    });
    setState("ready");
    if (result.ok) {
      setAccess({
        reference: result.confirmation.reference,
        continuationToken: result.confirmation.continuationToken,
        continuationTokenExpiresAt: result.confirmation.continuationTokenExpiresAt,
      });
      setMessage("Abstract submitted successfully. Save your reference for future access.");
    } else {
      setMessage(
        result.status === 410
          ? "The Abstract submission deadline has passed."
          : (result.error ?? "Submission failed. Please try again."),
      );
    }
  };

  const recover = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("requesting");
    const result = await requestAbstractRecovery(reference.trim().toUpperCase(), email.trim());
    setState("ready");
    setMessage(
      result.ok ? result.message : (result.error ?? "The request could not be completed."),
    );
  };

  return (
    <PublicPageLayout
      title="Abstract Submission | AIAIAC Africa 2027"
      description="Submit a 500-word Abstract for AIAIAC 2027 in Lagos, Nigeria."
      canonical="/registration/abstract"
    >
      <section className="bg-[#F7F5EF] py-16 sm:py-24">
        <div className="shell max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-forest">
            AIAIAC 2027 · 22–23 June · Lagos
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase text-mineral sm:text-5xl">
            Submit an Abstract
          </h1>
          <p className="mt-4 text-base text-slate-700">
            Deadline: {abstractSubmissionGuidance.deadline}, 23:59 West Africa Time. Maximum: 500
            words. Speaker fee: TBA.
          </p>
          {message && (
            <p
              className="mt-6 rounded-lg bg-slate-100 p-4 text-sm font-semibold text-slate-800"
              role="status"
            >
              {message}
            </p>
          )}
          <div className="mt-8">
            {access ? (
              <AuthorWorkspace access={access} />
            ) : (
              <form
                className="space-y-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-8"
                onSubmit={(event) => void submit(event)}
              >
                <fieldset className="grid gap-5 sm:grid-cols-2">
                  <legend className="mb-4 font-display text-xl font-bold">
                    Author information
                  </legend>
                  {(
                    [
                      ["authorFirstName", "First name", "text"],
                      ["authorLastName", "Last name", "text"],
                      ["authorEmail", "Email", "email"],
                      ["authorPhone", "Phone", "tel"],
                      ["organizationName", "Organization / institution", "text"],
                      ["country", "Country", "text"],
                      ["jobTitle", "Job title (optional)", "text"],
                    ] as const
                  ).map(([name, label, type]) => (
                    <label className="text-sm font-bold text-slate-800" key={name}>
                      {label}
                      <input
                        className={inputClass}
                        name={name}
                        type={type}
                        required={name !== "jobTitle"}
                        maxLength={name === "authorEmail" ? 254 : 200}
                      />
                    </label>
                  ))}
                </fieldset>
                <fieldset>
                  <legend className="mb-4 font-display text-xl font-bold">Abstract</legend>
                  <ContentFields value={content} onChange={setContent} />
                </fieldset>
                <label className="flex gap-3 text-sm text-slate-700">
                  <input name="consent" type="checkbox" required />
                  <span>
                    I confirm this submission is my work and may be reviewed by the AIAIAC 2027
                    programme team.
                  </span>
                </label>
                <button
                  className="rounded-lg bg-forest px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
                  disabled={state !== "ready" || countAbstractWords(content.abstractBody) > 500}
                  type="submit"
                >
                  {state === "submitting" ? "Submitting…" : "Submit Abstract"}
                </button>
              </form>
            )}
          </div>
          <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
            <h2 className="font-display text-xl font-bold">Return to your Abstract</h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your reference and submission email to request a private access link. The
              response is the same whether or not they match a record.
            </p>
            <form
              className="mt-5 grid gap-4 sm:grid-cols-[1fr_1fr_auto]"
              onSubmit={(event) => void recover(event)}
            >
              <label className="text-sm font-bold">
                Reference
                <input
                  className={inputClass}
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  required
                />
              </label>
              <label className="text-sm font-bold">
                Submission email
                <input
                  className={inputClass}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <button
                className="self-end rounded-lg border border-forest px-4 py-3 text-sm font-bold text-forest disabled:opacity-50"
                disabled={state !== "ready"}
                type="submit"
              >
                Email secure link
              </button>
            </form>
          </section>
          <Link
            className="mt-6 inline-block text-sm font-bold text-forest hover:underline"
            to="/conferences"
          >
            ← Conference programme
          </Link>
        </div>
      </section>
    </PublicPageLayout>
  );
}
