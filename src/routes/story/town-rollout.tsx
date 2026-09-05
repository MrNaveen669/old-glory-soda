import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";
import { buildSeoMeta, webPageJsonLd } from "@/lib/seo";

const title = "Town Rollout (1980s) — Our Story | Old Glory Soda";
const description =
  "Follow the 1980s town rollout of Old Glory Soda as vintage delivery trucks carried wooden crates of marble goli soda across India.";
const path = "/story/town-rollout";
const image = "/Truck.png";

export const Route = createFileRoute("/story/town-rollout")({
  component: () => <ChapterDetail chapterId="town-rollout" />,
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
