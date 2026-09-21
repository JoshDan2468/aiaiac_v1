import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 font-sans font-bold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-lg bg-[#CFEA3B] text-[#102C20] font-semibold shadow-xs hover:bg-[#b8d62c] active:translate-y-0.5",
        outline:
          "rounded-lg border border-white/25 bg-transparent text-white hover:border-white/50 hover:bg-white/10 active:translate-y-0.5",
        secondary:
          "rounded-lg border border-[#102C20]/25 bg-transparent text-[#102C20] hover:bg-[#102C20]/5 active:translate-y-0.5 dark:border-white/25 dark:text-[#F7F5EF] dark:hover:bg-white/10",
        ghost: "rounded-lg text-current hover:text-[#CFEA3B] hover:bg-white/5",
        solidNavy:
          "rounded-lg bg-[#071C13] text-[#F7F5EF] hover:bg-[#123326] active:translate-y-0.5",
        text: "p-0 text-current hover:text-[#CFEA3B] underline-offset-4 hover:underline",
        textAction:
          "p-0 text-current hover:text-[#CFEA3B] font-semibold inline-flex items-center gap-1.5",
      },
      size: {
        sm: "h-10 px-4 text-xs sm:text-sm",
        md: "h-12 px-6 text-sm sm:text-base",
        lg: "h-[50px] px-7 text-base sm:h-13 sm:px-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ActionProps = VariantProps<typeof actionVariants> & {
  children: ReactNode;
  className?: string;
  hideArrow?: boolean;
};

export function ActionLink({
  to,
  href,
  current = false,
  children,
  variant,
  size,
  className,
  hideArrow = false,
}: ActionProps & { to?: string; href?: string; current?: boolean }) {
  const classes = cn(actionVariants({ variant, size }), className);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {!hideArrow && (
        <span
          aria-hidden
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-current transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-current={current ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

export function ActionButton({
  children,
  variant,
  size,
  className,
  hideArrow = false,
  ...props
}: ActionProps & ComponentProps<"button">) {
  return (
    <button className={cn(actionVariants({ variant, size }), className)} {...props}>
      <span className="relative z-10">{children}</span>
      {!hideArrow && (
        <span
          aria-hidden
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-current transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      )}
    </button>
  );
}
