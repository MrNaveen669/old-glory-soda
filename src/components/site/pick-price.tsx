import { motion } from "motion/react";
import { PET_IMAGES } from "./images";
import { Section } from "./primitives";

export function PickYourPrice() {
  return (
    <Section id="pricing" className="p-0 overflow-hidden">
      {/* Two-Column Full-Width Split Band */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Half: ₹10 Pack */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col justify-between bg-accent-primary p-8 sm:p-12 md:p-16 text-on-accent"
        >
          {/* Background fizz grid watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 fizz-grid" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-bg-base/15 px-4 py-1 text-xs font-bold tracking-widest text-on-accent uppercase border border-on-accent/30">
                200ML ON-THE-GO PET RANGE
              </span>

              {/* Price Circle Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-on-accent bg-accent-primary shadow-xl">
                <span className="font-display text-2xl font-black text-on-accent">₹10</span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl text-on-accent">
              ₹10 PACK
            </h2>

            <p className="mt-3 text-base text-on-accent/90 max-w-md">
              High fizz pocket-sized PET bottles designed for daily street crispness. Portable, recyclable, zero compromise.
            </p>

            {/* Visual Flavour Cards Grid for ₹10 Range */}
            <div className="mt-8">
              <p className="text-xs font-bold tracking-widest text-on-accent/90 uppercase mb-3">
                Available Flavours in ₹10 Tier:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tile 1: Spicy Spark Zeera */}
                <div className="flex flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-bg-muted/50 p-1">
                    <img
                      src={PET_IMAGES["zeera-soda-pet-10"]}
                      alt="Spicy Spark Zeera ₹10 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-accent-primary">
                    Spicy Spark Zeera
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-text-muted">
                    Roasted Zeera
                  </span>
                </div>

                {/* Tile 2: Citrus Orange Pop */}
                <div className="flex flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-bg-muted/50 p-1">
                    <img
                      src={PET_IMAGES["citrus-orange-pet-10"]}
                      alt="Citrus Orange Pop ₹10 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-accent-primary">
                    Citrus Orange Pop
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-text-muted">
                    Sun Citrus
                  </span>
                </div>

                {/* Tile 3: Shikanji */}
                <div className="flex flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-bg-muted/50 p-1">
                    <img
                      src={PET_IMAGES["shikanji-pet-10"]}
                      alt="Shikanji ₹10 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-accent-primary">
                    Shikanji
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-text-muted">
                    Lemon Spice
                  </span>
                </div>
              </div>
              <div className="mt-4 inline-block rounded-full bg-bg-base px-3.5 py-1 text-[10px] font-bold text-accent-primary uppercase tracking-wider">
                Low Calorie · Stevia Sweetened · 200ml
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-on-accent/20 pt-4 text-xs font-bold text-on-accent/80 uppercase tracking-widest">
            <span>Everyday Street Price</span>
            <span>200ml Clear PET Range</span>
          </div>
        </motion.div>

        {/* Right Half: ₹20 Pack */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col justify-between bg-price-secondary p-8 sm:p-12 md:p-16 text-on-accent"
        >
          {/* Background fizz grid watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 fizz-grid" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-bg-base/15 px-4 py-1 text-xs font-bold tracking-widest text-on-accent uppercase border border-on-accent/30">
                400ML FAMILY VALUE PACK
              </span>

              {/* Price Circle Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-on-accent bg-price-badge-secondary shadow-xl dark:border-accent-cta">
                <span className="font-display text-2xl font-black text-on-accent dark:text-bg-base">₹20</span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl text-on-accent">
              ₹20 PACK
            </h2>

            <p className="mt-3 text-base text-on-accent/90 max-w-md">
              Double the volume for full afternoon sharing. Crafted for family meals, roadside dhabas and festival gatherings.
            </p>

            {/* Visual Flavour Cards Grid for ₹20 Range */}
            <div className="mt-8">
              <p className="text-xs font-bold tracking-widest text-on-accent/90 uppercase mb-3">
                Available Flavours in ₹20 Tier:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tile 1: Citrus Orange Pop */}
                <div className="flex flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-bg-muted/50 p-1">
                    <img
                      src={PET_IMAGES["citrus-orange-pet-20"]}
                      alt="Citrus Orange Pop ₹20 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-accent-support">
                    Citrus Orange Pop
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-text-muted">
                    Sun Citrus
                  </span>
                </div>

                {/* Tile 2: Spicy Spark Zeera */}
                <div className="flex flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-bg-muted/50 p-1">
                    <img
                      src={PET_IMAGES["zeera-soda-pet-20"]}
                      alt="Spicy Spark Zeera ₹20 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-accent-support">
                    Spicy Spark Zeera
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-text-muted">
                    Roasted Zeera
                  </span>
                </div>

                {/* Tile 3: Fizzy Green Apple */}
                <div className="flex flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-transform hover:scale-105">
                  <div className="flex h-20 w-full items-center justify-center rounded-lg bg-bg-muted/50 p-1">
                    <img
                      src={PET_IMAGES["green-apple-pet-20"]}
                      alt="Fizzy Green Apple ₹20 PET bottle"
                      className="h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="mt-2 font-display text-xs font-bold uppercase text-accent-support">
                    Fizzy Green Apple
                  </h4>
                  <span className="mt-0.5 text-[10px] font-semibold text-text-muted">
                    Orchard Tart
                  </span>
                </div>
              </div>
              <div className="mt-4 inline-block rounded-full bg-bg-base px-3.5 py-1 text-[10px] font-bold text-accent-support uppercase tracking-wider">
                Double Volume · Max Carbonation · 400ml
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-on-accent/20 pt-4 text-xs font-bold text-on-accent/80 uppercase tracking-widest">
            <span>Family Value Pack</span>
            <span>400ml Clear PET Range</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
