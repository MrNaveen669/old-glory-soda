import { Setting2 } from "iconsax-reactjs";
import { motion } from "motion/react";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FLAVORS, type Flavor } from "./data";
import { FLAVOR_IMAGES } from "./images";
import { Section } from "./primitives";

const clampSplit = (value: number) => Math.min(76, Math.max(24, value));

function ComparisonCard({ flavor, selected }: { flavor: Flavor; selected: boolean }) {
  const [split, setSplit] = useState(50);
  const cardRef = useRef<HTMLDivElement>(null);

  const updateFromPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSplit(clampSplit(((event.clientY - rect.top) / rect.height) * 100));
  };

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  };

  const drag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSplit((value) => clampSplit(value - 4));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSplit((value) => clampSplit(value + 4));
    } else if (event.key === "Home") {
      event.preventDefault();
      setSplit(24);
    } else if (event.key === "End") {
      event.preventDefault();
      setSplit(76);
    }
  };

  const image = FLAVOR_IMAGES[flavor.id];

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.48 }}
      animate={{ scale: selected ? 1.025 : 1 }}
      className={`relative h-[390px] min-w-0 overflow-hidden rounded-3xl border bg-bg-surface shadow-xl transition-[border-color,box-shadow] duration-300 sm:h-[430px] ${
        selected
          ? "border-accent-primary shadow-[0_0_30px_color-mix(in_srgb,var(--accent-primary)_42%,transparent)]"
          : "border-accent-primary/55 shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_16%,transparent)]"
      }`}
      aria-label={`${flavor.name}: Then and Now comparison`}
    >
      {/* Modern layer remains underneath and is revealed below the divider. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,color-mix(in_srgb,var(--accent-primary)_18%,transparent),transparent_58%),linear-gradient(180deg,var(--bg-surface),var(--bg-base))]">
        <img
          src={image}
          alt={`${flavor.name} modern bottle`}
          draggable={false}
          className="absolute inset-x-0 top-[21%] mx-auto h-[58%] w-[82%] select-none object-contain drop-shadow-[0_16px_22px_rgba(3,12,24,0.55)]"
        />
      </div>

      {/* Vintage layer is clipped from the bottom as the handle moves. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(224,167,106,0.22),transparent_58%),linear-gradient(180deg,color-mix(in_srgb,var(--bg-muted)_88%,#6f4b2d),var(--bg-surface))]"
        style={{ clipPath: `inset(0 0 ${100 - split}% 0)` }}
      >
        <img
          src={image}
          alt=""
          draggable={false}
          className="absolute inset-x-0 top-[21%] mx-auto h-[58%] w-[82%] select-none object-contain sepia-[0.72] grayscale-[0.3] contrast-[0.9] brightness-[0.86] drop-shadow-[0_14px_20px_rgba(29,19,11,0.38)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(85,55,32,0.16),transparent_55%)]" />
      </div>

      <div className="pointer-events-none absolute inset-x-3 top-3 z-20 text-left">
        <span className="inline-flex rounded-full border border-accent-gold/50 bg-bg-base/85 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.18em] text-accent-gold uppercase backdrop-blur-sm">
          Then
        </span>
        <p className="mt-2 font-display text-[10px] font-bold tracking-wider text-text-primary uppercase sm:text-xs">
          Vintage Recipe
        </p>
        <p className="mt-0.5 line-clamp-2 text-[10px] font-semibold leading-tight text-text-muted sm:text-[11px]">
          {flavor.name}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 text-left">
        <span className="inline-flex rounded-full border border-accent-primary/55 bg-bg-base/85 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.18em] text-accent-primary uppercase backdrop-blur-sm">
          Now
        </span>
        <p className="mt-2 font-display text-[10px] font-bold tracking-wider text-text-primary uppercase sm:text-xs">
          Modern Taste
        </p>
        <p className="mt-0.5 line-clamp-2 text-[10px] font-semibold leading-tight text-text-muted sm:text-[11px]">
          {flavor.name}
        </p>
      </div>

      <button
        type="button"
        role="slider"
        aria-label={`Compare vintage and modern ${flavor.name}`}
        aria-valuemin={24}
        aria-valuemax={76}
        aria-valuenow={Math.round(split)}
        aria-valuetext={`${Math.round(split)} percent vintage recipe visible`}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onKeyDown={handleKeyboard}
        className="absolute inset-x-0 z-30 h-11 -translate-y-1/2 cursor-ns-resize touch-none focus-visible:outline-none"
        style={{ top: `${split}%` }}
      >
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-accent-primary shadow-[0_0_12px_var(--accent-primary)]" />
        <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent-primary bg-bg-base text-accent-primary shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_55%,transparent)] transition-transform hover:scale-110 focus-visible:scale-110">
          <Setting2 size={17} variant="Linear" aria-hidden />
        </span>
      </button>
    </motion.article>
  );
}

export function ThenNow() {
  const [selectedId, setSelectedId] = useState(FLAVORS[0].id);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectFlavor = (id: string) => {
    setSelectedId(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  };

  return (
    <Section
      id="then-now"
      className="overflow-hidden border-y border-border-theme bg-bg-base py-20"
    >
      <img
        src="/Tanki.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 top-12 w-[420px] opacity-[0.035] grayscale"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold tracking-widest text-accent-primary uppercase">
              Heritage, Recrafted
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-text-primary sm:text-5xl">
              Then &amp; Now
            </h2>
            <p className="mt-3 max-w-2xl text-base text-text-muted">
              Witness the transformation of a timeless classic — same heritage recipe, modern craft.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-primary/40 bg-accent-primary/10 px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-accent-primary uppercase shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_14%,transparent)]">
            <Setting2 size={15} variant="Linear" aria-hidden />
            Drag divider to time travel
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {FLAVORS.map((flavor) => (
            <div
              key={flavor.id}
              ref={(node) => {
                cardRefs.current[flavor.id] = node;
              }}
              className="scroll-mt-28"
            >
              <ComparisonCard flavor={flavor} selected={selectedId === flavor.id} />
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border-theme bg-bg-surface/80 px-5 py-6 text-center shadow-lg backdrop-blur-sm sm:px-8">
          <p className="font-display text-sm font-bold tracking-[0.18em] text-text-primary uppercase">
            Flavour Palette
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {FLAVORS.map((flavor) => {
              const selected = selectedId === flavor.id;
              return (
                <div key={flavor.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => selectFlavor(flavor.id)}
                    aria-label={`Select ${flavor.name}`}
                    aria-pressed={selected}
                    className={`grid h-14 w-14 place-items-center overflow-hidden rounded-full border bg-bg-base p-1.5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary sm:h-16 sm:w-16 ${
                      selected
                        ? "scale-110 border-accent-primary shadow-[0_0_22px_color-mix(in_srgb,var(--accent-primary)_48%,transparent)]"
                        : "border-border-theme hover:-translate-y-1 hover:border-accent-primary/70"
                    }`}
                  >
                    <img
                      src={FLAVOR_IMAGES[flavor.id]}
                      alt=""
                      className="h-full w-full object-contain drop-shadow-sm"
                    />
                  </button>

                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 z-40 w-44 -translate-x-1/2 rounded-xl border border-accent-primary/35 bg-bg-base px-3 py-2 text-left text-[11px] leading-relaxed text-text-muted opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    <strong className="block text-text-primary">{flavor.name}</strong>
                    {flavor.note}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-xs text-text-muted">
            Click to select individual flavour stories · Hover to see detailed flavour notes
          </p>
        </div>
      </div>
    </Section>
  );
}
