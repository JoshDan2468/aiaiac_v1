import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAuth } from "@/hooks/useAuth";
import {
  communicationService,
  type Audience,
  type AudienceCode,
  type Campaign,
  type CampaignContent,
  type Delivery,
  type Preset,
} from "@/services/communication/communicationService";

const field =
  "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-800 focus:outline-none";
const button =
  "rounded-md bg-[#05190f] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50";
const secondary =
  "rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 disabled:opacity-50";
const card = "rounded-lg border border-slate-200 bg-white p-5 shadow-xs";
const format = (value: string | null) => (value ? new Date(value).toLocaleString("en-GB") : "—");
const label = (value: string) => value.replaceAll("_", " ");
const audiences: { code: AudienceCode; label: string }[] = [
  { code: "ALL_DELEGATES", label: "All conference delegates" },
  { code: "PROFESSIONAL_DELEGATES", label: "Professional Delegates" },
  { code: "STUDENT_DELEGATES", label: "Student Delegates" },
  { code: "SPONSORS", label: "Sponsors" },
  { code: "CONFIRMED_SPONSORS", label: "Confirmed Sponsors" },
  { code: "EXHIBITORS", label: "Exhibitors" },
  { code: "CONFIRMED_EXHIBITORS", label: "Confirmed Exhibitors" },
  { code: "ABSTRACT_AUTHORS", label: "Abstract Authors" },
];
const emptyContent: CampaignContent = {
  title: "",
  subject: "",
  preheader: "",
  heading: "",
  body: "",
  ctaLabel: null,
  ctaUrl: null,
  audience: { code: "ALL_DELEGATES" },
};
type Count = Awaited<ReturnType<typeof communicationService.count>>;

function Notice({ error, message }: { error: string; message: string }) {
  return (
    <>
      {error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-900">
          {message}
        </p>
      )}
    </>
  );
}

function AudienceFields({
  audience,
  onChange,
}: {
  audience: Audience;
  onChange: (value: Audience) => void;
}) {
  const delegate = audience.code.includes("DELEGATES");
  const change = (key: keyof Audience, value: string) =>
    onChange({ ...audience, [key]: value || undefined });
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <label className="text-sm font-semibold">
        Audience
        <select
          className={field}
          value={audience.code}
          onChange={(event) => onChange({ code: event.target.value as AudienceCode })}
        >
          {audiences.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      {delegate && (
        <>
          <label className="text-sm font-semibold">
            Registration status
            <select
              className={field}
              value={audience.registrationStatus ?? ""}
              onChange={(event) => change("registrationStatus", event.target.value)}
            >
              {["", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "CANCELLED"].map(
                (value) => (
                  <option key={value} value={value}>
                    {value ? label(value) : "Any"}
                  </option>
                ),
              )}
            </select>
          </label>
          <label className="text-sm font-semibold">
            Payment status
            <select
              className={field}
              value={audience.paymentStatus ?? ""}
              onChange={(event) => change("paymentStatus", event.target.value)}
            >
              {["", "PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"].map((value) => (
                <option key={value} value={value}>
                  {value ? label(value) : "Any"}
                </option>
              ))}
            </select>
          </label>
          {(audience.code === "STUDENT_DELEGATES" || audience.code === "ALL_DELEGATES") && (
            <label className="text-sm font-semibold">
              Student verification
              <select
                className={field}
                value={audience.verificationStatus ?? ""}
                onChange={(event) => change("verificationStatus", event.target.value)}
              >
                {[
                  "",
                  "NOT_SUBMITTED",
                  "PENDING",
                  "MORE_INFORMATION_REQUIRED",
                  "APPROVED",
                  "REJECTED",
                ].map((value) => (
                  <option key={value} value={value}>
                    {value ? label(value) : "Any"}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="text-sm font-semibold">
            Country
            <input
              className={field}
              value={audience.country ?? ""}
              maxLength={100}
              onChange={(event) => change("country", event.target.value)}
              placeholder="e.g. Nigeria"
            />
          </label>
          <label className="text-sm font-semibold">
            Paid currency
            <select
              className={field}
              value={audience.currency ?? ""}
              onChange={(event) => change("currency", event.target.value)}
            >
              <option value="">Any</option>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
          </label>
        </>
      )}
      {audience.code === "ABSTRACT_AUTHORS" && (
        <label className="text-sm font-semibold">
          Abstract status
          <select
            className={field}
            value={audience.abstractStatus ?? ""}
            onChange={(event) => change("abstractStatus", event.target.value)}
          >
            {["", "SUBMITTED", "UNDER_REVIEW", "REVISION_REQUIRED", "ACCEPTED", "REJECTED"].map(
              (value) => (
                <option key={value} value={value}>
                  {value ? label(value) : "Any"}
                </option>
              ),
            )}
          </select>
        </label>
      )}
    </div>
  );
}

export function EmailCentrePage() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<CampaignContent>(emptyContent);
  const [saved, setSaved] = useState<Campaign | null>(null);
  const [dirty, setDirty] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [count, setCount] = useState<Count | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [review, setReview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const canCreate = admin?.permissions.includes("communications.create");
  const canSend = admin?.permissions.includes("communications.send");
  const canManage = admin?.permissions.includes("communications.manage");
  useEffect(() => {
    communicationService
      .presets()
      .then(setPresets)
      .catch(() => {});
    const draft = searchParams.get("draft");
    if (draft)
      communicationService
        .get(draft)
        .then((campaign) => {
          if (campaign.status !== "DRAFT") return;
          setSaved(campaign);
          setContent({
            title: campaign.title,
            subject: campaign.subject,
            preheader: campaign.preheader,
            heading: campaign.heading,
            body: campaign.body,
            ctaLabel: campaign.ctaLabel ?? null,
            ctaUrl: campaign.ctaUrl ?? null,
            audience: campaign.audience,
          });
        })
        .catch(() => setError("Draft could not be loaded."));
  }, [searchParams]);
  const changed = (next: CampaignContent) => {
    setContent(next);
    setDirty(true);
    setCount(null);
    setPreview(null);
    setReview(false);
  };
  const run = async (work: () => Promise<void>) => {
    setError("");
    setMessage("");
    setBusy(true);
    try {
      await work();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Communications"
        title="Email Centre"
        description="Prepare a conference communication, resolve its audience from the database, preview, test, and review before sending."
      />
      <Notice error={error} message={message} />
      <section className={card}>
        <h2 className="mb-4 text-lg font-bold">1. Audience</h2>
        <AudienceFields
          audience={content.audience}
          onChange={(audience) => changed({ ...content, audience })}
        />
        <button
          className={`${secondary} mt-4`}
          disabled={busy}
          onClick={() =>
            void run(async () => {
              const result = await communicationService.count(content.audience);
              setCount(result);
            })
          }
        >
          Count matching recipients
        </button>
        {count && (
          <p className="mt-3 text-sm" role="status">
            <strong>{count.count}</strong> distinct valid email addresses.{" "}
            {count.overLimit && `This exceeds the ${count.limit}-recipient campaign limit.`}
          </p>
        )}
      </section>
      <section className={card}>
        <h2 className="mb-4 text-lg font-bold">2. Compose</h2>
        <label className="mb-4 block max-w-sm text-sm font-semibold">
          Starting template
          <select
            className={field}
            defaultValue=""
            onChange={(event) => {
              const preset = presets.find((item) => item.id === event.target.value);
              if (preset)
                changed({
                  ...content,
                  heading: preset.heading,
                  body: preset.body,
                  subject: preset.label,
                  preheader: `${preset.label} — AIAIAC Africa 2027`,
                });
            }}
          >
            <option value="">Choose a preset (optional)</option>
            {presets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["title", "Internal campaign name", 120],
              ["subject", "Email subject", 180],
              ["preheader", "Preheader", 180],
              ["heading", "Email heading", 180],
            ] as const
          ).map(([key, title, max]) => (
            <label className="text-sm font-semibold" key={key}>
              {title}
              <input
                className={field}
                value={content[key]}
                maxLength={max}
                onChange={(event) => changed({ ...content, [key]: event.target.value })}
              />
            </label>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold">
          Message
          <textarea
            className={`${field} min-h-44`}
            maxLength={5000}
            value={content.body}
            onChange={(event) => changed({ ...content, body: event.target.value })}
          />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            CTA label (optional)
            <input
              className={field}
              maxLength={80}
              value={content.ctaLabel ?? ""}
              onChange={(event) => changed({ ...content, ctaLabel: event.target.value || null })}
            />
          </label>
          <label className="text-sm font-semibold">
            CTA HTTPS URL (optional)
            <input
              className={field}
              type="url"
              maxLength={500}
              value={content.ctaUrl ?? ""}
              onChange={(event) => changed({ ...content, ctaUrl: event.target.value || null })}
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className={secondary}
            disabled={busy}
            onClick={() =>
              void run(async () => {
                const result = await communicationService.preview(content);
                setPreview(result.html);
              })
            }
          >
            Preview email
          </button>
          {canCreate && (
            <button
              className={button}
              disabled={busy || Boolean(saved && !canManage)}
              onClick={() =>
                void run(async () => {
                  const campaign = saved
                    ? await communicationService.update(saved.reference, content)
                    : await communicationService.create(content);
                  setSaved(campaign);
                  setDirty(false);
                  setMessage(`Draft ${campaign.reference} saved.`);
                })
              }
            >
              {saved ? "Update draft" : "Save draft"}
            </button>
          )}
        </div>
        {preview && (
          <div className="mt-5">
            <h3 className="mb-2 font-semibold">Email preview</h3>
            <iframe
              title="Campaign email preview"
              sandbox=""
              srcDoc={preview}
              className="h-[640px] w-full rounded-md border border-slate-200"
            />
          </div>
        )}
      </section>
      {saved && (
        <section className={card}>
          <h2 className="mb-4 text-lg font-bold">3. Test and review</h2>
          <p className="text-sm text-slate-600">
            Draft {saved.reference}. Save any edits before testing or sending. Test emails go to one
            address and do not enter the delivery ledger.
          </p>
          {canSend && (
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                aria-label="Test email address"
                className={`${field} max-w-sm`}
                type="email"
                value={testEmail}
                onChange={(event) => setTestEmail(event.target.value)}
                placeholder="test@example.com"
              />
              <button
                className={secondary}
                disabled={busy || !testEmail}
                onClick={() =>
                  void run(async () => {
                    await communicationService.test(saved.reference, testEmail);
                    setMessage("Test email accepted by provider.");
                  })
                }
              >
                Send one test email
              </button>
            </div>
          )}
          <button
            className={`${button} mt-5`}
            disabled={busy || dirty || !count || count.count === 0 || count.overLimit || !canSend}
            onClick={() =>
              void run(async () => {
                const fresh = await communicationService.count(content.audience);
                setCount(fresh);
                if (fresh.count === 0 || fresh.overLimit)
                  throw new Error("Audience must contain 1–500 recipients.");
                setReview(true);
              })
            }
          >
            Review campaign
          </button>
          {dirty && (
            <p className="mt-2 text-sm text-amber-800">
              Save the latest edits before final review.
            </p>
          )}
          {review && count && (
            <div className="mt-5 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm">
              <h3 className="font-bold">Final confirmation</h3>
              <p>
                {saved.subject} will be sent to {count.count} distinct{" "}
                {label(saved.audience.code).toLowerCase()} addresses. This cannot be undone after
                delivery starts.
              </p>
              <button
                className={`${button} mt-3`}
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    const campaign = await communicationService.confirm(
                      saved.reference,
                      count.fingerprint,
                    );
                    navigate(`/admin/communications/campaigns/${campaign.reference}`);
                  })
                }
              >
                Confirm recipient snapshot
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export function CampaignsPage() {
  const [items, setItems] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    communicationService
      .list(page, status)
      .then((result) => {
        if (active) {
          setItems(result.items);
          setTotal(result.total);
          setLoading(false);
        }
      })
      .catch((failure) => {
        if (active) {
          setError(String(failure));
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [page, status]);
  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Communications"
        title="Campaigns"
        description="Saved drafts and delivery history."
        actions={
          <Link className={button} to="/admin/communications">
            New email
          </Link>
        }
      />
      <Notice error={error} message="" />
      <label className="block max-w-xs text-sm">
        Status{" "}
        <select
          className={field}
          value={status}
          onChange={(event) => {
            setPage(1);
            setStatus(event.target.value);
          }}
        >
          {["", "DRAFT", "SENDING", "SENT", "PARTIALLY_FAILED", "FAILED"].map((value) => (
            <option key={value} value={value}>
              {value ? label(value) : "All statuses"}
            </option>
          ))}
        </select>
      </label>
      {loading ? (
        <p role="status">Loading campaigns…</p>
      ) : items.length === 0 ? (
        <p className={card}>No campaigns found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                {[
                  "Campaign",
                  "Subject",
                  "Audience",
                  "Created by",
                  "Recipients",
                  "Sent",
                  "Failed",
                  "Status",
                  "Created",
                  "Sent time",
                ].map((name) => (
                  <th className="px-3 py-3" key={name}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr className="border-t border-slate-100" key={item.id}>
                  <td className="px-3 py-3">
                    <Link
                      className="font-semibold text-emerald-800 underline"
                      to={`/admin/communications/campaigns/${item.reference}`}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{item.subject}</td>
                  <td className="px-3 py-3">{label(item.audience.code)}</td>
                  <td className="px-3 py-3">{item.createdBy}</td>
                  <td className="px-3 py-3">{item.recipientCount}</td>
                  <td className="px-3 py-3">{item.sent}</td>
                  <td className="px-3 py-3">{item.failed}</td>
                  <td className="px-3 py-3">{label(item.status)}</td>
                  <td className="px-3 py-3">{format(item.createdAt)}</td>
                  <td className="px-3 py-3">{format(item.sentAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex items-center gap-3 text-sm">
        <button className={secondary} disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} · {total} campaigns
        </span>
        <button
          className={secondary}
          disabled={page * 20 >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function CampaignDetailPage() {
  const { reference } = useParams();
  const { admin } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(() => {
    if (reference)
      communicationService
        .get(reference)
        .then(setCampaign)
        .catch((failure) => setError(String(failure)));
  }, [reference]);
  useEffect(() => {
    load();
  }, [load]);
  const send = async (retry: boolean) => {
    if (!reference || busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      let result = retry
        ? await communicationService.retry(reference)
        : await communicationService.deliver(reference);
      setCampaign(result.campaign);
      let batches = 1;
      while (result.processed > 0 && result.campaign.pending > 0 && batches < 50) {
        result = await communicationService.deliver(reference);
        setCampaign(result.campaign);
        batches++;
      }
      setMessage(
        `Delivery run processed ${batches} batch${batches === 1 ? "" : "es"}. Sent: ${result.campaign.sent}; failed: ${result.campaign.failed}.`,
      );
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Delivery failed");
      load();
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Communications / Campaigns"
        title={campaign?.title ?? "Campaign"}
        description={reference ?? ""}
        actions={
          <Link className={secondary} to="/admin/communications/campaigns">
            All campaigns
          </Link>
        }
      />
      <Notice error={error} message={message} />
      {!campaign ? (
        <p role="status">Loading campaign…</p>
      ) : (
        <>
          <section className={card}>
            <p>
              <strong>Status:</strong> {label(campaign.status)} · <strong>Audience:</strong>{" "}
              {label(campaign.audience.code)}
            </p>
            <p className="mt-2">
              <strong>Recipients:</strong> {campaign.recipientCount} · <strong>Sent:</strong>{" "}
              {campaign.sent} · <strong>Failed:</strong> {campaign.failed} ·{" "}
              <strong>Pending:</strong> {campaign.pending} · <strong>Claimed:</strong>{" "}
              {campaign.claimed}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Created by {campaign.createdBy} on {format(campaign.createdAt)}.
            </p>
            <h2 className="mt-5 text-lg font-bold">{campaign.subject}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm">{campaign.body}</p>
            {campaign.status === "DRAFT" && (
              <Link
                className={`${secondary} mt-4 inline-block`}
                to={`/admin/communications?draft=${campaign.reference}`}
              >
                Open draft in Email Centre
              </Link>
            )}
            {campaign.status !== "DRAFT" && (
              <div className="mt-5 flex flex-wrap gap-3">
                {admin?.permissions.includes("communications.send") && campaign.pending > 0 && (
                  <button className={button} disabled={busy} onClick={() => void send(false)}>
                    {busy ? "Delivering…" : "Start / continue delivery"}
                  </button>
                )}
                {admin?.permissions.includes("communications.manage") && campaign.failed > 0 && (
                  <button className={secondary} disabled={busy} onClick={() => void send(true)}>
                    Retry failed recipients (max 3 attempts)
                  </button>
                )}
                <Link
                  className={secondary}
                  to={`/admin/communications/deliveries?campaign=${campaign.reference}`}
                >
                  View delivery activity
                </Link>
              </div>
            )}
          </section>
          {campaign.claimed > 0 && (
            <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm">
              Some deliveries remain claimed. Do not retry these automatically: their provider
              outcome may be uncertain after an interruption. Investigate before reconciliation.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export function TemplatesPage() {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    communicationService
      .presets()
      .then(setPresets)
      .catch((failure) => setError(String(failure)));
  }, []);
  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Communications"
        title="Templates"
        description="Suggested starting points for conference communications. Transactional payment, pass, security, and verification templates are not editable here."
      />
      <Notice error={error} message="" />
      <div className="grid gap-4 md:grid-cols-2">
        {presets.map((preset) => (
          <article className={card} key={preset.id}>
            <h2 className="font-bold">{preset.label}</h2>
            <p className="mt-2 text-sm text-slate-600">{preset.heading}</p>
            <p className="mt-1 text-sm">{preset.body}</p>
            <Link
              className="mt-4 inline-block text-sm font-semibold text-emerald-800 underline"
              to="/admin/communications"
            >
              Compose email
            </Link>
          </article>
        ))}
      </div>
      {!presets.length && !error && <p role="status">Loading templates…</p>}
    </div>
  );
}

export function DeliveryActivityPage() {
  const [items, setItems] = useState<Delivery[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [campaign, setCampaign] = useState(
    new URLSearchParams(window.location.search).get("campaign") ?? "",
  );
  const [campaignInput, setCampaignInput] = useState(campaign);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    communicationService
      .deliveries(page, status, campaign)
      .then((result) => {
        if (active) {
          setItems(result.items);
          setTotal(result.total);
          setLoading(false);
        }
      })
      .catch((failure) => {
        if (active) {
          setError(String(failure));
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [page, status, campaign]);
  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Communications"
        title="Delivery Activity"
        description="Per-recipient provider acceptance and retry history; credentials are never shown."
      />
      <Notice error={error} message="" />
      <div className="flex flex-wrap gap-3">
        <label className="text-sm">
          Status
          <select
            className={field}
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value);
            }}
          >
            {["", "PENDING", "CLAIMED", "SENT", "FAILED"].map((value) => (
              <option key={value} value={value}>
                {value || "All"}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Campaign reference
          <input
            className={field}
            value={campaignInput}
            onChange={(event) => setCampaignInput(event.target.value.toUpperCase())}
            placeholder="AIAIAC-COM-…"
          />
        </label>
        <button
          className={secondary}
          onClick={() => {
            if (campaignInput && !/^AIAIAC-COM-[A-F0-9]{8}$/.test(campaignInput)) {
              setError("Enter a complete campaign reference.");
              return;
            }
            setPage(1);
            setCampaign(campaignInput);
          }}
        >
          Apply filter
        </button>
      </div>
      {loading ? (
        <p role="status">Loading deliveries…</p>
      ) : items.length === 0 ? (
        <p className={card}>No delivery activity found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                {[
                  "Recipient",
                  "Campaign",
                  "Source",
                  "Status",
                  "Attempts",
                  "Provider reference",
                  "Error",
                  "Sent time",
                ].map((name) => (
                  <th className="px-3 py-3" key={name}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr className="border-t border-slate-100" key={item.id}>
                  <td className="px-3 py-3">
                    {item.name}
                    <br />
                    <span className="text-slate-500">{item.email}</span>
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      className="text-emerald-800 underline"
                      to={`/admin/communications/campaigns/${item.campaignReference}`}
                    >
                      {item.campaignReference}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{label(item.sourceCategory)}</td>
                  <td className="px-3 py-3">{item.status}</td>
                  <td className="px-3 py-3">{item.attempts}</td>
                  <td className="px-3 py-3">{item.providerMessageId ?? "—"}</td>
                  <td className="px-3 py-3">{item.errorSummary ?? "—"}</td>
                  <td className="px-3 py-3">{format(item.sentAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex items-center gap-3 text-sm">
        <button className={secondary} disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} · {total} deliveries
        </span>
        <button
          className={secondary}
          disabled={page * 20 >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
