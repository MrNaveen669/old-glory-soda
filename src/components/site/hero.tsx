import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "iconsax-reactjs";
import { IMAGES } from "./images";
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
      className="relative flex min-h-[92svh] scroll-mt-24 items-center overflow-hidden bg-bg-base px-5 pt-28 pb-16 text-hero-text"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/Tree.png"
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Zesty-Lemon-Zing-Soda..mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--hero-overlay-base) 76%, transparent) 0%, color-mix(in srgb, var(--hero-overlay-base) 68%, transparent) 46%, color-mix(in srgb, var(--hero-overlay-base) 56%, transparent) 100%), linear-gradient(180deg, color-mix(in srgb, var(--hero-overlay-base) 28%, transparent) 0%, color-mix(in srgb, var(--hero-overlay-base) 62%, transparent) 100%)",
        }}
      >
        <div className="fizz-grid absolute inset-0 opacity-10" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* Left Column */}
        <div className="z-10">
          {/* Small Badge / Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-hero-accent/45 bg-[color-mix(in_srgb,var(--hero-overlay-base)_55%,transparent)] px-4 py-1.5 text-xs font-semibold tracking-widest text-hero-accent uppercase backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
            MARBLE NECK ORIGINAL
          </motion.div>

          {/* Headline: ALL SEASON DRINK */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 font-display text-5xl font-bold uppercase leading-[0.98] tracking-[0.015em] text-hero-text sm:text-7xl lg:text-8xl"
          >
            ALL SEASON <br />
            <span className="text-hero-accent">DRINK</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 font-brand text-3xl tracking-wide text-hero-text sm:text-4xl"
          >
            “Pop the goli. Keep the glory.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-4 max-w-lg text-base leading-relaxed text-hero-muted sm:text-lg"
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
              className="inline-flex items-center gap-2 rounded-full border border-hero-text/45 bg-[color-mix(in_srgb,var(--hero-overlay-base)_30%,transparent)] px-7 py-3.5 text-sm font-bold tracking-wider text-hero-text uppercase backdrop-blur-sm transition-all hover:border-hero-accent hover:text-hero-accent active:scale-95"
            >
              Our Story
            </button>
          </motion.div>
        </div>

        {/* Right Column: bottle layered above the background video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative sm:p-5">
            <div className="relative aspect-[4/3] w-full" />


            {/* Bottom-right Circular Stamp Badge with Fixed Curved Text */}
            <motion.div
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute right-0 bottom-0 grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-accent-primary bg-bg-base p-1.5 text-center text-accent-primary shadow-xl sm:h-28 sm:w-28"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full pointer-events-none">
                <defs>
                  {/* Top arc path: left (9 o'clock) to right (3 o'clock) along top curve */}
                  <path id="badgeTopArc" d="M 14 50 A 36 36 0 0 1 86 50" fill="none" />
                  {/* Bottom arc path: right (3 o'clock) to left (9 o'clock) along bottom curve so text reads right-side-up */}
                  <path id="badgeBottomArc" d="M 86 50 A 36 36 0 0 1 14 50" fill="none" />
                </defs>
                <text className="text-[9.5px] font-semibold tracking-widest uppercase fill-accent-primary">
                  <textPath href="#badgeTopArc" startOffset="50%" textAnchor="middle">
                    Low Calories
                  </textPath>
                </text>
                <text className="text-[9.5px] font-semibold tracking-widest uppercase fill-accent-primary">
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
