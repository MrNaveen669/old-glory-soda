import { motion } from "motion/react";
import { ABOUT, PROFILE } from "./data";
import { Reveal, Section, SectionHeading } from "./primitives";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <SectionHeading eyebrow="About" title={ABOUT.heading} />
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i + 2}>
              <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={4}>
            <p className="mt-6 font-display text-sm tracking-[0.2em] text-silver uppercase">
              Based in {PROFILE.location}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
          {ABOUT.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-2xl p-5"
            >
              <div className="font-display text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
