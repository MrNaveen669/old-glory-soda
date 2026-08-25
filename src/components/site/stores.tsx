import { motion } from "motion/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft2,
  ArrowRight2,
  Call,
  Location,
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

type StoreStatus =
  | "in-stock"
  | "coming-soon";

type MapMode =
  | "overview"
  | "raipur";

type CityLocation = {
  city: CityName;
  mapName: string;
  position: LatLngTuple;
  status: StoreStatus;
  subtitle: string;
  address: string;
};

type RaipurOutletSource = {
  id: string;
  name: string;
  address: string;
  searchQuery: string;
  googleMapsUrl: string;
};

type ResolvedRaipurOutlet =
  RaipurOutletSource & {
    position: LatLngTuple;
    resolvedAddress?: string;
  };

type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
};

/* =========================================================
   CITY OVERVIEW

   These markers are shown ONLY on the initial map.
========================================================= */

const CITY_LOCATIONS: CityLocation[] = [
  {
    city: "Raipur",
    mapName: "Raipur",
    position: [21.2514, 81.6296],
    status: "in-stock",
    subtitle: "View available outlets",
    address:
      "Raipur, Chhattisgarh, India",
  },

  {
    city: "Balod",
    mapName: "Balod",
    position: [20.7308, 81.2058],
    status: "coming-soon",
    subtitle: "Rolling out shortly",
    address:
      "Balod, Chhattisgarh, India",
  },

  {
    city: "Dalli",
    mapName: "Dalli Rajhara",
    position: [20.5857, 81.075],
    status: "coming-soon",
    subtitle: "Rolling out shortly",
    address:
      "Dalli Rajhara, Chhattisgarh, India",
  },
];

/* =========================================================
   RAIPUR OUTLETS

   Coordinates are resolved automatically through
   OpenStreetMap Nominatim.

   NO GOOGLE MAP API KEY REQUIRED.
========================================================= */

const RAIPUR_OUTLET_SOURCES:
  RaipurOutletSource[] = [
  {
    id: "pizza-hub",

    name: "Pizza Hub Raipur",

    address:
      "Street No. 7, Telibandha, Raipur, Chhattisgarh 492001",

    searchQuery:
      "Pizza Hub Raipur, Street No 7, Telibandha, Raipur, Chhattisgarh",

    googleMapsUrl:
      "https://maps.app.goo.gl/qvcrwTpgbckbiMkk8?g_st=awb",
  },

  {
    id: "kaaram-podi",

    name: "Kaaram Podi",

    address:
      "Aveer Arcade, opposite Chintaharan Hanuman Mandir, Choubey Colony, Raipur, Chhattisgarh 492001",

    searchQuery:
      "Kaaram Podi, Aveer Arcade, Choubey Colony, Raipur, Chhattisgarh",

    googleMapsUrl:
      "https://maps.app.goo.gl/j8uCtfSMDSUt6c8MA?g_st=awb",
  },

  {
    id: "dilli-wale-chowpatty",

    name: "Dilli Wale Chowpatty",

    address:
      "Shop L-7, Food Adda, opposite Mona Fuels, Bhatagaon, Raipur, Chhattisgarh",

    searchQuery:
      "Dilli Wale Chowpatty, Food Adda, Bhatagaon, Raipur, Chhattisgarh",

    googleMapsUrl:
      "https://maps.app.goo.gl/fVhC5bxKwtYEMKqb6?g_st=awb",
  },
];

/* =========================================================
   OTHER GOOGLE MAP LINKS FROM YOUR SCREENSHOT

   Their names/coordinates are not visible in screenshot,
   therefore they are NOT given fake map coordinates.

   Once you know their name/address, move them into
   RAIPUR_OUTLET_SOURCES.
========================================================= */

const EXTRA_RAIPUR_LINKS = [
  {
    id: "shared-2",
    name: "Shared Raipur Location 2",
    url:
      "https://maps.app.goo.gl/wTvuTPdlrkfASsxkA?g_st=awb",
  },

  {
    id: "shared-3",
    name: "Shared Raipur Location 3",
    url:
      "https://maps.app.goo.gl/22rhkPeUYPkBXnJk9?g_st=awb",
  },

  {
    id: "shared-4",
    name: "Shared Raipur Location 4",
    url:
      "https://maps.app.goo.gl/m6hav2n1KwD1pL4B6?g_st=awb",
  },

  {
    id: "shared-5",
    name: "Shared Raipur Location 5",
    url:
      "https://maps.app.goo.gl/1urNiWTGrMmbnaFw5?g_st=awb",
  },
];

/* =========================================================
   CONTACT
========================================================= */

const RAIPUR_PHONE =
  "+919407626212";

/* =========================================================
   SMALL HELPER
========================================================= */

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/* =========================================================
   GEOCODE ONE RAIPUR OUTLET

   Uses OpenStreetMap's Nominatim geocoder.
========================================================= */

async function geocodeOutlet(
  outlet: RaipurOutletSource,
  signal: AbortSignal,
): Promise<ResolvedRaipurOutlet | null> {
  const params =
    new URLSearchParams({
      q: outlet.searchQuery,
      format: "jsonv2",
      limit: "1",
      countrycodes: "in",
    });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal,
      },
    );

    if (!response.ok) {
      return null;
    }

    const data =
      (await response.json()) as
        NominatimResult[];

    if (!data.length) {
      return null;
    }

    const latitude =
      Number(data[0].lat);

    const longitude =
      Number(data[0].lon);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return null;
    }

    return {
      ...outlet,

      position: [
        latitude,
        longitude,
      ],

      resolvedAddress:
        data[0].display_name,
    };
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      return null;
    }

    console.error(
      `Could not locate ${outlet.name}`,
      error,
    );

    return null;
  }
}

/* =========================================================
   MAP VIEW CONTROLLER
========================================================= */

function MapViewportController({
  mode,
  focusedCity,
  raipurOutlets,
}: {
  mode: MapMode;
  focusedCity: CityName | null;
  raipurOutlets:
    ResolvedRaipurOutlet[];
}) {
  const map = useMap();

  useEffect(() => {
    /* -----------------------------------------------
       RAIPUR OUTLET MODE
    ----------------------------------------------- */

    if (mode === "raipur") {
      if (raipurOutlets.length > 0) {
        const bounds =
          latLngBounds(
            raipurOutlets.map(
              (outlet) =>
                outlet.position,
            ),
          );

        map.fitBounds(bounds, {
          padding: [55, 55],
          maxZoom: 14,
          animate: true,
        });

        return;
      }

      /* While outlets are loading */

      map.flyTo(
        [21.2514, 81.6296],
        12,
        {
          animate: true,
          duration: 0.8,
        },
      );

      return;
    }

    /* -----------------------------------------------
       INDIVIDUAL CITY
    ----------------------------------------------- */

    if (focusedCity) {
      const city =
        CITY_LOCATIONS.find(
          (item) =>
            item.city ===
            focusedCity,
        );

      if (city) {
        map.flyTo(
          city.position,
          11,
          {
            animate: true,
            duration: 0.8,
          },
        );
      }

      return;
    }

    /* -----------------------------------------------
       SHOW RAIPUR + BALOD + DALLI
    ----------------------------------------------- */

    const bounds =
      latLngBounds(
        CITY_LOCATIONS.map(
          (city) =>
            city.position,
        ),
      );

    map.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 9,
      animate: true,
    });
  }, [
    mode,
    focusedCity,
    raipurOutlets,
    map,
  ]);

  return null;
}

/* =========================================================
   MAP
========================================================= */

function DistributionMap({
  mode,
  focusedCity,
  raipurOutlets,
  onRaipurClick,
}: {
  mode: MapMode;
  focusedCity: CityName | null;
  raipurOutlets:
    ResolvedRaipurOutlet[];
  onRaipurClick: () => void;
}) {
  return (
    <MapContainer
      center={[
        20.9,
        81.35,
      ]}
      zoom={8}
      scrollWheelZoom={false}
      zoomControl
      className="h-full w-full"
      style={{
        height: "100%",
        width: "100%",
        background:
          "#304a63",
      }}
    >
      {/* =================================================
          OPENSTREETMAP
      ================================================= */}

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewportController
        mode={mode}
        focusedCity={focusedCity}
        raipurOutlets={
          raipurOutlets
        }
      />

      {/* =================================================
          DEFAULT MODE:
          RAIPUR / BALOD / DALLI
      ================================================= */}

      {mode === "overview" &&
        CITY_LOCATIONS.map(
          (city) => {
            const available =
              city.status ===
              "in-stock";

            return (
              <CircleMarker
                key={city.city}
                center={
                  city.position
                }
                radius={
                  available
                    ? 11
                    : 9
                }
                pathOptions={{
                  color:
                    "#fff7e5",

                  fillColor:
                    available
                      ? "#3f8b45"
                      : "#d25448",

                  fillOpacity: 1,
                  weight: 3,
                }}
              >
                <Popup>
                  <div
                    style={{
                      minWidth:
                        "175px",
                      padding: "2px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,

                        fontSize:
                          "9px",

                        fontWeight:
                          700,

                        textTransform:
                          "uppercase",

                        letterSpacing:
                          ".12em",

                        color:
                          available
                            ? "#397441"
                            : "#777",
                      }}
                    >
                      {available
                        ? "In Stock"
                        : "Coming Soon"}
                    </p>

                    <h4
                      style={{
                        margin:
                          "5px 0 0",

                        color:
                          "#20252e",

                        fontSize:
                          "15px",

                        fontWeight:
                          700,
                      }}
                    >
                      {city.mapName}
                    </h4>

                    <p
                      style={{
                        margin:
                          "4px 0 0",

                        color:
                          "#666",

                        fontSize:
                          "11px",
                      }}
                    >
                      {city.subtitle}
                    </p>

                    {city.city ===
                      "Raipur" && (
                      <button
                        type="button"
                        onClick={
                          onRaipurClick
                        }
                        style={{
                          border: 0,

                          marginTop:
                            "10px",

                          padding: 0,

                          background:
                            "transparent",

                          color:
                            "#267fb4",

                          cursor:
                            "pointer",

                          fontSize:
                            "10px",

                          fontWeight:
                            700,
                        }}
                      >
                        View Raipur
                        outlets →
                      </button>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          },
        )}

      {/* =================================================
          RAIPUR MODE:
          ONLY RAIPUR OUTLETS
      ================================================= */}

      {mode === "raipur" &&
        raipurOutlets.map(
          (outlet) => (
            <CircleMarker
              key={outlet.id}
              center={
                outlet.position
              }
              radius={10}
              pathOptions={{
                color: "#fff7e5",
                fillColor:
                  "#399257",
                fillOpacity: 1,
                weight: 3,
              }}
            >
              <Popup>
                <div
                  style={{
                    minWidth:
                      "200px",

                    maxWidth:
                      "230px",

                    padding: "3px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,

                      color:
                        "#397441",

                      fontSize:
                        "9px",

                      fontWeight:
                        700,

                      textTransform:
                        "uppercase",

                      letterSpacing:
                        ".12em",
                    }}
                  >
                    Old Glory
                    Available
                  </p>

                  <h4
                    style={{
                      margin:
                        "5px 0 0",

                      color:
                        "#20252e",

                      fontSize:
                        "15px",

                      fontWeight:
                        700,
                    }}
                  >
                    {outlet.name}
                  </h4>

                  <p
                    style={{
                      margin:
                        "6px 0 0",

                      color: "#666",

                      fontSize:
                        "10px",

                      lineHeight:
                        1.5,
                    }}
                  >
                    {outlet.address}
                  </p>

                  <a
                    href={
                      outlet.googleMapsUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:
                        "inline-block",

                      marginTop:
                        "10px",

                      color:
                        "#267fb4",

                      fontSize:
                        "10px",

                      fontWeight:
                        700,

                      textDecoration:
                        "none",
                    }}
                  >
                    Open in
                    Google Maps ↗
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          ),
        )}
    </MapContainer>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function Stores() {
  const [
    mapMode,
    setMapMode,
  ] =
    useState<MapMode>(
      "overview",
    );

  const [
    focusedCity,
    setFocusedCity,
  ] =
    useState<CityName | null>(
      null,
    );

  const [
    raipurOutlets,
    setRaipurOutlets,
  ] = useState<
    ResolvedRaipurOutlet[]
  >([]);

  const [
    isLoadingRaipur,
    setIsLoadingRaipur,
  ] =
    useState(false);

  const [
    raipurLoaded,
    setRaipurLoaded,
  ] =
    useState(false);

  const [
    raipurError,
    setRaipurError,
  ] =
    useState<string | null>(
      null,
    );

  /* =======================================================
     ENTER RAIPUR MODE
  ======================================================= */

  const openRaipur =
    () => {
      setFocusedCity(null);
      setMapMode("raipur");
    };

  /* =======================================================
     RETURN TO THREE-CITY MAP
  ======================================================= */

  const showAllTowns =
    () => {
      setMapMode("overview");
      setFocusedCity(null);
    };

  /* =======================================================
     LOAD RAIPUR OUTLET COORDINATES

     Runs once when Raipur is opened.
  ======================================================= */

  useEffect(() => {
    if (
      mapMode !== "raipur" ||
      raipurLoaded
    ) {
      return;
    }

    const controller =
      new AbortController();

    const loadLocations =
      async () => {
        setIsLoadingRaipur(
          true,
        );

        setRaipurError(null);

        const resolved:
          ResolvedRaipurOutlet[] =
          [];

        try {
          /*
            Do sequential requests instead
            of sending all geocoder requests
            at exactly the same time.
          */

          for (
            let index = 0;
            index <
            RAIPUR_OUTLET_SOURCES.length;
            index++
          ) {
            const outlet =
              RAIPUR_OUTLET_SOURCES[
                index
              ];

            const result =
              await geocodeOutlet(
                outlet,
                controller.signal,
              );

            if (
              controller.signal
                .aborted
            ) {
              return;
            }

            if (result) {
              resolved.push(
                result,
              );

              /*
                Add points progressively,
                so map starts updating
                immediately.
              */

              setRaipurOutlets(
                [...resolved],
              );
            }

            if (
              index <
              RAIPUR_OUTLET_SOURCES.length -
                1
            ) {
              await sleep(250);
            }
          }

          if (
            resolved.length === 0
          ) {
            setRaipurError(
              "Outlet coordinates could not be loaded. You can still open the Google Maps links.",
            );
          }

          setRaipurLoaded(true);
        } catch (error) {
          if (
            controller.signal
              .aborted
          ) {
            return;
          }

          console.error(
            error,
          );

          setRaipurError(
            "Could not load Raipur outlet coordinates.",
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setIsLoadingRaipur(
              false,
            );
          }
        }
      };

    void loadLocations();

    return () => {
      controller.abort();
    };
  }, [
    mapMode,
    raipurLoaded,
  ]);

  /* =======================================================
     MAPPED COUNT
  ======================================================= */

  const mappedOutletIds =
    useMemo(
      () =>
        new Set(
          raipurOutlets.map(
            (outlet) =>
              outlet.id,
          ),
        ),
      [raipurOutlets],
    );

  return (
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
      {/* ===================================================
          DECORATION
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-0
        "
      >
        <span
          className="
            absolute
            right-[20%]
            top-[31%]

            h-1.5
            w-1.5

            rounded-full

            bg-[#9a8038]/70
          "
        />

        <span
          className="
            absolute
            right-[15%]
            top-[45%]

            h-1.5
            w-1.5

            rounded-full

            bg-[#9a8038]/60
          "
        />
      </div>

      <div
        className="
          relative

          mx-auto
          max-w-6xl

          px-4
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
          "
        >
          {/* =================================================
              LEFT
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
                  h-1
                  w-1

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
                font-bold

                leading-[1.02]

                tracking-[0.01em]

                text-text-primary

                sm:text-[46px]
                lg:text-[49px]
              "
            >
              A crate is closer
              <br />
              than you think.
            </h2>

            {/* TEXT */}

            <p
              className="
                mt-5

                max-w-[500px]

                text-[14px]
                leading-7

                text-text-muted
              "
            >
              {mapMode ===
              "raipur"
                ? "Explore Old Glory Soda availability across Raipur. Select a marker to see the outlet and open its exact Google Maps location."
                : "Old Glory is rolling out across Chhattisgarh, one town at a time. Select Raipur to see exactly where Old Glory is available."}
            </p>

            {/* CTA */}

            <div
              className="
                mt-7

                flex
                flex-wrap

                gap-3
              "
            >
              {mapMode ===
              "overview" ? (
                <motion.button
                  type="button"
                  onClick={
                    openRaipur
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    inline-flex
                    min-h-11

                    items-center
                    gap-2

                    rounded-full

                    bg-[#42a8df]

                    px-5
                    py-2.5

                    text-[11px]
                    font-semibold

                    text-[#111820]

                    shadow-lg
                  "
                >
                  <Location
                    size={16}
                    variant="Bold"
                  />

                  View Raipur
                  Outlets
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={
                    showAllTowns
                  }
                  whileHover={{
                    x: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    inline-flex
                    min-h-11

                    items-center
                    gap-2

                    rounded-full

                    bg-[#42a8df]

                    px-5
                    py-2.5

                    text-[11px]
                    font-semibold

                    text-[#111820]
                  "
                >
                  <ArrowLeft2
                    size={16}
                  />

                  All Towns
                </motion.button>
              )}

              <motion.a
                href={`tel:${RAIPUR_PHONE}`}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  inline-flex
                  min-h-11

                  items-center
                  gap-2

                  rounded-full

                  border
                  border-border-theme

                  px-5
                  py-2.5

                  text-[11px]
                  font-semibold

                  text-text-primary

                  transition

                  hover:bg-bg-muted/30
                "
              >
                <Call size={16} />

                Talk to
                distributor
              </motion.a>
            </div>

            {/* =================================================
                MAP
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

                h-[330px]

                overflow-hidden

                rounded-[24px]

                border
                border-border-theme/80

                bg-[#304a63]

                p-2.5

                sm:h-[370px]
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
                <DistributionMap
                  mode={
                    mapMode
                  }
                  focusedCity={
                    focusedCity
                  }
                  raipurOutlets={
                    raipurOutlets
                  }
                  onRaipurClick={
                    openRaipur
                  }
                />

                {/* ===============================
                    TOP MAP CARD
                =============================== */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    left-3
                    top-3

                    z-[500]

                    rounded-xl

                    bg-[#252c36]/92

                    px-3.5
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
                    {mapMode ===
                    "raipur"
                      ? "Available in"
                      : "Distribution Network"}
                  </p>

                  <p
                    className="
                      mt-0.5

                      text-[11px]
                      font-semibold

                      text-white
                    "
                  >
                    {mapMode ===
                    "raipur"
                      ? `Raipur · ${raipurOutlets.length} mapped`
                      : "Raipur · Balod · Dalli"}
                  </p>
                </div>

                {/* ===============================
                    RAIPUR LOADER
                =============================== */}

                {mapMode ===
                  "raipur" &&
                  isLoadingRaipur &&
                  raipurOutlets.length ===
                    0 && (
                    <div
                      className="
                        absolute

                        bottom-4
                        left-1/2

                        z-[500]

                        -translate-x-1/2

                        rounded-full

                        bg-[#252c36]/95

                        px-4
                        py-2.5

                        text-[9px]
                        font-semibold

                        text-white

                        shadow-lg
                        backdrop-blur-md
                      "
                    >
                      Finding Raipur
                      outlets...
                    </div>
                  )}

                {/* ===============================
                    BACK BUTTON ON MAP
                =============================== */}

                {mapMode ===
                  "raipur" && (
                  <button
                    type="button"
                    onClick={
                      showAllTowns
                    }
                    className="
                      absolute

                      bottom-7
                      right-3

                      z-[500]

                      inline-flex

                      items-center
                      gap-1.5

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
                    <ArrowLeft2
                      size={12}
                    />

                    All Towns
                  </button>
                )}

                {/* ===============================
                    RESET CITY ZOOM
                =============================== */}

                {mapMode ===
                  "overview" &&
                  focusedCity && (
                    <button
                      type="button"
                      onClick={() =>
                        setFocusedCity(
                          null,
                        )
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
                      "
                    >
                      Show All
                    </button>
                  )}
              </div>
            </motion.div>

            {/* MAP STATUS */}

            {mapMode ===
              "overview" ? (
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

                  Raipur —
                  In Stock
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

                  Balod —
                  Coming Soon
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

                  Dalli —
                  Coming Soon
                </span>
              </div>
            ) : (
              <div
                className="
                  mt-4

                  flex
                  items-center
                  gap-2

                  text-[9px]

                  text-text-muted
                "
              >
                <span
                  className="
                    h-2
                    w-2

                    rounded-full

                    bg-[#399257]
                  "
                />

                Green markers =
                Old Glory available
                in Raipur
              </div>
            )}
          </motion.div>

          {/* =================================================
              RIGHT
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
            {/* =================================================
                OVERVIEW CARDS
            ================================================= */}

            {mapMode ===
              "overview" && (
              <>
                <div className="space-y-3">
                  {CITY_LOCATIONS.map(
                    (
                      location,
                      index,
                    ) => {
                      const available =
                        location.status ===
                        "in-stock";

                      return (
                        <motion.button
                          key={
                            location.city
                          }
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
                            duration:
                              0.45,

                            delay:
                              0.1 +
                              index *
                                0.08,
                          }}
                          whileHover={{
                            x: 5,
                          }}
                          whileTap={{
                            scale:
                              0.985,
                          }}
                          onClick={() => {
                            if (
                              location.city ===
                              "Raipur"
                            ) {
                              openRaipur();

                              return;
                            }

                            setFocusedCity(
                              location.city,
                            );
                          }}
                          className="
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

                            transition

                            hover:border-accent-primary/40
                            hover:bg-bg-muted/25
                            hover:shadow-lg

                            sm:px-5
                          "
                        >
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
                                  available
                                    ? "bg-accent-primary/15 text-accent-primary"
                                    : "bg-bg-muted/70 text-[#c5bea9]"
                                }
                              `}
                            >
                              <Shop
                                size={
                                  18
                                }
                                variant={
                                  available
                                    ? "Bold"
                                    : "Linear"
                                }
                              />
                            </span>

                            <div>
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
                                {location.city ===
                                "Raipur"
                                  ? "Tap to see all Raipur outlets"
                                  : "Tap to view on map"}
                              </p>
                            </div>
                          </div>

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
                                available
                                  ? "bg-[#385f36] text-[#78bd6b]"
                                  : "bg-bg-muted text-text-muted"
                              }
                            `}
                          >
                            {available
                              ? "In Stock"
                              : "Coming Soon"}
                          </span>
                        </motion.button>
                      );
                    },
                  )}
                </div>

                <p
                  className="
                    mt-5

                    text-xs
                    leading-6

                    text-text-muted
                  "
                >
                  Select Raipur to
                  explore individual
                  stores and restaurants
                  where Old Glory is
                  currently available.
                </p>
              </>
            )}

            {/* =================================================
                RAIPUR OUTLET LIST
            ================================================= */}

            {mapMode ===
              "raipur" && (
              <>
                <div
                  className="
                    flex
                    items-end
                    justify-between

                    gap-4
                  "
                >
                  <div>
                    <span
                      className="
                        text-[8px]
                        font-bold

                        uppercase

                        tracking-[0.2em]

                        text-accent-primary
                      "
                    >
                      Available in
                      Raipur
                    </span>

                    <h3
                      className="
                        mt-2

                        font-display

                        text-2xl
                        font-bold

                        text-text-primary
                      "
                    >
                      Find Old Glory
                      nearby.
                    </h3>
                  </div>

                  <span
                    className="
                      rounded-full

                      border
                      border-border-theme

                      px-3
                      py-1.5

                      text-[9px]

                      text-text-muted
                    "
                  >
                    {
                      RAIPUR_OUTLET_SOURCES.length
                    }{" "}
                    identified
                  </span>
                </div>

                {/* ===============================
                    KNOWN OUTLETS
                =============================== */}

                <div
                  className="
                    mt-6
                    space-y-3
                  "
                >
                  {RAIPUR_OUTLET_SOURCES.map(
                    (
                      outlet,
                      index,
                    ) => {
                      const mapped =
                        mappedOutletIds.has(
                          outlet.id,
                        );

                      return (
                        <motion.a
                          key={
                            outlet.id
                          }
                          href={
                            outlet.googleMapsUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration:
                              0.35,

                            delay:
                              index *
                              0.07,
                          }}
                          className="
                            group

                            flex
                            min-h-[82px]
                            w-full

                            items-center
                            gap-3

                            rounded-[19px]

                            border
                            border-border-theme/80

                            bg-bg-base/20

                            px-4
                            py-3

                            transition

                            hover:border-accent-primary/40
                            hover:bg-bg-muted/25
                          "
                        >
                          <span
                            className="
                              grid
                              h-10
                              w-10

                              shrink-0

                              place-items-center

                              rounded-full

                              bg-[#399257]/15

                              text-[#60ad74]
                            "
                          >
                            <Location
                              size={
                                18
                              }
                              variant="Bold"
                            />
                          </span>

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >
                            <div
                              className="
                                flex

                                items-center
                                gap-2
                              "
                            >
                              <p
                                className="
                                  truncate

                                  text-xs
                                  font-bold

                                  text-text-primary
                                "
                              >
                                {
                                  outlet.name
                                }
                              </p>

                              {mapped && (
                                <span
                                  className="
                                    h-1.5
                                    w-1.5

                                    shrink-0

                                    rounded-full

                                    bg-[#54aa69]
                                  "
                                />
                              )}
                            </div>

                            <p
                              className="
                                mt-1

                                line-clamp-2

                                text-[9px]
                                leading-4

                                text-text-muted
                              "
                            >
                              {
                                outlet.address
                              }
                            </p>
                          </div>

                          <ArrowRight2
                            size={14}
                            className="
                              shrink-0

                              text-text-muted

                              transition

                              group-hover:translate-x-0.5
                              group-hover:text-accent-primary
                            "
                          />
                        </motion.a>
                      );
                    },
                  )}
                </div>

                {/* ERROR */}

                {raipurError && (
                  <p
                    className="
                      mt-3

                      rounded-xl

                      border
                      border-border-theme/60

                      bg-bg-base/20

                      px-3
                      py-2

                      text-[9px]
                      leading-4

                      text-text-muted
                    "
                  >
                    {raipurError}
                  </p>
                )}

                {/* ===============================
                    EXTRA SHARED LINKS
                =============================== */}

                <div
                  className="
                    mt-7

                    border-t
                    border-border-theme/60

                    pt-5
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-bold

                      uppercase

                      tracking-[0.18em]

                      text-text-muted
                    "
                  >
                    More shared
                    Raipur locations
                  </p>

                  <div
                    className="
                      mt-3

                      grid
                      grid-cols-2

                      gap-2
                    "
                  >
                    {EXTRA_RAIPUR_LINKS.map(
                      (
                        location,
                        index,
                      ) => (
                        <a
                          key={
                            location.id
                          }
                          href={
                            location.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex

                            min-h-12

                            items-center
                            justify-between

                            gap-2

                            rounded-xl

                            border
                            border-border-theme/60

                            bg-bg-base/20

                            px-3

                            text-[9px]

                            text-text-muted

                            transition

                            hover:border-accent-primary/40
                            hover:text-text-primary
                          "
                        >
                          <span>
                            Location{" "}
                            {index +
                              4}
                          </span>

                          <ArrowRight2
                            size={12}
                          />
                        </a>
                      ),
                    )}
                  </div>
                </div>

                {/* BACK */}

                <button
                  type="button"
                  onClick={
                    showAllTowns
                  }
                  className="
                    mt-6

                    inline-flex

                    items-center
                    gap-2

                    text-[10px]
                    font-semibold

                    text-accent-primary

                    transition

                    hover:gap-3
                  "
                >
                  <ArrowLeft2
                    size={14}
                  />

                  Back to all towns
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}