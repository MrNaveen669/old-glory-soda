export const BRAND = {
  name: "Old Glory Soda",
  tagline: "All Season Drink",
  intro:
    "The marble-neck goli soda you grew up chasing down summer streets — bottled bolder, fizzier and ready for every season.",
  email: "hello@oldglorysoda.in",
  phone: "+91 98400 00000",
  address: "Old Glory Bottling Works, Chennai, Tamil Nadu",
};

export type Flavor = {
  id: string;
  name: string;
  short: string;
  color: string;
  tint: string;
  note: string;
  description: string;
  pairs: string[];
  sweetness: string;
  fizz: string;
};

export const FLAVORS: Flavor[] = [
  {
    id: "blueberry-blast",
    name: "Blueberry Blast",
    short: "Blueberry",
    color: "#1FA2E8",
    tint: "#7FD0FF",
    note: "Wild berry · deep blue",
    description:
      "Our flagship pour. Crushed wild blueberry notes over a sharp mineral fizz — electric blue in the glass, cool and jammy on the tongue.",
    pairs: ["Beach evenings", "Street chaat", "Ice + mint"],
    sweetness: "Medium",
    fizz: "High",
  },
  {
    id: "green-apple",
    name: "Fizzy Green Apple",
    short: "Green Apple",
    color: "#6DC24B",
    tint: "#B6EF9B",
    note: "Orchard tart · vivid green",
    description:
      "First-bite green apple: tart, snappy and unmistakably crisp. A sour top note that finishes clean with no sugary drag.",
    pairs: ["Fried snacks", "Hot afternoons", "Chilled neat"],
    sweetness: "Low",
    fizz: "Very high",
  },
  {
    id: "citrus-orange",
    name: "Citrus Orange Pop",
    short: "Orange",
    color: "#F97316",
    tint: "#FFC08A",
    note: "Sun citrus · bright orange",
    description:
      "Hand-pressed orange character with a whisper of peel oil. Sunshine in a codd-neck bottle, from the first goli pop to the last sip.",
    pairs: ["Breakfast", "Road trips", "Orange wedge"],
    sweetness: "Medium",
    fizz: "Medium",
  },
  {
    id: "fruit-beer",
    name: "Fruit Beer",
    short: "Fruit Beer",
    color: "#E4405F",
    tint: "#FF9AAC",
    note: "Mixed berry · zero alcohol",
    description:
      "The nostalgic non-alcoholic fruit beer, done properly. Layered berry, a malt-like depth and a rounded, grown-up finish.",
    pairs: ["Celebrations", "Grilled plates", "Tall glass"],
    sweetness: "Rich",
    fizz: "Medium",
  },
  {
    id: "lemon-zing",
    name: "Zesty Lemon Zing",
    short: "Lemon",
    color: "#FDE74C",
    tint: "#FFF6A8",
    note: "Nimbu soda · bright yellow",
    description:
      "The classic nimbu soda reborn. Fresh lemon, a pinch of rock salt and a fizz sharp enough to reset a whole afternoon.",
    pairs: ["Post-workout", "Spicy biryani", "Salt rim"],
    sweetness: "Low",
    fizz: "Very high",
  },
  {
    id: "jeera-soda",
    name: "Spicy Jeera Soda",
    short: "Jeera",
    color: "#B5651D",
    tint: "#E0A76A",
    note: "Roasted cumin · heritage amber",
    description:
      "Roasted jeera, black salt and a slow warm spice trail. The digestive classic our grandfathers ordered, kept exactly as it should be.",
    pairs: ["Heavy meals", "Monsoon nights", "Room temp"],
    sweetness: "Barely",
    fizz: "High",
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
    { value: "1962", label: "First crate poured" },
    { value: "6", label: "Signature flavours" },
    { value: "100%", label: "Glass bottled" },
  ],
};

export const FEATURES = [
  {
    icon: "leaf",
    title: "Real Fruit Notes",
    body: "Flavour built from fruit-forward extracts, never a flat syrup hit.",
  },
  {
    icon: "bottle",
    title: "Classic Marble Bottle",
    body: "The original codd-neck glass and goli seal — the pop is part of the taste.",
  },
  {
    icon: "sun",
    title: "All Season Refreshment",
    body: "Six profiles tuned across the year, from peak summer to monsoon evenings.",
  },
  {
    icon: "flash",
    title: "No Compromise Fizz",
    body: "High-pressure carbonation that stays sharp right down to the final sip.",
  },
];

export const GALLERY = [
  { id: "g1", caption: "Crate fresh, ice cold", color: "#1FA2E8", span: "tall" },
  { id: "g2", caption: "Corner shop classic", color: "#F97316", span: "wide" },
  { id: "g3", caption: "Marble pop moment", color: "#6DC24B", span: "normal" },
  { id: "g4", caption: "Festival night pour", color: "#E4405F", span: "normal" },
  { id: "g5", caption: "Beachside refill", color: "#FDE74C", span: "wide" },
  { id: "g6", caption: "Jeera after dinner", color: "#B5651D", span: "tall" },
];

export const STORES = [
  { city: "Chennai", name: "Marina Provision Stores", detail: "Besant Nagar · 8 stockists nearby" },
  { city: "Bengaluru", name: "Glory Corner Mart", detail: "Indiranagar · 12 stockists nearby" },
  { city: "Mumbai", name: "Sea Breeze Soda Co.", detail: "Bandra West · 9 stockists nearby" },
  { city: "Hyderabad", name: "Charminar Chill Point", detail: "Old City · 6 stockists nearby" },
];

export const TESTIMONIALS = [
  {
    quote: "Tastes exactly like the soda cart outside my school. The goli pop still gets a cheer.",
    name: "Anitha R.",
    place: "Coimbatore",
  },
  {
    quote: "Jeera soda after a heavy biryani is unbeatable. We keep a crate at the restaurant now.",
    name: "Imran S.",
    place: "Hyderabad",
  },
  {
    quote: "The green apple is dangerously good. Tart, loud fizz, gone in a minute.",
    name: "Meera K.",
    place: "Kochi",
  },
  {
    quote: "Finally a fruit beer that doesn't taste like cough syrup. Party staple.",
    name: "Dev P.",
    place: "Mumbai",
  },
  {
    quote: "Glass bottles, real fizz, zero fuss. My kids fight over the blueberry one.",
    name: "Sudha M.",
    place: "Chennai",
  },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/919840000000", icon: "whatsapp" },
];

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Story" },
  { id: "flavors", label: "Flavours" },
  { id: "why", label: "Why Us" },
  { id: "gallery", label: "Gallery" },
  { id: "stores", label: "Find a Store" },
];
