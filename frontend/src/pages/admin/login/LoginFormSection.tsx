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
    <section className="flex items-center px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center gap-3 text-forest">
          <span className="flex size-10 items-center justify-center border border-border bg-white">
            <LockKeyhole className="size-5" aria-hidden="true" />
          </span>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
            Administrator portal
          </p>
        </div>
        <h2 className="mt-7 font-display text-3xl font-bold leading-tight text-mineral sm:text-4xl">
          Administrator Login
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Use the administrator credentials issued for conference operations. For access help,
          contact your AIAIAC system administrator.
        </p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
          <div>
            <label
              htmlFor="admin-email"
              className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-mineral"
            >
              Email address
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
              className="mt-2 min-h-12 w-full border border-input bg-white px-4 text-sm text-mineral outline-none transition-colors placeholder:text-muted-foreground focus:border-forest focus:ring-2 focus:ring-forest/15 disabled:cursor-wait disabled:opacity-60"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-mineral"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                className="min-h-12 w-full border border-input bg-white py-3 pl-4 pr-14 text-sm text-mineral outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/15 disabled:cursor-wait disabled:opacity-60"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                disabled={isSubmitting}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground transition-colors hover:text-mineral focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-forest disabled:opacity-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="size-5" aria-hidden="true" />
                ) : (
                  <Eye className="size-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="min-h-6" aria-live="assertive">
            {error ? (
              <p
                role="alert"
                className="border-l-2 border-destructive pl-3 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-h-12 w-full items-center justify-center gap-2 bg-forest px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-mineral focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in securely"
            )}
          </button>
        </form>

        <p className="mt-7 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
          Password recovery is not available in this portal. Contact your system administrator if
          you cannot access your account.
        </p>
      </div>
    </section>
  );
}
