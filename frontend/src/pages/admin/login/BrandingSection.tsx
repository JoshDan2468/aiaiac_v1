import { ShieldCheck } from "lucide-react";

export function BrandingSection() {
  return (
    <section className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#05190F] px-6 py-8 text-white sm:px-10 lg:min-h-screen lg:px-14 lg:py-14 select-none">
      <div>
        <img
          src="/brand/aiaiac-logo-light.png"
          alt="AIAIAC 2027"
          className="h-10 w-auto max-w-[12rem] object-contain object-left"
        />
        <div className="mt-12 border-l-2 border-emerald-400 pl-4 sm:pl-6 lg:mt-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Operations Portal
          </span>
          <h1 className="mt-4 max-w-lg font-sans text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Conference Administration Platform
          </h1>
          <p className="mt-3.5 max-w-md text-sm leading-relaxed text-white/70">
            Unified management system for delegates, access control, and conference operations.
          </p>
        </div>
      </div>

      <div className="mt-10 hidden max-w-md border-t border-white/10 pt-6 lg:block">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-white/60">
            Access restricted to verified AIAIAC personnel. Operations are monitored and audited for
            data protection compliance.
          </p>
        </div>
      </div>
    </section>
  );
}
