import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { VINTAGE_ILLUSTRATIONS } from "./images";
import { Reveal, Section } from "./primitives";

const STORY_BEATS = [
  {
    num: "01",
    title: "Roadside Roots",
    slug: "roadside-roots",
    description: "Started under a sprawling banyan tree with a handcrafted wooden crate, blocks of river ice, and codd-neck glass bottles.",
    image: VINTAGE_ILLUSTRATIONS.tree,
  },
  {
    num: "02",
    title: "Bottling Works",
    slug: "bottling-works",
    description: "Built our first mechanical bottling factory with vintage pressure pipes and marble sealing precision for maximum fizz.",
    image: VINTAGE_ILLUSTRATIONS.factory,
  },
  {
    num: "03",
    title: "Town Rollout",
    slug: "town-rollout",
    description: "Loaded onto vintage delivery trucks, spreading the iconic marble pop sound to every town and village across the state.",
    image: VINTAGE_ILLUSTRATIONS.truck,
  },
  {
    num: "04",
    title: "Corner Shop Crates",
    slug: "corner-shop-crates",
    description: "Stacking high at local corner stores and kirana counters, serving six signature flavours to generations of soda lovers.",
    image: VINTAGE_ILLUSTRATIONS.crates,
  },
];

export function Story() {
  return (
    <Section id="story" className="bg-[#F9F3E5] py-20 border-y border-[#D8C8A6]/60">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="text-center">
          <Reveal>
            <span className="inline-block text-xs font-bold tracking-widest text-[#7A1F1F] uppercase">
              EST. 1962 · HERITAGE CHRONICLES
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl text-[#1A1A1A]">
              OUR STORY SINCE 1962
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5C4A38] sm:text-lg">
              From a single roadside stall under a banyan tree to an iconic Indian soda brand. Tap any chapter below to explore the full chronicle.
            </p>
          </Reveal>
        </div>

        {/* 4-Column Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STORY_BEATS.map((beat, i) => (
            <motion.div
              key={beat.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                to={`/story/${beat.slug}` as any}
                className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-[#D8C8A6] bg-[#F6EFDD] p-6 shadow-md transition-all hover:-translate-y-1.5 hover:shadow-xl hover:border-[#7A1F1F]/60"
              >
                <div>
                  {/* Number Badge */}
                  <div className="flex items-center justify-between border-b border-[#D8C8A6]/60 pb-3">
                    <span className="font-display text-2xl font-black text-[#7A1F1F]">
                      {beat.num}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-[#5C4A38] uppercase">
                      CHRONICLE
                    </span>
                  </div>

                  {/* Sepia Illustration */}
                  <div className="my-5 overflow-hidden rounded-xl border border-[#D8C8A6]/40 bg-[#EAE0C8]/40 p-2">
                    <img
                      src={beat.image}
                      alt={beat.title}
                      className="h-36 w-full object-contain filter sepia-[0.55] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#1A1A1A] group-hover:text-[#7A1F1F]">
                    {beat.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-[#5C4A38]">
                    {beat.description}
                  </p>
                </div>

                {/* Bottom CTA Link / Button */}
                <div className="mt-6 flex items-center justify-between border-t border-[#D8C8A6]/40 pt-3 text-[11px] font-bold text-[#7A1F1F] uppercase tracking-wider group-hover:underline">
                  <span>Read full chapter</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

