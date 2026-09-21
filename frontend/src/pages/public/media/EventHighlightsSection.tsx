import { AnimatedSection } from "@/components/common/AnimatedSection";
import highlightImage1 from "@/data/AIAC_images/image1.jpg";
import highlightImage2 from "@/data/AIAC_images/image5.jpg";
import highlightImage3 from "@/data/AIAC_images/image7.jpg";

export function EventHighlightsSection() {
  return (
    <section id="highlights" className="bg-[#071C13] py-16 text-[#F7F5EF] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F7F5EF] sm:text-4xl lg:text-5xl">
            Event Highlights
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B6C2BA] sm:text-lg">
            A visual overview of technical discussions, technology demonstrations, and executive
            interactions from the conference floor.
          </p>
        </AnimatedSection>

        {/* Video Feature + Editorial Photo Trio */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Main Video Highlight */}
          <AnimatedSection className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-[#214A36]/50 bg-[#123326] shadow-xl">
              <video
                controls
                playsInline
                preload="metadata"
                poster={highlightImage1}
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

          {/* Asymmetric Photo Duo */}
          <AnimatedSection
            delay={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            <div className="overflow-hidden rounded-xl border border-[#214A36]/50 bg-[#123326]">
              <img
                src={highlightImage2}
                alt="AIAIAC technical session in progress"
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                className="aspect-16/10 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#214A36]/50 bg-[#123326]">
              <img
                src={highlightImage3}
                alt="AIAIAC delegates and industry speakers"
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                className="aspect-16/10 w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
