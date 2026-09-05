import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";
import { buildSeoMeta, webPageJsonLd } from "@/lib/seo";

const title = "Corner Shop Crates (Today) — Our Story | Old Glory Soda";
const description =
  "Learn how Old Glory Soda continues its legacy at corner shops and kirana counters, serving six signature flavours across generations.";
const path = "/story/corner-shop-crates";
const image = "/Bottle Cate.png";

export const Route = createFileRoute("/story/corner-shop-crates")({
  component: () => <ChapterDetail chapterId="corner-shop-crates" />,
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
