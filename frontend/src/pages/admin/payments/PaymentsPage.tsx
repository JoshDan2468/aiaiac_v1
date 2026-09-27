import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
import {
  getAdminPayments,
  type AdminPayment,
  type PaymentCurrency,
  type PaymentTransactionStatus,
} from "@/services/payment/paymentService";

const inputClass =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-normal text-slate-800 shadow-2xs outline-none transition-colors placeholder:text-slate-400 focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F]";

function formatAmount(item: AdminPayment) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: item.currency }).format(
    item.amountMinor / 100,
  );
}

export function PaymentsPage() {
  const [filters, setFilters] = useState<{
    search?: string;
    status?: PaymentTransactionStatus;
    currency?: PaymentCurrency;
  }>({});
  const [items, setItems] = useState<AdminPayment[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const load = useCallback(async () => {
    setState("loading");
    const result = await getAdminPayments(filters);
    if (!result.ok) {
      setState("error");
      return;
    }
    setItems(result.payments.items);
    setState("ready");
  }, [filters]);

  useEffect(() => void load(), [load]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Finance / Payments"
        title="Payments"
        description="Monitor trusted delegate payment attempts and confirmations."
      />
      <form
        className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs"
        onSubmit={(event) => {
          event.preventDefault();
          void load();
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-2.5 size-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              className={`${inputClass} pl-9`}
              aria-label="Search payments"
              placeholder="Reference, name or email"
              value={filters.search ?? ""}
              onChange={(event) =>
                setFilters((current) => {
                  const next = { ...current };
                  if (event.target.value) next.search = event.target.value;
                  else delete next.search;
                  return next;
                })
              }
            />
          </div>
          <select
            className={inputClass}
            aria-label="Payment status filter"
            value={filters.status ?? ""}
            onChange={(event) =>
              setFilters((current) => {
                const next = { ...current };
                if (event.target.value)
                  next.status = event.target.value as PaymentTransactionStatus;
                else delete next.status;
                return next;
              })
            }
          >
            <option value="">All statuses</option>
            {["INITIALIZED", "PENDING", "PAID", "FAILED", "ABANDONED", "REVERSED"].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <select
            className={inputClass}
            aria-label="Currency filter"
            value={filters.currency ?? ""}
            onChange={(event) =>
              setFilters((current) => {
                const next = { ...current };
                if (event.target.value) next.currency = event.target.value as PaymentCurrency;
                else delete next.currency;
                return next;
              })
            }
          >
            <option value="">All currencies</option>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
          </select>
          <button
            className="h-9 rounded-md bg-[#05190F] px-4 text-xs font-semibold text-white hover:bg-[#05190F]/90 transition-colors"
            type="submit"
          >
            Apply filters
          </button>
        </div>
      </form>

      {state === "loading" ? (
        <AdminTableLoadingState message="Loading payments…" />
      ) : state === "error" ? (
        <AdminTableErrorState message="We could not load payments." onRetry={load} />
      ) : items.length === 0 ? (
        <AdminTableEmptyState
          title="No payments found"
          description="No payment attempts match these filters."
        />
      ) : (
        <AdminTable minWidth="min-w-[62rem]">
          <AdminTableHeader>
            <tr>
              {[
                "Payment reference",
                "Registration",
                "Delegate",
                "Package",
                "Amount",
                "Status",
                "Provider",
                "Date",
              ].map((label) => (
                <AdminTableHeaderCell key={label}>{label}</AdminTableHeaderCell>
              ))}
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {items.map((item) => (
              <AdminTableRow key={item.id}>
                <AdminTableCell>
                  <Link
                    className="font-semibold text-[#05190F] hover:underline"
                    to={`/admin/payments/${item.paymentReference}`}
                  >
                    {item.paymentReference}
                  </Link>
                </AdminTableCell>
                <AdminTableCell className="font-mono text-xs text-slate-600">
                  {item.registrationReference}
                </AdminTableCell>
                <AdminTableCell>
                  <span className="font-semibold text-slate-900">{item.delegateName}</span>
                  <br />
                  <span className="text-xs text-slate-500">{item.delegateEmail}</span>
                </AdminTableCell>
                <AdminTableCell className="text-xs text-slate-600">
                  {item.packageName}
                </AdminTableCell>
                <AdminTableCell className="font-semibold text-slate-900">
                  {formatAmount(item)}{" "}
                  <span className="text-[11px] font-normal text-slate-500">{item.currency}</span>
                </AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge status={item.status} />
                </AdminTableCell>
                <AdminTableCell className="text-xs text-slate-600">{item.provider}</AdminTableCell>
                <AdminTableCell className="whitespace-nowrap text-xs text-slate-500 font-medium">
                  {new Date(item.createdAt).toLocaleString("en-GB", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
      )}
    </div>
  );
}
