import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, FilterX, Search, SlidersHorizontal } from "lucide-react";
import {
  getAdminDelegates,
  getDelegatePackages,
  type DelegateListFilters,
  type DelegateListItem,
  type DelegatePackage,
  type PaymentStatus,
  type RegistrationStatus,
} from "@/services/delegate/delegateService";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import {
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableEmptyState,
  AdminTableErrorState,
  AdminTableHeader,
  AdminTableHeaderCell,
  AdminTableLoadingState,
  AdminTableRow,
} from "@/components/admin/AdminTable";

const registrationStatuses: RegistrationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
];
const paymentStatuses: PaymentStatus[] = ["PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"];

const filterInputStyle =
  "min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-800 shadow-xs outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function DelegatesPage() {
  const [filters, setFilters] = useState<DelegateListFilters>({
    page: 1,
    limit: 20,
    sort: "submitted_desc",
  });
  const [pendingFilters, setPendingFilters] = useState<DelegateListFilters>(filters);
  const [items, setItems] = useState<DelegateListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [packages, setPackages] = useState<DelegatePackage[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const load = useCallback(async (nextFilters: DelegateListFilters) => {
    setState("loading");
    const result = await getAdminDelegates(nextFilters);
    if (!result.ok) {
      setState("error");
      return;
    }
    setItems(result.registrations.items);
    setTotal(result.registrations.total);
    setState("ready");
  }, []);

  useEffect(() => {
    void load(filters);
  }, [filters, load]);

  useEffect(() => {
    void getDelegatePackages().then((result) => result.ok && setPackages(result.packages));
  }, []);

  const pageCount = Math.max(1, Math.ceil(total / (filters.limit ?? 20)));
  const rangeLabel = useMemo(() => {
    if (!total) return "No registrations";
    const limit = filters.limit ?? 20;
    const first = (filters.page! - 1) * limit + 1;
    return `${first}–${Math.min(first + limit - 1, total)} of ${total}`;
  }, [filters.limit, filters.page, total]);

  const applyFilters = (event: React.FormEvent) => {
    event.preventDefault();
    setFilters({ ...pendingFilters, page: 1, limit: 20 });
  };

  const resetFilters = () => {
    const next = { page: 1, limit: 20, sort: "submitted_desc" as const };
    setPendingFilters(next);
    setFilters(next);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Operations / Registrations"
        title="Delegate Directory"
        description="Search, filter, and inspect verified conference delegate applications and payment records."
        actions={
          <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs">
            {rangeLabel}
          </div>
        }
      />

      {/* Filter Bar */}
      <form
        className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs lg:p-5"
        onSubmit={applyFilters}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-700">
            <SlidersHorizontal className="size-4 text-forest" />
            Filter Delegates
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-forest transition-colors"
          >
            <FilterX className="size-3.5" />
            Reset
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="relative block">
            <span className="sr-only">Search delegates</span>
            <Search
              className="pointer-events-none absolute left-3 top-3 size-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              className={`${filterInputStyle} pl-9`}
              placeholder="Search reference, name or company…"
              value={pendingFilters.search ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, search: event.target.value })
              }
            />
          </label>

          <label>
            <span className="sr-only">Package</span>
            <select
              aria-label="Package filter"
              className={filterInputStyle}
              value={pendingFilters.packageId ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, packageId: event.target.value || undefined })
              }
            >
              <option value="">All Packages</option>
              {packages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Registration Status</span>
            <select
              aria-label="Registration status filter"
              className={filterInputStyle}
              value={pendingFilters.registrationStatus ?? ""}
              onChange={(event) =>
                setPendingFilters({
                  ...pendingFilters,
                  registrationStatus: (event.target.value || undefined) as
                    RegistrationStatus | undefined,
                })
              }
            >
              <option value="">All Registration Statuses</option>
              {registrationStatuses.map((item) => (
                <option key={item} value={item}>
                  {item.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Payment Status</span>
            <select
              aria-label="Payment status filter"
              className={filterInputStyle}
              value={pendingFilters.paymentStatus ?? ""}
              onChange={(event) =>
                setPendingFilters({
                  ...pendingFilters,
                  paymentStatus: (event.target.value || undefined) as PaymentStatus | undefined,
                })
              }
            >
              <option value="">All Payment Statuses</option>
              {paymentStatuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Country</span>
            <input
              className={filterInputStyle}
              placeholder="Country"
              value={pendingFilters.country ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, country: event.target.value })
              }
            />
          </label>

          <label>
            <span className="sr-only">Submitted From</span>
            <input
              type="date"
              className={filterInputStyle}
              value={pendingFilters.submittedFrom ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, submittedFrom: event.target.value })
              }
            />
          </label>

          <label>
            <span className="sr-only">Submitted To</span>
            <input
              type="date"
              className={filterInputStyle}
              value={pendingFilters.submittedTo ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, submittedTo: event.target.value })
              }
            />
          </label>

          <label>
            <span className="sr-only">Sort Order</span>
            <select
              aria-label="Sort order"
              className={filterInputStyle}
              value={pendingFilters.sort ?? "submitted_desc"}
              onChange={(event) =>
                setPendingFilters({
                  ...pendingFilters,
                  sort: event.target.value as DelegateListFilters["sort"],
                })
              }
            >
              <option value="submitted_desc">Newest First</option>
              <option value="submitted_asc">Oldest First</option>
              <option value="name_asc">Name A–Z</option>
              <option value="name_desc">Name Z–A</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="rounded-lg bg-mineral px-4 py-2 text-xs font-bold text-white hover:bg-forest transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Directory Table */}
      {state === "loading" ? (
        <AdminTableLoadingState message="Loading delegate directory…" />
      ) : state === "error" ? (
        <AdminTableErrorState
          message="We could not load delegate registrations."
          onRetry={() => void load(filters)}
        />
      ) : items.length === 0 ? (
        <AdminTableEmptyState
          title="No delegates found"
          description="No delegate registrations match your filter criteria."
          action={
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-forest hover:bg-slate-50"
            >
              Clear Filters
            </button>
          }
        />
      ) : (
        <AdminTable minWidth="min-w-[62rem]">
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell>Reference</AdminTableHeaderCell>
              <AdminTableHeaderCell>Delegate Name</AdminTableHeaderCell>
              <AdminTableHeaderCell>Company</AdminTableHeaderCell>
              <AdminTableHeaderCell>Package</AdminTableHeaderCell>
              <AdminTableHeaderCell>Country</AdminTableHeaderCell>
              <AdminTableHeaderCell>Registration</AdminTableHeaderCell>
              <AdminTableHeaderCell>Payment</AdminTableHeaderCell>
              <AdminTableHeaderCell>Submitted</AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {items.map((item) => (
              <AdminTableRow key={item.id}>
                <AdminTableCell>
                  <Link
                    className="font-bold text-forest hover:underline decoration-forest/40"
                    to={`/admin/delegates/${item.id}`}
                  >
                    {item.reference}
                  </Link>
                </AdminTableCell>
                <AdminTableCell className="font-semibold text-slate-900">
                  {item.firstName} {item.lastName}
                </AdminTableCell>
                <AdminTableCell className="text-xs text-slate-600">
                  {item.companyName}
                </AdminTableCell>
                <AdminTableCell className="text-xs text-slate-600">
                  {item.packageName}
                </AdminTableCell>
                <AdminTableCell className="text-xs text-slate-600">{item.country}</AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge status={item.registrationStatus} />
                </AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge status={item.paymentStatus} />
                </AdminTableCell>
                <AdminTableCell className="whitespace-nowrap text-xs text-slate-500 font-medium">
                  {formatDate(item.submittedAt)}
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
      )}

      {/* Pagination Footer */}
      {state === "ready" && total > (filters.limit ?? 20) && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-xs">
          <p className="text-xs font-medium text-slate-500">{rangeLabel}</p>
          <div className="flex items-center gap-2">
            <button
              disabled={filters.page === 1}
              type="button"
              className="flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>
            <button
              disabled={filters.page === pageCount}
              type="button"
              className="flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
