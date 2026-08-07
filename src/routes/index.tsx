import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Flavors } from "@/components/site/flavors";
import { Footer } from "@/components/site/footer";
import { GallerySection } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { Newsletter } from "@/components/site/newsletter";
import { Preloader } from "@/components/site/preloader";
import { Stores } from "@/components/site/stores";
import { Story } from "@/components/site/story";
import { Testimonials } from "@/components/site/testimonials";
import { ThemeProvider } from "@/components/site/theme-provider";
import { Why } from "@/components/site/why";
import { useLenis } from "@/components/site/use-lenis";
import { BRAND, FLAVORS } from "@/components/site/data";

const title = "Old Glory Soda — All Season Drink | Marble Goli Soda";
const description =
  "Old Glory Soda bottles the classic marble-neck goli soda in six bold flavours — blueberry, green apple, orange, fruit beer, lemon and jeera. Find a store near you.";
const url = "https://glory-scroll-studio.lovable.app/";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Brand",
          name: BRAND.name,
          slogan: BRAND.tagline,
          description,
          url,
          makesOffer: FLAVORS.map((f) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: `${BRAND.name} ${f.name}`, description: f.description },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  useLenis();

  return (
    <ThemeProvider>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Flavors />
        <Why />
        <GallerySection />
        <Stores />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}
