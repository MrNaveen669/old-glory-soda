export const IMAGES = {
  heroBottle: "/Blueberry-removebg.png",
  brandPoster: "/Story merge.png",
  factoryScene: "/Factory.png",
};

/** Clean background-removed illustrated cutout bottles for default card views */
export const FLAVOR_IMAGES: Record<string, string> = {
  "blueberry-blast": "/Blueberry-removebg.png",
  "green-apple": "/Green-apple-removebg.png",
  "citrus-orange": "/orange-removebg.png",
  "fruit-beer": "/Fruit-beer-removebg.png",
  "lemon-zing": "/Lemon-soda-removebg.png",
  "zeera-soda": "/Jeera-removebg.png",
};

/** Full original scene images (with background/fruit/splash) revealed in modals */
export const FLAVOR_FULL_IMAGES: Record<string, string> = {
  "blueberry-blast": "/Blueberry_bottle.jpeg",
  "green-apple": "/apple_bottle.jpeg",
  "citrus-orange": "/Orange soda.jpeg",
  "fruit-beer": "/Fruit_Beer_bottle.jpeg",
  "lemon-zing": "/Lemon_soda_bottl3.jpeg",
  "zeera-soda": "/Spicy_Jeera_bottle.jpeg",
};

export const PET_IMAGES: Record<string, string> = {
  "zeera-soda-pet-10": "/Rs.10-Jeera.png",
  "zeera-soda-pet-20": "/Rs.10-Jeera.png",
  "citrus-orange-pet-10": "/Rs.10-Orange.png",
  "citrus-orange-pet-20": "/Rs.10-Orange.png",
  "shikanji-pet-10": "/Rs.10-Sikanji.png",
  "green-apple-pet-20": "/Green-apple-removebg.png",
};

export const VINTAGE_ILLUSTRATIONS = {
  tree: "/Tree.png",
  factory: "/Factory.png",
  truck: "/Truck.png",
  crates: "/Bottle Cate.png",
  storyMerge: "/Story merge.png",
};

/** PET range ids reuse specific PET bottle cutouts. */
export function flavorImage(id: string): string | undefined {
  return PET_IMAGES[id] ?? FLAVOR_IMAGES[id] ?? FLAVOR_IMAGES[id.replace(/-pet-\d+$/, "")];
}

export function flavorFullImage(id: string): string | undefined {
  return FLAVOR_FULL_IMAGES[id] ?? FLAVOR_FULL_IMAGES[id.replace(/-pet-\d+$/, "")] ?? flavorImage(id);
}

