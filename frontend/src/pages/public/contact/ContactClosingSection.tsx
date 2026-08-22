import { ActionLink } from "@/components/common/ActionButton";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { contactClosing, contactMedia } from "@/data/contact";

export function ContactClosingSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="image-cut relative min-h-80 overflow-hidden bg-mineral sm:min-h-[30rem] lg:col-span-7">
            <img
              src={contactMedia.src}
              alt={contactMedia.alt}
              width={contactMedia.width}
              height={contactMedia.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: contactMedia.objectPosition }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-mineral/50 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-between border-y border-mineral/20 py-8 lg:col-span-4 lg:col-start-9 lg:py-12">
            <div>
              <p className="eyebrow text-emerald-deep">{contactClosing.eyebrow}</p>
              <h2 className="display-md mt-6 text-mineral">{contactClosing.title}</h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
                {contactClosing.body}
              </p>
            </div>
            <ActionLink
              to="/registration"
              variant="outline"
              className="mt-10 self-start text-mineral"
            >
              Explore registration
            </ActionLink>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
