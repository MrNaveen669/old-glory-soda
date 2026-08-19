import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Gallery as GalleryIcon } from "iconsax-reactjs";
import { GALLERY } from "./data";
import { Section, SectionHeading } from "./primitives";

function Tile({ item, index }: { item: (typeof GALLERY)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-silver/20"
    >
      <div className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-105">
        <motion.div style={{ y }} className="absolute inset-[-8%] h-[116%] w-[116%]">
          {item.type === "video" ? (
            <video
              src={inView ? item.src : undefined}
              poster={item.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={item.caption}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={item.src}
              alt={item.caption}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </div>

      {item.type === "video" && (
        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-border-theme/70 bg-bg-surface/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-text-muted uppercase shadow-sm backdrop-blur-sm">
          <span aria-hidden className="text-accent-primary">▶</span>
          Video
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 bg-gradient-to-t from-background/95 to-transparent p-4">
        <GalleryIcon size={16} variant="Linear" className="shrink-0 text-highlight" />
        <p className="truncate text-sm font-medium">{item.caption}</p>
      </div>
    </motion.div>
  );
}


export function GallerySection() {
  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow="In action"
        title="Cold crates, warm streets."
        intro="Real bottles, real fizz — the Old Glory lineup shot cold and close."
      />
      <div className="mt-12 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GALLERY.map((g, i) => (
          <Tile key={g.id} item={g} index={i} />
        ))}
      </div>
    </Section>
  );
}
