import { STORE_LOCATIONS, type StoreCity, type StoreLocation } from "./data";

export type CityName = StoreCity;
export type MapMode = "overview" | "raipur";
export type MapPosition = [number, number];

export type Coordinates = {
  lat: number | null;
  lng: number | null;
};

export type CityLocation = StoreLocation & {
  lat: number;
  lng: number;
};

export type RaipurOutlet = Coordinates & {
  id: string;
  name: string;
  area: string;
  approximate: boolean;
};

export type MappedOutlet = {
  outlet: RaipurOutlet;
  position: MapPosition;
};

const CITY_COORDINATES: Record<CityName, MapPosition> = {
  Dhamtari: [20.718340, 81.549901],
  Nagari: [20.34646, 81.95998],
  Keshkal: [20.08266, 81.5876],
  Kondagaon: [19.59515, 81.66747],
  Jagdalpur: [19.08136, 82.02131],
  Raipur: [21.2380912, 81.6336993],
  Balod: [20.7272006, 81.2054198],
  Dalli: [20.5884403, 81.071724],
};

export const CITY_LOCATIONS: readonly CityLocation[] = STORE_LOCATIONS.map((location) => {
  const [lat, lng] = CITY_COORDINATES[location.city];

  return {
    ...location,
    lat,
    lng,
  };
});

// Default city changed to Raipur so the Where to Buy section shows Raipur first on load
export const DEFAULT_CITY: CityName = "Raipur";

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

export const RAIPUR_CENTER: MapPosition = CITY_COORDINATES.Raipur;

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

export function getGoogleMapsUrl(location: CityLocation | RaipurOutlet) {
  if ("city" in location) {
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  }

  if (
    typeof location.lat === "number" &&
    Number.isFinite(location.lat) &&
    typeof location.lng === "number" &&
    Number.isFinite(location.lng)
  ) {
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(
    `${location.name}, ${location.area}, Raipur, Chhattisgarh`,
  )}`;
}

export function formatPhoneNumber(phone: string) {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

export function getStatusLabel(status: StoreLocation["status"]) {
  return status === "in-stock" ? "IN STOCK" : "COMING SOON";
}
