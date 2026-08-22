export function OverviewSection({ firstName }: { firstName: string }) {
  return (
    <section aria-labelledby="dashboard-heading" className="border-b border-border pb-8">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <p className="border-l-2 border-lime pl-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-forest">
            Operations overview
          </p>
          <h1
            id="dashboard-heading"
            className="mt-5 font-display text-3xl font-bold leading-tight text-mineral sm:text-4xl"
          >
            Welcome back, {firstName}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Your administration workspace is ready. Operational modules will appear here as they are
            connected.
          </p>
        </div>
        <div className="border border-border bg-white px-4 py-3">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Data state
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-mineral">
            <span className="size-2 bg-lime" aria-hidden="true" />
            Awaiting live operational data
          </p>
        </div>
      </div>
    </section>
  );
}
