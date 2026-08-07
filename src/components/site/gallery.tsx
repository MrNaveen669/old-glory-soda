import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Gallery as GalleryIcon } from "iconsax-reactjs";
import { GALLERY } from "./data";
import { Bottle } from "./bottle";
import { Section, SectionHeading } from "./primitives";

const SPANS: Record<string, string> = {
  tall: "sm:row-span-2 h-72 sm:h-full min-h-[18rem]",
  wide: "sm:col-span-2 h-56",
  normal: "h-56",
};

function Tile({ item, index }: { item: (typeof GALLERY)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-silver/20 ${SPANS[item.span] ?? SPANS["normal"]}`}
    >
      <motion.div
        style={{
          y,
          background: `linear-gradient(150deg, ${item.color}dd, var(--color-background) 78%)`,
        }}
        className="absolute inset-[-12%]"
      />
      <div className="fizz-grid absolute inset-0 opacity-30" />
      <div className="absolute right-3 bottom-3 w-12 opacity-70 transition-transform duration-500 group-hover:-translate-y-2 sm:w-16">
        <Bottle color={item.color} tint="#ffffff" animated={false} label={item.caption} />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background/90 to-transparent p-4">
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
        intro="Placeholder frames — drop real product photography straight into this grid."
      />
      <div className="mt-12 grid auto-rows-[14rem] gap-4 sm:grid-cols-3">
        {GALLERY.map((g, i) => (
          <Tile key={g.id} item={g} index={i} />
        ))}
      </div>
    </Section>
  );
}
