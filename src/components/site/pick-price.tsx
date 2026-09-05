import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { PET_RANGE, type Flavor, type PetTier } from "./data";
import { flavorImage } from "./images";
import { Section } from "./primitives";

const PET_PRODUCT_ORDER: Record<PetTier, string[]> = {
  10: ["zeera-soda-pet-10", "citrus-orange-pet-10", "shikanji-pet-10"],
  20: ["citrus-orange-pet-20", "zeera-soda-pet-20"],
};

const PET_TAGLINES: Record<string, string> = {
  "zeera-soda": "Roasted Zeera",
  "citrus-orange": "Sun Citrus",
  shikanji: "Lemon Spice",
};

function productsForTier(tier: PetTier) {
  return PET_PRODUCT_ORDER[tier]
    .map((id) => PET_RANGE[tier].find((flavor) => flavor.id === id))
    .filter((flavor): flavor is Flavor => Boolean(flavor));
}

function PetFlavorCard({
  flavor,
  onSelect,
  titleColorClass,
}: {
  flavor: Flavor;
  onSelect: (flavor: Flavor) => void;
  titleColorClass: string;
}) {
  const image = flavorImage(flavor.id);
  const baseId = flavor.id.replace(/-pet-\d+$/, "");
  const title = flavor.name.replace(/\s+Soda$/, "");
  const tagline = PET_TAGLINES[baseId] ?? flavor.short;

  return (
    <button
      type="button"
      onClick={() => onSelect(flavor)}
      aria-label={`View ${flavor.name} ₹${flavor.price} PET details`}
      className="group flex min-h-[180px] cursor-pointer flex-col items-center rounded-xl border border-on-accent/25 bg-bg-base p-3 text-center text-text-primary shadow-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:border-accent-cta/75 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cta active:scale-[1.01]"
    >
      <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg bg-bg-muted/50 p-0.5 sm:h-28">
        {image && (
          <img
            src={image}
            alt={`${flavor.name} ₹${flavor.price} PET bottle`}
            width={1024}
            height={1536}
            loading="lazy"
            decoding="async"
            className="h-[108%] max-h-[108%] w-auto object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-[1.045] group-active:scale-[1.02]"
          />
        )}
      </div>

      <h3 className={`mt-2 font-display text-xs font-bold uppercase ${titleColorClass}`}>
        {title}
      </h3>

      <span className="mt-0.5 text-[10px] font-semibold text-text-muted">{tagline}</span>
    </button>
  );
}

export function PickYourPrice({ onSelectFlavor }: { onSelectFlavor: (flavor: Flavor) => void }) {
  const [activeTier, setActiveTier] = useState<10 | 20>(10);

  useEffect(() => {
    const syncTierFromHash = () => {
      const tier =
        window.location.hash === "#range-20"
          ? 20
          : window.location.hash === "#range-10"
            ? 10
            : null;
      if (!tier) return;

      setActiveTier(tier);

      // On smaller screens the inactive tier is hidden. Wait until React reveals
      // the requested panel before applying the browser's deep-link scroll.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(`range-${tier}`)?.scrollIntoView({ block: "start" });
        });
      });
    };

    syncTierFromHash();
    window.addEventListener("hashchange", syncTierFromHash);

    return () => window.removeEventListener("hashchange", syncTierFromHash);
  }, []);

  return (
    <Section id="pricing" className="!p-0 overflow-hidden">
      <div className="border-y border-border-theme bg-bg-base px-5 py-4 lg:hidden">
        <div className="mx-auto grid max-w-sm grid-cols-2 gap-2 rounded-full border border-border-theme bg-bg-surface p-1.5">
          {([10, 20] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setActiveTier(tier)}
              aria-pressed={activeTier === tier}
              className={`min-h-11 rounded-full px-4 text-sm font-bold transition-colors ${
                activeTier === tier
                  ? "bg-accent-cta text-bg-base shadow-md"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              ₹{tier} Pack
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Full-Width Split Band */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {/* Right Half: ₹20 Pack */}
        <motion.div
          id="range-20"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`${
            activeTier === 20 ? "flex" : "hidden"
          } relative scroll-mt-24 flex-col justify-between bg-price-secondary p-6 text-on-accent sm:p-12 md:p-16 lg:flex`}
        >
          {/* Background fizz grid watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 fizz-grid" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full border border-on-accent/30 bg-bg-base/15 px-4 py-1 text-xs font-bold tracking-widest text-on-accent uppercase">
                300ML FAMILY VALUE PACK
              </span>

              {/* Price Circle Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-on-accent bg-price-badge-secondary shadow-xl dark:border-accent-cta">
                <span className="font-display text-2xl font-bold text-on-accent dark:text-bg-base">
                  ₹20
                </span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold uppercase tracking-[0.015em] text-on-accent sm:text-6xl">
              ₹20 PACK
            </h2>

            <p className="mt-3 max-w-md text-base text-on-accent/90">
              Double the volume for full afternoon sharing. Crafted for family meals, roadside
              dhabas and festival gatherings.
            </p>

            {/* Visual Flavour Cards Grid for ₹20 Range */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-bold tracking-widest text-on-accent/90 uppercase">
                Available Flavours in ₹20 Tier:
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {productsForTier(20).map((flavor) => (
                  <PetFlavorCard
                    key={flavor.id}
                    flavor={flavor}
                    onSelect={onSelectFlavor}
                    titleColorClass="text-accent-support"
                  />
                ))}
              </div>

              <div className="mt-4 inline-block rounded-full bg-bg-base px-3.5 py-1 text-[10px] font-bold tracking-wider text-accent-support uppercase">
                Double Volume · Max Carbonation · 300ml
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-on-accent/20 pt-4 text-xs font-bold tracking-widest text-on-accent/80 uppercase">
            <span>Family Value Pack</span>
            <span>300ml Clear PET Range</span>
          </div>
        </motion.div>

        {/* Left Half: ₹10 Pack */}
        <motion.div
          id="range-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`${
            activeTier === 10 ? "flex" : "hidden"
          } relative scroll-mt-24 flex-col justify-between bg-accent-primary p-6 text-on-accent sm:p-12 md:p-16 lg:flex`}
        >
          {/* Background fizz grid watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 fizz-grid" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full border border-on-accent/30 bg-bg-base/15 px-4 py-1 text-xs font-bold tracking-widest text-on-accent uppercase">
                160ML ON-THE-GO PET RANGE
              </span>

              {/* Price Circle Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-on-accent bg-accent-primary shadow-xl">
                <span className="font-display text-2xl font-bold text-on-accent">₹10</span>
              </div>
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold uppercase tracking-[0.015em] text-on-accent sm:text-6xl">
              ₹10 PACK
            </h2>

            <p className="mt-3 max-w-md text-base text-on-accent/90">
              High fizz pocket-sized PET bottles designed for daily street crispness. Portable,
              recyclable, zero compromise.
            </p>

            {/* Visual Flavour Cards Grid for ₹10 Range */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-bold tracking-widest text-on-accent/90 uppercase">
                Available Flavours in ₹10 Tier:
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {productsForTier(10).map((flavor) => (
                  <PetFlavorCard
                    key={flavor.id}
                    flavor={flavor}
                    onSelect={onSelectFlavor}
                    titleColorClass="text-accent-primary"
                  />
                ))}
              </div>

              <div className="mt-4 inline-block rounded-full bg-bg-base px-3.5 py-1 text-[10px] font-bold tracking-wider text-accent-primary uppercase">
                Low Calorie · Stevia Sweetened · 160ml
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-on-accent/20 pt-4 text-xs font-bold tracking-widest text-on-accent/80 uppercase">
            <span>Everyday Street Price</span>
            <span>160ml Clear PET Range</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
