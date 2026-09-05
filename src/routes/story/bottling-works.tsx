import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";
import { buildSeoMeta, webPageJsonLd } from "@/lib/seo";

const title = "Bottling Works (1970s) — Our Story | Old Glory Soda";
const description =
  "Explore the 1970s mechanical bottling works of Old Glory Soda, engineering high-pressure carbonation and marble sealing precision.";
const path = "/story/bottling-works";
const image = "/Factory.png";

export const Route = createFileRoute("/story/bottling-works")({
  component: () => <ChapterDetail chapterId="bottling-works" />,
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
