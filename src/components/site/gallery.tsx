import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Gallery as GalleryIcon } from "iconsax-reactjs";
import { GALLERY } from "./data";
import { FLAVOR_IMAGES, IMAGES } from "./images";
import { Section, SectionHeading } from "./primitives";

const SPANS: Record<string, string> = {
  tall: "sm:row-span-2 h-72 sm:h-full min-h-[18rem]",
  wide: "sm:col-span-2 h-56",
  normal: "h-56",
};

const TILE_IMAGES = [
  IMAGES.brandPoster,
  FLAVOR_IMAGES["citrus-orange"]!,
  FLAVOR_IMAGES["green-apple"]!,
  FLAVOR_IMAGES["fruit-beer"]!,
  FLAVOR_IMAGES["lemon-zing"]!,
  FLAVOR_IMAGES["zeera-soda"]!,
];

function Tile({ item, index }: { item: (typeof GALLERY)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-silver/20 ${SPANS[item.span] ?? SPANS["normal"]}`}
    >
      <motion.img
        src={TILE_IMAGES[index % TILE_IMAGES.length]}
        alt={item.caption}
        loading="lazy"
        style={{ y }}
        className="absolute inset-[-8%] h-[116%] w-[116%] object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background/95 to-transparent p-4">
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
      <div className="mt-12 grid auto-rows-[14rem] gap-4 sm:grid-cols-3">
        {GALLERY.map((g, i) => (
          <Tile key={g.id} item={g} index={i} />
        ))}
      </div>
    </Section>
  );
}
