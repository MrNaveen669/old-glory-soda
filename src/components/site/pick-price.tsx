import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Drop } from "iconsax-reactjs";
import { PET_RANGE, PET_TIERS, type Flavor, type PetTier } from "./data";
import { flavorImage } from "./images";
import { FlavorModal } from "./flavor-modal";
import { Section, SectionHeading } from "./primitives";

function PetBottle({ flavor }: { flavor: Flavor }) {
  return (
    <div
      className="relative mx-auto flex h-44 w-20 flex-col items-center"
      aria-hidden
      style={{ filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.25))" }}
    >
      {/* blue screw cap */}
      <span className="h-4 w-8 rounded-t-md bg-[#1FA2E8]" />
      <span className="h-1.5 w-8 bg-[#177FBB]" />
      {/* neck */}
      <span className="h-4 w-5 bg-white/25" />
      {/* clear PET body */}
      <span
        className="relative w-16 flex-1 overflow-hidden rounded-t-xl rounded-b-2xl border border-white/50 bg-white/20"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <span
          className="absolute inset-x-0 bottom-0 h-[78%]"
          style={{ background: `linear-gradient(180deg, ${flavor.tint}, ${flavor.color})`, opacity: 0.85 }}
        />
        <span className="absolute inset-y-6 left-1.5 w-1.5 rounded-full bg-white/60" />
        <span className="absolute inset-x-0 top-1/3 h-6 border-y border-white/50 bg-white/25" />
      </span>
    </div>
  );
}

export function PickYourPrice() {
  const [tier, setTier] = useState<PetTier>(10);
  const [openId, setOpenId] = useState<string | null>(null);
  const items = PET_RANGE[tier];
  const active = items.find((f) => f.id === openId) ?? null;

  return (
    <Section id="pricing" className="overflow-hidden">
      <SectionHeading
        eyebrow="Pick your price"
        title="₹10 or ₹20 — same spark, PET bottle."
        intro="Our everyday range comes in clear PET bottles with a blue screw cap. Pick a tier to see what's pouring."
      />

      <div className="mt-8 inline-flex rounded-full border border-silver/30 bg-card p-1">
        {PET_TIERS.map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`relative rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
              tier === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={tier === t}
          >
            {tier === t && (
              <motion.span
                layoutId="tier-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">₹{t} Bottles</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((f, i) => (
            <motion.button
              key={f.id}
              layout
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => setOpenId(f.id)}
              className="group relative overflow-hidden rounded-3xl border border-silver/20 bg-card p-6 text-left"
              style={{ boxShadow: `0 24px 60px -40px ${f.color}` }}
              aria-label={`View ${f.name} details`}
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                style={{ background: `radial-gradient(120% 80% at 80% 0%, ${f.color}, transparent 65%)` }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                    style={{ background: `${f.color}26`, color: f.color }}
                  >
                    <Drop size={12} variant="Bold" color={f.color} />
                    PET · ₹{f.price}
                  </span>
                  {f.comingSoon ? (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="rounded-full bg-highlight/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-highlight uppercase">
                      Low Calorie Drink
                    </span>
                  )}
                </div>

                <div className="my-5">
                  {f.comingSoon ? (
                    <div className="mx-auto grid h-44 w-full place-items-center rounded-2xl border border-dashed border-silver/40 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Coming soon
                    </div>
                  ) : (
                    <div className="relative grid grid-cols-[auto_1fr] items-center gap-4">
                      <PetBottle flavor={f} />
                      <img
                        src={flavorImage(f.id)}
                        alt={`Old Glory ${f.name} PET bottle range`}
                        loading="lazy"
                        className="h-36 w-full rounded-2xl border border-silver/15 object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                <h3 className="font-brand text-lg leading-tight sm:text-xl">{f.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {f.comingSoon ? "Details to be announced." : f.description}
                </p>
                <span
                  className="mt-4 inline-block text-xs font-semibold tracking-widest uppercase"
                  style={{ color: f.color }}
                >
                  View details →
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <FlavorModal flavor={active} onClose={() => setOpenId(null)} />
    </Section>
  );
}
