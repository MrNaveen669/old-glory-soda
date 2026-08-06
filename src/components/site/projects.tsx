import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, type PointerEvent } from "react";
import { PROJECTS, type Project } from "./data";
import { Section, SectionHeading } from "./primitives";

const accentClass = {
  primary: "text-primary border-primary/40 bg-primary/10",
  highlight: "text-highlight border-highlight/40 bg-highlight/10",
  destructive: "text-destructive border-destructive/40 bg-destructive/10",
} as const;

function TiltCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group [will-change:transform]"
    >
      <button
        onClick={onOpen}
        className="glass-panel relative w-full overflow-hidden rounded-3xl p-6 text-left transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_var(--color-primary)] active:scale-[0.99] sm:p-7"
      >
        {/* preview surface — drop a real image in here */}
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
          <div className="fizz-grid absolute inset-0 opacity-60" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-primary),transparent_60%)] opacity-40"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.7 }}
          />
          <span className="absolute right-4 bottom-4 font-display text-5xl font-bold text-foreground/10">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute top-4 left-4 rounded-full border border-silver/30 bg-background/60 px-3 py-1 text-[11px] tracking-wider uppercase">
            {project.year}
          </span>
        </div>

        <p
          className={`inline-block rounded-full border px-3 py-1 text-[11px] tracking-[0.18em] uppercase ${accentClass[project.accent]}`}
        >
          {project.category}
        </p>
        <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">{project.blurb}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-highlight">
            View
            <motion.span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
              →
            </motion.span>
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects with a bit of fizz."
        intro="Six recent builds. Tap any card for the full story — swap in your own copy and imagery anytime."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-background/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-9"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p
                    className={`inline-block rounded-full border px-3 py-1 text-[11px] tracking-[0.18em] uppercase ${accentClass[active.accent]}`}
                  >
                    {active.category} · {active.year}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold">{active.title}</h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-silver/30 transition-colors hover:border-destructive hover:text-destructive"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
                <div className="fizz-grid h-full w-full opacity-60" />
              </div>

              <p className="mt-6 leading-relaxed text-pretty text-muted-foreground">
                {active.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span key={t} className="rounded-md bg-secondary px-2.5 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={active.link}
                className="glow-primary mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Visit project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
