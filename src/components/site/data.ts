export const PROFILE = {
  name: "Your Name",
  role: "Creative Frontend Engineer",
  tagline:
    "I design and build fizzy, fast interfaces — motion-led products that feel as good as they look.",
  location: "Bengaluru, India",
  email: "hello@yourname.dev",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "X", href: "https://x.com" },
  ],
};

export const ABOUT = {
  heading: "Bottled curiosity, poured into pixels.",
  paragraphs: [
    "I'm a frontend engineer who lives at the seam between design and code. For the last six years I've shipped interfaces for startups and studios — design systems, marketing sites, and dense product dashboards.",
    "My work leans on motion as meaning: transitions that explain, micro-interactions that reassure, and performance budgets that keep everything at a steady 60fps, even on a mid-range phone.",
  ],
  stats: [
    { value: "6+", label: "Years shipping" },
    { value: "40+", label: "Projects launched" },
    { value: "12", label: "Design systems" },
  ],
};

export const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "WebGL",
  "Vite",
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  description: string;
  tags: string[];
  link: string;
  accent: "primary" | "highlight" | "destructive";
};

export const PROJECTS: Project[] = [
  {
    id: "fizz-commerce",
    title: "Fizz Commerce",
    category: "E-commerce platform",
    year: "2026",
    blurb: "A headless storefront with a physics-driven cart drawer.",
    description:
      "Rebuilt a beverage brand's storefront on a headless stack. Product pages stream in under 400ms, and the cart uses spring physics so adding an item feels tactile. Conversion lifted 23% in the first quarter.",
    tags: ["Next.js", "Shopify", "Motion"],
    link: "#",
    accent: "primary",
  },
  {
    id: "orbit-analytics",
    title: "Orbit Analytics",
    category: "Product dashboard",
    year: "2025",
    blurb: "Realtime analytics for teams that hate dashboards.",
    description:
      "A dense analytics surface with virtualized tables, streaming charts, and keyboard-first navigation. Built a token-driven design system so five squads could ship consistent UI without a designer in the loop.",
    tags: ["React", "D3", "WebSockets"],
    link: "#",
    accent: "highlight",
  },
  {
    id: "atlas-ds",
    title: "Atlas Design System",
    category: "Design system",
    year: "2025",
    blurb: "60 components, one source of truth, zero drift.",
    description:
      "Authored a cross-platform design system with documented motion primitives, automated visual regression, and a Figma-to-code token pipeline that removed hand-offs entirely.",
    tags: ["TypeScript", "Storybook", "Tokens"],
    link: "#",
    accent: "destructive",
  },
  {
    id: "nocturne",
    title: "Nocturne",
    category: "Immersive microsite",
    year: "2024",
    blurb: "A WebGL scroll experience for an album launch.",
    description:
      "Scroll-linked shader scenes with audio-reactive particles, degraded gracefully to a static poster on low-power devices. Featured on three award galleries in launch week.",
    tags: ["Three.js", "GLSL", "Lenis"],
    link: "#",
    accent: "primary",
  },
  {
    id: "ledgerly",
    title: "Ledgerly",
    category: "Fintech app",
    year: "2024",
    blurb: "Personal finance that reads like a story, not a spreadsheet.",
    description:
      "Designed and built an onboarding flow with animated data storytelling, cutting drop-off by 31%. Handled offline-first sync and accessible chart alternatives.",
    tags: ["React Native", "Reanimated", "SQLite"],
    link: "#",
    accent: "highlight",
  },
  {
    id: "signal-cms",
    title: "Signal CMS",
    category: "Internal tooling",
    year: "2023",
    blurb: "A content editor writers actually asked to keep.",
    description:
      "A block-based editor with drag-to-reorder, collaborative presence, and instant preview. Shipped as a plugin architecture so each publication could extend it independently.",
    tags: ["Slate", "CRDT", "Node.js"],
    link: "#",
    accent: "destructive",
  },
];

export const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Senior Frontend Engineer",
    company: "Northlight Studio",
    detail:
      "Lead engineer on motion-heavy marketing and product surfaces. Own the performance budget and the shared component library.",
  },
  {
    period: "2022 — 2024",
    role: "Product Engineer",
    company: "Orbit Labs",
    detail:
      "Built the analytics platform end to end, from data fetching primitives to the charting layer used across four products.",
  },
  {
    period: "2020 — 2022",
    role: "Frontend Developer",
    company: "Cobalt & Co.",
    detail:
      "Shipped 20+ client sites. Introduced a design-token workflow that cut hand-off time roughly in half.",
  },
  {
    period: "2019 — 2020",
    role: "Junior Developer",
    company: "Freelance",
    detail:
      "Small business sites, landing pages, and the first taste of building interfaces that people actually use daily.",
  },
];

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
