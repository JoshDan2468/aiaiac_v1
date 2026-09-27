import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { verifyDelegatePayment, type PaymentSummary } from "@/services/payment/paymentService";

export function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const [state, setState] = useState<"checking" | "success" | "pending" | "failed" | "error">(
    "checking",
  );
  const [payment, setPayment] = useState<PaymentSummary | null>(null);
  const [verificationAttempt, setVerificationAttempt] = useState(0);

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
      setState(
        result.payment.status === "PAID"
          ? "success"
          : result.payment.status === "PENDING" || result.payment.status === "INITIALIZED"
            ? "pending"
            : "failed",
      );
    });
  }, [reference, verificationAttempt]);

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
                Your payment has been verified. Your confirmation and QR Event Pass will be sent
                separately by email. If they do not arrive, contact the organiser with your
                registration reference.
              </Status>
            ) : state === "pending" ? (
              <Status
                icon={<CircleAlert className="size-8 text-amber-600" />}
                title="Payment not confirmed yet"
              >
                We are still waiting for confirmation. Please check again shortly. Do not make
                another payment while this transaction is pending.
              </Status>
            ) : state === "failed" ? (
              <Status
                icon={<CircleAlert className="size-8 text-amber-600" />}
                title="Payment not completed"
              >
                This payment attempt did not complete. Contact the organiser with your reference if
                you need help continuing your registration.
              </Status>
            ) : (
              <Status
                icon={<CircleAlert className="size-8 text-destructive" />}
                title="We could not confirm this payment"
              >
                {reference
                  ? "We could not verify your payment right now. Please check again shortly. If the problem continues, contact the organiser with your payment reference."
                  : "This page needs a payment reference to check your transaction. Contact the organiser if you need help finding it."}
              </Status>
            )}
            {payment && state !== "checking" && state !== "error" && (
              <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-mineral/15 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-mineral/60">
                    Registration reference
                  </dt>
                  <dd className="mt-1 break-all text-sm font-semibold text-mineral">
                    {payment.registrationReference}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-mineral/60">
                    Payment reference
                  </dt>
                  <dd className="mt-1 break-all text-sm font-semibold text-mineral">
                    {payment.paymentReference}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-mineral/60">
                    Delegate category
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-mineral">{payment.package}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-mineral/60">
                    Amount ({payment.currency})
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-mineral">
                    {payment.displayAmount}
                  </dd>
                </div>
              </dl>
            )}
            {(state === "pending" || state === "error") && reference && (
              <button
                className="mt-6 inline-block text-sm font-bold text-forest underline underline-offset-4"
                type="button"
                onClick={() => {
                  setState("checking");
                  setVerificationAttempt((attempt) => attempt + 1);
                }}
              >
                Check payment again
              </button>
            )}
            <div className="mt-8">
              <Link
                className="inline-block text-sm font-bold text-forest underline underline-offset-4"
                to="/contact"
              >
                Contact the organiser
              </Link>
            </div>
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
