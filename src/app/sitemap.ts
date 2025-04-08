import { fetchBlogSlugs } from "@/lib/api";
import { MetadataRoute } from "next";

const baseUrl = "https://www.easternmirrornagaland.com";

const ROUTES = [
  { label: "Home", href: "/" },
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
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ROUTES.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    lastModified: new Date().toISOString(),
    priority: 1.0,
  }));

  const dynamicRoutes = SUB_ROUTES.flatMap(({ parent, subLinks }) =>
    subLinks.map((sub) => ({
      url: `${baseUrl}${parent}/${sub}`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    }))
  );

  // Fetch dynamic blog slugs
  const blogSlugs = await fetchBlogSlugs();
  const blogRoutes = blogSlugs.map((item: any) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.80,
  }));

  return [...staticRoutes, ...dynamicRoutes, ...blogRoutes];
}