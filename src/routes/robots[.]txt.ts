import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
          {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "public, max-age=3600, s-maxage=86400",
            },
          },
        ),
    },
  },
});
