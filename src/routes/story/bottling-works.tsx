import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";

const title = "Bottling Works (1970s) — Our Story | Old Glory Soda";
const description =
  "Explore the 1970s mechanical bottling works of Old Glory Soda, engineering high-pressure carbonation and marble sealing precision.";

export const Route = createFileRoute("/story/bottling-works")({
  component: () => <ChapterDetail chapterId="bottling-works" />,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});
