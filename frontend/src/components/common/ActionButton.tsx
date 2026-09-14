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
          "rounded-xl bg-lime text-[#05190F] shadow-sm hover:bg-[#94e339] hover:shadow-md active:translate-y-0.5",
        outline:
          "rounded-xl border border-white/22 bg-white/8 text-white backdrop-blur-xs hover:border-white/40 hover:bg-white/16 active:translate-y-0.5",
        secondary:
          "rounded-xl border border-mineral/20 bg-[#082819] text-white hover:bg-[#0b3521] hover:border-lime/40 active:translate-y-0.5",
        ghost: "rounded-lg text-current hover:text-lime hover:bg-white/5",
        solidNavy:
          "rounded-xl bg-mineral text-white hover:bg-forest hover:shadow-md active:translate-y-0.5",
        text: "p-0 text-current hover:text-lime underline-offset-4 hover:underline",
      },
      size: {
        md: "h-12 px-6 text-sm sm:text-base",
        lg: "h-13 px-7 text-base sm:h-14 sm:px-8",
        sm: "h-10 px-4 text-xs sm:text-sm",
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
