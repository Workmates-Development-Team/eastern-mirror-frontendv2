// app/sitemap-news/route.ts
export const dynamic = "force-dynamic";

import { fetchBlogSlugs } from "@/lib/api";
import { format } from "date-fns";

export async function GET() {
  const articles = await fetchBlogSlugs();

  const siteName = "Eastern Mirror";
  const baseUrl = "https://www.easternmirrornagaland.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://www.sitemaps.org/schemas/sitemap/0.9 
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
  ">
  ${articles
    .map((article: any) => {
      const url = escapeXML(`${baseUrl}/${article.slug}`);
      const publishedDate = format(new Date(article.publishedAt), "yyyy-MM-dd'T'HH:mm:ssXXX");
      const title = escapeXML(article.title);
      const keywords = escapeXML(article.metaKeyWord?.join(", ") || article?.tags?.join(", ") || "");
      const imageUrl = article.thumbnail ? escapeXML(`${baseUrl}${article.thumbnail}`) : "";

      return `
<url>
  <loc>${url}</loc>
  <news:news>
    <news:publication>
      <news:name>${escapeXML(siteName)}</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${publishedDate}</news:publication_date>
    <news:title>${title}</news:title>
    ${keywords ? `<news:keywords>${keywords}</news:keywords>` : ""}
  </news:news>
  ${imageUrl ? `<image:image><image:loc>${imageUrl}</image:loc></image:image>` : ""}
</url>`;
    })
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function escapeXML(str: string) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
