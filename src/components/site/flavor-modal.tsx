import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { CloseCircle, Location, Star1 } from "iconsax-reactjs";
import type { Flavor } from "./data";
import { flavorImage } from "./images";
import { scrollToSection } from "./use-lenis";

export function FlavorModal({ flavor, onClose }: { flavor: Flavor | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const image = flavor ? flavorImage(flavor.id) : undefined;

  return (
    <AnimatePresence>
      {flavor && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-background/80 p-4 backdrop-blur-md"
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
            className="relative max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-silver/25 bg-card p-6 sm:p-8"
            style={{ boxShadow: `0 40px 90px -40px ${flavor.color}` }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-25"
              style={{ background: `radial-gradient(90% 60% at 90% 0%, ${flavor.color}, transparent 60%)` }}
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <CloseCircle size={26} variant="Linear" />
            </button>

            <div className="relative grid gap-6 sm:grid-cols-[0.9fr_1fr] sm:items-center">
              <div className="mx-auto w-full overflow-hidden rounded-2xl border border-silver/20">
                {image && !flavor.comingSoon ? (
                  <img
                    src={image}
                    alt={`Old Glory ${flavor.name}`}
                    className={`h-full w-full object-cover ${flavor.packaging === "pet" ? "brightness-105 saturate-[0.92]" : ""}`}
                  />
                ) : (
                  <div
                    className="grid h-56 w-full place-items-center text-xs tracking-[0.2em] uppercase"
                    style={{ background: `${flavor.color}22`, color: flavor.color }}
                  >
                    Image coming soon
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: flavor.color }}
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
                        style={{ borderColor: `${flavor.color}66`, color: flavor.color }}
                      >
                        <Star1 size={12} variant="Bold" color={flavor.color} />
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
                  style={{ background: flavor.color }}
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
