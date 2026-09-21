import { AnimatedSection } from "@/components/common/AnimatedSection";
import previewPoster from "@/data/AIAC_images/image1.jpg";

export function ArchiveSection() {
  return (
    <section className="bg-[#F7F5EF] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <AnimatedSection className="lg:col-span-6">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
              Previous Conference
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
              The inaugural edition established AIAIAC as West Africa&apos;s focal platform for
              asset integrity and industrial automation, uniting industry leaders, operators, and
              engineers across two days of technical papers and executive sessions.
            </p>
            <div className="mt-6 space-y-2 text-sm text-[#2D5443]">
              <p>• Dual-track technical programme across asset integrity and cybersecurity</p>
              <p>
                • Executive participation from regional ministries, NOCs, and international
                operators
              </p>
              <p>• Live industrial technology and inspection demonstrations</p>
            </div>
            <div className="mt-8">
              <a
                href="/media"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#102C20]/25 bg-transparent px-6 text-sm font-semibold text-[#102C20] transition-colors hover:bg-[#102C20]/5"
              >
                View Conference Media & Highlights
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-[#214A36]/20 bg-[#071C13] shadow-lg">
              <video
                controls
                playsInline
                preload="metadata"
                poster={previewPoster}
                className="aspect-16/9 w-full object-cover"
              >
                <source
                  src="/assets/aiaiac-2027/videos/aiaiac-previous-conference.mp4"
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
