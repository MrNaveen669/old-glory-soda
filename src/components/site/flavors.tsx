import { motion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { Drop } from "iconsax-reactjs";
import { FLAVORS, type Flavor } from "./data";
import { FLAVOR_IMAGES } from "./images";
import { Bubbles } from "./bottle";
import { FlavorModal } from "./flavor-modal";
import { Section, SectionHeading } from "./primitives";



function FlavorCard({ flavor, index, onOpen }: { flavor: Flavor; index: number; onOpen: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 10, y: px * 12 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-3xl border border-silver/20 bg-card p-6 text-left transition-shadow duration-300 hover:shadow-2xl"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 220ms ease-out",
          boxShadow: `0 24px 60px -34px ${flavor.color}`,
        }}
        aria-label={`View ${flavor.name} details`}
      >
        <span
          aria-hidden
          className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-45"
          style={{ background: `radial-gradient(120% 80% at 80% 0%, ${flavor.color}, transparent 65%)` }}
        />
        <Bubbles count={8} color={flavor.tint} />

        <div className="relative">
          <div className="mb-5 overflow-hidden rounded-2xl border border-silver/15">
            <img
              src={FLAVOR_IMAGES[flavor.id]}
              alt={`Old Glory ${flavor.name} goli soda bottle`}
              loading="lazy"
              className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-48"
            />
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
            style={{ background: `${flavor.color}26`, color: flavor.color }}
          >
            <Drop size={12} variant="Bold" color={flavor.color} />
            {flavor.short}
          </span>
          <h3 className="mt-4 font-brand text-xl leading-tight sm:text-2xl">{flavor.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{flavor.note}</p>
          <p className="mt-4 line-clamp-3 text-sm text-muted-foreground/90">{flavor.description}</p>
          <span
            className="mt-5 inline-block text-xs font-semibold tracking-widest uppercase"
            style={{ color: flavor.color }}
          >
            View flavour →
          </span>
        </div>

      </button>
    </motion.div>
  );
}

export function Flavors() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = FLAVORS.find((f) => f.id === openId) ?? null;

  return (
    <Section id="flavors" className="overflow-hidden">
      <SectionHeading
        eyebrow="The lineup"
        title="Six flavours, one marble ritual."
        intro="Every bottle carries the same goli pop and the same thick glass — the only thing that changes is what's inside."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FLAVORS.map((f, i) => (
          <FlavorCard key={f.id} flavor={f} index={i} onOpen={() => setOpenId(f.id)} />
        ))}
      </div>
      <FlavorModal flavor={active} onClose={() => setOpenId(null)} />
    </Section>
  );
}
