import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";

import { useRef } from "react";
import { Gallery as GalleryIcon } from "iconsax-reactjs";

import { GALLERY, type GalleryItem } from "./data";
import { Section, SectionHeading } from "./primitives";

/*
Desktop layout:

┌──────────────────────┬──────────────────────────┐
│                      │    Story / Crate Image   │
│                      ├────────────┬─────────────┤
│    FEATURED VIDEO    │ Corner    │ Marble Pop  │
│      BIG HERO        │ Shop      │             │
│                      │           │             │
├──────────────────────┴───────────┴─────────────┤
│                                    │          │
│       FESTIVAL NIGHT IMAGE         │ Beach    │
│       LARGE CINEMATIC              │ Image    │
│                                    │          │
└────────────────────────────────────┴──────────┘
*/

const TILE_LAYOUTS = [
  // g1 — big video
  "lg:col-span-2 lg:row-span-2",

  // g2 — wide image
  "lg:col-span-2 lg:row-span-1",

  // g3 — small
  "lg:col-span-1 lg:row-span-1",

  // g4 — small
  "lg:col-span-1 lg:row-span-1",

  // g5 — big wide image
  "lg:col-span-3 lg:row-span-2",

  // g6 — tall image
  "lg:col-span-1 lg:row-span-2",
];

type TileProps = {
  item: GalleryItem;
  index: number;
};

function Tile({ item, index }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.15,
  });

  /*
   * Very subtle image/video parallax while scrolling.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["5%", "-5%"]
  );

  const layout =
    TILE_LAYOUTS[index] ??
    "lg:col-span-1 lg:row-span-1";

  const isHero = index === 0;
  const isVideo = item.type === "video";

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.75,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group
        relative
        isolate
        min-h-[260px]
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.10]
        bg-[#132237]
        shadow-[0_20px_60px_rgba(0,0,0,0.22)]

        transition-[transform,border-color,box-shadow]
        duration-500

        hover:-translate-y-1
        hover:border-[#38bdf8]/40
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.40)]

        md:min-h-[300px]

        lg:min-h-0

        ${layout}
      `}
    >
      {/* ============================== */}
      {/* MEDIA                          */}
      {/* ============================== */}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="
            absolute
            -inset-[7%]
            h-[114%]
            w-[114%]
          "
        >
          {item.type === "video" ? (
            <video
              src={inView ? item.src : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={item.caption}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <img
              src={item.src}
              alt={item.caption}
              loading={index <= 2 ? "eager" : "lazy"}
              decoding="async"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.055]
              "
            />
          )}
        </motion.div>
      </div>

      {/* ============================== */}
      {/* CINEMATIC GRADIENT             */}
      {/* ============================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-gradient-to-t
          from-[#06111f]/95
          via-[#06111f]/10
          to-transparent
        "
      />

      {/* subtle vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-[radial-gradient(circle_at_center,transparent_35%,rgba(3,10,20,0.28)_100%)]
        "
      />

      {/* ============================== */}
      {/* HOVER BLUE LIGHT               */}
      {/* ============================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100

          bg-[radial-gradient(circle_at_75%_15%,rgba(56,189,248,0.17),transparent_42%)]
        "
      />

      {/* ============================== */}
      {/* HERO VIDEO BADGE               */}
      {/* ============================== */}

      {isHero && isVideo && (
        <div
          className="
            absolute
            left-4
            top-4
            z-20
            flex
            items-center
            gap-2.5
            rounded-full
            border
            border-white/15
            bg-[#07111f]/65
            px-3.5
            py-2
            backdrop-blur-xl

            md:left-5
            md:top-5
          "
        >
          <span
            className="
              relative
              flex
              h-2
              w-2
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-red-400
                opacity-75
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />
          </span>

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            Old Glory in action
          </span>
        </div>
      )}

      {/* ============================== */}
      {/* HERO VIDEO DECORATION          */}
      {/* ============================== */}

      {isHero && (
        <div
          className="
            pointer-events-none
            absolute
            right-5
            top-5
            z-10
            hidden
            items-center
            gap-2
            text-[10px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-white/55

            md:flex
          "
        >
          <span className="h-px w-8 bg-white/30" />
          Featured
        </div>
      )}

      {/* ============================== */}
      {/* CAPTION                        */}
      {/* ============================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20
          p-4

          md:p-5
        "
      >
        <motion.div
          className="
            flex
            w-fit
            max-w-[95%]
            items-center
            gap-2.5
            rounded-xl
            border
            border-white/[0.10]
            bg-[#06111f]/75
            px-3.5
            py-2.5
            shadow-lg
            backdrop-blur-xl

            transition-all
            duration-500

            group-hover:border-[#38bdf8]/30
            group-hover:bg-[#06111f]/90
          "
        >
          <GalleryIcon
            size={17}
            variant="Linear"
            className="
              shrink-0
              text-[#f5c542]
            "
          />

          <p
            className="
              truncate
              text-sm
              font-medium
              tracking-tight
              text-white

              md:text-[15px]
            "
          >
            {item.caption}
          </p>
        </motion.div>
      </div>

      {/* ============================== */}
      {/* BORDER SHINE                   */}
      {/* ============================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-[24px]
          ring-1
          ring-inset
          ring-white/[0.035]
        "
      />
    </motion.article>
  );
}

export function GallerySection() {
  return (
    <Section id="gallery">
      <div className="relative">
        {/* ============================== */}
        {/* BACKGROUND GLOW                */}
        {/* ============================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-48
            top-20
            -z-10
            h-[500px]
            w-[500px]
            rounded-full
            bg-sky-500/[0.04]
            blur-[130px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-10
            -z-10
            h-[400px]
            w-[400px]
            rounded-full
            bg-yellow-500/[0.025]
            blur-[120px]
          "
        />

        {/* ============================== */}
        {/* HEADING                        */}
        {/* ============================== */}

        <SectionHeading
          eyebrow="In action"
          title="Cold crates, warm streets."
          intro="Real bottles. Real streets. Real Old Glory moments."
        />

        {/* ============================== */}
        {/* GALLERY                        */}
        {/* ============================== */}

        <div
          className="
            relative
            mt-10
            grid
            w-full
            grid-cols-1
            gap-4

            sm:mt-12

            md:grid-cols-2
            md:gap-5

            lg:grid-flow-row-dense
            lg:grid-cols-4
            lg:auto-rows-[210px]
          "
        >
          {GALLERY.map((item, index) => (
            <Tile
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* ============================== */}
        {/* SMALL FOOTER TEXT              */}
        {/* ============================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-4
            text-center
          "
        >
          <span
            className="
              hidden
              h-px
              w-12
              bg-gradient-to-r
              from-transparent
              to-white/20

              sm:block
            "
          />

          <p
            className="
              text-xs
              font-medium
              tracking-[0.08em]
              text-white/45

              sm:text-sm
            "
          >
            Real people. Real places. Real Old Glory.
          </p>

          <span
            className="
              hidden
              h-px
              w-12
              bg-gradient-to-l
              from-transparent
              to-white/20

              sm:block
            "
          />
        </motion.div>
      </div>
    </Section>
  );
}