import { motion } from "motion/react";
import { Call, Location, Map1, Shop, Truck } from "iconsax-reactjs";
import { BRAND, STORES } from "./data";
import { Reveal, Section, SectionHeading } from "./primitives";
import { Bubbles } from "./bottle";

export function Stores() {
  return (
    <Section id="stores" className="overflow-hidden">
      <Bubbles count={10} color="var(--color-highlight)" />
      <div className="relative grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <SectionHeading
            eyebrow="Where to buy"
            title="A crate is closer than you think."
            intro="Old Glory ships to neighbourhood stores, tea stalls and restaurants across South and West India."
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
                  { top: "24%", left: "30%" },
                  { top: "56%", left: "62%" },
                  { top: "70%", left: "22%" },
                  { top: "38%", left: "78%" },
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
          {STORES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 6 }}
              className="glass-panel flex items-center gap-4 rounded-2xl p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-destructive/15 text-destructive">
                <Shop size={22} variant="Linear" color="currentColor" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.city} · {s.detail}
                </p>
              </div>
              <span className="ml-auto shrink-0 text-xs font-semibold text-highlight">In stock</span>
            </motion.div>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            {BRAND.address} · Distributor enquiries welcome.
          </p>
        </div>
      </div>
    </Section>
  );
}
