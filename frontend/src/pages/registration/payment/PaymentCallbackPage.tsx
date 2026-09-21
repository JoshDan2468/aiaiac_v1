import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { verifyDelegatePayment, type PaymentSummary } from "@/services/payment/paymentService";

export function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const [state, setState] = useState<"checking" | "success" | "pending" | "error">("checking");
  const [payment, setPayment] = useState<PaymentSummary | null>(null);

  useEffect(() => {
    if (!reference) {
      setState("error");
      return;
    }
    void verifyDelegatePayment(reference).then((result) => {
      if (!result.ok) {
        setState("error");
        return;
      }
      setPayment(result.payment);
      setState(result.payment.status === "PAID" ? "success" : "pending");
    });
  }, [reference]);

  return (
    <PublicPageLayout
      title="Payment Status | AIAIAC Africa 2027"
      description="Confirm your AIAIAC delegate payment status."
      noindex={true}
    >
      <section className="bg-bone py-20 sm:py-28">
        <div className="shell max-w-3xl">
          <div className="border border-mineral/18 bg-white p-7 sm:p-10" aria-live="polite">
            {state === "checking" ? (
              <Status
                icon={<LoaderCircle className="size-7 animate-spin text-forest" />}
                title="Checking payment…"
              >
                We are confirming the transaction directly with the payment provider.
              </Status>
            ) : state === "success" && payment ? (
              <Status
                icon={<CheckCircle2 className="size-8 text-forest" />}
                title="Payment confirmed"
              >
                {payment.package} payment of {payment.displayAmount} is confirmed. Keep references{" "}
                {payment.registrationReference} and {payment.paymentReference} for your records.
              </Status>
            ) : state === "pending" ? (
              <Status
                icon={<CircleAlert className="size-8 text-amber-600" />}
                title="Payment not confirmed yet"
              >
                The transaction is still pending or was not completed. You may safely return to your
                registration flow and retry after a failed attempt.
              </Status>
            ) : (
              <Status
                icon={<CircleAlert className="size-8 text-destructive" />}
                title="We could not confirm this payment"
              >
                The callback itself is not proof of payment. Check the reference or try verification
                again later.
              </Status>
            )}
            <Link
              className="mt-8 inline-block text-sm font-bold text-forest underline underline-offset-4"
              to="/registration/delegate"
            >
              Return to delegate registration
            </Link>
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
}

function Status({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 shrink-0" aria-hidden="true">
        {icon}
      </div>
      <div>
        <p className="eyebrow text-emerald-deep">Delegate payment</p>
        <h1 className="display-md mt-3 text-mineral">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
