import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { CloseCircle, Location, Star1 } from "iconsax-reactjs";
import type { Flavor } from "./data";
import { flavorImage, flavorFullImage } from "./images";
import { NutritionFacts } from "./nutrition-facts";
import { scrollToSection } from "./use-lenis";

function splitIngredientNote(raw: string) {
  const noteStart = raw.indexOf("(Contains Plant-Based Sweetener");

  if (noteStart === -1) {
    return { ingredients: raw, note: null };
  }

  return {
    ingredients: raw.slice(0, noteStart).trim(),
    note: raw.slice(noteStart).replace(/^\(|\)$/g, ""),
  };
}

export function FlavorModal({ flavor, onClose }: { flavor: Flavor | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cutout = flavor ? flavorImage(flavor.id) : undefined;
  const fullScene = flavor ? flavorFullImage(flavor.id) : undefined;
  const accent = flavor ? `var(--flavor-${flavor.id})` : "var(--accent-primary)";
  const ingredientCopy = flavor?.ingredients ? splitIngredientNote(flavor.ingredients) : null;
  const petVolume =
    flavor?.packaging === "pet"
      ? flavor.price === 10
        ? "160 ML"
        : flavor.price === 20
          ? "300 ML"
          : null
      : null;

  return (
    <AnimatePresence>
      {flavor && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-overlay/75 p-2 backdrop-blur-md sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${flavor.name} details`}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[calc(100svh-1rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-border-theme bg-bg-base p-3 text-text-primary sm:max-h-[90svh] sm:p-8"
            style={{
              boxShadow: `0 30px 80px -20px color-mix(in srgb, ${accent} 38%, transparent)`,
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                background: `radial-gradient(80% 50% at 80% 0%, ${accent}, transparent 70%)`,
              }}
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-bg-muted text-text-muted transition-colors hover:bg-accent-primary hover:text-on-accent sm:top-4 sm:right-4"
            >
              <CloseCircle size={24} variant="Linear" />
            </button>

            <div className="relative grid gap-6 sm:grid-cols-[0.95fr_1.05fr] sm:items-center">
              {/* Image Container displaying Full Scene artwork */}
              <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-border-theme bg-bg-surface p-2 shadow-inner">
                {fullScene && flavor.packaging === "glass" && !flavor.comingSoon ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-bg-muted/50">
                    <img
                      src={fullScene}
                      alt={`Old Glory ${flavor.name} full scene artwork`}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-overlay/80 to-transparent p-3 text-center">
                      <span className="text-[10px] font-bold tracking-widest text-on-accent uppercase">
                        Full Scene View · Signature Reserve
                      </span>
                    </div>
                  </div>
                ) : cutout ? (
                  <div className="flex h-64 w-full items-center justify-center p-4">
                    <img
                      src={cutout}
                      alt={`Old Glory ${flavor.name}`}
                      className="h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                ) : (
                  <div
                    className="grid h-56 w-full place-items-center text-xs tracking-[0.2em] uppercase"
                    style={{
                      background: `color-mix(in srgb, ${accent} 13%, transparent)`,
                      color: accent,
                    }}
                  >
                    Image coming soon
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: accent }}
                  >
                    {flavor.note}
                  </span>
                  {flavor.lowCalorie && flavor.packaging !== "pet" && (
                    <span className="rounded-full bg-highlight/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-highlight uppercase">
                      Low Calorie Drink
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-brand text-2xl sm:text-3xl">{flavor.name}</h3>
                {flavor.packaging === "pet" && (
                  <div
                    className="mt-2 flex flex-wrap gap-1.5"
                    aria-label={`${flavor.price ? `₹${flavor.price}` : "PET"} product details`}
                  >
                    {flavor.price && (
                      <span
                        className="rounded-full border px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] uppercase"
                        style={{ borderColor: accent, color: accent }}
                      >
                        ₹{flavor.price}
                      </span>
                    )}
                    <span className="rounded-full border border-border-theme bg-bg-surface px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-text-muted uppercase">
                      PET Bottle
                    </span>
                    {petVolume && (
                      <span className="rounded-full border border-border-theme bg-bg-surface px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-text-muted uppercase">
                        {petVolume}
                      </span>
                    )}
                    {flavor.lowCalorie && (
                      <span className="rounded-full border border-accent-cta/45 bg-accent-cta/10 px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-accent-cta uppercase">
                        Low Calorie
                      </span>
                    )}
                    {flavor.comingSoon && (
                      <span className="rounded-full border border-accent-secondary/55 bg-accent-secondary/10 px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-accent-secondary uppercase">
                        Coming Soon
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                  {flavor.description}
                </p>

                {flavor.nutrition && (
                  <NutritionFacts nutrition={flavor.nutrition} accent={accent} />
                )}

                {ingredientCopy && (
                  <div className="mt-4 border-l-2 pl-3" style={{ borderColor: accent }}>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-text-primary uppercase">
                      Ingredients
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-text-muted sm:text-xs">
                      {ingredientCopy.ingredients}
                    </p>
                    {ingredientCopy.note && (
                      <p className="mt-2 text-[10px] font-semibold leading-relaxed text-text-primary sm:text-[11px]">
                        {ingredientCopy.note}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-silver/20 p-3">
                    <p className="text-xs text-muted-foreground">Sweetness</p>
                    <p className="mt-1 font-semibold">{flavor.sweetness}</p>
                  </div>
                  <div className="rounded-2xl border border-silver/20 p-3">
                    <p className="text-xs text-muted-foreground">Fizz level</p>
                    <p className="mt-1 font-semibold">{flavor.fizz}</p>
                  </div>
                </div>

                {flavor.pairs.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {flavor.pairs.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                        style={{
                          borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
                          color: accent,
                        }}
                      >
                        <Star1 size={12} variant="Bold" color={accent} />
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (flavor.comingSoon) return;
                    onClose();
                    scrollToSection("stores");
                  }}
                  disabled={flavor.comingSoon}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-65"
                  style={{ background: flavor.comingSoon ? "var(--bg-muted)" : accent }}
                >
                  <Location size={18} variant="Linear" />
                  {flavor.comingSoon ? "Coming Soon" : "Find this near me"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
