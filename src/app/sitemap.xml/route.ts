import { NextResponse } from "next/server";

const BASE_URL = "https://www.easternmirrornagaland.com";

export async function GET() {
  const urls = [
    `${BASE_URL}/home-sitemap.xml`,
    `${BASE_URL}/categories-sitemap.xml`,
    `${BASE_URL}/news-sitemap.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <sitemap>
    <loc>${url}</loc>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
