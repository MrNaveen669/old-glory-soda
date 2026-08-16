import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";

const title = "Corner Shop Crates (Today) — Our Story | Old Glory Soda";
const description =
  "Learn how Old Glory Soda continues its legacy at corner shops and kirana counters, serving six signature flavours across generations.";

export const Route = createFileRoute("/story/corner-shop-crates")({
  component: () => <ChapterDetail chapterId="corner-shop-crates" />,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});
