import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, LoaderCircle, Mail, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  createAdminInvitation,
  getAdminInvitations,
  resendAdminInvitation,
  revokeAdminInvitation,
} from "@/services/admin/adminUserService";
import type { AdminInvitation, AssignableAdminRole } from "@/types/adminUsers";
import { formatAdminRole } from "@/lib/adminProfile";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableErrorState,
  AdminTableHeader,
  AdminTableHeaderCell,
  AdminTableLoadingState,
  AdminTableRow,
} from "@/components/admin/AdminTable";

const roles: AssignableAdminRole[] = ["ADMIN", "FINANCE", "REGISTRATION_MANAGER", "COMMUNICATIONS"];

export function AdminInvitationsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AssignableAdminRole>("ADMIN");
  const [invitations, setInvitations] = useState<AdminInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const result = await getAdminInvitations();
    if (result.ok) setInvitations(result.invitations);
    setLoading(false);
  }, []);

  useEffect(() => void load(), [load]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const result = await createAdminInvitation({ name, email: email.trim().toLowerCase(), role });
    setSubmitting(false);
    if (!result.ok) {
      setMessage(
        result.status === 502
          ? "The invitation was saved, but email delivery failed. Use Resend below."
          : (result.error ?? "The invitation could not be created."),
      );
      await load();
      return;
    }
    setName("");
    setEmail("");
    setMessage("Invitation created and dispatched via email.");
    await load();
  };

  const act = async (id: string, action: "revoke" | "resend") => {
    setMessage("");
    const result =
      action === "revoke" ? await revokeAdminInvitation(id) : await resendAdminInvitation(id);
    setMessage(
      result.ok
        ? action === "revoke"
          ? "Invitation revoked successfully."
          : "Invitation email resent successfully."
        : (result.error ?? "The invitation could not be updated."),
    );
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline mb-2"
        >
          <ArrowLeft className="size-3.5" /> Back to users &amp; roles
        </Link>
        <AdminPageHeader
          eyebrow="Administration / Invitations"
          title="Staff Invitations"
          description="Track and manage single-use invitation tokens issued to conference personnel."
        />
      </div>

      {/* Creation Card */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 mb-4">
          <UserPlus className="size-4 text-forest" />
          <span>New Staff Invitation</span>
        </div>
        <form onSubmit={(event) => void submit(event)} className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-600">
              Full Name
            </label>
            <input
              required
              minLength={2}
              maxLength={100}
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-600">
              Work Email
            </label>
            <input
              required
              type="email"
              placeholder="email@aiaiac.org"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-600">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as AssignableAdminRole)}
              className="mt-1.5 min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            >
              {roles.map((item) => (
                <option value={item} key={item}>
                  {formatAdminRole(item)}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-mineral px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-forest disabled:opacity-50 transition-colors"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="size-3.5 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Mail className="size-3.5" />
                  Send Invitation Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {message && (
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-800"
          role="status"
        >
          {message}
        </div>
      )}

      {/* Invitations Table */}
      {loading ? (
        <AdminTableLoadingState message="Loading staff invitations…" />
      ) : (
        <AdminTable minWidth="min-w-[55rem]">
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell>Invitee</AdminTableHeaderCell>
              <AdminTableHeaderCell>Role</AdminTableHeaderCell>
              <AdminTableHeaderCell>Status</AdminTableHeaderCell>
              <AdminTableHeaderCell>Expires At</AdminTableHeaderCell>
              <AdminTableHeaderCell>Email Dispatch</AdminTableHeaderCell>
              <AdminTableHeaderCell className="text-right">Actions</AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {invitations.map((item) => (
              <AdminTableRow key={item.id}>
                <AdminTableCell>
                  <p className="font-bold text-slate-900">{item.fullName}</p>
                  <p className="text-xs text-slate-500">{item.email}</p>
                </AdminTableCell>
                <AdminTableCell className="text-xs font-semibold text-slate-700">
                  {formatAdminRole(item.role)}
                </AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge status={item.status} />
                </AdminTableCell>
                <AdminTableCell className="text-xs text-slate-500 font-medium">
                  {new Date(item.expiresAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge
                    status={item.emailSentAt ? "SENT" : "NOT_SENT"}
                    tone={item.emailSentAt ? "success" : "neutral"}
                  />
                </AdminTableCell>
                <AdminTableCell className="text-right">
                  {item.status === "PENDING" && (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => void act(item.id, "resend")}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => void act(item.id, "revoke")}
                        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                      >
                        Revoke
                      </button>
                    </div>
                  )}
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
      )}
    </div>
  );
}
