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

            {/* Bottle Image + Flavour List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 items-center gap-6 rounded-2xl border border-[#F6EFDD]/20 bg-[#5E1717]/60 p-5">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-[#7A1F1F]/40 p-2">
                <img
                  src={PET_IMAGES["zeera-soda-pet-10"]}
                  alt="₹10 PET bottle of Old Glory soda"
                  className="h-full object-contain filter drop-shadow-xl"
                />
              </div>

              <div>
                <p className="text-xs font-bold tracking-widest text-[#F6EFDD]/80 uppercase">
                  Available Flavours:
                </p>
                <ul className="mt-3 space-y-2 text-sm font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#E0A76A]" />
                    Spicy Spark Zeera
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FFC08A]" />
                    Citrus Orange Pop
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FFF6A8]" />
                    Shikanji (Lemon Spice)
                  </li>
                </ul>
                <div className="mt-4 inline-block rounded-full bg-[#F6EFDD] px-3 py-1 text-[10px] font-bold text-[#7A1F1F] uppercase tracking-wider">
                  Low Calorie · Stevia Sweetened
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#F6EFDD]/20 pt-4 text-xs font-bold text-[#F6EFDD]/80 uppercase tracking-widest">
            <span>Everyday Street Price</span>
            <span>200ml Clear PET Bottle</span>
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

            {/* Bottle Image + Flavour List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 items-center gap-6 rounded-2xl border border-[#F6EFDD]/20 bg-[#212B20]/60 p-5">
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-[#2E3B2C]/40 p-2">
                <img
                  src={PET_IMAGES["citrus-orange-pet-20"]}
                  alt="₹20 PET bottle of Old Glory soda"
                  className="h-full object-contain filter drop-shadow-xl"
                />
              </div>

              <div>
                <p className="text-xs font-bold tracking-widest text-[#F6EFDD]/80 uppercase">
                  Available Flavours:
                </p>
                <ul className="mt-3 space-y-2 text-sm font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FFC08A]" />
                    Citrus Orange Pop
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#E0A76A]" />
                    Spicy Spark Zeera
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#B6EF9B]" />
                    Fizzy Green Apple
                  </li>
                </ul>
                <div className="mt-4 inline-block rounded-full bg-[#F6EFDD] px-3 py-1 text-[10px] font-bold text-[#2E3B2C] uppercase tracking-wider">
                  Double Volume · Max Carbonation
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#F6EFDD]/20 pt-4 text-xs font-bold text-[#F6EFDD]/80 uppercase tracking-widest">
            <span>Family Value Pack</span>
            <span>400ml Clear PET Bottle</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
