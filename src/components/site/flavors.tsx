import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { CloseCircle, Drop, Location, Star1 } from "iconsax-reactjs";
import { FLAVORS, type Flavor } from "./data";
import { FLAVOR_IMAGES } from "./images";
import { Bubbles } from "./bottle";
import { Section, SectionHeading } from "./primitives";
import { scrollToSection } from "./use-lenis";


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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-background/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} details`}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-silver/25 bg-card p-6 sm:p-8"
              style={{ boxShadow: `0 40px 90px -40px ${active.color}` }}
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-25"
                style={{
                  background: `radial-gradient(90% 60% at 90% 0%, ${active.color}, transparent 60%)`,
                }}
              />
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <CloseCircle size={26} variant="Linear" />
              </button>

              <div className="relative grid gap-6 sm:grid-cols-[0.4fr_1fr] sm:items-center">
                <div className="mx-auto w-28 sm:w-full">
                  <Bottle color={active.color} tint={active.tint} label={`${active.name} bottle`} />
                </div>
                <div>
                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: active.color }}
                  >
                    {active.note}
                  </span>
                  <h3 className="mt-2 font-brand text-2xl sm:text-3xl">{active.name}</h3>
                  <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                    {active.description}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-silver/20 p-3">
                      <p className="text-xs text-muted-foreground">Sweetness</p>
                      <p className="mt-1 font-semibold">{active.sweetness}</p>
                    </div>
                    <div className="rounded-2xl border border-silver/20 p-3">
                      <p className="text-xs text-muted-foreground">Fizz level</p>
                      <p className="mt-1 font-semibold">{active.fizz}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.pairs.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                        style={{ borderColor: `${active.color}66`, color: active.color }}
                      >
                        <Star1 size={12} variant="Bold" color={active.color} />
                        {p}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setOpenId(null);
                      scrollToSection("stores");
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                    style={{ background: active.color }}
                  >
                    <Location size={18} variant="Linear" />
                    Find this near me
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
