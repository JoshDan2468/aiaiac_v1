import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden text-xs font-semibold uppercase tracking-[0.14em] transition-[color,background-color,border-color] duration-300 after:relative after:z-10 after:content-['↗'] after:transition-transform after:duration-300 hover:after:translate-x-1 hover:after:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-emerald text-mineral hover:bg-emerald-bright",
        outline: "border border-current text-current hover:text-emerald",
        ghost: "text-current hover:text-emerald",
        solidNavy: "bg-mineral text-white hover:bg-forest",
      },
      size: {
        md: "h-12 px-7",
        lg: "h-14 px-9",
        sm: "h-11 px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ActionProps = VariantProps<typeof actionVariants> & {
  children: ReactNode;
  className?: string;
};

export function ActionLink({
  to,
  href,
  children,
  variant,
  size,
  className,
}: ActionProps & { to?: string; href?: string }) {
  const classes = cn(actionVariants({ variant, size }), className);
  const inner = <span className="relative z-10">{children}</span>;
  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}

export function ActionButton({
  children,
  variant,
  size,
  className,
  ...props
}: ActionProps & ComponentProps<"button">) {
  return (
    <button className={cn(actionVariants({ variant, size }), className)} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
