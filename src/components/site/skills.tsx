import { motion } from "motion/react";
import { SKILLS } from "./data";
import { Section, SectionHeading } from "./primitives";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...SKILLS, ...SKILLS];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div
        className="animate-marquee flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="glass-panel rounded-full px-5 py-2.5 font-display text-sm whitespace-nowrap transition-colors hover:border-primary hover:text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" className="overflow-hidden">
      <SectionHeading
        eyebrow="Toolkit"
        title="The stack I reach for."
        intro="Fluent across the modern frontend, comfortable enough on the backend to ship the whole thing."
      />

      <div className="mt-12 space-y-3">
        <Row />
        <Row reverse />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SKILLS.slice(0, 8).map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="glass-panel flex items-center gap-3 rounded-2xl p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 font-display text-sm font-bold text-primary">
              {skill.slice(0, 2)}
            </span>
            <span className="min-w-0 truncate text-sm font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
