import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import React from "react";

// Helper function to convert slug to title case
const formatTagName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const tag = formatTagName(decodeURIComponent((await params).slug));


  return {
    title: `Explore Trending "${tag}" Tags & Hot Topics – Eastern Mirror`,
    description: `Browse trending articles and latest news tagged with "${tag}". Discover popular stories and insights on ${tag}.`,
    keywords: [
      `${tag} news`,
      `trending ${tag}`,
      `hot topics on ${tag}`,
      "trending tags",
      "popular stories",
      "Eastern Mirror tagged articles",
    ],
    openGraph: {
      title: `Explore Trending "${tag}" Tags & Hot Topics – Eastern Mirror`,
      description: `Browse trending articles and latest news tagged with "${tag}". Discover popular stories and insights on ${tag}.`,
      url: `https://www.easternmirrornagaland.com/tag/${(await params).slug}`,
      siteName: "Eastern Mirror",
    },
    twitter: {
      card: "summary_large_image",
      title: `Explore Trending "${tag}" Tags & Hot Topics – Eastern Mirror`,
      description: `Browse trending articles and latest news tagged with "${tag}". Discover popular stories and insights on ${tag}.`,
    },
  };
}



export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const tagTitle = formatTagName(decodeURIComponent((await params).slug));

  if(!tagTitle) {
    return null
  }
  return (
    <div>
      <SubPage
        title={tagTitle}
        category="tag"
        slug={(await params).slug}
        links={[
          {
            label: tagTitle,
          },
        ]}
      />
    </div>
  );
}