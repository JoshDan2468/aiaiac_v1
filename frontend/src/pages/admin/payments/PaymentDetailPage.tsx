import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { AdminTableErrorState, AdminTableLoadingState } from "@/components/admin/AdminTable";
import {
  getAdminPayment,
  retryAdminPaymentCompletion,
  type AdminPaymentDetail,
} from "@/services/payment/paymentService";

export function PaymentDetailPage() {
  const { reference } = useParams();
  const [payment, setPayment] = useState<AdminPaymentDetail | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [completionState, setCompletionState] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );

  useEffect(() => {
    if (!reference) {
      setState("error");
      return;
    }
    void getAdminPayment(reference).then((result) => {
      if (!result.ok) setState("error");
      else {
        setPayment(result.payment);
        setState("ready");
      }
    });
  }, [reference]);

  if (state === "loading") return <AdminTableLoadingState message="Loading payment…" />;
  if (state === "error" || !payment)
    return <AdminTableErrorState message="We could not load this payment." />;

  const rows = [
    ["Registration", payment.registrationReference],
    ["Delegate", `${payment.delegateName} — ${payment.delegateEmail}`],
    ["Package", payment.packageName],
    [
      "Amount",
      `${payment.currency} ${(payment.amountMinor / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    ],
    ["Provider", payment.provider],
    ["Provider transaction", payment.providerTransactionId || "Not available"],
    ["Channel", payment.channel || "Not available"],
    ["Gateway response", payment.gatewayResponse || "Not available"],
    ["Confirmation email", payment.confirmationEmailStatus],
  ];
  const retryCompletion = async () => {
    setCompletionState("working");
    const result = await retryAdminPaymentCompletion(payment.paymentReference);
    if (!result.ok) {
      setCompletionState("error");
      return;
    }
    const refreshed = await getAdminPayment(payment.paymentReference);
    if (refreshed.ok) setPayment(refreshed.payment);
    setCompletionState("done");
  };
  return (
    <div className="space-y-6">
      <Link className="text-xs font-bold text-forest hover:underline" to="/admin/payments">
        ← Payments
      </Link>
      <AdminPageHeader
        eyebrow="Finance / Payment record"
        title={payment.paymentReference}
        actions={
          <div className="flex items-center gap-3">
            {payment.status === "PAID" ? (
              <button
                className="rounded-lg border border-forest/20 bg-white px-3 py-2 text-xs font-bold text-forest hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
                disabled={completionState === "working"}
                type="button"
                onClick={() => void retryCompletion()}
              >
                {completionState === "working" ? "Processing…" : "Retry pass delivery"}
              </button>
            ) : null}
            <AdminStatusBadge status={payment.status} />
          </div>
        }
      />
      {completionState === "done" ? (
        <p className="text-xs font-semibold text-forest" role="status">
          Completion workflow processed. Delivery status has been refreshed.
        </p>
      ) : null}
      {completionState === "error" ? (
        <p className="text-xs font-semibold text-red-700" role="alert">
          The completion workflow could not be processed. Try again later.
        </p>
      ) : null}
      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <h2 className="font-display font-bold text-slate-900">Transaction details</h2>
          <dl className="mt-3 divide-y divide-slate-100">
            {rows.map(([label, value]) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]" key={label}>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {label}
                </dt>
                <dd className="text-xs font-semibold text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <h2 className="font-display font-bold text-slate-900">Payment events</h2>
          <ol className="mt-4 space-y-3">
            {payment.events.map((event) => (
              <li
                className="border-l-2 border-forest pl-4"
                key={`${event.eventType}-${event.createdAt}`}
              >
                <p className="text-xs font-bold text-slate-900">
                  {event.eventType.replaceAll("_", " ")}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
