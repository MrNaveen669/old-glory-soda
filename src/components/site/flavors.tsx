import { motion } from "motion/react";
import { useState } from "react";
import { FLAVORS, type Flavor } from "./data";
import { FLAVOR_IMAGES } from "./images";
import { FlavorModal } from "./flavor-modal";
import { Section } from "./primitives";

const FLAVOR_TAGLINES: Record<string, string> = {
  "blueberry-blast": "Wild Berry",
  "green-apple": "Orchard Tart",
  "citrus-orange": "Sun Citrus",
  "fruit-beer": "Mixed Berry",
  "lemon-zing": "Nimboo Masala",
  "zeera-soda": "Roasted Zeera",
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
              Bottled in authentic codd-neck glass with the original goli pop ritual — hand-drawn heritage art, crafted for every palate.
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
        <div className="mt-14 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {FLAVORS.map((f, i) => {
            const tagline = FLAVOR_TAGLINES[f.id] ?? "Heritage Fizz";
            return (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setOpenId(f.id)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D8C8A6] bg-[#F9F3E5] p-4 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-[#7A1F1F]"
                style={{ borderColor: `${f.color}50` }}
              >
                {/* Color Top Border Accent */}
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: f.color }}
                />

                {/* Clean Background-Removed Cutout Illustrated Bottle */}
                <div className="relative mt-2 flex h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-[#EAE0C8]/40 p-3 border border-[#D8C8A6]/30">
                  <img
                    src={FLAVOR_IMAGES[f.id]}
                    alt={`Old Glory ${f.name} illustrated bottle cutout`}
                    className="h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle "Tap to View" overlay badge on cutout image */}
                  <div className="absolute inset-x-2 bottom-2 rounded-lg bg-[#7A1F1F]/90 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[#F6EFDD] opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md">
                    Tap to view full scene
                  </div>
                </div>

                {/* Flavour Name + Tagline */}
                <div className="mt-4">
                  <h3 className="font-display text-sm font-bold uppercase tracking-tight text-[#1A1A1A] group-hover:text-[#7A1F1F]">
                    {f.name}
                  </h3>
                  <span
                    className="mt-1.5 inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${f.color}20`, color: f.color }}
                  >
                    {tagline}
                  </span>
                </div>

                {/* Bottom Interactive Callout */}
                <div className="mt-4 flex items-center justify-center gap-1 border-t border-[#D8C8A6]/40 pt-2.5 text-[10px] font-bold tracking-wider text-[#7A1F1F] uppercase group-hover:underline">
                  <span>Pop Full View</span>
                  <span>→</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <FlavorModal flavor={active} onClose={() => setOpenId(null)} />
    </Section>
  );
}

