import { motion } from "motion/react";
import { useState } from "react";
import { Location } from "iconsax-reactjs";
import { STORE_LOCATIONS } from "./data";
import { VINTAGE_ILLUSTRATIONS } from "./images";
import { Section } from "./primitives";

export function Stores() {
  const [submitted, setSubmitted] = useState(false);
  const [townName, setTownName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (townName.trim()) {
      setSubmitted(true);
      setTownName("");
    }
  };

  return (
    <Section id="stores" className="bg-bg-surface py-20 border-y border-border-theme/60">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-accent-primary uppercase">
            DISTRIBUTION NETWORK · EST. 1962
          </span>
          <h2 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl text-text-primary">
            FROM OUR TOWN TO YOURS
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-text-muted">
            Old Glory Soda is rolling out across Chhattisgarh and beyond. Check current availability or invite us to your town.
          </p>
        </div>

        {/* Grid Layout: Delivery Truck | Town List | Line-Art Map | Dark CTA Card */}
        <div className="mt-14 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {/* 1. Illustrated Delivery Truck (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border-theme bg-bg-base p-6 shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent-primary uppercase">
                FLEET 1962
              </span>
              <h3 className="mt-1 font-display text-xl font-bold uppercase text-text-primary">
                FRESH DELIVERY
              </h3>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                Our vintage distribution trucks transport wooden crates directly from bottling works to neighborhood kirana stores.
              </p>
            </div>
            
            <div className="my-4 overflow-hidden rounded-xl border border-border-theme/50 bg-bg-muted/40 p-2">
              <img
                src={VINTAGE_ILLUSTRATIONS.truck}
                alt="Old Glory Soda vintage delivery truck illustration"
                className="h-44 w-full object-contain filter sepia-[0.6] contrast-[1.1]"
              />
            </div>

            <div className="text-[10px] font-bold tracking-wider text-text-muted uppercase border-t border-border-theme/50 pt-3">
              🚚 Daily Bottling Logistics
            </div>
          </motion.div>

          {/* 2. Town List with Status Pills (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between rounded-2xl border border-border-theme bg-bg-base p-6 shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent-primary uppercase">
                COVERAGE STATUS
              </span>
              <h3 className="mt-1 font-display text-xl font-bold uppercase text-text-primary">
                TOWN LIST
              </h3>
              <p className="mt-2 text-xs text-text-muted">
                Active distribution centers & upcoming rollouts:
              </p>
            </div>

            <div className="my-5 space-y-3">
              {STORE_LOCATIONS.map((loc) => {
                const isInStock = loc.status === "in-stock";
                return (
                  <div
                    key={loc.city}
                    className="flex items-center justify-between rounded-xl border border-border-theme/60 bg-bg-surface px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-primary/10 text-accent-primary">
                        <Location size={18} variant="Bold" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-text-primary">
                          {loc.city}
                        </p>
                        <p className="text-[10px] text-text-muted">
                          {isInStock ? "Distributors Active" : "Scheduled Next"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                        isInStock
                          ? "bg-accent-support text-on-accent"
                          : "bg-bg-muted text-text-muted"
                      }`}
                    >
                      {isInStock ? "In Stock" : "Coming Soon"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] font-bold tracking-wider text-text-muted uppercase border-t border-border-theme/50 pt-3">
              📍 More Towns Added Monthly
            </div>
          </motion.div>

          {/* 3. Simple Line-Art Map with Location Pins (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-border-theme bg-bg-base p-6 shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent-primary uppercase">
                TERRITORY MAP
              </span>
              <h3 className="mt-1 font-display text-xl font-bold uppercase text-text-primary">
                LINE-ART MAP
              </h3>
              <p className="mt-2 text-xs text-text-muted">
                Regional hub coordinates & retail pins:
              </p>
            </div>

            <div className="relative my-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-border-theme bg-bg-muted/40 p-4">
              {/* Line-art map background drawing */}
              <svg viewBox="0 0 200 160" className="h-full w-full opacity-60 text-text-muted-strong">
                <path
                  d="M 20,40 Q 60,20 100,50 T 180,40 T 170,120 T 90,140 T 30,110 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <path
                  d="M 40,80 Q 90,90 140,70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="95" cy="65" r="4" fill="var(--accent-primary)" />
                <circle cx="65" cy="100" r="3" fill="var(--accent-support)" />
                <circle cx="130" cy="90" r="3" fill="var(--accent-support)" />
              </svg>

              {/* Pin Callout Labels */}
              <div className="absolute top-10 left-12 rounded-full bg-accent-primary px-2 py-0.5 text-[9px] font-bold text-on-accent shadow">
                Raipur Hub
              </div>
              <div className="absolute bottom-8 left-8 rounded-full bg-accent-support px-2 py-0.5 text-[9px] font-bold text-on-accent shadow">
                Balod
              </div>
              <div className="absolute bottom-12 right-10 rounded-full bg-accent-support px-2 py-0.5 text-[9px] font-bold text-on-accent shadow">
                Dalli
              </div>
            </div>

            <div className="text-[10px] font-bold tracking-wider text-text-muted uppercase border-t border-border-theme/50 pt-3">
              🗺️ Chhattisgarh Supply Zone
            </div>
          </motion.div>

          {/* 4. Dark CTA Card (Far Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-between rounded-2xl bg-accent-primary p-6 text-on-accent shadow-xl"
          >
            <div>
              <span className="inline-block rounded-full bg-bg-base/15 px-3 py-1 text-[10px] font-bold tracking-widest text-on-accent uppercase border border-on-accent/30">
                INVITE US
              </span>
              <h3 className="mt-4 font-display text-2xl font-black uppercase leading-tight text-on-accent">
                LOVE OLD GLORY?
              </h3>
              <p className="mt-2 text-xs text-on-accent/90 leading-relaxed">
                Help it reach your town! Tell us where you want Old Glory Soda stocked next.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="my-4 space-y-3">
              {submitted ? (
                <div className="rounded-xl border border-on-accent/40 bg-bg-base/20 p-4 text-center text-xs font-bold text-on-accent">
                  ✓ Thank you! We have added your town to our rollout map.
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Enter your town or city name..."
                    value={townName}
                    onChange={(e) => setTownName(e.target.value)}
                    className="w-full rounded-full border border-on-accent/30 bg-bg-base/10 px-4 py-2.5 text-xs text-on-accent placeholder-on-accent/60 focus:outline-none focus:ring-2 focus:ring-on-accent"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-bg-base px-4 py-3 text-xs font-bold tracking-wider text-accent-primary uppercase shadow transition-all hover:bg-on-accent hover:scale-105 active:scale-95"
                  >
                    Let Us Know →
                  </button>
                </>
              )}
            </form>

            <div className="text-[10px] font-bold tracking-wider text-on-accent/80 uppercase border-t border-on-accent/20 pt-3">
              ✉️ Direct Retailer & Customer Request
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
