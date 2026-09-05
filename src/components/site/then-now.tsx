import { ArrowSwapHorizontal, Setting2 } from "iconsax-reactjs";
import { motion, useReducedMotion } from "motion/react";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type SyntheticEvent,
} from "react";

import { FLAVORS, type FlagshipFlavor, type FlavorId } from "./data";

import {
  FLAVOR_IMAGES,
  FLAVOR_IMAGE_FALLBACK,
  THEN_NOW_IMAGE_GEOMETRY,
  THEN_NOW_IMAGES,
  THEN_NOW_IMAGE_FALLBACK,
  type ThenNowBottleFrame,
} from "./images";

import { Section } from "./primitives";

/* =========================================================
   CONSTANTS
========================================================= */

const MIN_SPLIT = 24;
const CENTER_SPLIT = 50;
const MAX_SPLIT = 76;

const MAX_BOTTLE_SCALE = 1.14;

const clampSplit = (value: number) =>
  Math.min(MAX_SPLIT, Math.max(MIN_SPLIT, value));

const clampProgress = (value: number) =>
  Math.min(1, Math.max(0, value));

const clampScale = (value: number) =>
  Math.min(MAX_BOTTLE_SCALE, Math.max(1, value));

const COMPOSITE_IMAGE_CLASS_NAME =
  "pointer-events-none absolute inset-y-0 h-full w-[200%] max-w-none select-none object-contain";

/* =========================================================
   BOTTLE NORMALIZATION
========================================================= */

function getBottleNormalization(
  bottle: ThenNowBottleFrame,
  targetHeight: number,
  targetBottom: number,
  sourceHeight: number,
  halfWidth: number,
) {
  const visibleHeight = bottle.bottom - bottle.top;

  return {
    baseScale: targetHeight / visibleHeight,

    baselineShift:
      ((targetBottom - bottle.bottom) / sourceHeight) * 100,

    centerX:
      (bottle.centerX / halfWidth) * 100,
  };
}

/* =========================================================
   IMAGE FALLBACK
========================================================= */

function swapToFallback(
  event: SyntheticEvent<HTMLImageElement>,
  fallback: string,
) {
  const image = event.currentTarget;

  if (image.dataset["fallbackApplied"] === "true") return;

  image.dataset["fallbackApplied"] = "true";
  image.src = fallback;
}

/* =========================================================
   COMPARISON CARD
========================================================= */

function ComparisonCard({
  flavor,
  selected,
}: {
  flavor: FlagshipFlavor;
  selected: boolean;
}) {
  const [split, setSplit] = useState(CENTER_SPLIT);

  const cardRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const reducedMotion = useReducedMotion();

  /* -------------------------------------------------------
     POINTER DRAG
  ------------------------------------------------------- */

  const updateFromPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const percentage =
      ((event.clientX - rect.left) / rect.width) * 100;

    setSplit(clampSplit(percentage));
  };

  const startDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    draggingRef.current = true;

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    updateFromPointer(event);
  };

  const drag = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (draggingRef.current) {
      updateFromPointer(event);
    }
  };

  const stopDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    draggingRef.current = false;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }
  };

  /* -------------------------------------------------------
     KEYBOARD
  ------------------------------------------------------- */

  const handleKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setSplit((value) =>
        clampSplit(value - 4),
      );
    } else if (event.key === "ArrowRight") {
      event.preventDefault();

      setSplit((value) =>
        clampSplit(value + 4),
      );
    } else if (event.key === "Home") {
      event.preventDefault();

      setSplit(MIN_SPLIT);
    } else if (event.key === "End") {
      event.preventDefault();

      setSplit(MAX_SPLIT);
    }
  };

  /* -------------------------------------------------------
     IMAGE GEOMETRY
  ------------------------------------------------------- */

  const compositeImage =
    THEN_NOW_IMAGES[flavor.id];

  const imageGeometry =
    THEN_NOW_IMAGE_GEOMETRY[flavor.id];

  const halfWidth =
    imageGeometry.width / 2;

  const oldVisibleHeight =
    imageGeometry.old.bottom -
    imageGeometry.old.top;

  const newVisibleHeight =
    imageGeometry.new.bottom -
    imageGeometry.new.top;

  /*
   * Makes OLD + NEW visible bottle height match.
   */
  const targetHeight = Math.max(
    oldVisibleHeight,
    newVisibleHeight,
  );

  const targetBottom = Math.max(
    imageGeometry.old.bottom,
    imageGeometry.new.bottom,
  );

  const oldBase =
    getBottleNormalization(
      imageGeometry.old,
      targetHeight,
      targetBottom,
      imageGeometry.height,
      halfWidth,
    );

  const newBase =
    getBottleNormalization(
      imageGeometry.new,
      targetHeight,
      targetBottom,
      imageGeometry.height,
      halfWidth,
    );

  /* -------------------------------------------------------
     FOCUS PROGRESS
  ------------------------------------------------------- */

  /*
   * Moving slider LEFT:
   *
   * OLD fades
   * NEW moves toward center
   * NEW zooms
   */

  const leftProgress =
    clampProgress(
      split < CENTER_SPLIT
        ? (CENTER_SPLIT - split) /
            (CENTER_SPLIT - MIN_SPLIT)
        : 0,
    );

  /*
   * Moving slider RIGHT:
   *
   * NEW fades
   * OLD moves toward center
   * OLD zooms
   */

  const rightProgress =
    clampProgress(
      split > CENTER_SPLIT
        ? (split - CENTER_SPLIT) /
            (MAX_SPLIT - CENTER_SPLIT)
        : 0,
    );

  /* -------------------------------------------------------
     OPACITY
  ------------------------------------------------------- */

  const oldOpacity =
    clampProgress(1 - leftProgress);

  const newOpacity =
    clampProgress(1 - rightProgress);

  /* -------------------------------------------------------
     ZOOM
  ------------------------------------------------------- */

  const oldScale =
    clampScale(
      1 +
        rightProgress *
          (MAX_BOTTLE_SCALE - 1),
    );

  const newScale =
    clampScale(
      1 +
        leftProgress *
          (MAX_BOTTLE_SCALE - 1),
    );

  /* -------------------------------------------------------
     MOVE DOMINANT BOTTLE TO CARD CENTER
  ------------------------------------------------------- */

  const oldFocusOffset =
    rightProgress *
    (100 - oldBase.centerX);

  const newFocusOffset =
    leftProgress *
    -newBase.centerX;

  return (
    <motion.article
      ref={cardRef}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: reducedMotion
          ? 0
          : 0.48,
      }}
      className={`
        relative
        h-[320px]
        w-full
        min-w-0
        max-w-full
        overflow-hidden
        rounded-3xl
        border
        bg-bg-surface
        shadow-xl
        transition-[border-color,box-shadow]
        duration-300

        sm:h-[340px]
        md:h-[360px]
        lg:h-[340px]

        ${
          selected
            ? `
              border-accent-primary
              shadow-[0_0_30px_color-mix(in_srgb,var(--accent-primary)_42%,transparent)]
            `
            : `
              border-accent-primary/55
              shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_16%,transparent)]
            `
        }
      `}
      aria-label={`${flavor.name}: Then and Now comparison`}
    >
      {/* ================================================
          CARD BACKGROUND
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_58%,color-mix(in_srgb,var(--accent-primary)_15%,transparent),transparent_64%),linear-gradient(180deg,var(--bg-surface),var(--bg-base))]
        "
      />

      {/* ================================================
          OLD / NEW BOTTLE AREA
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
        role="img"
        aria-label={`${flavor.name} vintage bottle on the left and modern bottle on the right`}
      >
        <div
          className="
            absolute
            inset-x-3
            top-16
            bottom-5
            flex
            items-center
          "
        >
          <div
            className="
              relative
              w-full
              max-w-full
            "
            style={{
              aspectRatio: `${imageGeometry.width} / ${imageGeometry.height}`,
            }}
          >
            {/* ==========================================
                OLD BOTTLE
            =========================================== */}

            <motion.div
              aria-hidden
              data-comparison-layer="old"
              data-base-scale={
                oldBase.baseScale.toFixed(
                  4,
                )
              }
              data-focus-scale={
                oldScale.toFixed(4)
              }
              className="
                absolute
                inset-y-0
                left-0
                w-1/2
                overflow-hidden
                will-change-[opacity,transform]
              "
              style={{
                opacity: oldOpacity,

                transform: `
                  translateX(${oldFocusOffset}%)
                  scale(${oldScale})
                `,

                transformOrigin: `${oldBase.centerX}% 65%`,
              }}
            >
              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  transform: `
                    translateY(${oldBase.baselineShift}%)
                    scale(${oldBase.baseScale})
                  `,

                  transformOrigin: `${oldBase.centerX}% ${
                    (imageGeometry.old
                      .bottom /
                      imageGeometry.height) *
                    100
                  }%`,
                }}
              >
                <img
                  src={
                    compositeImage
                  }
                  alt=""
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onError={(event) =>
                    swapToFallback(
                      event,
                      THEN_NOW_IMAGE_FALLBACK,
                    )
                  }
                  className={`${COMPOSITE_IMAGE_CLASS_NAME} left-0`}
                />
              </div>
            </motion.div>

            {/* ==========================================
                NEW BOTTLE
            =========================================== */}

            <motion.div
              aria-hidden
              data-comparison-layer="new"
              data-base-scale={
                newBase.baseScale.toFixed(
                  4,
                )
              }
              data-focus-scale={
                newScale.toFixed(4)
              }
              className="
                absolute
                inset-y-0
                right-0
                w-1/2
                overflow-hidden
                will-change-[opacity,transform]
              "
              style={{
                opacity: newOpacity,

                transform: `
                  translateX(${newFocusOffset}%)
                  scale(${newScale})
                `,

                transformOrigin: `${newBase.centerX}% 65%`,
              }}
            >
              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  transform: `
                    translateY(${newBase.baselineShift}%)
                    scale(${newBase.baseScale})
                  `,

                  transformOrigin: `${newBase.centerX}% ${
                    (imageGeometry.new
                      .bottom /
                      imageGeometry.height) *
                    100
                  }%`,
                }}
              >
                <img
                  src={
                    compositeImage
                  }
                  alt=""
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onError={(event) =>
                    swapToFallback(
                      event,
                      THEN_NOW_IMAGE_FALLBACK,
                    )
                  }
                  className={`${COMPOSITE_IMAGE_CLASS_NAME} right-0`}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* OLD SIDE TINT */}

        <div
          aria-hidden
          className="
            absolute
            inset-0
            bg-[linear-gradient(90deg,color-mix(in_srgb,var(--accent-gold)_7%,transparent),transparent)]
          "
          style={{
            clipPath: `inset(0 ${
              100 - split
            }% 0 0)`,
          }}
        />
      </div>

      {/* ================================================
          THEN LABEL
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          top-3
          left-3
          z-20
          max-w-[44%]
          text-left
        "
      >
        <span
          className="
            inline-flex
            rounded-full
            border
            border-accent-gold/50
            bg-bg-base/85
            px-2.5
            py-1
            text-[9px]
            font-semibold
            tracking-[0.18em]
            text-accent-gold
            uppercase
            backdrop-blur-sm
          "
        >
          Then
        </span>

        <p
          className="
            mt-2
            font-display
            text-[10px]
            font-bold
            tracking-wider
            text-text-primary
            uppercase

            sm:text-xs
          "
        >
          Vintage Recipe
        </p>

        <p
          className="
            mt-0.5
            line-clamp-2
            text-[10px]
            font-semibold
            leading-tight
            text-text-muted

            sm:text-[11px]
          "
        >
          {flavor.name}
        </p>
      </div>

      {/* ================================================
          NOW LABEL
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          top-3
          right-3
          z-20
          max-w-[44%]
          text-right
        "
      >
        <span
          className="
            inline-flex
            rounded-full
            border
            border-accent-primary/55
            bg-bg-base/85
            px-2.5
            py-1
            text-[9px]
            font-semibold
            tracking-[0.18em]
            text-accent-primary
            uppercase
            backdrop-blur-sm
          "
        >
          Now
        </span>

        <p
          className="
            mt-2
            font-display
            text-[10px]
            font-bold
            tracking-wider
            text-text-primary
            uppercase

            sm:text-xs
          "
        >
          Modern Taste
        </p>

        <p
          className="
            mt-0.5
            line-clamp-2
            text-[10px]
            font-semibold
            leading-tight
            text-text-muted

            sm:text-[11px]
          "
        >
          {flavor.name}
        </p>
      </div>

      {/* ================================================
          LEFT / RIGHT SLIDER
      ================================================= */}

      <button
        type="button"
        role="slider"
        aria-label={`Compare vintage and modern ${flavor.name}`}
        aria-orientation="horizontal"
        aria-valuemin={
          MIN_SPLIT
        }
        aria-valuemax={
          MAX_SPLIT
        }
        aria-valuenow={
          Math.round(split)
        }
        aria-valuetext={`${Math.round(
          split,
        )} percent old-to-new comparison`}
        onPointerDown={
          startDrag
        }
        onPointerMove={
          drag
        }
        onPointerUp={
          stopDrag
        }
        onPointerCancel={
          stopDrag
        }
        onLostPointerCapture={() => {
          draggingRef.current =
            false;
        }}
        onKeyDown={
          handleKeyboard
        }
        className="
          absolute
          inset-y-0
          z-30
          w-12
          -translate-x-1/2
          cursor-ew-resize
          touch-none
          select-none
          focus-visible:outline-none
        "
        style={{
          left: `${split}%`,
        }}
      >
        {/* divider */}

        <span
          className="
            absolute
            top-0
            bottom-0
            left-1/2
            w-px
            -translate-x-1/2
            bg-accent-primary
            shadow-[0_0_12px_var(--accent-primary)]
          "
        />

        {/* handle */}

        <span
          className="
            absolute
            left-1/2
            top-1/2
            grid
            h-9
            w-9
            -translate-x-1/2
            -translate-y-1/2
            place-items-center
            rounded-full
            border-2
            border-accent-primary
            bg-bg-base
            text-accent-primary
            shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_55%,transparent)]
            transition-transform

            hover:scale-110
            focus-visible:scale-110
          "
        >
          <ArrowSwapHorizontal
            size={18}
            variant="Linear"
            aria-hidden
          />
        </span>
      </button>
    </motion.article>
  );
}

/* =========================================================
   THEN & NOW SECTION
========================================================= */

export function ThenNow() {
  const [selectedId, setSelectedId] =
    useState<FlavorId>(
      FLAVORS[0]!.id,
    );

  const cardRefs =
    useRef<
      Partial<
        Record<
          FlavorId,
          HTMLDivElement | null
        >
      >
    >({});

  const selectFlavor = (
    id: FlavorId,
  ) => {
    setSelectedId(id);

    cardRefs.current[
      id
    ]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <Section
      id="then-now"
      className="
        overflow-hidden
        border-y
        border-border-theme
        bg-bg-base
        py-20
      "
    >
      {/* ================================================
          DECORATIVE TANK IMAGE
      ================================================= */}

      <img
        src="/Tanki.png"
        alt=""
        aria-hidden
        className="
          pointer-events-none
          absolute
          right-0
          top-12
          w-full
          max-w-[420px]
          opacity-[0.035]
          grayscale
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >
        {/* ================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-5

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <span
              className="
                text-xs
                font-bold
                tracking-widest
                text-accent-primary
                uppercase
              "
            >
              Heritage, Recrafted
            </span>

            <h2
              className="
                mt-2
                font-display
                text-3xl
                font-bold
                uppercase
                tracking-[0.015em]
                text-text-primary

                sm:text-4xl
                lg:text-5xl
              "
            >
              Then &amp; Now
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-base
                text-text-muted
              "
            >
              Witness the
              transformation of a
              timeless classic —
              same heritage recipe,
              modern craft.
            </p>
          </div>

          {/* DRAG HINT */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-accent-primary/40
              bg-accent-primary/10
              px-4
              py-2
              text-[10px]
              font-bold
              tracking-[0.16em]
              text-accent-primary
              uppercase
              shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_14%,transparent)]
            "
          >
            <Setting2
              size={15}
              variant="Linear"
              aria-hidden
            />

            Drag left ↔ right to
            time travel
          </div>
        </div>

        {/* ================================================
            COMPARISON GRID
        ================================================= */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {FLAVORS.map(
            (flavor) => (
              <div
                key={
                  flavor.id
                }
                ref={(node) => {
                  cardRefs.current[
                    flavor.id
                  ] = node;
                }}
                className="
                  w-full
                  min-w-0
                  max-w-full
                  scroll-mt-28
                "
              >
                <ComparisonCard
                  flavor={
                    flavor
                  }
                  selected={
                    selectedId ===
                    flavor.id
                  }
                />
              </div>
            ),
          )}
        </div>

        {/* =================================================
            FLAVOUR PALETTE
        ================================================== */}

        <div
          className="
            relative
            mt-14
            overflow-hidden
            rounded-3xl
            border
            border-border-theme
            bg-bg-surface/80
            px-5
            py-6
            text-center
            shadow-lg
            backdrop-blur-sm

            sm:px-8
            sm:py-7
          "
        >
          {/* ==============================================
              SINGLE ₹30 PRICE BADGE
              Top-right — same visual language as ₹20 badge
          =============================================== */}

          <div
            aria-label="Price ₹30"
            className="
              absolute
              right-4
              top-4
              z-20
              grid
              h-12
              w-12
              place-items-center
              rounded-full
              bg-accent-gold
              font-display
              text-lg
              font-bold
              leading-none
              text-bg-base
              shadow-[0_8px_26px_rgba(0,0,0,0.20)]

              sm:right-6
              sm:top-6
              sm:h-16
              sm:w-16
              sm:text-2xl

              lg:h-[68px]
              lg:w-[68px]
              lg:text-[26px]
            "
          >
            ₹30
          </div>

          {/* TITLE
              px-16 / sm:px-20 prevents overlap with ₹30 badge
          */}

          <p
            className="
              px-14
              font-display
              text-sm
              font-bold
              tracking-[0.18em]
              text-text-primary
              uppercase

              sm:px-20
            "
          >
            Flavour Palette
          </p>

          {/* ==============================================
              FLAVOUR ITEMS
          =============================================== */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-start
              justify-center
              gap-x-3
              gap-y-5

              sm:gap-x-4
              lg:gap-x-5
            "
          >
            {FLAVORS.map(
              (flavor) => {
                const selected =
                  selectedId ===
                  flavor.id;

                return (
                  <div
                    key={
                      flavor.id
                    }
                    className="
                      group
                      relative
                      flex
                      min-w-[4.5rem]
                      flex-col
                      items-center
                    "
                  >
                    {/* FLAVOUR BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        selectFlavor(
                          flavor.id,
                        )
                      }
                      aria-label={`Select ${flavor.name}`}
                      aria-pressed={
                        selected
                      }
                      className={`
                        grid
                        h-12
                        w-12
                        place-items-center
                        overflow-hidden
                        rounded-full
                        border
                        bg-bg-base
                        p-1.5
                        transition-all
                        duration-300

                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-accent-primary

                        sm:h-14
                        sm:w-14

                        lg:h-16
                        lg:w-16

                        ${
                          selected
                            ? `
                              scale-110
                              border-accent-primary
                              shadow-[0_0_22px_color-mix(in_srgb,var(--accent-primary)_48%,transparent)]
                            `
                            : `
                              border-border-theme
                              hover:-translate-y-1
                              hover:border-accent-primary/70
                            `
                        }
                      `}
                    >
                      <img
                        src={
                          FLAVOR_IMAGES[
                            flavor.id
                          ]
                        }
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={
                          false
                        }
                        onError={(
                          event,
                        ) =>
                          swapToFallback(
                            event,
                            FLAVOR_IMAGE_FALLBACK,
                          )
                        }
                        className="
                          h-full
                          w-full
                          object-contain
                          drop-shadow-sm
                        "
                      />
                    </button>

                    {/* FLAVOUR NAME */}

                    <span
                      className="
                        mt-2
                        max-w-20
                        text-center
                        text-[10px]
                        font-semibold
                        leading-tight
                        text-text-muted

                        sm:text-[11px]
                      "
                    >
                      {
                        flavor.short
                      }
                    </span>

                    {/*
                      IMPORTANT:

                      Individual ₹30 badges were removed.

                      No:
                      ₹30
                      ₹30
                      ₹30
                      ₹30
                      ₹30
                      ₹30

                      Only the single circular ₹30
                      badge at top-right is used.
                    */}

                    {/* TOOLTIP */}

                    <div
                      role="tooltip"
                      className="
                        pointer-events-none
                        absolute
                        bottom-[calc(100%+0.75rem)]
                        left-1/2
                        z-40
                        w-44
                        -translate-x-1/2
                        rounded-xl
                        border
                        border-accent-primary/35
                        bg-bg-base
                        px-3
                        py-2
                        text-left
                        text-[11px]
                        leading-relaxed
                        text-text-muted
                        opacity-0
                        shadow-xl
                        transition-opacity

                        group-hover:opacity-100
                        group-focus-within:opacity-100
                      "
                    >
                      <strong
                        className="
                          block
                          text-text-primary
                        "
                      >
                        {
                          flavor.name
                        }
                      </strong>

                      {
                        flavor.note
                      }
                    </div>
                  </div>
                );
              },
            )}
          </div>

          {/* ==============================================
              HELPER TEXT
          =============================================== */}

          <p
            className="
              mt-6
              px-2
              text-xs
              leading-relaxed
              text-text-muted
            "
          >
            Tap a flavour to
            jump to its story ·
            Hover or focus to see
            detailed tasting notes
          </p>
        </div>
      </div>
    </Section>
  );
}
