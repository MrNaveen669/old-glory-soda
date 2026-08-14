import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Call, CloseCircle, Location, Map1, Profile2User, Shop, Truck } from "iconsax-reactjs";
import { BRAND, STORE_LOCATIONS, type StoreLocation } from "./data";
import { Reveal, Section, SectionHeading } from "./primitives";
import { Bubbles } from "./bottle";

export function Stores() {
  const [openCity, setOpenCity] = useState<string | null>(null);
  const active: StoreLocation | null =
    STORE_LOCATIONS.find((s) => s.city === openCity && s.distributor) ?? null;

  return (
    <Section id="stores" className="overflow-hidden">
      <Bubbles count={10} color="var(--color-highlight)" />
      <div className="relative grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <SectionHeading
            eyebrow="Where to buy"
            title="A crate is closer than you think."
            intro="Old Glory is rolling out across Chhattisgarh, one town at a time. Here is where we are right now."
          />
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="glow-primary inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
                <Truck size={18} variant="Linear" />
                Order Online
              </button>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-silver/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-highlight hover:text-highlight"
              >
                <Call size={18} variant="Linear" />
                Talk to distribution
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-8 rounded-3xl border border-silver/20 bg-card p-4">
              <div className="relative h-48 overflow-hidden rounded-2xl bg-secondary sm:h-56">
                <div className="fizz-grid absolute inset-0 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-transparent" />
                {[
                  { top: "30%", left: "34%" },
                  { top: "58%", left: "60%" },
                  { top: "68%", left: "26%" },
                ].map((pos, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-destructive"
                    style={pos}
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <Location size={26} variant="Bold" color="currentColor" />
                  </motion.span>
                ))}
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-xs">
                  <Map1 size={14} variant="Linear" />
                  Interactive map placeholder
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3 md:mt-4">
          {STORE_LOCATIONS.map((s, i) => {
            const inStock = s.status === "in-stock";
            const Wrapper = inStock ? motion.button : motion.div;
            return (
              <Wrapper
                key={s.city}
                {...(inStock ? { onClick: () => setOpenCity(s.city), type: "button" as const } : {})}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={inStock ? { x: 6 } : undefined}
                className={`glass-panel flex w-full items-center gap-4 rounded-2xl p-4 text-left ${
                  inStock ? "cursor-pointer" : "opacity-70"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    inStock ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Shop size={22} variant="Linear" color="currentColor" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold">{s.city}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {inStock ? "Tap for distributor details" : "Rolling out shortly"}
                  </p>
                </div>
                <span
                  className={`ml-auto shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase ${
                    inStock
                      ? "bg-[#6DC24B]/20 text-[#4f9c33]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {inStock ? "In Stock" : "Coming Soon"}
                </span>
              </Wrapper>
            );
          })}
          <p className="pt-2 text-xs text-muted-foreground">
            Distributor enquiries welcome — more towns being added each month.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {active && active.distributor && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-background/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenCity(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.city} distributor details`}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-3xl border border-silver/25 bg-card p-6 sm:p-8"
            >
              <button
                onClick={() => setOpenCity(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-foreground"
              >
                <CloseCircle size={24} variant="Linear" />
              </button>
              <span className="inline-flex rounded-full bg-[#6DC24B]/20 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#4f9c33] uppercase">
                In Stock
              </span>
              <h3 className="mt-3 font-brand text-2xl">{active.city}</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  { icon: Profile2User, label: "Distributor", value: active.distributor.name },
                  { icon: Shop, label: "About", value: active.distributor.description },
                  { icon: Location, label: "Location", value: active.distributor.location },
                  { icon: Call, label: "Phone", value: active.distributor.phone },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 rounded-2xl border border-silver/20 p-3">
                    <Icon size={18} variant="Linear" className="mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
