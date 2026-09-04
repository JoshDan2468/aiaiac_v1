import { ActionLink } from "@/components/common/ActionButton";
import { conference } from "@/data/conference";
import { useCountdown } from "@/hooks/useCountdown";

const countdownUnits = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function formatCountdownValue(value: number | undefined, minimumDigits = 2) {
  return value === undefined ? "--" : String(value).padStart(minimumDigits, "0");
}

export function CountdownSection() {
  const parts = useCountdown(conference.countdown.targetISO);

  return (
    <section
      className="on-navy relative overflow-hidden border-y border-white/12 bg-mineral py-14 sm:py-16 lg:py-20"
      aria-labelledby="countdown-title"
    >
      <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[linear-gradient(120deg,transparent,oklch(0.455_0.135_148/.34))]"
        aria-hidden
      />

      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="max-w-xl lg:col-span-4">
          <p className="eyebrow text-emerald">2027 event marker</p>
          <h2 id="countdown-title" className="display-md mt-5 text-white">
            Time until AIAIAC West Africa
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/68">
            {conference.dates} · {conference.venue}
          </p>
          <ActionLink to="/registration" size="md" className="mt-7">
            Explore registration options
          </ActionLink>
        </div>

        <div className="lg:col-span-8">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-8 border-y border-white/14 py-6 md:grid-cols-4 md:gap-x-7 lg:py-7">
            {countdownUnits.map((unit) => {
              const value = parts?.[unit.key];
              const minimumDigits = unit.key === "days" ? 3 : 2;
              const valueSize =
                unit.key === "days"
                  ? "text-[clamp(2.2rem,4.1vw,4rem)]"
                  : "text-[clamp(2.5rem,5.4vw,5rem)]";

              return (
                <div
                  key={unit.key}
                  className="min-w-0 border-l border-white/14 pl-4 odd:border-l-0 first:pl-0 md:odd:border-l md:first:border-l-0 md:pl-5"
                >
                  <dd className={`numeral ${valueSize} whitespace-nowrap leading-[0.8] text-white`}>
                    {formatCountdownValue(value, minimumDigits)}
                  </dd>
                  <dt className="mt-4 font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-lime/78">
                    {unit.label}
                  </dt>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
