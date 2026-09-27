import { Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import type { FormEventHandler } from "react";

interface LoginFormSectionProps {
  email: string;
  password: string;
  showPassword: boolean;
  error: string;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function LoginFormSection({
  email,
  password,
  showPassword,
  error,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginFormSectionProps) {
  return (
    <section className="flex items-center justify-center bg-slate-50 px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-[#05190F] shadow-xs">
            <LockKeyhole className="size-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Authorized Personnel
            </p>
            <p className="font-sans text-xs font-bold text-slate-900">Sign In Required</p>
          </div>
        </div>

        <h2 className="mt-5 font-sans text-2xl font-bold tracking-tight text-slate-900">
          Admin Gateway
        </h2>
        <p className="mt-1 text-xs text-slate-500 leading-normal">
          Sign in using your assigned administrative credentials.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Address
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              disabled={isSubmitting}
              aria-invalid={Boolean(error)}
              className="mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F] disabled:cursor-wait disabled:opacity-60"
              placeholder="admin@aiaiac.org"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                className="h-10 w-full rounded-md border border-slate-200 bg-white py-2 pl-3 pr-10 text-xs font-medium text-slate-900 outline-none transition-colors focus:border-[#05190F] focus:ring-1 focus:ring-[#05190F] disabled:cursor-wait disabled:opacity-60"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                disabled={isSubmitting}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-slate-400 hover:text-slate-600 disabled:opacity-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#05190F] px-4 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#05190F]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05190F] disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Verifying Credentials…
              </>
            ) : (
              "Sign In to Workspace"
            )}
          </button>
        </form>

        <p className="mt-5 border-t border-slate-100 pt-3 text-center text-[11px] leading-normal text-slate-400">
          Password recovery is restricted. Contact a Super Admin for account support.
        </p>
      </div>
    </section>
  );
}
