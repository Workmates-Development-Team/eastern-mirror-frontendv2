import { NextResponse } from "next/server";

const BASE_URL = "https://www.easternmirrornagaland.com";

const ROUTES = [
  { label: "Nagaland", href: "/nagaland" },
  { label: "India", href: "/india" },
  { label: "World", href: "/world" },
  { label: "Opinion", href: "/opinion" },
  { label: "Sports", href: "/sports" },
  { label: "Science and Tech", href: "/science-and-tech" },
  { label: "Arts and Entertainment", href: "/arts-and-entertainment" },
  { label: "Education", href: "/education" },
  { label: "Business", href: "/business" },
  { label: "Health", href: "/health" },
  { label: "EM Exclusive", href: "/exclusive" },
  { label: "Editor's Pick", href: "/editors-pick" },
  { label: "Region", href: "/region" },
];

const SUB_ROUTES = [
  {
    parent: "/nagaland",
    subLinks: [
      "chumoukedima",
      "dimapur",
      "kiphire",
      "kohima",
      "longleng",
      "meluri",
      "mokokchung",
      "mon",
      "niuland",
      "noklak",
      "peren",
      "phek",
      "shamator",
      "tseminyu",
      "tuensang",
      "wokha",
      "zunheboto",
    ],
  },
  {
    parent: "/opinion",
    subLinks: [
      "editorial",
      "views-and-reviews",
      "op-ed",
      "letter-to-editor",
      "book-reviews",
    ],
  },
];

export async function GET() {
  const topLevelRoutes = ROUTES.map((route) => {
    return `
  <url>
    <loc>${BASE_URL}${route.href}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const subCategoryRoutes = SUB_ROUTES.flatMap((group) =>
    group.subLinks.map((sub) => {
      return `
  <url>
    <loc>${BASE_URL}${group.parent}/${sub}</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${[...topLevelRoutes, ...subCategoryRoutes].join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
