const documentTypes = [
  "Conference brochure",
  "Sponsorship prospectus",
  "Exhibitor guide",
  "Delegate information",
  "Abstract submission guide",
  "Programme documents",
];

export function DownloadCentreSection() {
  return (
    <section
      id="download-centre"
      tabIndex={-1}
      className="bg-white py-16 outline-none sm:py-20 lg:py-24"
      aria-labelledby="download-centre-title"
    >
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="eyebrow text-emerald-deep">Download centre</p>
          <h2 id="download-centre-title" className="display-lg mt-5 text-mineral">
            The record is being prepared.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            These approved document types will appear here when the organiser publishes the 2027
            materials. No documents are available to download yet.
          </p>
        </div>

        <ul
          className="border-y border-mineral/16 lg:col-span-7 lg:col-start-6"
          aria-label="Planned documents"
        >
          {documentTypes.map((documentType, index) => (
            <li
              key={documentType}
              className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-mineral/12 py-5 last:border-b-0 sm:grid-cols-[3.5rem_1fr_auto]"
            >
              <span className="numeral text-lg text-emerald-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-mineral sm:text-base">
                {documentType}
              </span>
              <span className="border border-mineral/18 px-2 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Coming soon
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
