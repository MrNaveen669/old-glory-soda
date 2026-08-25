import type { FlavorId } from "./data";

export const IMAGES = {
  brandPoster: "/Story merge.png",
  factoryScene: "/Factory.png",
};

/** Current bottle cutouts used by flavour cards and palette controls. */
export const FLAVOR_IMAGES: Record<FlavorId, string> = {
  "blueberry-blast": "/then-now/blueberry/new.png",
  "green-apple": "/then-now/apple/new.png",
  "citrus-orange": "/then-now/orange/new.png",
  "fruit-beer": "/then-now/fruit-beer/new.png",
  "lemon-zing": "/then-now/lemon/new.png",
  "zeera-soda": "/then-now/jeera/new.png",
};

/** One real old/new composite per flagship flavour: old left, current right. */
export const THEN_NOW_IMAGES: Record<FlavorId, string> = {
  "blueberry-blast": "/then-now/blueberry-old2new.png",
  "green-apple": "/then-now/greenapple-old2new.png",
  "citrus-orange": "/then-now/orange-old2new.png",
  "fruit-beer": "/then-now/fruitebeer-old2new.png",
  "lemon-zing": "/then-now/lemon-old2new.png",
  "zeera-soda": "/then-now/jeera-old2new.png",
};

export type ThenNowBottleFrame = {
  /** Source-space bounds of the visible bottle inside its composite half. */
  top: number;
  bottom: number;
  centerX: number;
};

export type ThenNowImageGeometry = {
  width: number;
  height: number;
  old: ThenNowBottleFrame;
  new: ThenNowBottleFrame;
};

/**
 * Visible-bottle geometry measured from the real composite assets. Keeping these
 * values in source-image coordinates makes the normalization responsive: no
 * viewport-specific offsets or transforms are needed.
 */
export const THEN_NOW_IMAGE_GEOMETRY: Record<FlavorId, ThenNowImageGeometry> = {
  "blueberry-blast": {
    width: 1672,
    height: 941,
    old: { top: 132, bottom: 878, centerX: 612 },
    new: { top: 22, bottom: 941, centerX: 217 },
  },
  "green-apple": {
    width: 1536,
    height: 1024,
    old: { top: 144, bottom: 912, centerX: 569.5 },
    new: { top: 10, bottom: 1018, centerX: 186.5 },
  },
  "citrus-orange": {
    width: 1536,
    height: 1024,
    old: { top: 204, bottom: 896, centerX: 566.5 },
    new: { top: 87, bottom: 976, centerX: 185 },
  },
  "fruit-beer": {
    width: 1536,
    height: 1024,
    old: { top: 127, bottom: 919, centerX: 537 },
    new: { top: 15, bottom: 1015, centerX: 186.5 },
  },
  "lemon-zing": {
    width: 1536,
    height: 1024,
    old: { top: 79, bottom: 975, centerX: 554 },
    new: { top: 8, bottom: 1024, centerX: 203 },
  },
  "zeera-soda": {
    width: 1672,
    height: 941,
    old: { top: 87, bottom: 882, centerX: 608 },
    new: { top: 10, bottom: 928, centerX: 201 },
  },
};

export const FLAVOR_IMAGE_FALLBACK = "/logo-mark.png";
export const THEN_NOW_IMAGE_FALLBACK = "/oldtonew.png";

/** Full original scene images (with background/fruit/splash) revealed in modals */
export const FLAVOR_FULL_IMAGES: Record<FlavorId, string> = {
  "blueberry-blast": "/Blueberry-poster.png",
  "green-apple": "/Green-apple-poster.png",
  "citrus-orange": "/Orange-poster.png",
  "fruit-beer": "/Fruite-beer-poster.png",
  "lemon-zing": "/lemon-poster.png",
  "zeera-soda": "/Jeera-poster.png",
};

export const PET_IMAGES: Record<string, string> = {
  "zeera-soda-pet-10": "/Rs10-jeera.png",
  "zeera-soda-pet-20": "/Rs20Jeera.png",
  "citrus-orange-pet-10": "/Rs10orange.png",
  "citrus-orange-pet-20": "/Rs20-orange.png",
  "shikanji-pet-10": "/Rs10-sinkanji.png",
 
};

export const VINTAGE_ILLUSTRATIONS = {
  tree: "/Tree.png",
  factory: "/Factory.png",
  truck: "/Truck.png",
  crates: "/Bottle Cate.png",
  storyMerge: "/Story merge.png",
};

function isFlavorId(value: string): value is FlavorId {
  return value in FLAVOR_IMAGES;
}

/** PET range ids reuse specific PET bottle cutouts. */
export function flavorImage(id: string): string | undefined {
  if (PET_IMAGES[id]) return PET_IMAGES[id];
  const baseId = id.replace(/-pet-\d+$/, "");
  return isFlavorId(baseId) ? FLAVOR_IMAGES[baseId] : undefined;
}

export function flavorFullImage(id: string): string | undefined {
  const baseId = id.replace(/-pet-\d+$/, "");
  return isFlavorId(baseId) ? FLAVOR_FULL_IMAGES[baseId] : flavorImage(id);
}
