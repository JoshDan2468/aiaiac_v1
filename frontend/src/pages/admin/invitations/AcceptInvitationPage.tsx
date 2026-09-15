import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { acceptAdminInvitation, validateAdminInvitation } from "@/services/admin/adminUserService";
import type { InvitationValidation, PublicAdminInvitation } from "@/types/adminUsers";
import { formatAdminRole } from "@/lib/adminProfile";
import { ShieldCheck, UserCheck } from "lucide-react";

export function AcceptInvitationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";
  const [state, setState] = useState<"loading" | "valid" | "invalid">("loading");
  const [status, setStatus] = useState<InvitationValidation["status"]>("INVALID");
  const [invitation, setInvitation] = useState<PublicAdminInvitation | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    void validateAdminInvitation(token).then((result) => {
      if (!result.ok || !result.data) {
        setState("invalid");
        return;
      }
      const validation = result.data.data;
      setStatus(validation.status);
      if (validation.status === "VALID") {
        setInvitation(validation.invitation);
        setState("valid");
      } else setState("invalid");
    });
  }, [token]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setError("");
    const result = await acceptAdminInvitation(token, password, confirmPassword);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "The invitation could not be accepted.");
      return;
    }
    navigate("/admin/login?activated=1", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-sans text-slate-900 antialiased">
      <section
        className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-10"
        aria-labelledby="accept-title"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <img src="/brand/aiaiac-logo-dark.png" alt="AIAIAC 2027" className="h-8 w-auto" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-emerald-800 border border-emerald-200">
            <ShieldCheck className="size-3 text-emerald-600" /> Secure Token
          </span>
        </div>

        <p className="mt-6 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-forest">
          Staff Account Activation
        </p>
        <h1 id="accept-title" className="mt-1.5 font-display text-2xl font-bold text-slate-900">
          Accept Admin Invitation
        </h1>

        {state === "loading" ? (
          <div
            className="mt-8 flex flex-col items-center justify-center py-8 text-center"
            role="status"
          >
            <p className="text-sm font-semibold text-slate-600">
              Verifying secure invitation link…
            </p>
          </div>
        ) : state === "invalid" ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-5" role="alert">
            <p className="font-bold text-rose-900">Invalid or Expired Invitation</p>
            <p className="mt-1.5 text-xs text-rose-700">
              Token status: <span className="font-bold">{status}</span>. Please request a new
              invitation link from a Super Admin.
            </p>
            <Link
              to="/admin/login"
              className="mt-4 inline-block text-xs font-bold text-forest underline"
            >
              Return to Admin Login
            </Link>
          </div>
        ) : invitation ? (
          <form onSubmit={(event) => void submit(event)} className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <UserCheck className="size-4 text-forest" />
                <span>{invitation.fullName}</span>
              </div>
              <p className="mt-1 text-slate-500 font-medium">{invitation.email}</p>
              <div className="mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.1em] text-slate-700 border border-slate-200">
                Role: {formatAdminRole(invitation.role)}
              </div>
            </div>

            <div>
              <label
                htmlFor="invitation-password"
                className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700"
              >
                New Password
              </label>
              <input
                id="invitation-password"
                type="password"
                required
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
              />
            </div>

            <div>
              <label
                htmlFor="invitation-confirm-password"
                className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700"
              >
                Confirm Password
              </label>
              <input
                id="invitation-confirm-password"
                type="password"
                required
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
              />
            </div>

            <p className="text-[0.7rem] text-slate-400 leading-normal">
              Password must contain at least 12 characters with uppercase, lowercase, and a number.
            </p>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800"
              >
                {error}
              </div>
            )}

            <button
              disabled={submitting}
              className="min-h-11 w-full rounded-lg bg-mineral px-5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-forest disabled:opacity-50"
            >
              {submitting ? "Activating Account…" : "Set Password & Activate Account"}
            </button>
          </form>
        ) : null}
      </section>
    </main>
  );
}
