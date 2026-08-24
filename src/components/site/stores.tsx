import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  ArrowRight2,
  Call,
  CloseCircle,
  Location,
  Profile2User,
  Shop,
} from "iconsax-reactjs";

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import {
  latLngBounds,
  type LatLngTuple,
} from "leaflet";

import "leaflet/dist/leaflet.css";

import { Section } from "./primitives";

/* =========================================================
   TYPES
========================================================= */

type CityName = "Raipur" | "Balod" | "Dalli";

type StoreStatus = "in-stock" | "coming-soon";

type LocationData = {
  city: CityName;
  mapName: string;
  position: LatLngTuple;
  status: StoreStatus;
  subtitle: string;
  address: string;
  googleMapsQuery: string;
};

/* =========================================================
   LOCATIONS

   These are city-level map coordinates.

   If later you get exact shop/distributor latitude and
   longitude, simply replace the position values.
========================================================= */

const LOCATIONS: LocationData[] = [
  {
    city: "Raipur",
    mapName: "Raipur",
    position: [21.2514, 81.6296],
    status: "in-stock",
    subtitle: "Current distribution hub",

    address:
      "Near HP Gas, Mana Basti, Raipur, Chhattisgarh 492015",

    googleMapsQuery:
      "Kajal Beverage Industry, Near HP Gas, Mana Basti, Raipur, Chhattisgarh 492015",
  },

  {
    city: "Balod",
    mapName: "Balod",
    position: [20.7308, 81.2058],
    status: "coming-soon",
    subtitle: "Rolling out shortly",

    address:
      "Balod, Chhattisgarh, India",

    googleMapsQuery:
      "Balod, Chhattisgarh, India",
  },

  {
    city: "Dalli",
    mapName: "Dalli Rajhara",
    position: [20.5857, 81.075],
    status: "coming-soon",
    subtitle: "Rolling out shortly",

    address:
      "Dalli Rajhara, Balod, Chhattisgarh, India",

    googleMapsQuery:
      "Dalli Rajhara, Chhattisgarh, India",
  },
];

/* =========================================================
   RAIPUR CONTACT DETAILS

   Address and customer-care number are based on
   your product label.

   Kajal Beverage Industry is identified on the label as
   manufacturer, so we call this Distribution Contact rather
   than claiming it is a confirmed distributor.
========================================================= */

const RAIPUR_DETAILS = {
  contact: "Kajal Beverage Industry",

  about:
    "Old Glory Soda manufacturing and distribution contact for Raipur.",

  address:
    "Near HP Gas, Mana Basti, Raipur, Chhattisgarh 492015",

  phone: "94076 26212",
};

/* =========================================================
   GOOGLE MAP URL HELPER

   Opening Google Maps externally does NOT require API key.
========================================================= */

function getGoogleMapsLink(query: string) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );
}

/* =========================================================
   MAP VIEW CONTROLLER

   - Default: show all three locations
   - Clicking city card: zoom to that location
========================================================= */

function MapViewportController({
  focusedCity,
}: {
  focusedCity: CityName | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (focusedCity) {
      const location = LOCATIONS.find(
        (item) => item.city === focusedCity,
      );

      if (location) {
        map.flyTo(
          location.position,
          11,
          {
            animate: true,
            duration: 0.8,
          },
        );
      }

      return;
    }

    const bounds = latLngBounds(
      LOCATIONS.map(
        (location) => location.position,
      ),
    );

    map.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 9,
    });
  }, [focusedCity, map]);

  return null;
}

/* =========================================================
   DISTRIBUTION MAP
========================================================= */

function DistributionMap({
  focusedCity,
  onRaipurDetails,
}: {
  focusedCity: CityName | null;
  onRaipurDetails: () => void;
}) {
  return (
    <MapContainer
      center={[20.9, 81.35]}
      zoom={8}
      scrollWheelZoom={false}
      zoomControl={true}
      className="h-full w-full"
      style={{
        height: "100%",
        width: "100%",
        background: "#304a63",
      }}
    >
      {/* ===================================================
          OPENSTREETMAP TILES
      =================================================== */}

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Automatically control zoom */}

      <MapViewportController
        focusedCity={focusedCity}
      />

      {/* ===================================================
          RAIPUR + BALOD + DALLI
      =================================================== */}

      {LOCATIONS.map((location) => {
        const isAvailable =
          location.status === "in-stock";

        return (
          <CircleMarker
            key={location.city}
            center={location.position}
            radius={isAvailable ? 11 : 9}
            pathOptions={{
              color: "#fff8e8",

              fillColor: isAvailable
                ? "#3f8b45"
                : "#d25448",

              fillOpacity: 1,
              weight: 3,
            }}
          >
            <Popup>
              <div
                style={{
                  minWidth: "180px",
                  padding: "2px",
                }}
              >
                {/* STATUS */}

                <p
                  style={{
                    margin: 0,
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",

                    color: isAvailable
                      ? "#397441"
                      : "#777",
                  }}
                >
                  {isAvailable
                    ? "In Stock"
                    : "Coming Soon"}
                </p>

                {/* CITY */}

                <h4
                  style={{
                    margin: "5px 0 0",
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#20252e",
                  }}
                >
                  {location.mapName}
                </h4>

                {/* SUBTITLE */}

                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: "11px",
                    color: "#666",
                  }}
                >
                  {location.subtitle}
                </p>

                {/* ADDRESS */}

                <p
                  style={{
                    margin: "7px 0 0",
                    maxWidth: "190px",
                    fontSize: "10px",
                    lineHeight: 1.5,
                    color: "#777",
                  }}
                >
                  {location.address}
                </p>

                {/* ACTIONS */}

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <a
                    href={getGoogleMapsLink(
                      location.googleMapsQuery,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#267fb4",
                      fontSize: "10px",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Google Maps ↗
                  </a>

                  {location.city ===
                    "Raipur" && (
                    <button
                      type="button"
                      onClick={
                        onRaipurDetails
                      }
                      style={{
                        border: "none",
                        padding: 0,
                        background:
                          "transparent",
                        cursor: "pointer",
                        color: "#267fb4",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      Details →
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex min-h-[62px]
        items-center gap-3

        rounded-[18px]

        border
        border-border-theme/70

        bg-bg-base/20

        px-4 py-3
      "
    >
      <span
        className="
          shrink-0
          text-[#b9b19a]
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            leading-none
            text-text-muted
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-xs
            font-medium
            leading-relaxed
            text-text-primary
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN STORES COMPONENT
========================================================= */

export function Stores() {
  const [
    isRaipurModalOpen,
    setIsRaipurModalOpen,
  ] = useState(false);

  const [
    focusedCity,
    setFocusedCity,
  ] = useState<CityName | null>(null);

  /* =======================================================
     OPEN RAIPUR
  ======================================================= */

  const openRaipurDetails = () => {
    setFocusedCity("Raipur");
    setIsRaipurModalOpen(true);
  };

  /* =======================================================
     ESC CLOSE + SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsRaipurModalOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    if (isRaipurModalOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );

      document.body.style.overflow = "";
    };
  }, [isRaipurModalOpen]);

  return (
    <>
      {/* =====================================================
          WHERE TO BUY
      ===================================================== */}

      <Section
        id="stores"
        className="
          relative
          overflow-hidden

          border-y
          border-border-theme/40

          bg-bg-surface

          py-20
          sm:py-24
        "
      >
        {/* =================================================
            DECORATION
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            overflow-hidden
          "
        >
          <span
            className="
              absolute
              right-[20%]
              top-[31%]

              h-1.5 w-1.5
              rounded-full

              bg-[#9a8038]/70
            "
          />

          <span
            className="
              absolute
              right-[17%]
              top-[40%]

              h-1.5 w-1.5
              rounded-full

              bg-[#9a8038]/70
            "
          />

          <span
            className="
              absolute
              right-[14%]
              top-[51%]

              h-1.5 w-1.5
              rounded-full

              bg-[#9a8038]/70
            "
          />
        </div>

        <div
          className="
            relative

            mx-auto
            max-w-6xl

            px-5
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              grid-cols-1

              gap-12

              lg:grid-cols-[1fr_1fr]
              lg:gap-12
            "
          >
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.65,
              }}
            >
              {/* EYEBROW */}

              <span
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-accent-primary/50

                  px-3
                  py-1.5

                  text-[8px]
                  font-bold

                  uppercase
                  tracking-[0.28em]

                  text-accent-primary
                "
              >
                <span
                  className="
                    h-1 w-1
                    rounded-full
                    bg-accent-primary
                  "
                />

                Where to buy
              </span>

              {/* HEADING */}

              <h2
                className="
                  mt-5

                  max-w-[500px]

                  font-display

                  text-[39px]
                  font-black

                  leading-[1.02]

                  tracking-[-0.025em]

                  text-text-primary

                  sm:text-[46px]
                  lg:text-[49px]
                "
              >
                A crate is closer
                <br />
                than you think.
              </h2>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-5

                  max-w-[500px]

                  text-[14px]
                  leading-7

                  text-text-muted
                "
              >
                Old Glory is rolling out across
                Chhattisgarh, one town at a time.
                Explore our current and upcoming
                distribution locations.
              </p>

              {/* =================================================
                  CTA
              ================================================= */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <motion.a
                  href="#contact"
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    bg-[#42a8df]

                    px-5
                    py-3

                    text-[11px]
                    font-semibold

                    text-[#111820]

                    shadow-lg
                    shadow-[#42a8df]/10
                  "
                >
                  <Shop
                    size={16}
                    variant="Bold"
                  />

                  Order Online
                </motion.a>

                <motion.button
                  type="button"
                  onClick={openRaipurDetails}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-border-theme

                    px-5
                    py-3

                    text-[11px]
                    font-semibold

                    text-text-primary

                    transition-colors

                    hover:bg-bg-muted/30
                  "
                >
                  <Call size={16} />

                  Talk to distributor
                </motion.button>
              </div>

              {/* =================================================
                  REAL INTERACTIVE MAP
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}
                className="
                  relative

                  mt-9

                  h-[310px]

                  overflow-hidden

                  rounded-[24px]

                  border
                  border-border-theme/80

                  bg-[#304a63]

                  p-2.5

                  sm:h-[340px]
                "
              >
                <div
                  className="
                    relative

                    h-full
                    w-full

                    overflow-hidden

                    rounded-[18px]
                  "
                >
                  {/* MAP */}

                  <DistributionMap
                    focusedCity={focusedCity}
                    onRaipurDetails={
                      openRaipurDetails
                    }
                  />

                  {/* =================================================
                      MAP LABEL
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none

                      absolute

                      left-3
                      top-3

                      z-[500]

                      rounded-xl

                      bg-[#252c36]/90

                      px-3
                      py-2.5

                      shadow-lg

                      backdrop-blur-md
                    "
                  >
                    <p
                      className="
                        text-[8px]
                        font-bold

                        uppercase

                        tracking-[0.18em]

                        text-[#a9a18b]
                      "
                    >
                      Distribution Network
                    </p>

                    <p
                      className="
                        mt-0.5

                        text-[11px]
                        font-semibold

                        text-white
                      "
                    >
                      Raipur · Balod · Dalli
                    </p>
                  </div>

                  {/* =================================================
                      SHOW ALL BUTTON
                  ================================================= */}

                  {focusedCity && (
                    <button
                      type="button"
                      onClick={() =>
                        setFocusedCity(null)
                      }
                      className="
                        absolute

                        bottom-7
                        right-3

                        z-[500]

                        rounded-full

                        bg-[#252c36]/95

                        px-3.5
                        py-2.5

                        text-[9px]
                        font-semibold

                        text-white

                        shadow-lg

                        backdrop-blur-md

                        transition

                        hover:bg-[#343d49]
                      "
                    >
                      Show All Locations
                    </button>
                  )}
                </div>
              </motion.div>

              {/* =================================================
                  MAP LEGEND
              ================================================= */}

              <div
                className="
                  mt-4

                  flex
                  flex-wrap

                  gap-x-5
                  gap-y-2

                  text-[9px]

                  text-text-muted
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span
                    className="
                      h-2
                      w-2

                      rounded-full

                      bg-[#3f8b45]
                    "
                  />

                  Raipur — In Stock
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span
                    className="
                      h-2
                      w-2

                      rounded-full

                      bg-[#d25448]
                    "
                  />

                  Balod — Coming Soon
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span
                    className="
                      h-2
                      w-2

                      rounded-full

                      bg-[#d25448]
                    "
                  />

                  Dalli — Coming Soon
                </span>
              </div>
            </motion.div>

            {/* =================================================
                RIGHT SIDE — THREE LOCATIONS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.65,
                delay: 0.08,
              }}
              className="
                flex
                flex-col

                lg:pt-3
              "
            >
              <div className="space-y-3">
                {LOCATIONS.map(
                  (location, index) => {
                    const isAvailable =
                      location.status ===
                      "in-stock";

                    return (
                      <motion.button
                        key={location.city}
                        type="button"
                        initial={{
                          opacity: 0,
                          x: 25,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.45,

                          delay:
                            0.1 +
                            index * 0.08,
                        }}
                        whileHover={{
                          x: 5,
                          scale: 1.005,
                        }}
                        whileTap={{
                          scale: 0.985,
                        }}
                        onClick={() => {
                          setFocusedCity(
                            location.city,
                          );

                          /*
                            IMPORTANT:

                            Raipur opens distributor
                            details modal.

                            Balod and Dalli simply
                            zoom map to city.
                          */

                          if (
                            location.city ===
                            "Raipur"
                          ) {
                            setIsRaipurModalOpen(
                              true,
                            );
                          }
                        }}
                        className="
                          group

                          flex

                          min-h-[72px]

                          w-full

                          items-center
                          justify-between

                          rounded-[19px]

                          border
                          border-border-theme/80

                          bg-bg-base/20

                          px-4
                          py-3

                          text-left

                          transition-all
                          duration-300

                          hover:border-accent-primary/40
                          hover:bg-bg-muted/25
                          hover:shadow-lg

                          sm:px-5
                        "
                      >
                        {/* LEFT */}

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          "
                        >
                          <span
                            className={`
                              grid
                              h-10
                              w-10

                              shrink-0

                              place-items-center

                              rounded-full

                              ${
                                isAvailable
                                  ? "bg-accent-primary/15 text-accent-primary"
                                  : "bg-bg-muted/70 text-[#c5bea9]"
                              }
                            `}
                          >
                            <Shop
                              size={18}
                              variant={
                                isAvailable
                                  ? "Bold"
                                  : "Linear"
                              }
                            />
                          </span>

                          <div className="min-w-0">
                            <p
                              className="
                                font-display

                                text-sm
                                font-bold

                                text-text-primary
                              "
                            >
                              {
                                location.mapName
                              }
                            </p>

                            <p
                              className="
                                mt-0.5

                                text-[10px]

                                text-text-muted
                              "
                            >
                              {isAvailable
                                ? "Tap for distributor details"
                                : "Tap to view on map"}
                            </p>
                          </div>
                        </div>

                        {/* STATUS */}

                        <span
                          className={`
                            shrink-0

                            rounded-full

                            px-3
                            py-1.5

                            text-[8px]

                            font-bold

                            uppercase

                            tracking-[0.18em]

                            ${
                              isAvailable
                                ? "bg-[#385f36] text-[#78bd6b]"
                                : "bg-bg-muted text-text-muted"
                            }
                          `}
                        >
                          {isAvailable
                            ? "In Stock"
                            : "Coming Soon"}
                        </span>
                      </motion.button>
                    );
                  },
                )}
              </div>

              {/* =================================================
                  SMALL NOTE
              ================================================= */}

              <p
                className="
                  mt-5

                  text-[10px]
                  leading-relaxed

                  text-text-muted
                "
              >
                Select any town to locate it on the
                map. More Old Glory distribution
                locations will be added as the
                network expands.
              </p>

              {/* =================================================
                  DISTRIBUTION SUMMARY
              ================================================= */}

              <div
                className="
                  mt-8

                  rounded-[22px]

                  border
                  border-border-theme/60

                  bg-bg-base/20

                  p-5
                "
              >
                <span
                  className="
                    text-[8px]
                    font-bold

                    uppercase
                    tracking-[0.22em]

                    text-accent-primary
                  "
                >
                  Current Network
                </span>

                <h3
                  className="
                    mt-2

                    font-display

                    text-xl
                    font-bold

                    text-text-primary
                  "
                >
                  Three towns.
                  <br />
                  One growing network.
                </h3>

                <div
                  className="
                    mt-5

                    grid
                    grid-cols-3

                    gap-2
                  "
                >
                  <button
                    type="button"
                    onClick={
                      openRaipurDetails
                    }
                    className="
                      rounded-xl

                      border
                      border-border-theme/50

                      bg-bg-surface

                      px-2
                      py-3

                      text-center

                      transition

                      hover:border-accent-primary/40
                    "
                  >
                    <Location
                      size={16}
                      variant="Bold"
                      className="
                        mx-auto
                        text-accent-primary
                      "
                    />

                    <p
                      className="
                        mt-1.5

                        text-[10px]
                        font-bold

                        text-text-primary
                      "
                    >
                      Raipur
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFocusedCity("Balod")
                    }
                    className="
                      rounded-xl

                      border
                      border-border-theme/50

                      bg-bg-surface

                      px-2
                      py-3

                      text-center

                      transition

                      hover:border-accent-primary/40
                    "
                  >
                    <Location
                      size={16}
                      className="
                        mx-auto
                        text-text-muted
                      "
                    />

                    <p
                      className="
                        mt-1.5

                        text-[10px]
                        font-bold

                        text-text-primary
                      "
                    >
                      Balod
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFocusedCity("Dalli")
                    }
                    className="
                      rounded-xl

                      border
                      border-border-theme/50

                      bg-bg-surface

                      px-2
                      py-3

                      text-center

                      transition

                      hover:border-accent-primary/40
                    "
                  >
                    <Location
                      size={16}
                      className="
                        mx-auto
                        text-text-muted
                      "
                    />

                    <p
                      className="
                        mt-1.5

                        text-[10px]
                        font-bold

                        text-text-primary
                      "
                    >
                      Dalli
                    </p>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* =====================================================
          RAIPUR DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>
        {isRaipurModalOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onMouseDown={() =>
              setIsRaipurModalOpen(false)
            }
            className="
              fixed
              inset-0

              z-[9999]

              flex
              items-center
              justify-center

              overflow-y-auto

              bg-[#151a22]/80

              px-4
              py-8

              backdrop-blur-[7px]
            "
          >
            {/* =================================================
                MODAL
            ================================================= */}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Raipur distribution details"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 26,
              }}
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              className="
                relative

                w-full
                max-w-[390px]

                rounded-[24px]

                border
                border-border-theme

                bg-bg-surface

                p-6

                shadow-[0_30px_90px_rgba(0,0,0,0.42)]

                sm:p-7
              "
            >
              {/* CLOSE */}

              <motion.button
                type="button"
                aria-label="Close Raipur details"
                onClick={() =>
                  setIsRaipurModalOpen(false)
                }
                whileHover={{
                  rotate: 90,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                  absolute

                  right-4
                  top-4

                  grid
                  h-8
                  w-8

                  place-items-center

                  rounded-full

                  text-[#b7af94]

                  transition

                  hover:bg-bg-muted/40
                  hover:text-text-primary
                "
              >
                <CloseCircle size={20} />
              </motion.button>

              {/* STATUS */}

              <span
                className="
                  inline-flex

                  rounded-full

                  bg-[#355c36]

                  px-3
                  py-1.5

                  text-[8px]
                  font-black

                  uppercase

                  tracking-[0.2em]

                  text-[#76bd69]
                "
              >
                In Stock
              </span>

              {/* CITY */}

              <h3
                className="
                  mt-3

                  font-display

                  text-[22px]
                  font-black

                  uppercase

                  tracking-[0.035em]

                  text-text-primary
                "
              >
                Raipur
              </h3>

              <p
                className="
                  mt-1

                  text-[10px]

                  text-text-muted
                "
              >
                Current Old Glory Soda hub
              </p>

              {/* =================================================
                  DETAILS
              ================================================= */}

              <div
                className="
                  mt-5
                  space-y-2.5
                "
              >
                <DetailRow
                  icon={
                    <Profile2User
                      size={17}
                    />
                  }
                  label="Distribution Contact"
                  value={
                    RAIPUR_DETAILS.contact
                  }
                />

                <DetailRow
                  icon={<Shop size={17} />}
                  label="About"
                  value={
                    RAIPUR_DETAILS.about
                  }
                />

                {/* =================================================
                    CLICKABLE ADDRESS
                ================================================= */}

                <a
                  href={getGoogleMapsLink(
                    "Kajal Beverage Industry, Near HP Gas, Mana Basti, Raipur, Chhattisgarh 492015",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group

                    flex
                    min-h-[72px]

                    items-center
                    gap-3

                    rounded-[18px]

                    border
                    border-border-theme/70

                    bg-bg-base/20

                    px-4
                    py-3

                    transition-all

                    hover:border-accent-primary/50
                    hover:bg-bg-muted/30
                  "
                >
                  <Location
                    size={17}
                    className="
                      shrink-0

                      text-[#b9b19a]

                      transition

                      group-hover:text-accent-primary
                    "
                  />

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        leading-none

                        text-text-muted
                      "
                    >
                      Location
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs

                        font-medium

                        leading-relaxed

                        text-text-primary
                      "
                    >
                      {
                        RAIPUR_DETAILS.address
                      }
                    </p>
                  </div>

                  <ArrowRight2
                    size={15}
                    className="
                      shrink-0

                      text-text-muted

                      transition

                      group-hover:translate-x-0.5
                      group-hover:text-accent-primary
                    "
                  />
                </a>

                {/* =================================================
                    PHONE
                ================================================= */}

                <a
                  href="tel:+919407626212"
                  className="
                    group

                    flex
                    min-h-[62px]

                    items-center
                    gap-3

                    rounded-[18px]

                    border
                    border-border-theme/70

                    bg-bg-base/20

                    px-4
                    py-3

                    transition-all

                    hover:border-accent-primary/50
                    hover:bg-bg-muted/30
                  "
                >
                  <Call
                    size={17}
                    className="
                      shrink-0

                      text-[#b9b19a]

                      transition

                      group-hover:text-accent-primary
                    "
                  />

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        leading-none

                        text-text-muted
                      "
                    >
                      Phone
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs
                        font-medium

                        text-text-primary
                      "
                    >
                      {RAIPUR_DETAILS.phone}
                    </p>
                  </div>

                  <ArrowRight2
                    size={15}
                    className="
                      shrink-0

                      text-text-muted

                      transition

                      group-hover:translate-x-0.5
                      group-hover:text-accent-primary
                    "
                  />
                </a>
              </div>

              {/* =================================================
                  GOOGLE MAPS BUTTON
              ================================================= */}

              <a
                href={getGoogleMapsLink(
                  "Kajal Beverage Industry, Near HP Gas, Mana Basti, Raipur, Chhattisgarh 492015",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4

                  flex
                  w-full

                  items-center
                  justify-center
                  gap-2

                  rounded-full

                  bg-accent-primary

                  px-5
                  py-3

                  text-[10px]
                  font-bold

                  uppercase

                  tracking-[0.1em]

                  text-on-accent

                  transition-all

                  hover:scale-[1.02]
                "
              >
                <Location
                  size={15}
                  variant="Bold"
                />

                Open in Google Maps

                <ArrowRight2 size={13} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}