import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MagneticCard } from "@/components/common/MagneticCard";
import { previousEdition } from "@/data/event";
import { mediaItems } from "@/data/media";

export function GallerySection() {
  const [lead, ...supporting] = mediaItems;

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="shell">
        {lead && (
          <AnimatedSection>
            <MagneticCard>
              <figure className="image-cut group relative aspect-[16/9] overflow-hidden bg-mineral">
                <img
                  src={lead.src}
                  alt={lead.caption}
                  width={lead.width}
                  height={lead.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mineral/88 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm text-white/78 sm:p-9">
                  <span className="eyebrow mb-3 block text-emerald">{previousEdition.label}</span>
                  {lead.caption}
                </figcaption>
              </figure>
            </MagneticCard>
          </AnimatedSection>
        )}

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {supporting.map((item, index) => (
            <AnimatedSection
              as="li"
              key={item.id}
              delay={(index % 3) * 0.06}
              className={index % 3 === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <MagneticCard>
                <figure className="group relative aspect-[16/10] overflow-hidden bg-mineral">
                  <img
                    src={item.src}
                    alt={item.caption}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 transition-[transform,opacity] duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mineral/82 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-xs leading-relaxed text-white/72">
                    {item.caption} · previous edition
                  </figcaption>
                </figure>
              </MagneticCard>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
