import { useEffect, useRef, type MutableRefObject } from "react";

import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import { latLngBounds, type CircleMarker as LeafletCircleMarker } from "leaflet";

import "leaflet/dist/leaflet.css";

import {
  CITY_LOCATIONS,
  getGoogleMapsUrl,
  MAPPED_RAIPUR_OUTLETS,
  RAIPUR_CENTER,
  RAIPUR_OUTLETS,
  toPosition,
  type CityLocation,
  type CityName,
  type MapMode,
  type RaipurOutlet,
} from "./stores-data";

const CITY_OVERVIEW_BOUNDS = latLngBounds(CITY_LOCATIONS.map((city) => [city.lat, city.lng]));

const RAIPUR_OUTLET_BOUNDS = latLngBounds(MAPPED_RAIPUR_OUTLETS.map(({ position }) => position));

function CityMarkers({
  focusedCity,
  onSelectCity,
}: {
  focusedCity: CityName | null;
  onSelectCity: (city: CityLocation) => void;
}) {
  return (
    <>
      {CITY_LOCATIONS.map((city) => {
        const available = city.status === "IN_STOCK";
        const selected = focusedCity === city.city;

        return (
          <CircleMarker
            key={city.city}
            center={[city.lat, city.lng]}
            radius={available ? (selected ? 13 : 11) : selected ? 11 : 9}
            pathOptions={{
              color: "#fff7e5",
              fillColor: available ? "#3f8b45" : "#d25448",
              fillOpacity: 1,
              weight: selected ? 4 : 3,
            }}
            eventHandlers={{
              click: () => onSelectCity(city),
            }}
          />
        );
      })}
    </>
  );
}

function OutletPopup({ outlet }: { outlet: RaipurOutlet }) {
  return (
    <Popup>
      <div
        style={{
          minWidth: "200px",
          maxWidth: "230px",
          padding: "3px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#397441",
            fontSize: "9px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          OLD GLORY AVAILABLE
        </p>

        <h4
          style={{
            margin: "5px 0 0",
            color: "#20252e",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {outlet.name}
        </h4>

        <p
          style={{
            margin: "6px 0 0",
            color: "#666",
            fontSize: "10px",
            lineHeight: 1.5,
          }}
        >
          {outlet.area}, Raipur
        </p>

        <a
          href={getGoogleMapsUrl(outlet)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "10px",
            color: "#267fb4",
            fontSize: "10px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Open in Maps ↗
        </a>
      </div>
    </Popup>
  );
}

function OutletMarkers({
  selectedOutletId,
  markerRefs,
  onSelectOutlet,
}: {
  selectedOutletId: string | null;
  markerRefs: MutableRefObject<Record<string, LeafletCircleMarker | null>>;
  onSelectOutlet: (outletId: string) => void;
}) {
  return (
    <>
      {MAPPED_RAIPUR_OUTLETS.map(({ outlet, position }) => {
        const selected = selectedOutletId === outlet.id;

        return (
          <CircleMarker
            key={outlet.id}
            ref={(marker) => {
              markerRefs.current[outlet.id] = marker;
            }}
            center={position}
            radius={selected ? 12 : 10}
            pathOptions={{
              color: "#fff7e5",
              fillColor: selected ? "#42a8df" : "#399257",
              fillOpacity: 1,
              weight: selected ? 4 : 3,
            }}
            eventHandlers={{
              click: () => onSelectOutlet(outlet.id),
            }}
          >
            <OutletPopup outlet={outlet} />
          </CircleMarker>
        );
      })}
    </>
  );
}

function MapViewportController({
  mapMode,
  focusedCity,
  selectedOutletId,
  markerRefs,
}: {
  mapMode: MapMode;
  focusedCity: CityName | null;
  selectedOutletId: string | null;
  markerRefs: MutableRefObject<Record<string, LeafletCircleMarker | null>>;
}) {
  const map = useMap();
  const hasSetInitialOverview = useRef(false);

  useEffect(() => {
    if (mapMode !== "raipur") {
      return;
    }

    const fitRaipurOutlets = () => {
      map.fitBounds(RAIPUR_OUTLET_BOUNDS, {
        animate: true,
        maxZoom: 15,
        padding: [40, 40],
      });
    };

    map.stop();
    map.once("moveend", fitRaipurOutlets);
    map.flyTo(RAIPUR_CENTER, 12, {
      animate: true,
      duration: 1.2,
    });

    return () => {
      map.off("moveend", fitRaipurOutlets);
    };
  }, [map, mapMode]);

  useEffect(() => {
    if (mapMode !== "overview" || focusedCity) {
      return;
    }

    map.stop();

    if (hasSetInitialOverview.current) {
      map.flyToBounds(CITY_OVERVIEW_BOUNDS, {
        animate: true,
        duration: 1.2,
        maxZoom: 9,
        padding: [40, 40],
      });
    } else {
      map.fitBounds(CITY_OVERVIEW_BOUNDS, {
        animate: true,
        maxZoom: 9,
        padding: [40, 40],
      });
      hasSetInitialOverview.current = true;
    }
  }, [focusedCity, map, mapMode]);

  useEffect(() => {
    if (mapMode !== "overview" || !focusedCity) {
      return;
    }

    const city = CITY_LOCATIONS.find((location) => location.city === focusedCity);

    if (!city) {
      return;
    }

    map.stop();
    map.flyTo([city.lat, city.lng], 11, {
      animate: true,
      duration: 0.8,
    });
  }, [focusedCity, map, mapMode]);

  useEffect(() => {
    if (mapMode !== "raipur" || !selectedOutletId) {
      return;
    }

    const outlet = RAIPUR_OUTLETS.find((location) => location.id === selectedOutletId);
    const position = outlet ? toPosition(outlet) : null;

    if (!outlet || !position) {
      return;
    }

    const openSelectedPopup = () => {
      markerRefs.current[outlet.id]?.openPopup();
    };

    map.stop();
    map.once("moveend", openSelectedPopup);
    map.flyTo(position, 16, {
      animate: true,
      duration: 0.8,
    });

    return () => {
      map.off("moveend", openSelectedPopup);
    };
  }, [map, mapMode, markerRefs, selectedOutletId]);

  return null;
}

export default function DistributionMap({
  mapMode,
  focusedCity,
  selectedOutletId,
  markerRefs,
  onSelectCity,
  onSelectOutlet,
}: {
  mapMode: MapMode;
  focusedCity: CityName | null;
  selectedOutletId: string | null;
  markerRefs: MutableRefObject<Record<string, LeafletCircleMarker | null>>;
  onSelectCity: (city: CityLocation) => void;
  onSelectOutlet: (outletId: string) => void;
}) {
  return (
    <MapContainer
      center={[20.9, 81.35]}
      zoom={8}
      scrollWheelZoom={false}
      zoomControl
      className="h-full w-full"
      style={{
        height: "100%",
        width: "100%",
        background: "#304a63",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewportController
        mapMode={mapMode}
        focusedCity={focusedCity}
        selectedOutletId={selectedOutletId}
        markerRefs={markerRefs}
      />

      {mapMode === "overview" && (
        <CityMarkers focusedCity={focusedCity} onSelectCity={onSelectCity} />
      )}

      {mapMode === "raipur" && (
        <OutletMarkers
          selectedOutletId={selectedOutletId}
          markerRefs={markerRefs}
          onSelectOutlet={onSelectOutlet}
        />
      )}
    </MapContainer>
  );
}
