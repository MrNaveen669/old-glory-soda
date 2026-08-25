import { VINTAGE_ILLUSTRATIONS } from "./images";

export type StoryChapter = {
  id: string;
  num: string;
  title: string;
  era: string;
  bgImage: string;
  subtitle: string;
  paragraphs: string[];
  galleryImages: { src: string; caption: string }[];
  prevChapter: { id: string; title: string };
  nextChapter: { id: string; title: string };
};

export const STORY_CHAPTERS: Record<string, StoryChapter> = {
  "roadside-roots": {
    id: "roadside-roots",
    num: "01",
    title: "Roadside Roots",
    era: "",
    bgImage: VINTAGE_ILLUSTRATIONS.tree,
    subtitle: "Where the marble pop first echoed under the banyan tree",
    paragraphs: [
      "It started in under the broad shade of an ancient banyan tree. Our founder set down a handcrafted red wooden crate filled with ice cut from frozen river blocks, housing thick glass codd-neck bottles. Passersby would stop in the afternoon heat, press down on the glass marble seal, and listen to that crisp, legendary pop.",
      "Before modern refrigeration and aluminum cans, the goli soda cart was the heart of Indian summer culture. Every sip delivered a mineral-rich fizz with authentic fruit and spice essences that refreshed tired workers, school children, and travelers alike.",
      "That roadside cart established the core principles of Old Glory Soda: zero compromise on carbonation, authentic Indian flavors, and an untouchable heritage pop ritual that remains unchanged six decades later."
    ],
    galleryImages: [
      { src: VINTAGE_ILLUSTRATIONS.tree, caption: "Original Banyan Tree Soda Stall" },
      { src: VINTAGE_ILLUSTRATIONS.crates, caption: "Handcrafted Wooden Ice Crates" },
      { src: VINTAGE_ILLUSTRATIONS.storyMerge, caption: "The Heritage Marble Pop Ritual" }
    ],
    prevChapter: { id: "corner-shop-crates", title: "Corner Shop Crates" },
    nextChapter: { id: "bottling-works", title: "Bottling Works" }
  },
  "bottling-works": {
    id: "bottling-works",
    num: "02",
    title: "Bottling Works",
    era: "1970s",
    bgImage: VINTAGE_ILLUSTRATIONS.factory,
    subtitle: "Engineering high-pressure carbonation & marble sealing precision",
    paragraphs: [
      "As demand grew across the district in the 1970s, Old Glory established its first dedicated bottling factory. Heavy vintage brass pressure pipes, cast-iron levers, and precision marble-insertion machinery replaced manual hand-filling.",
      "Every glass bottle had to withstand immense internal carbonation pressure while perfectly seating the rubber washer and green glass marble at the narrow neck. Our master bottlers calibrated pressure gauges by hand to achieve that signature sharp fizz that held its punch right to the last drop.",
      "Today, while automated precision has upgraded our production speed, the mechanical legacy of our original 1970s bottling works continues to define how we preserve authentic pressure and natural stevia-sweetened recipes."
    ],
    galleryImages: [
      { src: VINTAGE_ILLUSTRATIONS.factory, caption: "Mechanical Bottling Factory 1970s" },
      { src: VINTAGE_ILLUSTRATIONS.tree, caption: "Codd-Neck Pressure Gauge Works" },
      { src: VINTAGE_ILLUSTRATIONS.crates, caption: "Quality Inspection & Crate Loading" }
    ],
    prevChapter: { id: "roadside-roots", title: "Roadside Roots" },
    nextChapter: { id: "town-rollout", title: "Town Rollout" }
  },
  "town-rollout": {
    id: "town-rollout",
    num: "03",
    title: "Town Rollout",
    era: "1980s",
    bgImage: VINTAGE_ILLUSTRATIONS.truck,
    subtitle: "Loading wooden crates onto vintage delivery trucks",
    paragraphs: [
      "By the 1980s, Old Glory Soda was ready to travel beyond local roadside stalls. Our iconic red delivery trucks, loaded high with wooden crates of clinking goli bottles, navigated state highways, dusty rural routes, and bustling town markets.",
      "Every morning, shopkeepers listened for the familiar rumble of the Old Glory truck. From school canteens to highway dhabas and festival grounds, crates were unloaded ice-cold and ready for immediate service.",
      "The town rollout proved that Old Glory wasn't just a local summer drink — it was becoming a timeless state-wide tradition enjoyed across all seasons, weather, and celebrations."
    ],
    galleryImages: [
      { src: VINTAGE_ILLUSTRATIONS.truck, caption: "Vintage Old Glory Delivery Truck" },
      { src: VINTAGE_ILLUSTRATIONS.factory, caption: "Factory Direct Dispatch" },
      { src: VINTAGE_ILLUSTRATIONS.crates, caption: "Town Market Distribution" }
    ],
    prevChapter: { id: "bottling-works", title: "Bottling Works" },
    nextChapter: { id: "corner-shop-crates", title: "Corner Shop Crates" }
  },
  "corner-shop-crates": {
    id: "corner-shop-crates",
    num: "04",
    title: "Corner Shop Crates",
    era: "Today",
    bgImage: VINTAGE_ILLUSTRATIONS.crates,
    subtitle: "Stacked high at kirana stores for generations of soda lovers",
    paragraphs: [
      "Today, Old Glory Soda stands proud as an enduring symbol of Indian heritage. You will find our signature wooden crates and ice buckets stacked high at local neighborhood kirana counters, tea stalls, and modern retail stores.",
      "While we have expanded our lineup to six signature glass flavours and introduced portable PET formats, the heart of Old Glory remains grounded in neighborhood community. Generations of families still gather around the counter for that familiar thumb-pop ritual.",
      "From peak summer afternoons to monsoon family dinners and festive gatherings, Old Glory Soda continues to pop the goli and keep the glory."
    ],
    galleryImages: [
      { src: VINTAGE_ILLUSTRATIONS.crates, caption: "Neighborhood Kirana Store Display" },
      { src: VINTAGE_ILLUSTRATIONS.tree, caption: "Heritage Banyan Tree Connection" },
      { src: VINTAGE_ILLUSTRATIONS.storyMerge, caption: "All Season Drink Tradition" }
    ],
    prevChapter: { id: "town-rollout", title: "Town Rollout" },
    nextChapter: { id: "roadside-roots", title: "Roadside Roots" }
  }
};
