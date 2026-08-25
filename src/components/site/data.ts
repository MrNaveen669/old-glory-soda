export const BRAND = {
  name: "Old Glory Soda",
  tagline: "All Season Drink",
  intro:
    "The marble-neck goli soda you grew up chasing down summer streets — bottled bolder, fizzier and ready for every season.",
  email: "kajalbeverageindusty@gmail.com",
  phone: "+91 98400 00000",
  address: "Old Glory Bottling Works, Mana, Chhattisgarh",
};

export const FLAVOR_IDS = [
  "blueberry-blast",
  "green-apple",
  "citrus-orange",
  "fruit-beer",
  "lemon-zing",
  "zeera-soda",
] as const;

export type FlavorId = (typeof FLAVOR_IDS)[number];

export type Flavor = {
  id: string;
  name: string;
  flavourType: string;
  short: string;
  color: string;
  tint: string;
  note: string;
  description: string;
  ingredients: string;
  pairs: string[];
  sweetness: string;
  fizz: string;
  packaging: "glass" | "pet";
  lowCalorie?: boolean;
  comingSoon?: boolean;
  price?: number;
};

export type FlagshipFlavor = Omit<Flavor, "id"> & { id: FlavorId };

export const FLAVORS: FlagshipFlavor[] = [
  {
    id: "blueberry-blast",
    name: "Blueberry Blast Soda",
    flavourType: "Blueberry",
    short: "Blueberry",
    color: "#1FA2E8",
    tint: "#7FD0FF",
    note: "Wild berry · deep blue",
    description:
      "Our flagship pour. Crushed wild blueberry notes over a sharp mineral fizz — electric blue in the glass, cool and jammy on the tongue.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Stabilizers (414, 445), Sweetener (960), Preservative (211), Colour (INS 133), Natural & Nature Identical Blueberry flavour",
    pairs: ["Beach evenings", "Street chaat", "Ice + mint"],
    sweetness: "Medium",
    fizz: "High",
    packaging: "glass",
    price: 30,
  },
  {
    id: "green-apple",
    name: "Fizzy Green Apple Soda",
    flavourType: "Green Apple",
    short: "Green Apple",
    color: "#6DC24B",
    tint: "#B6EF9B",
    note: "Orchard tart · vivid green",
    description:
      "First-bite green apple: tart, snappy and unmistakably crisp. A sour top note that finishes clean with no sugary drag.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Stabilizers (414, 445), Sweetener (960), Preservative (211), Colours (102, 133), Flavours (Natural & Nature Identical - Green Apple)",
    pairs: ["Fried snacks", "Hot afternoons", "Chilled neat"],
    sweetness: "Low",
    fizz: "Very high",
    packaging: "glass",
    price: 30,
  },
  {
    id: "citrus-orange",
    name: "Citrus Orange Pop Soda",
    flavourType: "Orange",
    short: "Orange",
    color: "#F97316",
    tint: "#FFC08A",
    note: "Sun citrus · bright orange",
    description:
      "Hand-pressed orange character with a whisper of peel oil. Sunshine in a codd-neck bottle, from the first goli pop to the last sip.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Stabilizers (414, 445), Sweetener (960), Preservative (211), Colours (110, 122), Natural & Nature Identical Orange flavour",
    pairs: ["Breakfast", "Road trips", "Orange wedge"],
    sweetness: "Medium",
    fizz: "Medium",
    packaging: "glass",
    price: 30,
  },
  {
    id: "fruit-beer",
    name: "Fruit Beer",
    flavourType: "Fruit Beer",
    short: "Fruit Beer",
    color: "#E4405F",
    tint: "#FF9AAC",
    note: "Mixed berry · zero alcohol",
    description:
      "The nostalgic non-alcoholic fruit beer, done properly. Layered berry, a malt-like depth and a rounded, grown-up finish.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Sweetener (960), Preservative (211), Colour (150d), Natural & Nature Identical Fruit Beer flavour",
    pairs: ["Celebrations", "Grilled plates", "Tall glass"],
    sweetness: "Rich",
    fizz: "Medium",
    packaging: "glass",
    price: 30,
  },
  {
    id: "lemon-zing",
    name: "Zesty Lemon Zing Soda",
    flavourType: "Nimboo Masala",
    short: "Lemon",
    color: "#FDE74C",
    tint: "#FFF6A8",
    note: "Nimboo masala · bright yellow",
    description:
      "The classic nimbu soda reborn. Fresh lemon, a pinch of rock salt and a fizz sharp enough to reset a whole afternoon.",
    ingredients:
      "Carbonated Water, Sugar, Salt, Acidity Regulators, Stabilizers, Sweetener, Preservative, Natural & Nature Identical Nimboo Masala flavour",
    pairs: ["Post-workout", "Spicy biryani", "Salt rim"],
    sweetness: "Low",
    fizz: "Very high",
    packaging: "glass",
    price: 30,
  },
  {
    id: "zeera-soda",
    name: "Spicy Spark Zeera Soda",
    flavourType: "Zeera Masala",
    short: "Zeera",
    color: "#B5651D",
    tint: "#E0A76A",
    note: "Roasted zeera · heritage amber",
    description:
      "Roasted zeera, black salt and a slow warm spice trail. The digestive classic our grandfathers ordered, kept exactly as it should be.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Stabilizers (414, 445), Sweetener (960), Preservative (211), Colour (150d), Natural & Nature Identical Zeera Masala flavour",
    pairs: ["Heavy meals", "Monsoon nights", "Room temp"],
    sweetness: "Barely",
    fizz: "High",
    packaging: "glass",
    price: 30,
  },
];

/** ₹10 / ₹20 PET (plastic) range — clear bottle, blue screw cap, low calorie claim. */
export const PET_TIERS = [10, 20] as const;
export type PetTier = (typeof PET_TIERS)[number];

const petFrom = (id: FlavorId, price: PetTier): Flavor => {
  const base = FLAVORS.find((f) => f.id === id)!;
  const volume = price === 10 ? "200ml On-The-Go" : "400ml Value Pack";
  return {
    ...base,
    id: `${id}-pet-${price}`,
    packaging: "pet",
    lowCalorie: true,
    price,
    note: `PET bottle (${volume}) · ₹${price}`,
  };
};

export const PET_RANGE: Record<PetTier, Flavor[]> = {
  10: [
    petFrom("zeera-soda", 10),
    petFrom("citrus-orange", 10),
    {
      id: "shikanji-pet-10",
      name: "Shikanji",
      flavourType: "Shikanji",
      short: "Shikanji",
      color: "#C4CBD4",
      tint: "#E4E9EE",
      note: "PET bottle (200ml) · ₹10",
      description: "Traditional citrus spiced lemonade soda. Rolling out in our 200ml PET range.",
      ingredients: "Carbonated Water, Lemon Extract, Spices, Sweetener (960), Preservative (211)",
      pairs: ["Summer afternoons", "Street snacks"],
      sweetness: "Low",
      fizz: "High",
      packaging: "pet",
      lowCalorie: true,
      comingSoon: true,
      price: 10,
    },
  ],
  20: [petFrom("zeera-soda", 20), petFrom("citrus-orange", 20)],
};

export const STORY = {
  eyebrow: "Since the marble days",
  heading: "Pop the goli. Keep the glory.",
  paragraphs: [
    "It started at a roadside stall with a wooden crate, a block of ice and that unmistakable clink of a glass marble dropping into the neck of a codd bottle. One press of the thumb and the whole street heard it.",
    "Old Glory Soda bottles that exact moment. Same marble-neck ritual, same thick glass, same hiss — now with cleaner fruit notes, steadier carbonation and six flavours built for every month of the Indian calendar.",
    "Summer, monsoon or festival night, there is no off-season for a good soda. That is why we call it the All Season Drink.",
  ],
  stats: [
    { value: "", label: "First crate poured" },
    { value: "6", label: "Signature flavours" },
    { value: "100% Glass", label: "Flagship heritage range" },
  ],
};

export const FEATURES = [
  {
    icon: "leaf",
    title: "THE OLD TASTE",
    body: "Wahi goli, wahi fizz, wahi yaadein.Purani generation ke liye ye sirf soda nahi, bachpan ka ek hissa tha.",
  },
  {
    icon: "bottle",
    title: "THE MARBLE",
    body: "Kuch cheezein badalne ke liye nahi hoti.Classic marble-neck bottle aur goli ka woh iconic pop — jo Old Glory ki pehchaan hai.",
  },
  {
    icon: "sun",
    title: "THE NEW FLAVOUR",
    body: "Purani rooh. Naye flavours.Blueberry, Green Apple, Orange, Lemon, Fruit Beer aur Zeera — naye taste ke saath.",
  },
  {
    icon: "flash",
    title: "THE NEW GENERATION",
    body: "Ab nostalgia sirf yaad nahi, experience hai.Modern packaging, modern quality aur modern storytelling — par dil wahi purana.",
  },
];

export type GalleryItem =
  | {
      id: string;
      type: "image";
      src: string;
      caption: string;
      poster?: string;
    }
  | {
      id: string;
      type: "video";
      src: string;
      caption: string;
      poster?: string;
    };

export const GALLERY: GalleryItem[] = [
  // BIG FEATURED VIDEO
  {
    id: "g1",
    type: "video",
    src: "/GREEN-APPLE.mp4",
    poster: "/Green-apple-poster.png",
    caption: "Green apple, freshly popped",
  },

  // IMAGES
  {
    id: "g2",
    type: "video",
    src: "/Title-video.mp4",
    poster: "/Fruite-beer-poster.png",
    caption: "Fruit beer, poured ice cold",
  },

  {
    id: "g3",
    type: "video",
    src: "/ZEERA-Soda..mp4",
    poster: "/Jeera-poster.png",
    caption: "Roasted zeera in motion",
  },

  {
    id: "g4",
    type: "video",
    src: "/blueberry-SODA.mp4",
    poster: "/Blueberry-poster.png",
    caption: "Blueberry fizz in motion",
  },

  {
    id: "g5",
    type: "video",
    src: "/Zesty-Lemon-Zing-Soda..mp4",
    poster: "/lemon-poster.png",
    caption: "A bright lemon pour",
  },

  {
    id: "g6",
    type: "video",
    src: "/ORNGE-SODA.mp4",
    poster: "/Orange-poster.png",
    caption: "Orange pop, ice cold",
  },
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    city: "Raipur",
    status: "in-stock",
    distributor: {
      name: "Raipur Beverage Distributors Hub",
      description: "Primary distribution center supplying retail outlets and soda counters in Raipur.",
      location: "Raipur Central, Chhattisgarh",
      phone: "Inquiries: kajalbeverageindustry@gmail.com",
    },
  },
  { city: "Balod", status: "coming-soon" },
  { city: "Dalli", status: "coming-soon" },
];

export const TESTIMONIALS = [
  {
    quote: "Honestly? The blueberry one tastes like the soda cart outside my school. That goli pop sound still gets a cheer from everyone.",
    name: "Anitha",
    place: "Coimbatore",
  },
  {
    quote: "Zeera soda after a heavy biryani is unbeatable. We keep a crate at the restaurant now — customers ask for it by name.",
    name: "Imran Sheikh",
    place: "Hyderabad",
  },
  {
    quote: "Dangerously good. Tart, loud fizz, gone in a minute.",
    name: "Meera",
    place: "Kochi",
  },
  {
    quote: "Finally a fruit beer that doesn't taste like cough syrup. Price is fair, availability is still patchy in my area, but when I find it I buy six.",
    name: "Dev",
    place: "Mumbai",
  },
  {
    quote: "Glass bottles, real fizz, zero fuss. My kids fight over the blueberry and I secretly grab the lemon zing for myself.",
    name: "Sudha Mani",
    place: "Chennai",
  },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/old_glory_golisoda/", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "flavors", label: "Flavours" },
  { id: "pricing", label: "Pricing" },
  { id: "stores", label: "Where to Buy" },
  { id: "gallery", label: "Gallery" },
];
