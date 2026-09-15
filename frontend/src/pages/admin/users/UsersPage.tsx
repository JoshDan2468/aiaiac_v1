import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shield, UserPlus, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getAdminUsers,
  updateAdminRole,
  updateAdminStatus,
} from "@/services/admin/adminUserService";
import type { AdminUser, AssignableAdminRole } from "@/types/adminUsers";
import { formatAdminRole, getAdminInitials } from "@/lib/adminProfile";
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
import { InviteUserModal } from "@/components/admin/InviteUserModal";

const assignableRoles: AssignableAdminRole[] = [
  "ADMIN",
  "FINANCE",
  "REGISTRATION_MANAGER",
  "COMMUNICATIONS",
];

export function UsersPage() {
  const { admin } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const load = useCallback(async () => {
    setState("loading");
    const result = await getAdminUsers();
    if (!result.ok) {
      setState("error");
      return;
    }
    setUsers(result.users);
    setState("ready");
  }, []);

  useEffect(() => void load(), [load]);

  const changeStatus = async (user: AdminUser) => {
    setBusyId(user.id);
    setMessage("");
    const result = await updateAdminStatus(user.id, !user.isActive);
    setBusyId(null);
    if (!result.ok) {
      setMessage(result.error ?? "The status could not be changed.");
      return;
    }
    await load();
  };

  const changeRole = async (user: AdminUser, role: AssignableAdminRole) => {
    setBusyId(user.id);
    setMessage("");
    const result = await updateAdminRole(user.id, role);
    setBusyId(null);
    if (!result.ok) {
      setMessage(result.error ?? "The role could not be changed.");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Administration / Access & Security"
        title="Users & Roles"
        description="Staff accounts are invitation-only. Role changes and account activations are authenticated and audited server-side."
        actions={
          <div className="flex items-center gap-2.5">
            <Link
              to="/admin/users/invitations"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              Invitation History
            </Link>
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-mineral px-4 text-xs font-bold text-white shadow-xs hover:bg-forest transition-colors"
            >
              <UserPlus className="size-4" />
              Invite Staff
            </button>
          </div>
        }
      />

      {message && (
        <div
          className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800"
          role="alert"
        >
          {message}
        </div>
      )}

      {state === "loading" ? (
        <AdminTableLoadingState message="Loading staff directory…" />
      ) : state === "error" ? (
        <AdminTableErrorState
          message="We could not load staff users."
          onRetry={() => void load()}
        />
      ) : (
        <AdminTable>
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell>Staff Member</AdminTableHeaderCell>
              <AdminTableHeaderCell>Role &amp; Permissions</AdminTableHeaderCell>
              <AdminTableHeaderCell>Status</AdminTableHeaderCell>
              <AdminTableHeaderCell>Date Joined</AdminTableHeaderCell>
              <AdminTableHeaderCell className="text-right">Actions</AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {users.map((user) => {
              const protectedUser = user.role === "SUPER_ADMIN" || user.id === admin?.id;
              const initials = getAdminInitials(user.fullName);

              return (
                <AdminTableRow key={user.id}>
                  <AdminTableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-lime">
                        {initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.fullName}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </AdminTableCell>

                  <AdminTableCell>
                    {protectedUser ? (
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        <Shield className="size-3.5 text-forest" />
                        {formatAdminRole(user.role)}
                      </div>
                    ) : (
                      <select
                        aria-label={`Role for ${user.fullName}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
                        disabled={busyId === user.id}
                        value={user.role}
                        onChange={(event) =>
                          void changeRole(user, event.target.value as AssignableAdminRole)
                        }
                      >
                        {assignableRoles.map((role) => (
                          <option value={role} key={role}>
                            {formatAdminRole(role)}
                          </option>
                        ))}
                      </select>
                    )}
                  </AdminTableCell>

                  <AdminTableCell>
                    <AdminStatusBadge status={user.isActive ? "ACTIVE" : "DISABLED"} />
                  </AdminTableCell>

                  <AdminTableCell className="text-xs text-slate-500 font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </AdminTableCell>

                  <AdminTableCell className="text-right">
                    <button
                      type="button"
                      disabled={protectedUser || busyId === user.id}
                      onClick={() => void changeStatus(user)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
                    >
                      {user.isActive ? "Disable Access" : "Enable Access"}
                    </button>
                  </AdminTableCell>
                </AdminTableRow>
              );
            })}
          </AdminTableBody>
        </AdminTable>
      )}

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={() => void load()}
      />
    </div>
  );
}
