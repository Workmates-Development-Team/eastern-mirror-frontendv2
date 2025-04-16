import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://www.easternmirrornagaland.com/sitemap.xml",
      "https://www.easternmirrornagaland.com/home-sitemap.xml",
      "https://www.easternmirrornagaland.com/news-sitemap.xml",
      "https://www.easternmirrornagaland.com/categories-sitemap.xml",
    ],
  };
}
