import { useState, type FormEvent } from "react";
import { LoaderCircle, UserPlus, X } from "lucide-react";
import { createAdminInvitation } from "@/services/admin/adminUserService";
import type { AssignableAdminRole } from "@/types/adminUsers";
import { formatAdminRole } from "@/lib/adminProfile";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const assignableRoles: AssignableAdminRole[] = [
  "ADMIN",
  "FINANCE",
  "REGISTRATION_MANAGER",
  "COMMUNICATIONS",
];

const roleDescriptions: Record<AssignableAdminRole, string> = {
  ADMIN: "Full operational access excluding Super Admin management.",
  FINANCE: "Access to payment records, financial reports, and invoicing.",
  REGISTRATION_MANAGER: "Access to delegate directory, badge approvals, and status tracking.",
  COMMUNICATIONS: "Access to delegate lists, enquiries, and announcement tools.",
};

export function InviteUserModal({ isOpen, onClose, onSuccess }: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AssignableAdminRole>("ADMIN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!name || !normalizedEmail) {
      setErrorMessage("Full name and email address are required.");
      return;
    }

    setIsSubmitting(true);
    const result = await createAdminInvitation({ name, email: normalizedEmail, role });
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.status === 502) {
        setSuccessMessage("Invitation saved, but email dispatch failed. You can resend later.");
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setErrorMessage(result.error ?? "Failed to create invitation.");
      }
      return;
    }

    setSuccessMessage("Invitation sent successfully!");
    setTimeout(() => {
      setName("");
      setEmail("");
      setSuccessMessage("");
      onSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-mineral/10 text-mineral">
              <UserPlus className="size-4" />
            </div>
            <div>
              <h2 id="invite-modal-title" className="font-display text-lg font-bold text-slate-900">
                Invite Staff Member
              </h2>
              <p className="text-xs text-slate-500">Send an invitation email to join admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form onSubmit={(event) => void handleSubmit(event)} className="p-6 space-y-4">
          {errorMessage && (
            <div
              className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800"
              role="status"
            >
              {successMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="e.g. Dr. Olumide Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700">
              Work Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. o.johnson@aiaiac.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AssignableAdminRole)}
              className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            >
              {assignableRoles.map((r) => (
                <option value={r} key={r}>
                  {formatAdminRole(r)}
                </option>
              ))}
            </select>
            <p className="mt-2 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Scope: </span>
              {roleDescriptions[role]}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-mineral px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-forest disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Sending Invitation…
                </>
              ) : (
                <>
                  <UserPlus className="size-4" />
                  Send Invitation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
