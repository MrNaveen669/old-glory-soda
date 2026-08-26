export type CityName = "Raipur" | "Balod" | "Dalli";
export type StoreStatus = "IN_STOCK" | "COMING_SOON";
export type MapMode = "overview" | "raipur";

export type Coordinates = {
  lat: number | null;
  lng: number | null;
};

export type CityLocation = {
  city: CityName;
  lat: number;
  lng: number;
  status: StoreStatus;
};

export type RaipurOutlet = Coordinates & {
  id: string;
  name: string;
  area: string;
  approximate: boolean;
};

export type MapPosition = [number, number];

export type MappedOutlet = {
  outlet: RaipurOutlet;
  position: MapPosition;
};

/* OpenStreetMap Nominatim records verified on 2026-08-26. */
export const CITY_LOCATIONS: readonly CityLocation[] = [
  {
    city: "Raipur",
    lat: 21.2380912,
    lng: 81.6336993,
    status: "IN_STOCK",
  },
  {
    city: "Balod",
    lat: 20.7272006,
    lng: 81.2054198,
    status: "COMING_SOON",
  },
  {
    city: "Dalli",
    lat: 20.5884403,
    lng: 81.071724,
    status: "COMING_SOON",
  },
];

/*
 * Nominatim has an exact record for Kalinga University. Storefront searches
 * for the other outlets did not resolve, so their pins use confirmed locality
 * anchors and are explicitly marked approximate. Samta Colony uses a published
 * locality centroid whose coordinate reverse-geocodes to Raipur in Nominatim,
 * rather than a storefront claim.
 */
export const RAIPUR_OUTLETS: readonly RaipurOutlet[] = [
  {
    id: "karam-podi-samta-colony",
    name: "Karam Podi",
    area: "Samta Colony",
    lat: 21.24611,
    lng: 81.61667,
    approximate: true,
  },
  {
    id: "karam-podi-devendra-nagar",
    name: "Karam Podi",
    area: "Devendra Nagar",
    lat: 21.2563469,
    lng: 81.642101,
    approximate: true,
  },
  {
    id: "dilli-wale-bhatagaon-chowpatty",
    name: "Dilli Wale",
    area: "Bhatagaon Chowpatty",
    lat: 21.2098785,
    lng: 81.6339027,
    approximate: true,
  },
  {
    id: "uno2trees-katora-talab-chowpatty",
    name: "Uno2Trees",
    area: "Katora Talab Chowpatty",
    lat: 21.2354724,
    lng: 81.6547011,
    approximate: true,
  },
  {
    id: "pizza-hub-telibandha",
    name: "Pizza Hub",
    area: "Telibandha",
    lat: 21.2364995,
    lng: 81.6710617,
    approximate: true,
  },
  {
    id: "noorjahan-telibandha",
    name: "Noorjahan",
    area: "Telibandha",
    lat: 21.240738,
    lng: 81.6603898,
    approximate: true,
  },
  {
    id: "kalinga-university-atal-nagar",
    name: "Kalinga University",
    area: "Naya Raipur / Atal Nagar",
    lat: 21.1680124,
    lng: 81.8209061,
    approximate: false,
  },
];

export const RAIPUR_PHONE = "+919407626212";
export const RAIPUR_CENTER: MapPosition = [21.2380912, 81.6336993];

export function hasCoordinates(
  location: Coordinates,
): location is Coordinates & { lat: number; lng: number } {
  return (
    typeof location.lat === "number" &&
    Number.isFinite(location.lat) &&
    typeof location.lng === "number" &&
    Number.isFinite(location.lng)
  );
}

export function toPosition(location: Coordinates): MapPosition | null {
  return hasCoordinates(location) ? [location.lat, location.lng] : null;
}

export const MAPPED_RAIPUR_OUTLETS: readonly MappedOutlet[] = RAIPUR_OUTLETS.flatMap((outlet) => {
  const position = toPosition(outlet);

  return position ? [{ outlet, position }] : [];
});

export function getGoogleMapsUrl(outlet: RaipurOutlet) {
  if (hasCoordinates(outlet)) {
    return `https://www.google.com/maps?q=${outlet.lat},${outlet.lng}`;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(
    `${outlet.name}, ${outlet.area}, Raipur, Chhattisgarh`,
  )}`;
}

export function getStatusLabel(status: StoreStatus) {
  return status === "IN_STOCK" ? "IN STOCK" : "COMING SOON";
}
