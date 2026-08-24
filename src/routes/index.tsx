import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Flavors } from "@/components/site/flavors";
import { Footer } from "@/components/site/footer";
import { GallerySection } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { Newsletter } from "@/components/site/newsletter";
import { PickYourPrice } from "@/components/site/pick-price";
import { Preloader } from "@/components/site/preloader";
import { Stores } from "@/components/site/stores";
import { Story } from "@/components/site/story";
import { Testimonials } from "@/components/site/testimonials";
import { ThenNow } from "@/components/site/then-now";
import { Why } from "@/components/site/why";
import { useLenis } from "@/components/site/use-lenis";
import { BRAND, FLAVORS } from "@/components/site/data";

const title = "Old Glory Soda — All Season Drink | Marble Goli Soda";
const description =
  "Old Glory Soda bottles the classic marble-neck goli soda in six flavours — Blueberry Blast, Fizzy Green Apple, Citrus Orange Pop, Fruit Beer, Zesty Lemon Zing and Spicy Spark Zeera Soda. Find a store near you.";
const ogImage = "https://oldglorysoda.lovable.app/logo-mark.png";
const url = "https://oldglory.co.in";

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
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
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
            itemOffered: {
              "@type": "Product",
              name: `${BRAND.name} ${f.name}`,
              description: f.description,
            },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  useLenis();

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Flavors />
        <ThenNow />
        <PickYourPrice />
        <Story />
        <Why />
        <GallerySection />
        <Stores />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
