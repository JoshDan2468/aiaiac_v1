import type { ReactNode } from "react";
import { Reveal } from "@/components/common/Reveal";

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  return (
    <Reveal className={className} delay={delay} as={as}>
      {children}
    </Reveal>
  );
}
