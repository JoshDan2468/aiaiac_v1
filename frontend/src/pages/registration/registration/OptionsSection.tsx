import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { registrationLandingOptions, type RegistrationLandingOption } from "@/data/registration";
import { cn } from "@/lib/utils";

const layoutByOption: Record<string, string> = {
  delegate: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  exhibitor: "lg:col-span-5",
  sponsorship: "lg:col-span-5",
  visitor: "md:col-span-1 lg:col-span-4",
  "media-partnership": "md:col-span-1 lg:col-span-4",
  "download-centre": "md:col-span-1 lg:col-span-4",
  "abstract-submissions": "md:col-span-2 lg:col-span-12",
};

const orderByOption: Record<string, string> = {
  delegate: "01",
  exhibitor: "02",
  sponsorship: "03",
  visitor: "04",
  "media-partnership": "05",
  "download-centre": "06",
  "abstract-submissions": "07",
};

export function OptionsSection() {
  return (
    <section className="bg-bone py-16 sm:py-20 lg:py-24" aria-labelledby="participation-options">
      <div className="shell">
        <AnimatedSection className="grid gap-6 border-b border-mineral/16 pb-10 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-emerald-deep">Participation categories</p>
            <h2 id="participation-options" className="display-lg mt-5 max-w-4xl text-mineral">
              Choose the role you want to play.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
            Three routes are ready for an enquiry today. The wider participation programme will be
            released here as each invitation is approved.
          </p>
        </AnimatedSection>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {registrationLandingOptions.map((option, index) => (
            <AnimatedSection
              key={option.id}
              delay={Math.min(index, 4) * 0.045}
              className={layoutByOption[option.id] ?? ""}
            >
              <RegistrationOptionPanel option={option} number={orderByOption[option.id] ?? "00"} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegistrationOptionPanel({
  option,
  number,
}: {
  option: RegistrationLandingOption;
  number: string;
}) {
  const titleId = `registration-option-${option.id}`;
  const isAvailable = Boolean(option.route);

  if (option.presentation === "delegate") {
    return (
      <article
        className="image-cut flex h-full min-h-[29rem] flex-col border border-mineral bg-mineral p-6 text-white sm:min-h-[31rem] sm:p-8 lg:min-h-0 lg:p-10"
        aria-labelledby={titleId}
      >
        <PanelTop number={number} availability={option.availability} inverse />
        <div className="my-auto max-w-xl py-12 lg:py-16">
          <h3 id={titleId} className="display-lg text-white">
            {option.title}
          </h3>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
            {option.description}
          </p>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/16 pt-5">
          <p className="max-w-xs text-xs leading-relaxed text-white/52">
            For technical specialists, leaders and operational decision-makers.
          </p>
          {option.route && option.cta && (
            <ActionLink to={option.route} size="lg" className="min-h-14 max-w-full shrink-0">
              {option.cta}
            </ActionLink>
          )}
        </div>
      </article>
    );
  }

  if (option.presentation === "active") {
    const isSponsor = option.id === "sponsorship";

    return (
      <article
        className={cn(
          "relative flex h-full min-h-72 flex-col border p-6 sm:p-8",
          isSponsor
            ? "border-forest bg-forest text-white"
            : "border-mineral/18 bg-white text-mineral",
        )}
        aria-labelledby={titleId}
      >
        <PanelTop number={number} availability={option.availability} inverse={isSponsor} />
        <div className="mt-auto pt-12">
          <h3 id={titleId} className="display-md max-w-md">
            {option.title}
          </h3>
          <p
            className={cn(
              "mt-4 max-w-lg text-sm leading-relaxed",
              isSponsor ? "text-white/72" : "text-muted-foreground",
            )}
          >
            {option.description}
          </p>
          {option.route && option.cta && (
            <ActionLink
              to={option.route}
              size="md"
              variant={isSponsor ? "primary" : "solidNavy"}
              className="mt-6 w-full sm:w-auto"
            >
              {option.cta}
            </ActionLink>
          )}
        </div>
      </article>
    );
  }

  if (option.presentation === "abstract") {
    return (
      <article
        className="relative grid min-h-64 overflow-hidden border border-mineral bg-mineral p-6 text-white sm:p-8 lg:min-h-0 lg:grid-cols-12 lg:items-end lg:gap-8 lg:p-10"
        aria-labelledby={titleId}
      >
        <div
          className="absolute right-0 top-0 h-full w-[32%] border-l border-white/12 bg-forest/35"
          aria-hidden
        />
        <div className="relative lg:col-span-2">
          <PanelTop number={number} availability={option.availability} inverse />
        </div>
        <div className="relative mt-12 max-w-2xl lg:col-span-6 lg:mt-0">
          <h3 id={titleId} className="display-md text-white">
            {option.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{option.description}</p>
        </div>
        <p className="relative mt-8 border-l border-emerald pl-4 text-xs font-semibold uppercase leading-relaxed tracking-[0.11em] text-emerald lg:col-span-3 lg:col-start-10 lg:mt-0">
          Technical programme details to follow
        </p>
      </article>
    );
  }

  return (
    <article
      className="group flex h-full min-h-64 flex-col border border-mineral/18 bg-white p-6 text-mineral transition-colors duration-300 hover:border-forest/60 sm:p-7"
      aria-labelledby={titleId}
    >
      <PanelTop number={number} availability={option.availability} />
      <div className="mt-auto pt-12">
        <h3 id={titleId} className="display-md max-w-sm text-mineral">
          {option.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {option.description}
        </p>
        {!isAvailable && (
          <p className="mt-6 border-l-2 border-emerald-deep pl-3 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-emerald-deep">
            {option.availability}
          </p>
        )}
      </div>
    </article>
  );
}

function PanelTop({
  number,
  availability,
  inverse = false,
}: {
  number: string;
  availability: RegistrationLandingOption["availability"];
  inverse?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className={cn("numeral text-xl", inverse ? "text-emerald" : "text-emerald-deep")}>
        {number}
      </span>
      <span
        className={cn(
          "border px-2 py-1 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.12em]",
          inverse ? "border-white/18 text-white/70" : "border-mineral/18 text-muted-foreground",
        )}
      >
        {availability}
      </span>
    </div>
  );
}
