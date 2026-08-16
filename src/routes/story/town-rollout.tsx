import { createFileRoute } from "@tanstack/react-router";
import { ChapterDetail } from "@/components/site/chapter-detail";

const title = "Town Rollout (1980s) — Our Story | Old Glory Soda";
const description =
  "Follow the 1980s town rollout of Old Glory Soda as vintage delivery trucks carried wooden crates of marble goli soda across India.";

export const Route = createFileRoute("/story/town-rollout")({
  component: () => <ChapterDetail chapterId="town-rollout" />,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});
