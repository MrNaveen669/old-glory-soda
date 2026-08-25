import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { Reveal } from "./primitives";

type StoryCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type StoryBeat = {
  num: string;
  era: string;
  title: string;
  href:
    | "/story/roadside-roots"
    | "/story/bottling-works"
    | "/story/town-rollout"
    | "/story/corner-shop-crates";
  description: string;
  imageAlt: string;
  crop: StoryCrop;
};

const STORY_SOURCE = {
  src: "/story.jpeg",
  width: 4991,
  height: 3078,
};

const STORY_BEATS: StoryBeat[] = [
  {
    num: "01",
    era: "1960'S",
    title: "Roadside Roots",
    href: "/story/roadside-roots",
    description:
      "It began with a small stall under a banyan tree and a dream to create a soda like no other. A marble, a bottle, and a taste that fizzed differently.",
    imageAlt: "A vintage roadside goli soda stall beneath a banyan tree",
    crop: { x: 151, y: 1265, width: 1102, height: 870 },
  },
  {
    num: "02",
    era: "1980'S",
    title: "Bottling Begins",
    href: "/story/bottling-works",
    description:
      "Our first bottling unit brought consistency to tradition. Same goli. Same pop. Now, in every bottle.",
    imageAlt: "A vintage Old Glory bottling line in operation",
    crop: { x: 1360, y: 1265, width: 1032, height: 870 },
  },
  {
    num: "03",
    era: "2000'S",
    title: "Taking It Places",
    href: "/story/town-rollout",
    description:
      "From one town to many, our bottles started popping up in kirana stores, tea stalls, and local hearts.",
    imageAlt: "A vintage Old Glory delivery truck outside a kirana store",
    crop: { x: 2496, y: 1265, width: 1079, height: 870 },
  },
  {
    num: "04",
    era: "TODAY & BEYOND",
    title: "New Look. Same Soul.",
    href: "/story/corner-shop-crates",
    description:
      "We keep the marble. We keep the pop. But we bring new flavours, better quality, and modern care.",
    imageAlt: "An Old Glory bottler inspecting a modern blue marble-neck soda",
    crop: { x: 3684, y: 1265, width: 1116, height: 870 },
  },
];

const DECORATIVE_CROPS = {
  roadside: { x: 0, y: 0, width: 1360, height: 1070 },
  truck: { x: 3650, y: 170, width: 1341, height: 930 },
};

function cropBackground(crop: StoryCrop): CSSProperties {
  const horizontalPosition = crop.x === 0 ? 0 : (crop.x / (STORY_SOURCE.width - crop.width)) * 100;
  const verticalPosition = crop.y === 0 ? 0 : (crop.y / (STORY_SOURCE.height - crop.height)) * 100;

  return {
    backgroundImage: `url("${STORY_SOURCE.src}")`,
    backgroundPosition: `${horizontalPosition}% ${verticalPosition}%`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${(STORY_SOURCE.width / crop.width) * 100}% auto`,
  };
}

export function Story() {
  return (
    <section
      id="story"
      className="relative scroll-mt-24 overflow-hidden border-y border-border-theme bg-bg-base px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:pb-20 lg:pt-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden aspect-[1.27] w-[32rem] opacity-45 mix-blend-luminosity lg:block xl:w-[39rem]"
        style={cropBackground(DECORATIVE_CROPS.roadside)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-14 hidden aspect-[1.44] w-[29rem] opacity-40 mix-blend-luminosity lg:block xl:w-[36rem]"
        style={cropBackground(DECORATIVE_CROPS.truck)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--accent-gold)_10%,transparent),transparent_50%),linear-gradient(180deg,transparent,var(--bg-base)_86%)]"
      />

      <div className="relative mx-auto max-w-[96rem]">
        <header className="relative z-10 mx-auto max-w-6xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 text-[11px] font-semibold tracking-[0.34em] text-accent-gold uppercase sm:text-sm lg:text-base">
              <span aria-hidden className="hidden h-px w-14 bg-accent-gold/70 sm:block" />
              <span>Heritage Chronicles</span>
              <span aria-hidden className="hidden h-px w-14 bg-accent-gold/70 sm:block" />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-[2.65rem] font-bold leading-[0.95] tracking-[0.025em] text-text-primary uppercase sm:text-6xl lg:whitespace-nowrap lg:text-[5rem] xl:text-[5.5rem]">
              Our Story Since
            </h2>
          </Reveal>

          <Reveal delay={1.5}>
            <p className="mt-4 font-brand text-3xl leading-tight text-accent-gold sm:text-4xl lg:text-[2.75rem]">
              Old roots. Same soul. New glory.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-primary sm:text-xl">
              From a small roadside stall under a banyan tree
              <br className="hidden sm:block" /> to a brand that&apos;s fizzing up generations.
            </p>
          </Reveal>

          <Reveal delay={2.5}>
            <p className="mt-3 text-sm text-text-muted sm:text-base">
              Tap any chapter below to explore the full story.
            </p>
          </Reveal>
        </header>

        <div className="relative z-10 mt-12 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {STORY_BEATS.map((beat, index) => (
            <motion.div
              key={beat.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full min-w-0"
            >
              <Link
                to={beat.href}
                className="group flex h-full min-h-[36rem] flex-col overflow-hidden rounded-[1.4rem] border border-accent-gold/55 bg-bg-surface/65 shadow-[0_18px_48px_color-mix(in_srgb,var(--overlay)_28%,transparent)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent-gold hover:shadow-[0_20px_60px_color-mix(in_srgb,var(--accent-gold)_15%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                <div className="flex items-center gap-4 px-5 pb-4 pt-5 sm:px-6">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-accent-gold/75 font-display text-2xl font-bold tabular-nums text-accent-gold">
                    {beat.num}
                  </span>
                  <span className="shrink-0 font-display text-sm font-semibold tracking-[0.04em] text-accent-gold uppercase sm:text-base">
                    {beat.era}
                  </span>
                  <span
                    aria-hidden
                    className="relative h-px flex-1 bg-gradient-to-r from-accent-gold/65 to-accent-gold/20 after:absolute after:-right-0.5 after:-top-0.5 after:h-1 after:w-1 after:rounded-full after:bg-accent-gold"
                  />
                </div>

                <div
                  role="img"
                  aria-label={beat.imageAlt}
                  className="relative mx-3 aspect-[6/5] overflow-hidden rounded-sm bg-bg-muted sm:mx-4"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                    style={cropBackground(beat.crop)}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,var(--bg-surface)_100%)] opacity-45"
                  />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5 text-center">
                  <h3 className="font-display text-xl font-bold leading-tight tracking-[0.025em] text-text-primary uppercase sm:text-2xl">
                    {beat.title}
                  </h3>
                  <span aria-hidden className="mx-auto mt-3 h-0.5 w-14 bg-accent-gold" />
                  <p className="mx-auto mt-4 max-w-[18rem] flex-1 text-sm leading-relaxed text-text-muted sm:text-[15px]">
                    {beat.description}
                  </p>

                  <div className="mt-7 flex items-center gap-4 text-left text-xs font-semibold tracking-[0.11em] text-accent-primary uppercase sm:text-sm">
                    <span>Explore Chapter</span>
                    <span
                      aria-hidden
                      className="relative h-px flex-1 bg-accent-primary/70 transition-transform duration-300 after:absolute after:-right-px after:-top-[3px] after:h-2 after:w-2 after:rotate-45 after:border-r after:border-t after:border-accent-primary group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="mt-14 flex items-center justify-center gap-4 text-center font-display text-[11px] font-semibold tracking-[0.2em] text-text-muted uppercase sm:text-sm lg:text-base">
            <span aria-hidden className="h-px min-w-8 flex-1 bg-accent-gold/35" />
            <span aria-hidden className="text-lg text-accent-gold">
              ✦
            </span>
            <span>
              Real Heritage. Real Soda. Real <span className="text-accent-primary">Old Glory.</span>
            </span>
            <span aria-hidden className="text-lg text-accent-gold">
              ✦
            </span>
            <span aria-hidden className="h-px min-w-8 flex-1 bg-accent-gold/35" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
