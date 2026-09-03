import { ClientOnly } from "@tanstack/react-router";
import { motion } from "motion/react";
import { lazy, Suspense, useRef, useState } from "react";

import { ArrowLeft2, ArrowRight2, Call, ExportSquare, Location, Shop } from "iconsax-reactjs";

import type { CircleMarker as LeafletCircleMarker } from "leaflet";

import {
  CITY_LOCATIONS,
  DEFAULT_CITY,
  formatPhoneNumber,
  getGoogleMapsUrl,
  getStatusLabel,
  RAIPUR_OUTLETS,
  type CityLocation,
  type CityName,
  type MapMode,
  type RaipurOutlet,
} from "./stores-data";
import { Section } from "./primitives";

const DistributionMap = lazy(() => import("./stores-map.client"));

function MapFallback() {
  return <div className="h-full w-full bg-[#304a63]" aria-label="Loading distribution map" />;
}

function OutletCard({
  outlet,
  index,
  selected,
  onSelect,
}: {
  outlet: RaipurOutlet;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className={`group flex min-h-[86px] w-full items-stretch overflow-hidden rounded-[19px] border bg-bg-base/20 transition ${
        selected
          ? "border-accent-primary/80 bg-bg-muted/35 shadow-lg"
          : "border-border-theme/80 hover:border-accent-primary/40 hover:bg-bg-muted/25"
      }`}
    >
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left sm:px-5"
      >
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
            selected ? "bg-accent-primary/25 text-accent-primary" : "bg-[#399257]/15 text-[#60ad74]"
          }`}
        >
          <Location size={18} variant="Bold" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-xs font-bold text-text-primary">{outlet.name}</span>
            <span className="shrink-0 rounded-full bg-[#385f36] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#78bd6b]">
              IN STOCK
            </span>
          </span>
          <span className="mt-1 block text-[9px] leading-4 text-text-muted">
            {outlet.area}
            {outlet.approximate ? " · Area pin" : ""}
          </span>
        </span>

        <ArrowRight2
          size={14}
          className={`shrink-0 transition ${
            selected
              ? "translate-x-0.5 text-accent-primary"
              : "text-text-muted group-hover:translate-x-0.5 group-hover:text-accent-primary"
          }`}
        />
      </button>

      <a
        href={getGoogleMapsUrl(outlet)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${outlet.name} in Google Maps`}
        title="Open in Google Maps"
        className="grid w-11 shrink-0 place-items-center border-l border-border-theme/60 text-text-muted transition hover:bg-bg-muted/45 hover:text-accent-primary"
      >
        <ExportSquare size={15} />
      </a>
    </motion.div>
  );
}

export function Stores() {
  const [mapMode, setMapMode] = useState<MapMode>("overview");
  const [selectedCity, setSelectedCity] = useState<CityName>(DEFAULT_CITY);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const markerRefs = useRef<Record<string, LeafletCircleMarker | null>>({});
  const selectedLocation = CITY_LOCATIONS.find((location) => location.city === selectedCity)!;
  const selectedPhone =
    selectedLocation.status === "in-stock" ? selectedLocation.distributor.phone : undefined;

  const selectCity = (location: CityLocation) => {
    setSelectedCity(location.city);
    setSelectedOutletId(null);
    setMapMode(location.city === "Raipur" ? "raipur" : "overview");
  };

  const showAllTowns = () => {
    setMapMode("overview");
    setSelectedOutletId(null);
  };

  return (
    <Section
      id="stores"
      className="relative overflow-hidden border-y border-border-theme/40 bg-bg-surface py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute right-[20%] top-[31%] h-1.5 w-1.5 rounded-full bg-[#9a8038]/70" />
        <span className="absolute right-[15%] top-[45%] h-1.5 w-1.5 rounded-full bg-[#9a8038]/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/50 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.28em] text-accent-primary">
              <span className="h-1 w-1 rounded-full bg-accent-primary" />
              Where to buy
            </span>

            <h2 className="mt-5 max-w-[500px] font-display text-[39px] font-bold leading-[1.02] tracking-[0.01em] text-text-primary sm:text-[46px] lg:text-[49px]">
              A crate is closer
              <br />
              than you think.
            </h2>

            <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-text-muted">
              {mapMode === "raipur"
                ? "Explore seven Old Glory outlets across Raipur. Select an outlet to see its map pin and open directions."
                : "Old Glory is expanding across Chhattisgarh. Select a city to see its availability, distributor details and map location."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {mapMode === "raipur" ? (
                <motion.button
                  type="button"
                  onClick={showAllTowns}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#42a8df] px-5 py-2.5 text-[11px] font-semibold text-[#111820]"
                >
                  <ArrowLeft2 size={16} />
                  All Cities
                </motion.button>
              ) : (
                <motion.a
                  href={getGoogleMapsUrl(selectedLocation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#42a8df] px-5 py-2.5 text-[11px] font-semibold text-[#111820] shadow-lg"
                >
                  <Location size={16} variant="Bold" />
                  Open {selectedCity} Map
                </motion.a>
              )}

              {selectedPhone ? (
                <motion.a
                  href={`tel:+91${selectedPhone}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-theme px-5 py-2.5 text-[11px] font-semibold text-text-primary transition hover:bg-bg-muted/30"
                >
                  <Call size={16} />
                  Call {formatPhoneNumber(selectedPhone)}
                </motion.a>
              ) : selectedLocation.status === "in-stock" ? (
                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-theme px-5 py-2.5 text-[11px] font-semibold text-text-primary transition hover:bg-bg-muted/30"
                >
                  <Call size={16} />
                  Contact Us
                </motion.a>
              ) : null}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mt-9 h-[330px] overflow-hidden rounded-[24px] border border-border-theme/80 bg-[#304a63] p-2.5 sm:h-[370px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                <ClientOnly fallback={<MapFallback />}>
                  <Suspense fallback={<MapFallback />}>
                    <DistributionMap
                      mapMode={mapMode}
                      selectedCity={selectedCity}
                      selectedOutletId={selectedOutletId}
                      markerRefs={markerRefs}
                      onSelectCity={selectCity}
                      onSelectOutlet={setSelectedOutletId}
                    />
                  </Suspense>
                </ClientOnly>

                <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-xl bg-[#252c36]/92 px-3.5 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#a9a18b]">
                    {mapMode === "raipur" ? "AVAILABLE IN RAIPUR" : "DISTRIBUTION NETWORK"}
                  </p>
                  <h3 className="mt-0.5 text-[11px] font-semibold text-white">
                    {mapMode === "raipur" ? "7 LOCATIONS" : selectedCity}
                  </h3>
                </div>
              </div>
            </motion.div>

            {mapMode === "overview" ? (
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[9px] text-text-muted">
                {CITY_LOCATIONS.map((location) => (
                  <span key={location.city} className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        selectedCity === location.city
                          ? "bg-accent-primary"
                          : location.status === "in-stock"
                            ? "bg-[#399257]"
                            : "bg-[#d25448]"
                      }`}
                    />
                    {location.city} — {getStatusLabel(location.status)}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2 text-[9px] text-text-muted">
                <span className="h-2 w-2 rounded-full bg-[#399257]" />
                Green markers = Old Glory available in Raipur
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="flex min-w-0 flex-col lg:pt-3"
          >
            {mapMode === "overview" ? (
              <>
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent-primary">
                    DISTRIBUTION NETWORK
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-text-primary">
                    Choose your city.
                  </h3>
                </div>

                <div className="mt-6 space-y-3">
                  {CITY_LOCATIONS.map((location, index) => {
                    const selected = selectedCity === location.city;
                    const available = location.status === "in-stock";

                    return (
                      <motion.button
                        key={location.city}
                        type="button"
                        aria-pressed={selected}
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1 + index * 0.06 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => selectCity(location)}
                        className={`flex min-h-[72px] w-full items-center justify-between gap-3 rounded-[19px] border px-4 py-3 text-left transition sm:px-5 ${
                          selected
                            ? "border-accent-primary/80 bg-bg-muted/35 shadow-lg shadow-accent-primary/10"
                            : "border-border-theme/80 bg-bg-base/20 hover:border-accent-primary/40 hover:bg-bg-muted/25 hover:shadow-lg"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                              available
                                ? "bg-accent-primary/15 text-accent-primary"
                                : "bg-bg-muted/70 text-[#c5bea9]"
                            }`}
                          >
                            <Shop size={18} variant={available ? "Bold" : "Linear"} />
                          </span>

                          <span className="min-w-0">
                            <span className="block truncate font-display text-sm font-bold text-text-primary">
                              {location.city}
                            </span>
                            <span className="mt-0.5 block truncate text-[10px] text-text-muted">
                              {location.city === "Raipur"
                                ? "Tap to see 7 locations"
                                : available
                                  ? location.distributor.location
                                  : "Coming soon"}
                            </span>
                          </span>
                        </span>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] ${
                            available
                              ? "bg-[#385f36] text-[#78bd6b]"
                              : "bg-bg-muted text-text-muted"
                          }`}
                        >
                          {getStatusLabel(location.status)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <motion.div
                  key={selectedCity}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  aria-live="polite"
                  className="mt-6 overflow-hidden rounded-[22px] border border-accent-primary/60 bg-bg-base/30 p-5 shadow-lg shadow-accent-primary/10 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent-primary">
                        SELECTED LOCATION
                      </span>
                      <h4 className="mt-2 font-display text-xl font-bold text-text-primary">
                        {selectedLocation.status === "in-stock"
                          ? selectedLocation.distributor.name
                          : `Old Glory Soda - ${selectedCity}`}
                      </h4>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] ${
                        selectedLocation.status === "in-stock"
                          ? "bg-[#385f36] text-[#78bd6b]"
                          : "bg-bg-muted text-text-muted"
                      }`}
                    >
                      {getStatusLabel(selectedLocation.status)}
                    </span>
                  </div>

                  <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                    <Location size={16} className="shrink-0 text-accent-primary" variant="Bold" />
                    {selectedLocation.status === "in-stock"
                      ? selectedLocation.distributor.location
                      : `${selectedCity}, Chhattisgarh`}
                  </p>

                  {selectedPhone ? (
                    <a
                      href={`tel:+91${selectedPhone}`}
                      aria-label={`Call Old Glory Soda in ${selectedCity} at ${formatPhoneNumber(selectedPhone)}`}
                      className="mt-4 flex min-h-12 w-full items-center gap-3 rounded-2xl border border-accent-primary/50 bg-accent-primary/10 px-4 py-3 text-accent-primary transition hover:bg-accent-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary sm:w-fit"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-primary/20">
                        <Call size={18} variant="Bold" />
                      </span>
                      <span>
                        <span className="block text-[8px] font-bold uppercase tracking-[0.16em] text-text-muted">
                          CALL DISTRIBUTOR
                        </span>
                        <span className="mt-0.5 block text-base font-semibold tabular-nums">
                          {formatPhoneNumber(selectedPhone)}
                        </span>
                      </span>
                    </a>
                  ) : selectedLocation.status === "in-stock" ? (
                    <a
                      href="#contact"
                      className="mt-4 flex min-h-12 w-full items-center gap-3 rounded-2xl border border-accent-primary/50 bg-accent-primary/10 px-4 py-3 text-accent-primary transition hover:bg-accent-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary sm:w-fit"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-primary/20">
                        <Call size={18} variant="Bold" />
                      </span>
                      <span>
                        <span className="block text-[8px] font-bold uppercase tracking-[0.16em] text-text-muted">
                          NEED HELP FINDING A STORE?
                        </span>
                        <span className="mt-0.5 block text-base font-semibold">Contact Us</span>
                      </span>
                    </a>
                  ) : (
                    <p className="mt-4 text-xs leading-6 text-text-muted">
                      Distributor details will be added when Old Glory launches in {selectedCity}.
                    </p>
                  )}

                  <a
                    href={getGoogleMapsUrl(selectedLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold text-accent-primary transition hover:gap-3"
                  >
                    Open {selectedCity} in Google Maps
                    <ExportSquare size={14} />
                  </a>
                </motion.div>
              </>
            ) : (
              <>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent-primary">
                      AVAILABLE IN RAIPUR
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold text-text-primary">
                      Find Old Glory nearby.
                    </h3>
                  </div>
                  <span className="rounded-full border border-border-theme px-3 py-1.5 text-[9px] text-text-muted">
                    7 locations
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {RAIPUR_OUTLETS.map((outlet, index) => (
                    <OutletCard
                      key={outlet.id}
                      outlet={outlet}
                      index={index}
                      selected={selectedOutletId === outlet.id}
                      onSelect={() => setSelectedOutletId(outlet.id)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={showAllTowns}
                  className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold text-accent-primary transition hover:gap-3"
                >
                  <ArrowLeft2 size={14} />
                  All Cities
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
