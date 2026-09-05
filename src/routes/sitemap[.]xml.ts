import { createFileRoute } from "@tanstack/react-router";

import { PRODUCT_PATHS } from "@/lib/products";
import { absoluteUrl, STORY_PATHS } from "@/lib/seo";

const SITEMAP_PATHS = ["/", "/products", ...STORY_PATHS, ...PRODUCT_PATHS];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = SITEMAP_PATHS.map(
          (path) => `  <url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`,
        ).join("\n");
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
