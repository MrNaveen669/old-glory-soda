import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { EXPERIENCE } from "./data";
import { Section, SectionHeading } from "./primitives";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Timeline"
        title="Where I've been pouring effort."
        intro="A short history of teams, titles, and things that shipped."
      />

      <div ref={ref} className="relative mt-14 pl-8 sm:pl-12">
        <div className="absolute top-0 bottom-0 left-2 w-px bg-border sm:left-3" aria-hidden />
        <motion.div
          className="absolute top-0 bottom-0 left-2 w-px origin-top bg-primary sm:left-3"
          style={{ scaleY }}
          aria-hidden
        />
        <motion.div
          className="absolute left-2 h-16 w-px -translate-x-1/2 bg-highlight blur-[6px] sm:left-3"
          style={{ top: glowY }}
          aria-hidden
        />

        <div className="space-y-10">
          {EXPERIENCE.map((item, i) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.65, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                className="absolute top-2 -left-[1.6rem] h-3 w-3 rounded-full border-2 border-primary bg-background sm:-left-[2.35rem]"
                aria-hidden
              />
              <p className="font-display text-xs tracking-[0.22em] text-highlight uppercase">
                {item.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{item.role}</h3>
              <p className="text-sm text-primary">{item.company}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
                {item.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
