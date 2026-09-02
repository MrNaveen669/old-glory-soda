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

export type NutritionRow = {
  label: string;
  per100ml: string;
  perServing: string;
  rda: string;
};

export type NutritionFacts = {
  servingSize: string;
  servingsPerPack: string;
  rows: NutritionRow[];
  statements?: string[];
};

export type ProductMediaSource =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt?: string;
    };

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
  nutrition: NutritionFacts | null;
  pairs: string[];
  sweetness: string;
  fizz: string;
  packaging: "glass" | "pet";
  lowCalorie?: boolean;
  comingSoon?: boolean;
  price?: number;
  volume?: string;
  media?: ProductMediaSource;
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
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Stabilizers (414, 445), Sweetener (960), Preservative (211), Colour (INS 133), Flavours (Natural & Nature Identical - Blueberry). (Contains Plant-Based Sweetener - Steviol Glycosides (960))",
    nutrition: {
      servingSize: "160 ml",
      servingsPerPack: "1.6 serving in this pack",
      rows: [
        { label: "Energy [Kcal]", per100ml: "9.48", perServing: "15.17", rda: "0.76" },
        { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Carbohydrate [g]", per100ml: "2.37", perServing: "3.79", rda: "-" },
        { label: "Total Sugar [g]", per100ml: "2.37", perServing: "3.79", rda: "-" },
        { label: "Added Sugar [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Sodium [mg]", per100ml: "70.22", perServing: "112.35", rda: "5.62" },
      ],
    },
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
    nutrition: {
      servingSize: "160 ml",
      servingsPerPack: "1.6 serving in this pack",
      rows: [
        { label: "Energy [Kcal]", per100ml: "10.92", perServing: "17.47", rda: "0.87" },
        { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Carbohydrate [g]", per100ml: "2.73", perServing: "4.37", rda: "-" },
        { label: "Total Sugar [g]", per100ml: "2.73", perServing: "4.37", rda: "-" },
        { label: "Added Sugar [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Sodium [mg]", per100ml: "75.72", perServing: "121.15", rda: "6.06" },
      ],
    },
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
      "orange character with a whisper of peel oil. Sunshine in a codd-neck bottle, from the first goli pop to the last sip.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators (330, 331), Stabilizers (414, 445), Sweetener (960), Preservative (211), Colours (110, 122), Natural & Nature Identical Orange flavour",
    nutrition: {
      servingSize: "160 ml",
      servingsPerPack: "1.6 serving in this pack",
      rows: [
        { label: "Energy [Kcal]", per100ml: "9.16", perServing: "13.74", rda: "0.69" },
        { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Carbohydrate [g]", per100ml: "2.29", perServing: "3.44", rda: "2.65" },
        { label: "Total Sugar [g]", per100ml: "2.29", perServing: "3.44", rda: "-" },
        { label: "Added Sugar [g]", per100ml: "2.29", perServing: "3.44", rda: "6.88" },
        { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Sodium [mg]", per100ml: "10.53", perServing: "15.80", rda: "0.79" },
      ],
    },
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
    nutrition: {
      servingSize: "160 ml",
      servingsPerPack: "1.6 serving in this pack",
      rows: [
        { label: "Energy [Kcal]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Carbohydrate [g]", per100ml: "0", perServing: "0", rda: "-" },
        { label: "Total Sugar [g]", per100ml: "0", perServing: "0", rda: "-" },
        { label: "Added Sugar [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Sodium [mg]", per100ml: "69.57", perServing: "173.93", rda: "8.70" },
      ],
    },
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
    nutrition: {
      servingSize: "160 ml",
      servingsPerPack: "1.6 serving in this pack",
      rows: [
        { label: "Energy [Kcal]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Carbohydrate [g]", per100ml: "0", perServing: "0", rda: "-" },
        { label: "Total Sugar [g]", per100ml: "0", perServing: "0", rda: "-" },
        { label: "Added Sugar [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Sodium [mg]", per100ml: "69.57", perServing: "111.31", rda: "5.57" },
      ],
    },
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
    nutrition: {
      servingSize: "160 ml",
      servingsPerPack: "1.6 serving in this pack",
      rows: [
        { label: "Energy [Kcal]", per100ml: "12.76", perServing: "19.14", rda: "0.96" },
        { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Carbohydrate [g]", per100ml: "3.19", perServing: "4.79", rda: "3.68" },
        { label: "Total Sugar [g]", per100ml: "3.19", perServing: "4.79", rda: "-" },
        { label: "Added Sugar [g]", per100ml: "3.19", perServing: "4.79", rda: "9.58" },
        { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
        { label: "Sodium [mg]", per100ml: "148.43", perServing: "222.65", rda: "11.13" },
      ],
    },
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

export const ORANGE_20_NUTRITION: NutritionFacts = {
  servingSize: "150 ml",
  servingsPerPack: "2 serving in this Pack",
  rows: [
    { label: "Energy (Kcal)", per100ml: "9.16", perServing: "13.74", rda: "0.69" },
    { label: "Protein (g)", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate (g)", per100ml: "2.29", perServing: "3.44", rda: "2.65" },
    { label: "Total Sugar (g)", per100ml: "2.29", perServing: "3.44", rda: "-" },
    { label: "Added Sugar (g)", per100ml: "2.29", perServing: "3.44", rda: "6.88" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium(mg)", per100ml: "10.53", perServing: "15.80", rda: "0.79" },
  ],
};

export const ZEERA_20_NUTRITION: NutritionFacts = {
  servingSize: "150 ml",
  servingsPerPack: "2 serving in this Pack",
  rows: [
    { label: "Energy (Kcal)", per100ml: "12.76", perServing: "19.14", rda: "0.96" },
    { label: "Protein (g)", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate (g)", per100ml: "3.19", perServing: "4.79", rda: "3.68" },
    { label: "Total Sugar (g)", per100ml: "3.19", perServing: "4.79", rda: "-" },
    { label: "Added Sugar (g)", per100ml: "3.19", perServing: "4.79", rda: "9.58" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium(mg)", per100ml: "148.43", perServing: "222.65", rda: "11.13" },
  ],
};

export const SHIKANJI_10_NUTRITION: NutritionFacts = {
  servingSize: "160 ml",
  servingsPerPack: "1 serving in this Pack",
  rows: [
    { label: "Energy (Kcal)", per100ml: "16.40", perServing: "26.24", rda: "1.31" },
    { label: "Protein (g)", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate (g)", per100ml: "4.10", perServing: "6.56", rda: "5.05" },
    { label: "Total Sugar (g)", per100ml: "4.10", perServing: "6.56", rda: "13.12" },
    { label: "Added Sugar (g)", per100ml: "4.10", perServing: "6.56", rda: "-" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium(mg)", per100ml: "16.92", perServing: "27.07", rda: "1.35" },
  ],
};

export const ORANGE_10_NUTRITION: NutritionFacts = {
  servingSize: "160 ml",
  servingsPerPack: "1 serving in this Pack",
  rows: [
    { label: "Energy (Kcal)", per100ml: "9.16", perServing: "14.66", rda: "0.73" },
    { label: "Protein (g)", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate (g)", per100ml: "2.29", perServing: "3.66", rda: "2.82" },
    { label: "Total Sugar (g)", per100ml: "2.29", perServing: "3.66", rda: "-" },
    { label: "Added Sugar (g)", per100ml: "2.29", perServing: "3.66", rda: "7.33" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium(mg)", per100ml: "10.53", perServing: "16.85", rda: "0.84" },
  ],
};

export const ZEERA_10_NUTRITION: NutritionFacts = {
  servingSize: "160 ml",
  servingsPerPack: "1 serving in this Pack",
  rows: [
    { label: "Energy (Kcal)", per100ml: "12.76", perServing: "20.42", rda: "1.02" },
    { label: "Protein (g)", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate (g)", per100ml: "3.19", perServing: "5.10", rda: "3.92" },
    { label: "Total Sugar (g)", per100ml: "3.19", perServing: "5.10", rda: "-" },
    { label: "Added Sugar (g)", per100ml: "3.19", perServing: "5.10", rda: "10.21" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium(mg)", per100ml: "148.43", perServing: "237.45", rda: "11.87" },
  ],
};

export const COLA_NUTRITION: NutritionFacts = {
  servingSize: "300 ml",
  servingsPerPack: "1 serving in this pack",
  rows: [
    { label: "Energy [Kcal]", per100ml: "<2", perServing: "<6", rda: "<0.3" },
    { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate [g]", per100ml: "0", perServing: "0", rda: "-" },
    { label: "Total Sugar [g]", per100ml: "0", perServing: "0", rda: "-" },
    { label: "Added Sugar [g]", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium [mg]", per100ml: "60.35", perServing: "181.05", rda: "9.05" },
  ],
  statements: ["CONTAINS CAFFEINE", "CONTAINS PLANT BASED SWEETENER"],
};

export const DIET_COLA_NUTRITION: NutritionFacts = {
  servingSize: "300 ml",
  servingsPerPack: "1 serving in this pack",
  rows: [
    { label: "Energy [Kcal]", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Protein [g]", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Carbohydrate [g]", per100ml: "0", perServing: "0", rda: "-" },
    { label: "Total Sugar [g]", per100ml: "0", perServing: "0", rda: "-" },
    { label: "Added Sugar [g]", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Fat", per100ml: "0", perServing: "0", rda: "0" },
    { label: "Sodium [mg]", per100ml: "60.35", perServing: "181.05", rda: "9.05" },
  ],
  statements: ["CONTAINS CAFFEINE", "CONTAIN NON - CALORIC SWEETENERS"],
};

type PetProductOptions = {
  price: PetTier;
  nutrition: NutritionFacts | null;
};

const petFrom = (id: FlavorId, { price, nutrition }: PetProductOptions): Flavor => {
  const base = FLAVORS.find((f) => f.id === id)!;
  const volume = price === 10 ? "160ml On-The-Go" : "300ml Value Pack";
  return {
    ...base,
    id: `${id}-pet-${price}`,
    packaging: "pet",
    lowCalorie: true,
    price,
    nutrition,
    note: `PET bottle (${volume}) · ₹${price}`,
  };
};

export const PET_RANGE: Record<PetTier, Flavor[]> = {
  10: [
    petFrom("zeera-soda", { price: 10, nutrition: ZEERA_10_NUTRITION }),
    petFrom("citrus-orange", { price: 10, nutrition: ORANGE_10_NUTRITION }),
    {
      id: "shikanji-pet-10",
      name: "Shikanji",
      flavourType: "Shikanji",
      short: "Shikanji",
      color: "#C4CBD4",
      tint: "#E4E9EE",
      note: "PET bottle (160ml) · ₹10",
      description: "Traditional citrus spiced lemonade soda. Rolling out in our 160ml PET range.",
      ingredients: "Carbonated Water, Lemon Extract, Spices, Sweetener (960), Preservative (211)",
      pairs: ["Summer afternoons", "Street snacks"],
      sweetness: "Low",
      fizz: "High",
      packaging: "pet",
      lowCalorie: true,
      comingSoon: true,
      price: 10,
      nutrition: SHIKANJI_10_NUTRITION,
    },
  ],
  20: [
    petFrom("zeera-soda", { price: 20, nutrition: ZEERA_20_NUTRITION }),
    petFrom("citrus-orange", { price: 20, nutrition: ORANGE_20_NUTRITION }),
  ],
};

export const COLA_PRODUCTS: Flavor[] = [
  {
    id: "diet-cola",
    name: "Diet Cola",
    flavourType: "Diet Cola",
    short: "Diet Cola",
    color: "#3DB8FF",
    tint: "#A9E2FF",
    note: "Low calorie cola · crisp finish",
    description:
      "A lighter take on the classic cola pour, balancing familiar spice and caramel notes with a clean, refreshing finish.",
    ingredients:
      "Carbonated Water, Acidity Regulators, Permitted Sweeteners, Preservative, Natural and Nature Identical Cola Flavour.",
    pairs: ["Burgers", "Movie nights", "Serve ice-cold"],
    sweetness: "Light",
    fizz: "High",
    packaging: "pet",
    lowCalorie: true,
    price: 20,
    volume: "300ml",
    nutrition: DIET_COLA_NUTRITION,
    media: {
      type: "video",
      src: "/Deit cola.mp4",
      alt: "Old Glory Diet Cola bottle video",
    },
  },
  {
    id: "cola",
    name: "Cola",
    flavourType: "Cola",
    short: "Cola",
    color: "#E8544A",
    tint: "#FFAAA4",
    note: "Classic cola · bold fizz",
    description:
      "A full-flavoured cola with rounded caramel spice, lively bubbles and the unmistakable Old Glory finish.",
    ingredients:
      "Carbonated Water, Sugar, Acidity Regulators, Preservative, Natural and Nature Identical Cola Flavour.",
    pairs: ["Street snacks", "Family meals", "Serve ice-cold"],
    sweetness: "Classic",
    fizz: "High",
    packaging: "pet",
    price: 20,
    volume: "300ml",
    nutrition: COLA_NUTRITION,
    media: {
      type: "video",
      src: "/cola.mp4",
      alt: "Old Glory Cola bottle video",
    },
  },
];

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
    caption: "",
  },

  // IMAGES
  {
    id: "g2",
    type: "video",
    src: "/Title-video.mp4",
    poster: "/Fruite-beer-poster.png",
    caption: "",
  },

  {
    id: "g3",
    type: "video",
    src: "/ZEERA-Soda..mp4",
    poster: "/Jeera-poster.png",
    caption: "",
  },

  {
    id: "g4",
    type: "video",
    src: "/blueberry-SODA.mp4",
    poster: "/Blueberry-poster.png",
    caption: "",
  },

  {
    id: "g5",
    type: "video",
    src: "/Zesty-Lemon-Zing-Soda..mp4",
    poster: "/lemon-poster.png",
    caption: "",
  },

  {
    id: "g6",
    type: "video",
    src: "/ORNGE-SODA.mp4",
    poster: "/Orange-poster.png",
    caption: "",
  },
];

export type StoreCity =
  "Dhamtari" | "Nagari" | "Keshkal" | "Kondagaon" | "Jagdalpur" | "Raipur" | "Balod" | "Dalli";

type StoreDistributor = {
  name: string;
  location: string;
  phone: string;
};

export type StoreLocation =
  | {
      city: StoreCity;
      status: "in-stock";
      distributor: StoreDistributor;
    }
  | {
      city: StoreCity;
      status: "coming-soon";
      distributor?: never;
    };

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    city: "Dhamtari",
    status: "in-stock",
    distributor: {
      name: "Old Glory Soda - Dhamtari",
      location: "Dhamtari, Chhattisgarh",
      phone: "9827902843",
    },
  },
  {
    city: "Nagari",
    status: "in-stock",
    distributor: {
      name: "Old Glory Soda - Nagari",
      location: "Nagari, Chhattisgarh",
      phone: "9827902843",
    },
  },
  {
    city: "Keshkal",
    status: "in-stock",
    distributor: {
      name: "Old Glory Soda - Keshkal",
      location: "Keshkal, Chhattisgarh",
      phone: "7389509007",
    },
  },
  {
    city: "Kondagaon",
    status: "in-stock",
    distributor: {
      name: "Old Glory Soda - Kondagaon",
      location: "Kondagaon, Chhattisgarh",
      phone: "7000851309",
    },
  },
  {
    city: "Jagdalpur",
    status: "in-stock",
    distributor: {
      name: "Old Glory Soda - Jagdalpur",
      location: "Jagdalpur, Chhattisgarh",
      phone: "9425261364",
    },
  },
  {
    city: "Raipur",
    status: "in-stock",
    distributor: {
      name: "Raipur Beverage Distributors Hub",
      location: "Raipur, Chhattisgarh",
      phone: "9407626212",
    },
  },
  { city: "Balod", status: "coming-soon" },
  { city: "Dalli", status: "coming-soon" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Honestly? The blueberry one tastes like the soda cart outside my school. That goli pop sound still gets a cheer from everyone.",
    name: "Anitha",
    place: "Coimbatore",
  },
  {
    quote:
      "Zeera soda after a heavy biryani is unbeatable. We keep a crate at the restaurant now — customers ask for it by name.",
    name: "Imran Sheikh",
    place: "Hyderabad",
  },
  {
    quote: "Dangerously good. Tart, loud fizz, gone in a minute.",
    name: "Meera",
    place: "Kochi",
  },
  {
    quote:
      "Finally a fruit beer that doesn't taste like cough syrup. Price is fair, availability is still patchy in my area, but when I find it I buy six.",
    name: "Dev",
    place: "Mumbai",
  },
  {
    quote:
      "Glass bottles, real fizz, zero fuss. My kids fight over the blueberry and I secretly grab the lemon zing for myself.",
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
