import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactDetails, enquiryTypes } from "@/data/contact";
import { getWhatsAppEnquiryUrl } from "@/data/eventContactConfig";
import {
  contactFormSchema,
  type ContactFormInput,
  type ContactFormValues,
} from "./contactFormSchema";

type PreparationStatus = "idle" | "preparing" | "prepared" | "failure";

const fieldClassName =
  "min-h-12 w-full rounded-lg border border-[#214A36]/25 bg-[#F7F5EF] px-4 py-3 text-base text-[#102C20] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#58675F]/60 hover:border-[#214A36]/50 focus:border-[#214A36] focus:bg-white focus:ring-2 focus:ring-[#214A36]/20 aria-[invalid=true]:border-red-600";

const labelClassName = "mb-2 block text-xs font-bold uppercase tracking-wider text-[#102C20]";

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
      {message}
    </p>
  );
}

function buildMailto(values: ContactFormValues) {
  const subject = `[${values.enquiryType}] ${values.subject}`;
  const body = [
    `Full Name: ${values.fullName}`,
    `Work Email: ${values.workEmail}`,
    `Phone Number: ${values.phoneNumber || "Not provided"}`,
    `Organisation: ${values.organisation || "Not provided"}`,
    `Enquiry Type: ${values.enquiryType}`,
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
    formState: { errors, isSubmitting },
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

  const prepareEnquiry = async (values: ContactFormValues) => {
    setStatus("preparing");
    setPreparedMailto("");

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 150));
      const mailto = buildMailto(values);
      setPreparedMailto(mailto);
      setStatus("prepared");
      window.location.href = mailto;
    } catch {
      setStatus("failure");
    }
  };

  return (
    <section id="contact-form" className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <AnimatedSection className="lg:col-span-4">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl">
              Send an Enquiry
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#B6C2BA]">
              Submit your enquiry below to connect with the appropriate committee coordinator. We
              respond promptly to all delegate, technical, and commercial requests.
            </p>

            <div className="mt-8 rounded-xl border border-[#214A36]/40 bg-[#0D2C20] p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#CFEA3B]">
                Immediate Assistance
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B6C2BA]">
                Need immediate answers regarding registration, stand bookings, or sponsorship?
              </p>
              <a
                href={getWhatsAppEnquiryUrl("GENERAL")}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-[#25D366] px-4 text-xs font-bold uppercase tracking-wider text-[#071C13] transition-transform hover:scale-[1.02]"
              >
                Chat with WhatsApp Support
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="lg:col-span-8">
            <div className="rounded-xl border border-[#214A36]/20 bg-white p-7 text-[#102C20] shadow-xl sm:p-10">
              <form
                noValidate
                onSubmit={handleSubmit(prepareEnquiry)}
                aria-label="Contact AIAIAC Africa"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-full-name" className={labelClassName}>
                      Full Name *
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.fullName)}
                      className={fieldClassName}
                      {...register("fullName")}
                    />
                    <FieldError id="contact-full-name-error" message={errors.fullName?.message} />
                  </div>

                  <div>
                    <label htmlFor="contact-work-email" className={labelClassName}>
                      Work Email *
                    </label>
                    <input
                      id="contact-work-email"
                      type="email"
                      autoComplete="email"
                      className={fieldClassName}
                      {...register("workEmail")}
                    />
                    <FieldError id="contact-work-email-error" message={errors.workEmail?.message} />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className={labelClassName}>
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldClassName}
                      {...register("phoneNumber")}
                    />
                    <FieldError id="contact-phone-error" message={errors.phoneNumber?.message} />
                  </div>

                  <div>
                    <label htmlFor="contact-organisation" className={labelClassName}>
                      Organisation (Optional)
                    </label>
                    <input
                      id="contact-organisation"
                      type="text"
                      autoComplete="organization"
                      className={fieldClassName}
                      {...register("organisation")}
                    />
                    <FieldError
                      id="contact-organisation-error"
                      message={errors.organisation?.message}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-enquiry-type" className={labelClassName}>
                      Enquiry Type *
                    </label>
                    <select
                      id="contact-enquiry-type"
                      className={fieldClassName}
                      {...register("enquiryType")}
                    >
                      <option value="">Select enquiry type</option>
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

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-subject" className={labelClassName}>
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      className={fieldClassName}
                      {...register("subject")}
                    />
                    <FieldError id="contact-subject-error" message={errors.subject?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className={labelClassName}>
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      className={fieldClassName + " resize-y"}
                      {...register("message")}
                    />
                    <FieldError id="contact-message-error" message={errors.message?.message} />
                  </div>
                </div>

                <div className="mt-8 border-t border-[#214A36]/15 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <ActionButton type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {status === "preparing" ? "Preparing Email…" : "Send Enquiry"}
                  </ActionButton>
                  <p className="text-xs text-[#58675F]">
                    Submitting opens your configured email client to review and dispatch.
                  </p>
                </div>

                {status === "prepared" && preparedMailto && (
                  <div
                    role="status"
                    className="mt-6 rounded-lg bg-[#E5EBE5] p-4 text-xs text-[#102C20]"
                  >
                    <p className="font-semibold">
                      Your enquiry email has been generated. If your email app did not open
                      automatically,{" "}
                      <a href={preparedMailto} className="underline font-bold text-[#2D5443]">
                        click here to open your email client
                      </a>
                      .
                    </p>
                  </div>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
