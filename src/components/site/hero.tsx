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
      className="relative flex min-h-[92svh] scroll-mt-24 items-center overflow-hidden px-5 pt-28 pb-16 bg-[#F6EFDD] text-[#1A1A1A]"
    >
      {/* Background paper texture & subtle grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="fizz-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#F6EFDD]/50 to-[#F6EFDD]" />
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
            className="inline-flex items-center gap-2 rounded-full border border-[#7A1F1F]/30 bg-[#7A1F1F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#7A1F1F] uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-[#7A1F1F] animate-pulse" />
            EST. 1962 · MARBLE NECK ORIGINAL
          </motion.div>

          {/* Headline: ALL SEASON DRINK */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl text-[#1A1A1A]"
          >
            ALL SEASON <br />
            <span className="text-[#7A1F1F]">DRINK</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 font-brand text-3xl sm:text-4xl text-[#4A3525] tracking-wide"
          >
            “Pop the goli. Keep the glory.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-4 max-w-lg text-base text-[#4A3525]/90 leading-relaxed sm:text-lg"
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
              className="group inline-flex items-center gap-2 rounded-full bg-[#7A1F1F] px-8 py-3.5 text-sm font-bold tracking-wider text-[#F6EFDD] uppercase shadow-lg transition-all hover:bg-[#5E1717] hover:scale-105 active:scale-95"
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
              className="inline-flex items-center gap-2 rounded-full border border-[#4A3525]/30 bg-transparent px-7 py-3.5 text-sm font-bold tracking-wider text-[#4A3525] uppercase transition-all hover:border-[#7A1F1F] hover:text-[#7A1F1F] active:scale-95"
            >
              Our Story 1962
            </button>
          </motion.div>
        </div>

        {/* Right Column: Illustrated Scene with Bottle & Banyan Tree Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#D8C8A6] bg-[#F9F3E5] p-5 shadow-2xl">
            {/* Background Banyan Tree Stall Illustration */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#EAE0C8]/60">
              <img
                src={VINTAGE_ILLUSTRATIONS.tree}
                alt="Vintage roadside stall under a banyan tree with bicycle illustration"
                className="h-full w-full object-cover opacity-80 mix-blend-multiply filter sepia-[0.4] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F9F3E5] via-transparent to-transparent opacity-80" />
            </div>

            {/* Foreground Soda Bottle */}
            <motion.div
              animate={reduced ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-8 bottom-6 top-8 flex items-center justify-center"
            >
              <img
                src={IMAGES.heroBottle}
                alt="Old Glory marble neck goli soda bottle foreground"
                className="max-h-full max-w-[240px] drop-shadow-[0_20px_35px_rgba(46,37,28,0.35)] sm:max-w-[280px]"
              />
            </motion.div>

            {/* Bottom-right Circular Stamp Badge */}
            <motion.div
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full border-2 border-dashed border-[#7A1F1F] bg-[#F6EFDD] p-2 shadow-xl grid place-items-center text-center text-[#7A1F1F]"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[10.5px] font-bold tracking-widest uppercase fill-[#7A1F1F]">
                  <textPath href="#circlePath" startOffset="0%">
                    • MADE IN INDIA • SINCE 1962 •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-display text-xs font-black text-[#7A1F1F]">1962</span>
                <span className="text-[8px] font-bold tracking-tighter uppercase text-[#7A1F1F]">INDIA</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
