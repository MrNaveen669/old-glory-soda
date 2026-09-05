import { COLA_PRODUCTS, FLAVORS, PET_RANGE, type Flavor } from "../components/site/data";
import { FLAVOR_FULL_IMAGES } from "../components/site/images";
import { absoluteUrl, BRAND_NAME, SITE_URL } from "./seo";

export type ProductImage = {
  src: string;
  optimizedSrc?: string;
  width: number;
  height: number;
};

const PRODUCT_IMAGES: Record<string, ProductImage> = {
  blueberry: {
    src: FLAVOR_FULL_IMAGES["blueberry-blast"],
    optimizedSrc: "/optimized/blueberry.webp",
    width: 1374,
    height: 920,
  },
  "green-apple": {
    src: FLAVOR_FULL_IMAGES["green-apple"],
    optimizedSrc: "/optimized/green-apple.webp",
    width: 1378,
    height: 908,
  },
  orange: {
    src: FLAVOR_FULL_IMAGES["citrus-orange"],
    optimizedSrc: "/optimized/orange.webp",
    width: 1370,
    height: 894,
  },
  "fruit-beer": {
    src: FLAVOR_FULL_IMAGES["fruit-beer"],
    optimizedSrc: "/optimized/fruit-beer.webp",
    width: 1377,
    height: 917,
  },
  lemon: {
    src: FLAVOR_FULL_IMAGES["lemon-zing"],
    optimizedSrc: "/optimized/lemon.webp",
    width: 1372,
    height: 918,
  },
  jeera: {
    src: FLAVOR_FULL_IMAGES["zeera-soda"],
    optimizedSrc: "/optimized/jeera.webp",
    width: 1372,
    height: 915,
  },
  cola: { src: "/og/cola-product.jpg", width: 1200, height: 630 },
  "diet-cola": { src: "/og/diet-cola-product.jpg", width: 1200, height: 630 },
};

export const INDEXABLE_PRODUCTS: Flavor[] = [...FLAVORS, ...COLA_PRODUCTS];
export const PRODUCT_PATHS = INDEXABLE_PRODUCTS.map((product) => `/products/${product.slug}`);

export function getProductBySlug(slug: string) {
  return INDEXABLE_PRODUCTS.find((product) => product.slug === slug);
}

export function getProductDescription(product: Flavor) {
  if (product.description.trim()) return product.description.trim();

  const pairings =
    product.pairs.length > 0 ? ` Suggested pairings include ${product.pairs.join(", ")}.` : "";
  return `${product.name} is an Old Glory ${product.flavourType} soda with ${product.sweetness.toLowerCase()} sweetness and ${product.fizz.toLowerCase()} fizz.${pairings}`;
}

export function getProductImage(product: Flavor) {
  return PRODUCT_IMAGES[product.slug] ?? PRODUCT_IMAGES["blueberry"]!;
}

export function getProductVariants(product: Flavor): Flavor[] {
  if (product.id !== "citrus-orange" && product.id !== "zeera-soda") return [product];

  const petVariants = ([10, 20] as const).flatMap((tier) =>
    PET_RANGE[tier].filter((variant) => variant.slug === product.slug && !variant.comingSoon),
  );

  return [product, ...petVariants];
}

export function getProductCategory(product: Flavor) {
  return product.packaging === "glass" ? "Marble-neck goli soda" : "PET soda";
}

export function getPackLabel(product: Flavor) {
  if (product.packaging === "glass") return "Signature glass bottle";
  return (
    product.volume ?? (product.price === 10 ? "160ml On-The-Go PET bottle" : "300ml PET bottle")
  );
}

export function getProductPageData(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return null;

  return {
    product,
    description: getProductDescription(product),
    image: getProductImage(product),
    variants: getProductVariants(product),
    category: getProductCategory(product),
    path: `/products/${product.slug}`,
  };
}

export type ProductPageData = NonNullable<ReturnType<typeof getProductPageData>>;

export function productJsonLd(page: ProductPageData) {
  const url = absoluteUrl(page.path);

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: page.product.name,
    description: page.description,
    image: [absoluteUrl(page.image.src)],
    url,
    category: page.category,
    brand: {
      "@type": "Brand",
      "@id": `${SITE_URL}/#brand`,
      name: BRAND_NAME,
    },
    offers: page.variants.map((variant) => ({
      "@type": "Offer",
      name: getPackLabel(variant),
      url,
      priceCurrency: "INR",
      price: variant.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
    })),
  };
}
