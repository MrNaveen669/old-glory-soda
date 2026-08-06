import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { Preloader } from "@/components/site/preloader";
import { Projects } from "@/components/site/projects";
import { Skills } from "@/components/site/skills";
import { ThemeProvider } from "@/components/site/theme-provider";
import { useLenis } from "@/components/site/use-lenis";
import { PROFILE } from "@/components/site/data";

const title = `${PROFILE.name} — ${PROFILE.role} Portfolio`;
const description =
  "Portfolio of a creative frontend engineer building motion-led, high-performance web interfaces. Selected work, experience, and contact.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: PROFILE.name,
          jobTitle: PROFILE.role,
          email: `mailto:${PROFILE.email}`,
          address: PROFILE.location,
          url: "/",
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
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}
