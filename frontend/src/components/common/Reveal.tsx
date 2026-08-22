import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const revealStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const Comp = motion[as];
  const reduced = useReducedMotion();
  return (
    <Comp
      className={className}
      initial={reduced ? false : { y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={reduced ? { duration: 0 } : { duration: 0.75, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Word-by-word headline reveal. */
export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string | undefined;
  delay?: number;
}) {
  const words = text.split(" ");
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "0.35em" },
              show: { y: "0%", transition: { duration: 0.85, ease } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
