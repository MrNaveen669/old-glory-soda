import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PROFILE } from "./data";
import { scrollToSection } from "./use-lenis";

const letters = (word: string) => Array.from(word);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden px-5 pt-28 pb-16"
    >
      {/* animated glow field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="fizz-grid absolute inset-0 opacity-40" />
        <motion.div
          className="absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/30 blur-[110px]"
          animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-6rem] bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-highlight/20 blur-[120px]"
          animate={reduced ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {!reduced &&
          Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 rounded-full bg-primary/40"
              style={{
                left: `${6 + i * 9.4}%`,
                width: `${6 + (i % 4) * 4}px`,
                height: `${6 + (i % 4) * 4}px`,
                animation: `bubble-rise ${13 + (i % 5) * 3}s linear ${i * 1.4}s infinite`,
              }}
            />
          ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-silver/30 bg-secondary/60 px-3.5 py-1.5 text-xs tracking-wide text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-highlight" />
          </span>
          Available for select freelance work
        </motion.span>

        <h1 className="mt-7 font-display text-[15vw] leading-[0.92] font-bold tracking-tighter sm:text-7xl md:text-8xl">
          <span className="sr-only">
            {PROFILE.name} — {PROFILE.role}
          </span>
          <span aria-hidden className="block">
            {letters(PROFILE.name).map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 1.75 + i * 0.035,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </span>
          <motion.span
            aria-hidden
            className="text-gradient-soda mt-1 block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {PROFILE.role}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.7 }}
          className="mt-7 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="glow-primary group relative overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            <span className="relative z-10">See selected work</span>
            <span className="absolute inset-0 -translate-x-full bg-highlight transition-transform duration-500 group-hover:translate-x-0" />
            <span className="absolute inset-0 z-10 grid place-items-center text-highlight-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              See selected work
            </span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="rounded-full border border-silver/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-highlight hover:text-highlight active:scale-95"
          >
            Get in touch
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <motion.span
          className="h-10 w-6 rounded-full border border-silver/40 p-1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-highlight"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.span>
      </motion.div>
    </section>
  );
}
