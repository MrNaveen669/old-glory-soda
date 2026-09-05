export const SITE_URL = "https://oldglory.co.in";
export const BRAND_NAME = "Old Glory Soda";
export const BUSINESS_NAME = "Kajal Beverage Industry";

export const PHONE = "+91 94076 26212";
export const PHONE_NATIONAL = "9407626212";
export const PHONE_DISPLAY = "94076-26212";
export const PHONE_TEL = "+919407626212";

export const WHATSAPP = "+91 75094 34343";
export const WHATSAPP_DISPLAY = "75094-34343";
export const WHATSAPP_URL = "https://wa.me/917509434343";

export const EMAIL = "kajalbeverageindustry@gmail.com";
export const ADDRESS = "Near HP Gas Agency, Mana Basti, Raipur, Chhattisgarh 492015";
export const ADDRESS_STREET = "Near HP Gas Agency, Mana Basti";
export const ADDRESS_LOCALITY = "Raipur";
export const ADDRESS_REGION = "Chhattisgarh";
export const POSTAL_CODE = "492015";
export const ADDRESS_COUNTRY = "IN";

export const INSTAGRAM_URL = "https://www.instagram.com/old_glory_golisoda/";
export const DEFAULT_OG_IMAGE_PATH = "/og/old-glory-soda-og.jpg";

export const STORY_PATHS = [
  "/story/roadside-roots",
  "/story/bottling-works",
  "/story/town-rollout",
  "/story/corner-shop-crates",
] as const;

export const SITE_CONFIG = {
  url: SITE_URL,
  brandName: BRAND_NAME,
  businessName: BUSINESS_NAME,
  phone: PHONE,
  phoneNational: PHONE_NATIONAL,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  whatsapp: WHATSAPP,
  whatsappDisplay: WHATSAPP_DISPLAY,
  whatsappUrl: WHATSAPP_URL,
  email: EMAIL,
  address: ADDRESS,
  addressStreet: ADDRESS_STREET,
  addressLocality: ADDRESS_LOCALITY,
  addressRegion: ADDRESS_REGION,
  postalCode: POSTAL_CODE,
  addressCountry: ADDRESS_COUNTRY,
  instagramUrl: INSTAGRAM_URL,
  defaultOgImagePath: DEFAULT_OG_IMAGE_PATH,
} as const;

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${SITE_URL}/`).toString();
}

export type SeoMetaOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

export function buildSeoMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE_PATH,
  imageAlt = `${BRAND_NAME} — ${title}`,
  type = "website",
}: SeoMetaOptions) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: BRAND_NAME },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function organizationJsonLd() {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    alternateName: BRAND_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo-mark.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    telephone: PHONE_TEL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: POSTAL_CODE,
      addressCountry: ADDRESS_COUNTRY,
    },
    sameAs: [INSTAGRAM_URL],
    brand: { "@id": `${SITE_URL}/#brand` },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function brandJsonLd() {
  return {
    "@type": "Brand",
    "@id": `${SITE_URL}/#brand`,
    name: BRAND_NAME,
    slogan: "All Season Drink",
    url: SITE_URL,
    logo: absoluteUrl("/logo-mark.png"),
  };
}

export function webPageJsonLd({ title, description, path, image }: SeoMetaOptions) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    image: absoluteUrl(image ?? DEFAULT_OG_IMAGE_PATH),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#brand` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
