import { motion } from "motion/react";
import { STORY } from "./data";
import { Reveal, Section, SectionHeading } from "./primitives";
import { Bottle } from "./bottle";

export function Story() {
  return (
    <Section id="story">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_0.7fr]">
        <div>
          <SectionHeading eyebrow={STORY.eyebrow} title={STORY.heading} />
          <div className="mt-6 space-y-4">
            {STORY.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i + 1}>
                <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
            {STORY.stats.map((s, i) => (
              <Reveal key={s.label} delay={i + 4}>
                <div className="glass-panel rounded-2xl p-4 text-center sm:p-5">
                  <p className="font-brand text-2xl text-highlight sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-44 sm:w-56"
        >
          <div className="absolute inset-x-4 top-12 bottom-12 rounded-full bg-destructive/25 blur-3xl" />
          <Bottle color="#B5651D" tint="#E0A76A" label="Heritage jeera soda bottle" />
        </motion.div>
      </div>
    </Section>
  );
}
