import { motion } from "motion/react";
import { useState } from "react";
import { FLAVORS, type Flavor } from "./data";
import { FLAVOR_IMAGES } from "./images";
import { FlavorModal } from "./flavor-modal";
import { Section } from "./primitives";

const FRUIT_IMAGERY: Record<string, { fruitImg: string; tagline: string }> = {
  "blueberry-blast": { fruitImg: "/Blueberry.png", tagline: "Wild Berry" },
  "green-apple": { fruitImg: "/Apple.png", tagline: "Orchard Tart" },
  "citrus-orange": { fruitImg: "/orange.png", tagline: "Sun Citrus" },
  "fruit-beer": { fruitImg: "/Fruite Beer.png", tagline: "Mixed Berry" },
  "lemon-zing": { fruitImg: "/Lemon.png", tagline: "Nimboo Masala" },
  "zeera-soda": { fruitImg: "/Jeera.png", tagline: "Roasted Zeera" },
};

export function Flavors() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = FLAVORS.find((f) => f.id === openId) ?? null;

  return (
    <Section id="flavors" className="bg-[#F6EFDD] py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header Row with Stevia Badge */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#7A1F1F] uppercase">
              MARBLE NECK SIGNATURE COLLECTION
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl text-[#1A1A1A]">
              SIX FLAVOURS. EVERY SEASON.
            </h2>
            <p className="mt-3 max-w-xl text-base text-[#5C4A38]">
              Bottled in authentic codd-neck glass with the original goli pop ritual — crafted for every palate across the year.
            </p>
          </div>

          {/* Stevia Natural Sweetener Circular Badge */}
          <div className="flex shrink-0 items-center gap-3 rounded-full border-2 border-dashed border-[#2E3B2C] bg-[#2E3B2C]/10 px-4 py-2.5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2E3B2C] text-[#F6EFDD] font-bold text-xs">
              🍃
            </span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-[#2E3B2C]">
                Made with Stevia
              </p>
              <p className="text-[10px] text-[#5C4A38] uppercase tracking-wide">
                Natural Sweetener · Low Calorie
              </p>
            </div>
          </div>
        </div>

        {/* 6-Column Flavours Grid */}
        <div className="mt-14 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {FLAVORS.map((f, i) => {
            const meta = FRUIT_IMAGERY[f.id] ?? { fruitImg: "/Blueberry.png", tagline: "Heritage Fizz" };
            return (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setOpenId(f.id)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D8C8A6] bg-[#F9F3E5] p-4 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
                style={{ borderColor: `${f.color}50` }}
              >
                {/* Color Top Border Accent */}
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: f.color }}
                />

                {/* Illustrated Bottle Image */}
                <div className="relative mt-2 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-[#EAE0C8]/30 p-2">
                  <img
                    src={FLAVOR_IMAGES[f.id]}
                    alt={`Old Glory ${f.name} illustrated bottle`}
                    className="h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Fruit / Spice Imagery Below */}
                <div className="my-3 flex h-16 w-full items-center justify-center overflow-hidden rounded-lg bg-[#F6EFDD]/80 p-1 border border-[#D8C8A6]/40">
                  <img
                    src={meta.fruitImg}
                    alt={`${f.name} fruit notes`}
                    className="h-full object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Flavour Name + 2-Word Tagline */}
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-tight text-[#1A1A1A] group-hover:text-[#7A1F1F]">
                    {f.name}
                  </h3>
                  <span
                    className="mt-1 inline-block text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${f.color}20`, color: f.color }}
                  >
                    {meta.tagline}
                  </span>
                </div>

                {/* Bottom CTA Link */}
                <span className="mt-3 block text-[10px] font-bold tracking-widest text-[#7A1F1F] uppercase group-hover:underline">
                  Pop Details →
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <FlavorModal flavor={active} onClose={() => setOpenId(null)} />
    </Section>
  );
}
