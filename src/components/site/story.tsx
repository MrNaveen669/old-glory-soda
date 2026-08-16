import { motion } from "motion/react";
import { useState } from "react";
import { STORY } from "./data";
import { Reveal, Section, SectionHeading } from "./primitives";
import { VINTAGE_ILLUSTRATIONS } from "./images";

const STORY_BEATS = [
  {
    id: "origin",
    year: "1962",
    title: "Roadside Roots",
    caption: "Started under the banyan tree with a wooden crate and fresh block ice.",
    image: VINTAGE_ILLUSTRATIONS.tree,
  },
  {
    id: "factory",
    year: "1970s",
    title: "Bottling Works",
    caption: "Codd-neck precision glass filling with marble pressure sealing.",
    image: VINTAGE_ILLUSTRATIONS.factory,
  },
  {
    id: "truck",
    year: "1980s",
    title: "Town Rollout",
    caption: "Vintage fleet delivering fresh wooden crates across Chhattisgarh.",
    image: VINTAGE_ILLUSTRATIONS.truck,
  },
  {
    id: "crates",
    year: "Today",
    title: "Corner Shop Crates",
    caption: "Classic marble-neck crates ready for every season.",
    image: VINTAGE_ILLUSTRATIONS.crates,
  },
];

export function Story() {
  const [activeBeat, setActiveBeat] = useState(0);

  return (
    <Section id="story">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
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

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-silver/25 bg-card p-4 shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/40">
              <motion.img
                key={STORY_BEATS[activeBeat].id}
                src={STORY_BEATS[activeBeat].image}
                alt={STORY_BEATS[activeBeat].title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-contain p-2"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-4">
                <span className="inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {STORY_BEATS[activeBeat].year}
                </span>
                <p className="mt-1 font-brand text-lg">{STORY_BEATS[activeBeat].title}</p>
                <p className="text-xs text-muted-foreground">{STORY_BEATS[activeBeat].caption}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {STORY_BEATS.map((beat, idx) => (
              <button
                key={beat.id}
                onClick={() => setActiveBeat(idx)}
                className={`flex flex-col items-center rounded-2xl border p-2.5 text-center transition-all ${
                  activeBeat === idx
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-silver/20 bg-card/60 hover:border-silver/40"
                }`}
              >
                <img
                  src={beat.image}
                  alt={beat.title}
                  className="h-12 w-12 object-contain opacity-80"
                />
                <span className="mt-1.5 text-[11px] font-semibold">{beat.title}</span>
                <span className="text-[9px] text-muted-foreground">{beat.year}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
