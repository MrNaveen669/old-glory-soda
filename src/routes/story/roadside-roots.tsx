import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";
import { buildSeoMeta, webPageJsonLd } from "@/lib/seo";

const title = "Roadside Roots — Our Story | Old Glory Soda";
const description =
  "Discover how Old Glory Soda started under a banyan tree with a wooden crate, ice blocks, and glass marble codd bottles.";
const path = "/story/roadside-roots";
const image = "/Tree.png";

export const Route = createFileRoute("/story/roadside-roots")({
  component: () => <ChapterDetail chapterId="roadside-roots" />,
  head: () => {
    const seo = buildSeoMeta({ title, description, path, image, type: "article" });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            ...webPageJsonLd({ title, description, path, image }),
          }),
        },
      ],
    };
  },
});
