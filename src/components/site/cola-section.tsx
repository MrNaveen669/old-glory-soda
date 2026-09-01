import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { COLA_PRODUCTS, type Flavor } from "./data";
import { Section } from "./primitives";

function ColaCard({
  product,
  index,
  onSelect,
}: {
  product: Flavor;
  index: number;
  onSelect: (product: Flavor) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useInView(cardRef, { amount: 0.25 });
  const video = product.media?.type === "video" ? product.media : undefined;
  const volume = product.volume ?? "160ml";
  const price = product.price ?? 20;

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const syncPlayback = () => {
      if (isVisible && document.visibilityState === "visible") {
        void element.play().catch(() => {
          // A browser may still decline autoplay; the card remains fully usable.
        });
      } else {
        element.pause();
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      element.pause();
    };
  }, [isVisible]);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(product)}
      aria-label={`View ${product.name} ₹${price} ${volume} PET details`}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border-theme bg-bg-surface text-left shadow-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-primary/70 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary active:scale-[0.99]"
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-bg-muted">
        {video && (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            preload="metadata"
            muted
            loop
            playsInline
            aria-hidden="true"
            className="pointer-events-none h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        )}

        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-base/55 via-transparent to-bg-base/10" />

        <span className="absolute top-4 right-4 rounded-full border border-on-accent/30 bg-accent-cta px-3 py-1.5 font-display text-sm font-bold text-bg-base shadow-lg">
          ₹{price}
        </span>

        {product.lowCalorie && (
          <span className="absolute top-4 left-4 rounded-full border border-accent-primary/60 bg-bg-base/90 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-accent-primary uppercase shadow-lg backdrop-blur-sm">
            Low Calorie
          </span>
        )}
      </span>

      <span className="flex w-full flex-1 flex-col p-5 sm:p-6">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-accent-primary uppercase">
          Old Glory Cola Collection
        </span>
        <span className="mt-2 font-display text-2xl font-bold tracking-[0.015em] text-text-primary uppercase sm:text-3xl">
          {product.name}
        </span>
        <span className="mt-2 text-sm text-text-muted">{volume} PET Bottle</span>

        <span className="mt-5 flex items-center justify-between border-t border-border-theme pt-4 text-xs font-semibold tracking-widest text-accent-primary uppercase">
          <span>View Details</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </span>
    </motion.button>
  );
}

export function ColaSection({ onSelectProduct }: { onSelectProduct: (product: Flavor) => void }) {
  return (
    <Section id="cola" className="overflow-hidden bg-bg-base py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest text-accent-primary uppercase">
            New · 160ml PET Cola Range
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-[0.015em] text-text-primary uppercase sm:text-5xl">
            Classic Cola. Your Way.
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Choose the full-flavour original or a lighter Diet Cola pour — both bottled with the
            unmistakable Old Glory fizz.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {COLA_PRODUCTS.map((product, index) => (
            <ColaCard key={product.id} product={product} index={index} onSelect={onSelectProduct} />
          ))}
        </div>
      </div>
    </Section>
  );
}
