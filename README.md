# Soda

Build a fully animated, interactive, mobile-responsive personal portfolio website with a premium, modern aesthetic inspired by an "Old Glory Soda" color palette.

TECH & ANIMATION REQUIREMENTS:

- Use Lenis (https://lenis.dev/) for buttery smooth scrolling across the entire site

- Integrate Skiper UI (https://skiper-ui.com/) components for advanced scroll-based animations, hover effects, and transitions

- Integrate Animate UI (https://animate-ui.com/) components for polished pre-built animated UI elements (buttons, tabs, tooltips, cards, etc.)

- Use Framer Motion for page transitions, staggered reveals, and micro-interactions

- Build in React with Tailwind CSS

- Ensure 60fps performance and no jank on mobile devices

COLOR PALETTE (Dark mode default):

- Background/Dark: #0A1628 (deep navy)

- Primary Accent: #1FA2E8 (blueberry blue)

- Secondary Accent: #D62828 (old glory red — sparingly, for badges/lines)

- Highlight/CTA: #FDE74C (soda yellow)

- Text (dark mode): #F5F1E8 (cream)

- Silver/metal detail: #C4CBD4

LIGHT MODE TOGGLE:

- Include a smooth animated dark/light mode toggle in the navbar (use Animate UI's toggle/switch component if suitable)

- Light mode: background #F5F1E8 cream, keep blue/red/yellow accents, text switches to #1A1A1A charcoal

- Toggle should animate the transition (fade or color-morph, not an instant jump)

SECTIONS TO INCLUDE:

1. Hero — Placeholder name/title text (e.g., "Your Name" / "Your Role"), animated text reveal on load, subtle glowing blue gradient background motion

2. About — Short bio placeholder, scroll-triggered fade/slide-in

3. Skills — Animated icon grid or marquee-style scrolling tech stack

4. Projects — Show 4–6 interactive project cards with hover tilt/zoom effects, image previews, and a modal or dedicated detail view on click (leave content structured so real project data/images can be dropped in easily)

5. Experience/Timeline — Vertical scroll-triggered timeline with animated progress line

6. Contact — Animated form with focus/input micro-interactions, social link icons with hover effects

7. Footer — Minimal, subtle animation on scroll into view

RESPONSIVENESS:

- Fully responsive across mobile, tablet, and desktop

- Touch-friendly interactions for mobile (replace hover with tap/scroll triggers)

- Optimize animation intensity for smaller devices

EXTRAS:

- Loading screen/preloader with subtle branded animation

- Smooth anchor-link navigation with active section highlighting in navbar

- SEO-friendly structure with proper meta tags

- Prefer Animate UI components for common interactive elements (buttons, cards, tabs, tooltips) where they fit, and use Skiper UI for the more advanced scroll/hover animation effects

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://oldglorysoda.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e7cdea6-9806-4ade-a9fe-655c3857b0e0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Render Deployment

To deploy this project on Render:

1. Create a new **Web Service** on Render and connect your repository.
2. Configure the settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` (or `node .output/server/index.mjs`)
3. Render automatically binds to `0.0.0.0` and assigns the `PORT` environment variable.

