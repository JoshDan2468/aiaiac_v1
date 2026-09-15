import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  "min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-800 outline-none focus:border-forest focus:ring-2 focus:ring-forest/20";

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
        eyebrow="Operations / Finance"
        title="Payments"
        description="Monitor trusted delegate payment attempts and confirmations."
      />
      <form
        className="grid gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs md:grid-cols-4"
        onSubmit={(event) => {
          event.preventDefault();
          void load();
        }}
      >
        <input
          className={inputClass}
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
        <select
          className={inputClass}
          aria-label="Payment status filter"
          value={filters.status ?? ""}
          onChange={(event) =>
            setFilters((current) => {
              const next = { ...current };
              if (event.target.value) next.status = event.target.value as PaymentTransactionStatus;
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
          className="min-h-10 rounded-lg bg-mineral px-4 text-xs font-bold text-white hover:bg-forest"
          type="submit"
        >
          Apply filters
        </button>
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
                    className="font-bold text-forest hover:underline"
                    to={`/admin/payments/${item.paymentReference}`}
                  >
                    {item.paymentReference}
                  </Link>
                </AdminTableCell>
                <AdminTableCell>{item.registrationReference}</AdminTableCell>
                <AdminTableCell>
                  <span className="font-semibold text-slate-900">{item.delegateName}</span>
                  <br />
                  <span className="text-xs text-slate-500">{item.delegateEmail}</span>
                </AdminTableCell>
                <AdminTableCell>{item.packageName}</AdminTableCell>
                <AdminTableCell>
                  {formatAmount(item)}{" "}
                  <span className="text-xs text-slate-500">{item.currency}</span>
                </AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge status={item.status} />
                </AdminTableCell>
                <AdminTableCell>{item.provider}</AdminTableCell>
                <AdminTableCell>{new Date(item.createdAt).toLocaleString()}</AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
      )}
    </div>
  );
}
