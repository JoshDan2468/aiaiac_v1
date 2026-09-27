import { useState, type FormEvent } from "react";
import { LoaderCircle, Mail, UserPlus, X } from "lucide-react";
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

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedName || !normalizedEmail) {
      setErrorMessage("Full name and email address are required.");
      return;
    }

    setIsSubmitting(true);
    const result = await createAdminInvitation({
      name: normalizedName,
      email: normalizedEmail,
      role,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.status === 502) {
        setSuccessMessage(
          "Invitation created, but email dispatch failed. You can resend it later.",
        );
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-[#05190F] text-white">
              <UserPlus className="size-4" />
            </div>
            <div>
              <h2 id="invite-modal-title" className="font-sans text-sm font-bold text-slate-900">
                Invite Staff Member
              </h2>
              <p className="text-[11px] text-slate-500">
                Send a secure single-use invitation link to conference personnel.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close dialog"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={(event) => void handleSubmit(event)} className="mt-4 space-y-4">
          {errorMessage && (
            <div
              className="rounded-md border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div
              className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-800"
              role="status"
            >
              {successMessage}
            </div>
          )}

          <div>
            <label htmlFor="invite-fullname" className="block text-xs font-semibold text-slate-700">
              Full Name *
            </label>
            <input
              id="invite-fullname"
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="e.g. Dr. Jane Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F]"
            />
          </div>
          <div>
            <label htmlFor="invite-email" className="block text-xs font-semibold text-slate-700">
              Official Email Address *
            </label>
            <input
              id="invite-email"
              type="email"
              required
              placeholder="e.g. j.doe@aiaiac.org"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F]"
            />
          </div>
          <div>
            <label htmlFor="invite-role" className="block text-xs font-semibold text-slate-700">
              Role Assignment *
            </label>
            <select
              id="invite-role"
              value={role}
              onChange={(event) => setRole(event.target.value as AssignableAdminRole)}
              className="mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none transition-colors focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F]"
            >
              {assignableRoles.map((item) => (
                <option key={item} value={item}>
                  {formatAdminRole(item)}
                </option>
              ))}
            </select>
            <p className="mt-1.5 rounded-md bg-slate-50 p-2 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Scope: </span>
              {roleDescriptions[role]}
            </p>
          </div>

          <p className="text-[11px] leading-normal text-slate-400">
            Invitations expire automatically after 48 hours. Roles determine which operational
            queues the staff member can view and manage.
          </p>
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#05190F] px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-[#05190F]/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-3.5 animate-spin" />
                  <span>Issuing invitation…</span>
                </>
              ) : (
                <>
                  <Mail className="size-3.5" />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
