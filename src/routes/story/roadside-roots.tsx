import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";

const title = "Roadside Roots () — Our Story | Old Glory Soda";
const description =
  "Discover how Old Glory Soda started under a sprawling banyan tree in  with a wooden crate, ice blocks, and glass marble codd bottles.";

export const Route = createFileRoute("/story/roadside-roots")({
  component: () => <ChapterDetail chapterId="roadside-roots" />,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});
