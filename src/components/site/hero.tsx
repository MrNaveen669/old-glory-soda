import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "iconsax-reactjs";
import { IMAGES, VINTAGE_ILLUSTRATIONS } from "./images";
import { scrollToSection } from "./use-lenis";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[92svh] scroll-mt-24 items-center overflow-hidden px-5 pt-28 pb-16 bg-bg-base text-text-primary"
    >
      {/* Background paper texture & subtle grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="fizz-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-radial from-transparent via-bg-base/50 to-bg-base" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* Left Column */}
        <div className="z-10">
          {/* Small Badge / Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-accent-primary uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
            EST. 1962 · MARBLE NECK ORIGINAL
          </motion.div>

          {/* Headline: ALL SEASON DRINK */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl text-text-primary"
          >
            ALL SEASON <br />
            <span className="text-accent-primary">DRINK</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 font-brand text-3xl sm:text-4xl text-text-muted-strong tracking-wide"
          >
            “Pop the goli. Keep the glory.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-4 max-w-lg text-base text-text-muted-strong/90 leading-relaxed sm:text-lg"
          >
            The heritage marble-neck goli soda you grew up chasing down summer streets — bottled bolder, fizzier, and made for every season of India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("flavors")}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-cta px-8 py-3.5 text-sm font-bold tracking-wider text-on-accent uppercase shadow-lg transition-all hover:bg-accent-hover hover:scale-105 active:scale-95 dark:text-bg-base"
            >
              Explore Flavours
              <ArrowRight
                size={18}
                variant="Linear"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            
            <button
              onClick={() => scrollToSection("story")}
              className="inline-flex items-center gap-2 rounded-full border border-text-muted-strong/30 bg-transparent px-7 py-3.5 text-sm font-bold tracking-wider text-text-muted-strong uppercase transition-all hover:border-accent-primary hover:text-accent-primary active:scale-95"
            >
              Our Story 1962
            </button>
          </motion.div>
        </div>

        {/* Right Column: Hand-Drawn Sepia Scene with Illustrated Bottle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-border-theme bg-bg-surface p-5 shadow-2xl">
            {/* Background Banyan Tree Stall Vintage Illustration */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-muted/60 border border-border-theme/40">
              <img
                src={VINTAGE_ILLUSTRATIONS.tree}
                alt="Vintage roadside stall under a banyan tree with wooden crate illustration"
                className="h-full w-full object-cover opacity-85 mix-blend-multiply filter sepia-[0.45] contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-70" />
            </div>

            {/* Foreground Hand-Drawn Illustrated Bottle */}
            <motion.div
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-8 bottom-6 top-8 flex items-center justify-center pointer-events-none"
            >
              <img
                src={IMAGES.heroBottle}
                alt="Old Glory marble neck goli soda illustrated bottle"
                className="max-h-full max-w-[200px] sm:max-w-[240px] filter drop-shadow-[0_15px_25px_rgba(74,53,37,0.3)] contrast-[1.05]"
              />
            </motion.div>

            {/* Bottom-right Circular Stamp Badge with Fixed Curved Text */}
            <motion.div
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full border-2 border-dashed border-accent-primary bg-bg-base p-1.5 shadow-xl grid place-items-center text-center text-accent-primary"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full pointer-events-none">
                <defs>
                  {/* Top arc path: left (9 o'clock) to right (3 o'clock) along top curve */}
                  <path id="badgeTopArc" d="M 14 50 A 36 36 0 0 1 86 50" fill="none" />
                  {/* Bottom arc path: right (3 o'clock) to left (9 o'clock) along bottom curve so text reads right-side-up */}
                  <path id="badgeBottomArc" d="M 86 50 A 36 36 0 0 1 14 50" fill="none" />
                </defs>
                <text className="text-[9.5px] font-extrabold tracking-widest uppercase fill-accent-primary">
                  <textPath href="#badgeTopArc" startOffset="50%" textAnchor="middle">
                    MADE IN INDIA
                  </textPath>
                </text>
                <text className="text-[9.5px] font-extrabold tracking-widest uppercase fill-accent-primary">
                  <textPath href="#badgeBottomArc" startOffset="50%" textAnchor="middle">
                    SINCE 1962
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-display text-xs font-black text-accent-primary">1962</span>
                <span className="text-[8px] font-bold tracking-tighter uppercase text-accent-primary">INDIA</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
