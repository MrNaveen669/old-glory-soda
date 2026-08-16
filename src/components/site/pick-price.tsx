import { motion } from "motion/react";
import { PET_IMAGES } from "./images";
import { Section } from "./primitives";

export function PickYourPrice() {
  return (
    <Section id="pricing" className="p-0 overflow-hidden">
      {/* Two-Column Full-Width Split Band */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Half: Dark Maroon Background (#7A1F1F) - ₹10 Pack */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col justify-between bg-[#7A1F1F] p-8 sm:p-12 md:p-16 text-[#F6EFDD]"
        >
          {/* Background fizz grid watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 fizz-grid" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-[#F6EFDD]/15 px-4 py-1 text-xs font-bold tracking-widest text-[#F6EFDD] uppercase border border-[#F6EFDD]/30">
                200ML ON-THE-GO PET RANGE
              </span>

              {/* Price Circle Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F6EFDD] bg-[#7A1F1F] shadow-xl">
                <span className="font-display text-2xl font-black text-[#F6EFDD]">₹10</span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl text-[#F6EFDD]">
              ₹10 PACK
            </h2>

            <p className="mt-3 text-base text-[#F6EFDD]/90 max-w-md">
              High fizz pocket-sized PET bottles designed for daily street crispness. Portable, recyclable, zero compromise.
            </p>

            {/* Visual Flavour Cards Grid for ₹10 Range */}
            <div className="mt-8">
              <p className="text-xs font-bold tracking-widest text-[#F6EFDD]/90 uppercase mb-3">
                Available Flavours in ₹10 Tier:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tile 1: Spicy Spark Zeera */}
                <div className="flex flex-col items-center rounded-xl border border-[#F6EFDD]/25 bg-[#F6EFDD] p-3 text-center text-[#1A1A1A] shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#EAE0C8]/50 p-1">
                    <img
                      src={PET_IMAGES["zeera-soda-pet-10"]}
                      alt="Spicy Spark Zeera ₹10 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-[#7A1F1F]">
                    Spicy Spark Zeera
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-[#5C4A38]">
                    Roasted Zeera
                  </span>
                </div>

                {/* Tile 2: Citrus Orange Pop */}
                <div className="flex flex-col items-center rounded-xl border border-[#F6EFDD]/25 bg-[#F6EFDD] p-3 text-center text-[#1A1A1A] shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#EAE0C8]/50 p-1">
                    <img
                      src={PET_IMAGES["citrus-orange-pet-10"]}
                      alt="Citrus Orange Pop ₹10 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-[#7A1F1F]">
                    Citrus Orange Pop
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-[#5C4A38]">
                    Sun Citrus
                  </span>
                </div>

                {/* Tile 3: Shikanji */}
                <div className="flex flex-col items-center rounded-xl border border-[#F6EFDD]/25 bg-[#F6EFDD] p-3 text-center text-[#1A1A1A] shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#EAE0C8]/50 p-1">
                    <img
                      src={PET_IMAGES["shikanji-pet-10"]}
                      alt="Shikanji ₹10 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-[#7A1F1F]">
                    Shikanji
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-[#5C4A38]">
                    Lemon Spice
                  </span>
                </div>
              </div>
              <div className="mt-4 inline-block rounded-full bg-[#F6EFDD] px-3.5 py-1 text-[10px] font-bold text-[#7A1F1F] uppercase tracking-wider">
                Low Calorie · Stevia Sweetened · 200ml
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#F6EFDD]/20 pt-4 text-xs font-bold text-[#F6EFDD]/80 uppercase tracking-widest">
            <span>Everyday Street Price</span>
            <span>200ml Clear PET Range</span>
          </div>
        </motion.div>

        {/* Right Half: Dark Olive Green Background (#2E3B2C) - ₹20 Pack */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col justify-between bg-[#2E3B2C] p-8 sm:p-12 md:p-16 text-[#F6EFDD]"
        >
          {/* Background fizz grid watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 fizz-grid" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-[#F6EFDD]/15 px-4 py-1 text-xs font-bold tracking-widest text-[#F6EFDD] uppercase border border-[#F6EFDD]/30">
                400ML FAMILY VALUE PACK
              </span>

              {/* Price Circle Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F6EFDD] bg-[#2E3B2C] shadow-xl">
                <span className="font-display text-2xl font-black text-[#F6EFDD]">₹20</span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl text-[#F6EFDD]">
              ₹20 PACK
            </h2>

            <p className="mt-3 text-base text-[#F6EFDD]/90 max-w-md">
              Double the volume for full afternoon sharing. Crafted for family meals, roadside dhabas and festival gatherings.
            </p>

            {/* Visual Flavour Cards Grid for ₹20 Range */}
            <div className="mt-8">
              <p className="text-xs font-bold tracking-widest text-[#F6EFDD]/90 uppercase mb-3">
                Available Flavours in ₹20 Tier:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tile 1: Citrus Orange Pop */}
                <div className="flex flex-col items-center rounded-xl border border-[#F6EFDD]/25 bg-[#F6EFDD] p-3 text-center text-[#1A1A1A] shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#EAE0C8]/50 p-1">
                    <img
                      src={PET_IMAGES["citrus-orange-pet-20"]}
                      alt="Citrus Orange Pop ₹20 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-[#2E3B2C]">
                    Citrus Orange Pop
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-[#5C4A38]">
                    Sun Citrus
                  </span>
                </div>

                {/* Tile 2: Spicy Spark Zeera */}
                <div className="flex flex-col items-center rounded-xl border border-[#F6EFDD]/25 bg-[#F6EFDD] p-3 text-center text-[#1A1A1A] shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#EAE0C8]/50 p-1">
                    <img
                      src={PET_IMAGES["zeera-soda-pet-20"]}
                      alt="Spicy Spark Zeera ₹20 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-[#2E3B2C]">
                    Spicy Spark Zeera
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-[#5C4A38]">
                    Roasted Zeera
                  </span>
                </div>

                {/* Tile 3: Fizzy Green Apple */}
                <div className="flex flex-col items-center rounded-xl border border-[#F6EFDD]/25 bg-[#F6EFDD] p-3 text-center text-[#1A1A1A] shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#EAE0C8]/50 p-1">
                    <img
                      src={PET_IMAGES["green-apple-pet-20"]}
                      alt="Fizzy Green Apple ₹20 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-[#2E3B2C]">
                    Fizzy Green Apple
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-[#5C4A38]">
                    Orchard Tart
                  </span>
                </div>
              </div>
              <div className="mt-4 inline-block rounded-full bg-[#F6EFDD] px-3.5 py-1 text-[10px] font-bold text-[#2E3B2C] uppercase tracking-wider">
                Double Volume · Max Carbonation · 400ml
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#F6EFDD]/20 pt-4 text-xs font-bold text-[#F6EFDD]/80 uppercase tracking-widest">
            <span>Family Value Pack</span>
            <span>400ml Clear PET Range</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
