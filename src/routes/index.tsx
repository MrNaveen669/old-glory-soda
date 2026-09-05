import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Flavors } from "@/components/site/flavors";
import { FlavorModal } from "@/components/site/flavor-modal";
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
import { ColaSection } from "@/components/site/cola-section";
import { Why } from "@/components/site/why";
import { useLenis } from "@/components/site/use-lenis";
import type { Flavor } from "@/components/site/data";
import { brandJsonLd, buildSeoMeta, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const title = "Old Glory Soda — All Season Drink | Marble Goli Soda";
const description =
  "Discover Old Glory Soda's marble-neck goli soda in Blueberry, Green Apple, Orange, Fruit Beer, Lemon and Zeera flavours across Chhattisgarh.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    const seo = buildSeoMeta({ title, description, path: "/" });

    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd(), websiteJsonLd(), brandJsonLd()],
          }),
        },
      ],
    };
  },
});

function Index() {
  useLenis();
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Flavors onSelectFlavor={setSelectedFlavor} />
        <ThenNow />
        <ColaSection onSelectProduct={setSelectedFlavor} />
        <PickYourPrice onSelectFlavor={setSelectedFlavor} />
        <Story />
        <Why />
        <GallerySection />
        <Stores />
        <Testimonials />
        <Newsletter />
      </main>
      <FlavorModal flavor={selectedFlavor} onClose={() => setSelectedFlavor(null)} />
      <Footer />
      <Toaster />
    </>
  );
}
