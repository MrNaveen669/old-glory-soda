import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Location } from "iconsax-reactjs";
import { BRAND } from "./data";
import { Bottle, Bubbles } from "./bottle";
import { scrollToSection } from "./use-lenis";

const LOCKUP = "OLD GLORY SODA";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden px-5 pt-28 pb-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="fizz-grid absolute inset-0 opacity-40" />
        <motion.div
          className="absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/30 blur-[110px]"
          animate={reduced ? {} : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-6rem] bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-highlight/25 blur-[120px]"
          animate={reduced ? {} : { x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Bubbles count={16} />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="ribbon inline-flex items-center gap-2 px-4 py-1.5 font-display text-[11px] tracking-[0.28em] uppercase"
          >
            Est. 1962 · Marble Neck Original
          </motion.span>

          <h1 className="mt-6 font-brand text-[13.5vw] leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            <span className="sr-only">
              {BRAND.name} — {BRAND.tagline}
            </span>
            <span aria-hidden className="block">
              {LOCKUP.split(" ").map((word, w) => (
                <span key={word} className="mr-[0.25em] inline-block whitespace-nowrap">
                  {Array.from(word).map((c, i) => (
                    <motion.span
                      key={i}
                      className={`inline-block ${w === 2 ? "text-gradient-soda" : ""}`}
                      initial={{ y: "110%", opacity: 0, rotate: -6 }}
                      animate={{ y: "0%", opacity: 1, rotate: 0 }}
                      transition={{
                        delay: 1.75 + (w * 5 + i) * 0.04,
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>

          </h1>

          <motion.p
            aria-hidden
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7 }}
            className="mt-5 font-display text-xl text-highlight sm:text-2xl"
          >
            “{BRAND.tagline}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.42, duration: 0.7 }}
            className="mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg"
          >
            {BRAND.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.55, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollToSection("flavors")}
              className="glow-primary group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              Explore Flavours
              <ArrowRight
                size={18}
                variant="Linear"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollToSection("stores")}
              className="inline-flex items-center gap-2 rounded-full border border-silver/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-highlight hover:text-highlight active:scale-95"
            >
              <Location size={18} variant="Linear" />
              Find a Store
            </button>
          </motion.div>
        </div>

        <motion.div
          style={{ y: bottleY }}
          initial={{ opacity: 0, y: 40, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 1.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-64 sm:w-80 md:w-full md:max-w-md"
        >
          <div className="absolute inset-x-6 top-10 bottom-10 rounded-full bg-primary/30 blur-3xl" />
          <motion.div
            animate={reduced ? {} : { y: [0, -14, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={IMAGES.heroBottle}
              alt="Old Glory Blueberry Blast goli soda bottle surrounded by fresh blueberries"
              className="relative w-full rounded-3xl border border-silver/20 object-cover shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </motion.div>

      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9 }}
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
