export const IMAGES = {
  heroBottle: "/Codd-neck_bottle_with_blue_soda_202608131812.jpeg",
  brandPoster: "/Story merge.png",
  factoryScene: "/Factory.png",
};

export const FLAVOR_IMAGES: Record<string, string> = {
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
};

export const VINTAGE_ILLUSTRATIONS = {
  tree: "/Tree.png",
  factory: "/Factory.png",
  truck: "/Truck.png",
  crates: "/Bottle Cate.png",
  storyMerge: "/Story merge.png",
};

/** PET range ids reuse specific PET bottle photography if available. */
export function flavorImage(id: string): string | undefined {
  return PET_IMAGES[id] ?? FLAVOR_IMAGES[id] ?? FLAVOR_IMAGES[id.replace(/-pet-\d+$/, "")];
}
