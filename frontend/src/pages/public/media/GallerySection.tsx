import { AnimatedSection } from "@/components/common/AnimatedSection";
import { mediaItems } from "@/data/media";

export function GallerySection() {
  const [lead, ...supporting] = mediaItems;

  return (
    <section className="bg-[#F5F2E9] py-16 text-[#102C20] sm:py-24 lg:py-28">
      <div className="shell">
        <AnimatedSection className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#102C20] sm:text-4xl lg:text-5xl">
            Photo Gallery
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58675F] sm:text-lg">
            Documenting executive addresses, technical tracks, exhibition showcases, and
            professional networking from AIAIAC Africa.
          </p>
        </AnimatedSection>

        {lead && (
          <AnimatedSection className="mt-12">
            <div className="group relative overflow-hidden rounded-xl border border-[#214A36]/20 bg-[#071C13] shadow-md">
              <img
                src={lead.src}
                alt={lead.caption}
                width={lead.width}
                height={lead.height}
                loading="lazy"
                decoding="async"
                className="aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C13]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-sm text-[#F7F5EF] sm:p-8">
                <p className="font-medium">{lead.caption}</p>
              </div>
            </div>
          </AnimatedSection>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((item, index) => (
            <AnimatedSection
              key={item.id}
              delay={(index % 3) * 0.05}
              className="group relative overflow-hidden rounded-xl border border-[#214A36]/15 bg-[#071C13] shadow-xs"
            >
              <img
                src={item.src}
                alt={item.caption}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C13]/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-xs leading-relaxed text-[#F7F5EF]">
                <p>{item.caption}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
