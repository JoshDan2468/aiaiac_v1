import { ShieldCheck } from "lucide-react";

export function BrandingSection() {
  return (
    <section className="on-navy relative flex min-h-56 flex-col justify-between overflow-hidden bg-mineral px-6 py-7 text-white sm:px-10 lg:min-h-screen lg:px-12 lg:py-12 xl:px-16">
      <div>
        <img
          src="/brand/aiaiac_logo.png"
          alt="AIAIAC"
          className="h-40 w-40 max-w-48 object-contain object-left lg:h-25"
        />
        <div className="mt-8 border-l-2 border-lime pl-4 lg:mt-20">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-lime">
            Secure operations access
          </p>
          <h1 className="mt-4 max-w-lg font-display text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-5xl">
            Conference administration, clearly controlled.
          </h1>
        </div>
      </div>
      <div className="mt-10 hidden max-w-md border-t border-white/10 pt-6 lg:block">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden="true" />
          <p className="text-sm leading-6 text-white/65">
            Access is limited to authorised AIAIAC administrators. Your session is managed by the
            secure conference service.
          </p>
        </div>
      </div>
    </section>
  );
}
