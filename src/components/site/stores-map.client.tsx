import { useEffect, type MutableRefObject } from "react";

import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import { latLngBounds, type CircleMarker as LeafletCircleMarker } from "leaflet";

import "leaflet/dist/leaflet.css";

import {
  CITY_LOCATIONS,
  DEFAULT_CITY,
  formatPhoneNumber,
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

const RAIPUR_OUTLET_BOUNDS = latLngBounds(MAPPED_RAIPUR_OUTLETS.map(({ position }) => position));

function CityPopup({ location }: { location: CityLocation }) {
  return (
    <Popup>
      <div style={{ minWidth: "205px", maxWidth: "235px", padding: "3px" }}>
        <p
          style={{
            margin: 0,
            color: location.status === "in-stock" ? "#397441" : "#9b6f2d",
            fontSize: "9px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          {location.status === "in-stock" ? "OLD GLORY AVAILABLE" : "COMING SOON"}
        </p>

        <h4 style={{ margin: "5px 0 0", color: "#20252e", fontSize: "15px", fontWeight: 700 }}>
          {location.city}
        </h4>

        <p style={{ margin: "6px 0 0", color: "#666", fontSize: "10px", lineHeight: 1.5 }}>
          {location.status === "in-stock"
            ? location.distributor.location
            : `${location.city}, Chhattisgarh`}
        </p>

        {location.status === "in-stock" && location.distributor.phone ? (
          <a
            href={`tel:+91${location.distributor.phone}`}
            style={{
              display: "block",
              marginTop: "9px",
              color: "#267fb4",
              fontSize: "11px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ☎ {formatPhoneNumber(location.distributor.phone)}
          </a>
        ) : location.status === "in-stock" ? (
          <a
            href="#contact"
            style={{
              display: "block",
              marginTop: "9px",
              color: "#267fb4",
              fontSize: "11px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Contact Us
          </a>
        ) : null}

        <a
          href={getGoogleMapsUrl(location)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "8px",
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

function CityMarkers({
  selectedCity,
  onSelectCity,
}: {
  selectedCity: CityName;
  onSelectCity: (city: CityLocation) => void;
}) {
  return (
    <>
      {CITY_LOCATIONS.map((location) => {
        const available = location.status === "in-stock";
        const selected = selectedCity === location.city;

        return (
          <CircleMarker
            key={location.city}
            center={[location.lat, location.lng]}
            radius={selected ? 13 : available ? 10 : 9}
            pathOptions={{
              color: "#fff7e5",
              fillColor: selected ? "#42a8df" : available ? "#399257" : "#d25448",
              fillOpacity: 1,
              weight: selected ? 4 : 3,
            }}
            eventHandlers={{ click: () => onSelectCity(location) }}
          >
            <CityPopup location={location} />
          </CircleMarker>
        );
      })}
    </>
  );
}

function OutletPopup({ outlet }: { outlet: RaipurOutlet }) {
  return (
    <Popup>
      <div style={{ minWidth: "200px", maxWidth: "230px", padding: "3px" }}>
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
        <h4 style={{ margin: "5px 0 0", color: "#20252e", fontSize: "15px", fontWeight: 700 }}>
          {outlet.name}
        </h4>
        <p style={{ margin: "6px 0 0", color: "#666", fontSize: "10px", lineHeight: 1.5 }}>
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
            eventHandlers={{ click: () => onSelectOutlet(outlet.id) }}
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
  selectedCity,
  selectedOutletId,
  markerRefs,
}: {
  mapMode: MapMode;
  selectedCity: CityName;
  selectedOutletId: string | null;
  markerRefs: MutableRefObject<Record<string, LeafletCircleMarker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (mapMode !== "overview") {
      return;
    }

    const location = CITY_LOCATIONS.find((city) => city.city === selectedCity);

    if (!location) {
      return;
    }

    map.stop();
    map.flyTo([location.lat, location.lng], 12, { animate: true, duration: 0.8 });
  }, [map, mapMode, selectedCity]);

  useEffect(() => {
    if (mapMode !== "raipur") {
      return;
    }

    const fitRaipurOutlets = () => {
      map.fitBounds(RAIPUR_OUTLET_BOUNDS, { animate: true, maxZoom: 15, padding: [40, 40] });
    };

    map.stop();
    map.once("moveend", fitRaipurOutlets);
    map.flyTo(RAIPUR_CENTER, 12, { animate: true, duration: 1.2 });

    return () => {
      map.off("moveend", fitRaipurOutlets);
    };
  }, [map, mapMode]);

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
    map.flyTo(position, 16, { animate: true, duration: 0.8 });

    return () => {
      map.off("moveend", openSelectedPopup);
    };
  }, [map, mapMode, markerRefs, selectedOutletId]);

  return null;
}

export default function DistributionMap({
  mapMode,
  selectedCity,
  selectedOutletId,
  markerRefs,
  onSelectCity,
  onSelectOutlet,
}: {
  mapMode: MapMode;
  selectedCity: CityName;
  selectedOutletId: string | null;
  markerRefs: MutableRefObject<Record<string, LeafletCircleMarker | null>>;
  onSelectCity: (city: CityLocation) => void;
  onSelectOutlet: (outletId: string) => void;
}) {
  const defaultLocation = CITY_LOCATIONS.find((city) => city.city === DEFAULT_CITY)!;

  return (
    <MapContainer
      center={[defaultLocation.lat, defaultLocation.lng]}
      zoom={12}
      scrollWheelZoom={false}
      zoomControl
      className="h-full w-full"
      style={{ height: "100%", width: "100%", background: "#304a63" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewportController
        mapMode={mapMode}
        selectedCity={selectedCity}
        selectedOutletId={selectedOutletId}
        markerRefs={markerRefs}
      />

      {mapMode === "overview" && (
        <CityMarkers selectedCity={selectedCity} onSelectCity={onSelectCity} />
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
