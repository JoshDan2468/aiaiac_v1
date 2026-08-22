import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactDetails, enquiryTypes } from "@/data/contact";
import {
  contactFormSchema,
  type ContactFormInput,
  type ContactFormValues,
} from "./contactFormSchema";

type PreparationStatus = "idle" | "preparing" | "prepared" | "failure";

const fieldClassName =
  "min-h-12 w-full border border-mineral/25 bg-transparent px-4 py-3 text-base text-mineral outline-none transition-[border-color,box-shadow,background-color] placeholder:text-mineral/42 hover:border-mineral/50 focus:border-forest focus:bg-white/45 focus:ring-2 focus:ring-forest/20 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/15";

const labelClassName = "mb-2 block text-sm font-semibold text-mineral";

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-semibold text-destructive">
      Error — {message}
    </p>
  );
}

function buildMailto(values: ContactFormValues) {
  const subject = `[${values.enquiryType}] ${values.subject}`;
  const body = [
    `Full name: ${values.fullName}`,
    `Work email: ${values.workEmail}`,
    `Phone number: ${values.phoneNumber || "Not provided"}`,
    `Organisation: ${values.organisation || "Not provided"}`,
    `Enquiry type: ${values.enquiryType}`,
    "",
    values.message,
  ].join("\n");

  return `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactFormSection() {
  const [status, setStatus] = useState<PreparationStatus>("idle");
  const [preparedMailto, setPreparedMailto] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      phoneNumber: "",
      organisation: "",
      subject: "",
      message: "",
    },
  });

  const inputStateClass = (field: keyof ContactFormValues) =>
    touchedFields[field] && !errors[field] ? " border-forest/70 bg-white/30" : "";

  const prepareEnquiry = async (values: ContactFormValues) => {
    setStatus("preparing");
    setPreparedMailto("");

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 120));
      setPreparedMailto(buildMailto(values));
      setStatus("prepared");
    } catch {
      setStatus("failure");
    }
  };

  const handleInvalid = () => {
    setPreparedMailto("");
    setStatus("idle");
  };

  return (
    <section id="contact-form" className="on-navy relative overflow-hidden py-20 lg:py-28">
      <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />
      <div className="shell relative grid gap-12 xl:grid-cols-12 xl:gap-8">
        <AnimatedSection className="xl:col-span-4 xl:pr-8">
          <p className="eyebrow text-emerald">Enquiry workspace</p>
          <h2 className="display-md mt-6 max-w-lg text-white">Prepare a useful first message.</h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65">
            Choose the route that best matches your question. We will organise the details into an
            email for you to review and send from your own email app.
          </p>

          <ol className="mt-10 border-t border-white/15">
            {enquiryTypes.map((type) => (
              <li
                key={type.label}
                className="grid grid-cols-[2.75rem_1fr] items-center border-b border-white/15 py-4"
              >
                <span className="numeral text-xs text-emerald">{type.index}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/78">
                  {type.label}
                </span>
              </li>
            ))}
          </ol>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="xl:col-span-8">
          <div className="image-cut bg-bone px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
            <div className="mb-10 flex flex-col gap-4 border-b border-mineral/20 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-emerald-deep">Message details</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Fields marked <span aria-hidden="true">*</span>
                  <span className="sr-only">with an asterisk</span> are required.
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mineral/55">
                Prepared locally
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(prepareEnquiry, handleInvalid)}
              aria-label="Contact AIAIAC West Africa"
            >
              <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-full-name" className={labelClassName}>
                    Full Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-full-name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "contact-full-name-error" : undefined}
                    className={fieldClassName + inputStateClass("fullName")}
                    {...register("fullName")}
                  />
                  <FieldError id="contact-full-name-error" message={errors.fullName?.message} />
                </div>

                <div>
                  <label htmlFor="contact-work-email" className={labelClassName}>
                    Work Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-work-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={Boolean(errors.workEmail)}
                    aria-describedby={errors.workEmail ? "contact-work-email-error" : undefined}
                    className={fieldClassName + inputStateClass("workEmail")}
                    {...register("workEmail")}
                  />
                  <FieldError id="contact-work-email-error" message={errors.workEmail?.message} />
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelClassName}>
                    Phone Number <span className="font-normal text-mineral/55">— optional</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={errors.phoneNumber ? "contact-phone-error" : undefined}
                    className={fieldClassName + inputStateClass("phoneNumber")}
                    {...register("phoneNumber")}
                  />
                  <FieldError id="contact-phone-error" message={errors.phoneNumber?.message} />
                </div>

                <div>
                  <label htmlFor="contact-organisation" className={labelClassName}>
                    Organisation <span className="font-normal text-mineral/55">— optional</span>
                  </label>
                  <input
                    id="contact-organisation"
                    type="text"
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.organisation)}
                    aria-describedby={
                      errors.organisation ? "contact-organisation-error" : undefined
                    }
                    className={fieldClassName + inputStateClass("organisation")}
                    {...register("organisation")}
                  />
                  <FieldError
                    id="contact-organisation-error"
                    message={errors.organisation?.message}
                  />
                </div>

                <div>
                  <label htmlFor="contact-enquiry-type" className={labelClassName}>
                    Enquiry Type <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-enquiry-type"
                    aria-invalid={Boolean(errors.enquiryType)}
                    aria-describedby={errors.enquiryType ? "contact-enquiry-type-error" : undefined}
                    className={fieldClassName + inputStateClass("enquiryType")}
                    {...register("enquiryType")}
                  >
                    <option value="">Select an enquiry type</option>
                    {enquiryTypes.map((type) => (
                      <option key={type.label} value={type.label}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <FieldError
                    id="contact-enquiry-type-error"
                    message={errors.enquiryType?.message}
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className={labelClassName}>
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    autoComplete="off"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    className={fieldClassName + inputStateClass("subject")}
                    {...register("subject")}
                  />
                  <FieldError id="contact-subject-error" message={errors.subject?.message} />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className={labelClassName}>
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={7}
                    maxLength={1500}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : "message-hint"}
                    className={fieldClassName + " resize-y" + inputStateClass("message")}
                    {...register("message")}
                  />
                  <div className="mt-2 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p id="message-hint" className="text-xs text-muted-foreground">
                        20–1500 characters
                      </p>
                      <FieldError id="contact-message-error" message={errors.message?.message} />
                    </div>
                    <span className="text-xs text-muted-foreground">No attachment upload</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-mineral/20 pt-7">
                <ActionButton
                  type="submit"
                  variant="solidNavy"
                  size="lg"
                  disabled={isSubmitting}
                  aria-describedby="contact-preparation-note"
                  className="w-full sm:w-auto"
                >
                  {status === "preparing" ? "Preparing enquiry…" : "Prepare enquiry email"}
                </ActionButton>
                <p
                  id="contact-preparation-note"
                  className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground"
                >
                  This prepares an email in your own email app. You review and send it yourself.
                </p>
              </div>

              {status === "preparing" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-7 border-l-4 border-forest px-4"
                >
                  <p className="font-semibold text-mineral">Preparing your email hand-off…</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your details remain in this browser.
                  </p>
                </div>
              )}

              {status === "prepared" && preparedMailto && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-7 border-l-4 border-forest px-4"
                >
                  <p className="font-semibold text-mineral">
                    Your enquiry is ready. Open your email app to review and send it.
                  </p>
                  <p className="mt-2 text-sm font-semibold text-mineral">
                    This website has not sent or stored your details.
                  </p>
                  <a
                    href={preparedMailto}
                    className="mt-5 inline-flex min-h-12 items-center bg-forest px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-mineral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                  >
                    Open prepared email
                  </a>
                </div>
              )}

              {status === "failure" && (
                <div
                  role="status"
                  aria-live="assertive"
                  className="mt-7 border-l-4 border-destructive px-4"
                >
                  <p className="font-semibold text-mineral">We could not prepare the email.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your details were not sent or stored. Email us directly at{" "}
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="font-semibold text-mineral underline decoration-forest underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                    >
                      {contactDetails.email}
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
