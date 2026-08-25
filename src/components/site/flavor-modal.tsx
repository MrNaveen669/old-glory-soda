import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { CloseCircle, Location, Star1 } from "iconsax-reactjs";
import type { Flavor } from "./data";
import { flavorImage, flavorFullImage } from "./images";
import { scrollToSection } from "./use-lenis";

function parseIngredients(raw: string): { name: string; code: string }[] {
  return raw
    .split(/,(?![^(]*\))/g)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const match = part.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
      if (match?.[1] && match[2]) {
        const inner = match[2].trim();
        if (/\d/.test(inner) && /^(INS\s*)?[\w\d]+([,\s]+[\w\d]+)*$/.test(inner)) {
          return { name: match[1].trim(), code: inner };
        }
      }
      return { name: part, code: "—" };
    });
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

  return (
    <AnimatePresence>
      {flavor && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-overlay/75 p-4 backdrop-blur-md"
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
            className="relative max-h-[calc(100svh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-border-theme bg-bg-base p-4 text-text-primary sm:max-h-[90svh] sm:p-8"
            style={{ boxShadow: `0 30px 80px -20px color-mix(in srgb, ${accent} 38%, transparent)` }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ background: `radial-gradient(80% 50% at 80% 0%, ${accent}, transparent 70%)` }}
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
                {fullScene && !flavor.comingSoon ? (
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
                  {flavor.lowCalorie && (
                    <span className="rounded-full bg-highlight/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-highlight uppercase">
                      Low Calorie Drink
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-brand text-2xl sm:text-3xl">{flavor.name}</h3>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                  {flavor.description}
                </p>

                {flavor.ingredients && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                      Ingredients ({flavor.flavourType})
                    </p>
                    <div className="mt-2 overflow-hidden rounded-2xl border border-silver/30 bg-background/60 transition-transform duration-300 ease-out hover:scale-[1.03]">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-secondary/60 text-foreground">
                            <th className="px-3 py-2 font-semibold">Ingredient</th>
                            <th className="w-28 px-3 py-2 font-semibold">Code/Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parseIngredients(flavor.ingredients).map((row) => (
                            <tr
                              key={row.name}
                              className="border-t border-silver/25 transition-transform duration-200 ease-out hover:scale-[1.02] hover:bg-secondary/40"
                            >
                              <td className="px-3 py-2 text-foreground/90">{row.name}</td>
                              <td className="px-3 py-2 text-muted-foreground">{row.code}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {!flavor.comingSoon && (
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-silver/20 p-3">
                      <p className="text-xs text-muted-foreground">Sweetness</p>
                      <p className="mt-1 font-semibold">{flavor.sweetness}</p>
                    </div>
                    <div className="rounded-2xl border border-silver/20 p-3">
                      <p className="text-xs text-muted-foreground">
                        {flavor.packaging === "pet" ? "Packaging" : "Fizz level"}
                      </p>
                      <p className="mt-1 font-semibold">
                        {flavor.packaging === "pet" ? "PET bottle, blue cap" : flavor.fizz}
                      </p>
                    </div>
                  </div>
                )}

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
                    onClose();
                    scrollToSection("stores");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  style={{ background: accent }}
                >
                  <Location size={18} variant="Linear" />
                  Find this near me
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
