import heroBottle from "@/assets/hero-bottle.jpeg.asset.json";
import blueberry from "@/assets/flavor-blueberry.jpeg.asset.json";
import greenApple from "@/assets/flavor-green-apple.jpeg.asset.json";
import orange from "@/assets/flavor-orange.jpeg.asset.json";
import fruitBeer from "@/assets/flavor-fruit-beer.jpeg.asset.json";
import lemon from "@/assets/flavor-lemon.jpeg.asset.json";
import zeera from "@/assets/flavor-jeera.jpeg.asset.json";
import brandPoster from "@/assets/brand-poster.png.asset.json";
import factoryScene from "@/assets/factory-scene.png.asset.json";

export const IMAGES = {
  heroBottle: heroBottle.url,
  brandPoster: brandPoster.url,
  factoryScene: factoryScene.url,
};

export const FLAVOR_IMAGES: Record<string, string> = {
  "blueberry-blast": blueberry.url,
  "green-apple": greenApple.url,
  "citrus-orange": orange.url,
  "fruit-beer": fruitBeer.url,
  "lemon-zing": lemon.url,
  "zeera-soda": zeera.url,
};

/** PET range ids reuse the base flavour photography. */
export function flavorImage(id: string): string | undefined {
  return FLAVOR_IMAGES[id] ?? FLAVOR_IMAGES[id.replace(/-pet-\d+$/, "")];
}
