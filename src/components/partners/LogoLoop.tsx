import { cn } from "@/lib/utils";
import type { Sponsor } from "@/types";

function LogoItem({
  item,
  tierLabel,
  clone,
}: {
  item: Sponsor;
  tierLabel: string;
  clone: boolean;
}) {
  return (
    <li className="logo-loop__item">
      <img
        src={item.logo}
        alt={clone ? "" : (item.name ?? `${tierLabel} logo`)}
        width="180"
        height="72"
        loading="lazy"
        decoding="async"
        className="max-h-12 w-auto max-w-36 object-contain opacity-80 grayscale-[.3] transition-[filter,opacity,transform] duration-500 hover:-translate-y-1 hover:opacity-100 hover:grayscale-0"
      />
      {!clone && (
        <span className="sr-only">
          {item.name ?? "Organisation"}, {tierLabel}
        </span>
      )}
    </li>
  );
}

export function LogoLoop({
  items,
  tierLabel,
  direction = "left",
}: {
  items: Sponsor[];
  tierLabel: string;
  direction?: "left" | "right";
}) {
  if (!items.length) return null;

  return (
    <div className="logo-loop" aria-label={`${tierLabel}, previous edition`}>
      <div className={cn("logo-loop__track", direction === "right" && "logo-loop__track--right")}>
        <ul className="logo-loop__group">
          {items.map((item) => (
            <LogoItem key={item.id} item={item} tierLabel={tierLabel} clone={false} />
          ))}
        </ul>
        <ul className="logo-loop__group" aria-hidden="true">
          {items.map((item) => (
            <LogoItem key={`clone-${item.id}`} item={item} tierLabel={tierLabel} clone />
          ))}
        </ul>
      </div>
    </div>
  );
}
