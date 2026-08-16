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
    <Section id="stores" className="bg-[#F9F3E5] py-20 border-y border-[#D8C8A6]/60">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-[#7A1F1F] uppercase">
            DISTRIBUTION NETWORK · EST. 1962
          </span>
          <h2 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl text-[#1A1A1A]">
            FROM OUR TOWN TO YOURS
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#5C4A38]">
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
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D8C8A6] bg-[#F6EFDD] p-6 shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#7A1F1F] uppercase">
                FLEET 1962
              </span>
              <h3 className="mt-1 font-display text-xl font-bold uppercase text-[#1A1A1A]">
                FRESH DELIVERY
              </h3>
              <p className="mt-2 text-xs text-[#5C4A38] leading-relaxed">
                Our vintage distribution trucks transport wooden crates directly from bottling works to neighborhood kirana stores.
              </p>
            </div>
            
            <div className="my-4 overflow-hidden rounded-xl border border-[#D8C8A6]/50 bg-[#EAE0C8]/40 p-2">
              <img
                src={VINTAGE_ILLUSTRATIONS.truck}
                alt="Old Glory Soda vintage delivery truck illustration"
                className="h-44 w-full object-contain filter sepia-[0.6] contrast-[1.1]"
              />
            </div>

            <div className="text-[10px] font-bold tracking-wider text-[#5C4A38] uppercase border-t border-[#D8C8A6]/50 pt-3">
              🚚 Daily Bottling Logistics
            </div>
          </motion.div>

          {/* 2. Town List with Status Pills (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between rounded-2xl border border-[#D8C8A6] bg-[#F6EFDD] p-6 shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#7A1F1F] uppercase">
                COVERAGE STATUS
              </span>
              <h3 className="mt-1 font-display text-xl font-bold uppercase text-[#1A1A1A]">
                TOWN LIST
              </h3>
              <p className="mt-2 text-xs text-[#5C4A38]">
                Active distribution centers & upcoming rollouts:
              </p>
            </div>

            <div className="my-5 space-y-3">
              {STORE_LOCATIONS.map((loc) => {
                const isInStock = loc.status === "in-stock";
                return (
                  <div
                    key={loc.city}
                    className="flex items-center justify-between rounded-xl border border-[#D8C8A6]/60 bg-[#F9F3E5] px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7A1F1F]/10 text-[#7A1F1F]">
                        <Location size={18} variant="Bold" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-[#1A1A1A]">
                          {loc.city}
                        </p>
                        <p className="text-[10px] text-[#5C4A38]">
                          {isInStock ? "Distributors Active" : "Scheduled Next"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                        isInStock
                          ? "bg-[#2E3B2C] text-[#F6EFDD]"
                          : "bg-[#EAE0C8] text-[#5C4A38]"
                      }`}
                    >
                      {isInStock ? "In Stock" : "Coming Soon"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] font-bold tracking-wider text-[#5C4A38] uppercase border-t border-[#D8C8A6]/50 pt-3">
              📍 More Towns Added Monthly
            </div>
          </motion.div>

          {/* 3. Simple Line-Art Map with Location Pins (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-[#D8C8A6] bg-[#F6EFDD] p-6 shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#7A1F1F] uppercase">
                TERRITORY MAP
              </span>
              <h3 className="mt-1 font-display text-xl font-bold uppercase text-[#1A1A1A]">
                LINE-ART MAP
              </h3>
              <p className="mt-2 text-xs text-[#5C4A38]">
                Regional hub coordinates & retail pins:
              </p>
            </div>

            <div className="relative my-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-[#D8C8A6] bg-[#EAE0C8]/40 p-4">
              {/* Line-art map background drawing */}
              <svg viewBox="0 0 200 160" className="h-full w-full opacity-60 text-[#4A3525]">
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
                <circle cx="95" cy="65" r="4" fill="#7A1F1F" />
                <circle cx="65" cy="100" r="3" fill="#2E3B2C" />
                <circle cx="130" cy="90" r="3" fill="#2E3B2C" />
              </svg>

              {/* Pin Callout Labels */}
              <div className="absolute top-10 left-12 rounded-full bg-[#7A1F1F] px-2 py-0.5 text-[9px] font-bold text-[#F6EFDD] shadow">
                Raipur Hub
              </div>
              <div className="absolute bottom-8 left-8 rounded-full bg-[#2E3B2C] px-2 py-0.5 text-[9px] font-bold text-[#F6EFDD] shadow">
                Balod
              </div>
              <div className="absolute bottom-12 right-10 rounded-full bg-[#2E3B2C] px-2 py-0.5 text-[9px] font-bold text-[#F6EFDD] shadow">
                Dalli
              </div>
            </div>

            <div className="text-[10px] font-bold tracking-wider text-[#5C4A38] uppercase border-t border-[#D8C8A6]/50 pt-3">
              🗺️ Chhattisgarh Supply Zone
            </div>
          </motion.div>

          {/* 4. Dark CTA Card (Far Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-between rounded-2xl bg-[#7A1F1F] p-6 text-[#F6EFDD] shadow-xl"
          >
            <div>
              <span className="inline-block rounded-full bg-[#F6EFDD]/15 px-3 py-1 text-[10px] font-bold tracking-widest text-[#F6EFDD] uppercase border border-[#F6EFDD]/30">
                INVITE US
              </span>
              <h3 className="mt-4 font-display text-2xl font-black uppercase leading-tight text-[#F6EFDD]">
                LOVE OLD GLORY?
              </h3>
              <p className="mt-2 text-xs text-[#F6EFDD]/90 leading-relaxed">
                Help it reach your town! Tell us where you want Old Glory Soda stocked next.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="my-4 space-y-3">
              {submitted ? (
                <div className="rounded-xl border border-[#F6EFDD]/40 bg-[#F6EFDD]/20 p-4 text-center text-xs font-bold text-[#F6EFDD]">
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
                    className="w-full rounded-full border border-[#F6EFDD]/30 bg-[#F6EFDD]/10 px-4 py-2.5 text-xs text-[#F6EFDD] placeholder-[#F6EFDD]/60 focus:outline-none focus:ring-2 focus:ring-[#F6EFDD]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#F6EFDD] px-4 py-3 text-xs font-bold tracking-wider text-[#7A1F1F] uppercase shadow transition-all hover:bg-white hover:scale-105 active:scale-95"
                  >
                    Let Us Know →
                  </button>
                </>
              )}
            </form>

            <div className="text-[10px] font-bold tracking-wider text-[#F6EFDD]/80 uppercase border-t border-[#F6EFDD]/20 pt-3">
              ✉️ Direct Retailer & Customer Request
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
