export function WorkspaceSection() {
  return (
    <section
      className="flex min-h-64 items-center border border-border bg-white p-6 sm:p-8"
      aria-labelledby="workspace-heading"
    >
      <div className="max-w-xl border-l-2 border-lime pl-5">
        <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-forest">
          Next stage
        </p>
        <h2 id="workspace-heading" className="mt-3 font-display text-xl font-bold text-mineral">
          Operations workspace
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Registration, payment, enquiry, and abstract tools will be introduced here as their
          approved workflows and data services become available.
        </p>
      </div>
    </section>
  );
}
