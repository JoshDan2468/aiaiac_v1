import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CircleAlert, LoaderCircle, Search, SlidersHorizontal } from "lucide-react";
import { ActionButton } from "@/components/common/ActionButton";
import {
  getAdminDelegates,
  getDelegatePackages,
  type DelegateListFilters,
  type DelegateListItem,
  type DelegatePackage,
  type PaymentStatus,
  type RegistrationStatus,
} from "@/services/delegate/delegateService";

const registrationStatuses: RegistrationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
];
const paymentStatuses: PaymentStatus[] = ["PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"];
const filterClassName =
  "min-h-10 w-full border border-mineral/20 bg-white px-3 text-sm text-mineral outline-none focus:border-forest focus:ring-2 focus:ring-forest/20";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function StatusBadge({
  value,
  type,
}: {
  value: RegistrationStatus | PaymentStatus;
  type: "registration" | "payment";
}) {
  const style =
    value === "APPROVED" || value === "PAID"
      ? "border-forest/30 bg-forest/10 text-forest"
      : value === "REJECTED" || value === "FAILED" || value === "CANCELLED"
        ? "border-destructive/30 bg-destructive/5 text-destructive"
        : "border-mineral/18 bg-bone text-mineral/70";
  return (
    <span
      className={`inline-flex border px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] ${style}`}
    >
      {type === "registration" ? value.replace("_", " ") : value}
    </span>
  );
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
    <section aria-labelledby="delegate-directory-title">
      <div className="flex flex-col gap-5 border-b border-mineral/18 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow text-emerald-deep">Operations / registrations</p>
          <h1 id="delegate-directory-title" className="display-md mt-4 text-mineral">
            Delegate directory
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A privacy-conscious operational view. Open a record for the full protected application
            details.
          </p>
        </div>
        <p className="border-l-2 border-lime pl-3 text-sm font-semibold text-mineral">
          {rangeLabel}
        </p>
      </div>
      <form className="mt-7 border border-mineral/18 bg-white p-4 lg:p-5" onSubmit={applyFilters}>
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-mineral">
          <SlidersHorizontal className="size-4 text-forest" aria-hidden="true" /> Filters
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="relative block">
            <span className="sr-only">Search delegates</span>
            <Search
              className="pointer-events-none absolute left-3 top-3 size-4 text-mineral/50"
              aria-hidden="true"
            />
            <input
              className={`${filterClassName} pl-9`}
              placeholder="Reference, person or company"
              value={pendingFilters.search ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, search: event.target.value })
              }
            />
          </label>
          <SelectFilter
            label="Package"
            value={pendingFilters.packageId ?? ""}
            onChange={(value) =>
              setPendingFilters({ ...pendingFilters, packageId: value || undefined })
            }
          >
            <option value="">All packages</option>
            {packages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectFilter>
          <SelectFilter
            label="Registration status"
            value={pendingFilters.registrationStatus ?? ""}
            onChange={(value) =>
              setPendingFilters({
                ...pendingFilters,
                registrationStatus: (value || undefined) as RegistrationStatus | undefined,
              })
            }
          >
            <option value="">All registration statuses</option>
            {registrationStatuses.map((item) => (
              <option key={item} value={item}>
                {item.replace("_", " ")}
              </option>
            ))}
          </SelectFilter>
          <SelectFilter
            label="Payment status"
            value={pendingFilters.paymentStatus ?? ""}
            onChange={(value) =>
              setPendingFilters({
                ...pendingFilters,
                paymentStatus: (value || undefined) as PaymentStatus | undefined,
              })
            }
          >
            <option value="">All payment statuses</option>
            {paymentStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectFilter>
          <label>
            <span className="sr-only">Country</span>
            <input
              className={filterClassName}
              placeholder="Country"
              value={pendingFilters.country ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, country: event.target.value })
              }
            />
          </label>
          <label className="text-xs font-semibold text-mineral/60">
            Submitted from
            <input
              type="date"
              className={`${filterClassName} mt-1`}
              value={pendingFilters.submittedFrom ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, submittedFrom: event.target.value })
              }
            />
          </label>
          <label className="text-xs font-semibold text-mineral/60">
            Submitted to
            <input
              type="date"
              className={`${filterClassName} mt-1`}
              value={pendingFilters.submittedTo ?? ""}
              onChange={(event) =>
                setPendingFilters({ ...pendingFilters, submittedTo: event.target.value })
              }
            />
          </label>
          <SelectFilter
            label="Sort"
            value={pendingFilters.sort ?? "submitted_desc"}
            onChange={(value) =>
              setPendingFilters({ ...pendingFilters, sort: value as DelegateListFilters["sort"] })
            }
          >
            <option value="submitted_desc">Newest submitted</option>
            <option value="submitted_asc">Oldest submitted</option>
            <option value="name_asc">Name A–Z</option>
            <option value="name_desc">Name Z–A</option>
          </SelectFilter>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <ActionButton type="submit" variant="solidNavy">
            Apply filters
          </ActionButton>
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-11 px-3 text-sm font-bold text-forest underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      </form>
      <div className="mt-6 overflow-x-auto border border-mineral/18 bg-white">
        {state === "loading" ? (
          <div className="flex min-h-64 items-center justify-center gap-3" role="status">
            <LoaderCircle className="size-5 animate-spin text-forest" /> Loading delegate
            registrations…
          </div>
        ) : state === "error" ? (
          <div
            className="flex min-h-64 flex-col items-center justify-center px-5 text-center"
            role="alert"
          >
            <CircleAlert className="size-7 text-destructive" />
            <p className="mt-4 font-bold">We could not load delegate registrations.</p>
            <button
              type="button"
              className="mt-3 text-sm font-bold text-forest underline"
              onClick={() => void load(filters)}
            >
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <p className="text-lg font-bold text-mineral">
              No delegate registrations match these filters.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try removing a filter or return when new applications arrive.
            </p>
          </div>
        ) : (
          <table className="min-w-[62rem] w-full text-left">
            <thead className="border-b border-mineral/18 bg-bone text-[0.65rem] uppercase tracking-[0.1em] text-mineral/60">
              <tr>
                {[
                  "Reference",
                  "Person",
                  "Company",
                  "Package",
                  "Country",
                  "Registration",
                  "Payment",
                  "Submitted",
                ].map((label) => (
                  <th key={label} className="px-4 py-3 font-bold">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-mineral/10 last:border-b-0 hover:bg-bone/50"
                >
                  <td className="px-4 py-4">
                    <Link
                      className="font-bold text-forest underline decoration-forest/35 underline-offset-4"
                      to={`/admin/delegates/${item.id}`}
                    >
                      {item.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-mineral">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-4 py-4 text-sm text-mineral/75">{item.companyName}</td>
                  <td className="px-4 py-4 text-sm text-mineral/75">{item.packageName}</td>
                  <td className="px-4 py-4 text-sm text-mineral/75">{item.country}</td>
                  <td className="px-4 py-4">
                    <StatusBadge value={item.registrationStatus} type="registration" />
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge value={item.paymentStatus} type="payment" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs text-mineral/65">
                    {formatDate(item.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {state === "ready" && total > (filters.limit ?? 20) && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{rangeLabel}</p>
          <div className="flex gap-2">
            <button
              disabled={filters.page === 1}
              type="button"
              className="min-h-10 border border-mineral/20 px-3 text-sm font-bold disabled:opacity-40"
              onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
            >
              Previous
            </button>
            <button
              disabled={filters.page === pageCount}
              type="button"
              className="min-h-10 border border-mineral/20 px-3 text-sm font-bold disabled:opacity-40"
              onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className={filterClassName}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
