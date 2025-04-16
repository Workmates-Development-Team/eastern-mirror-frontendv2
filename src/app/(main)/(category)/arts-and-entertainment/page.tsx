import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";

const ArtEntertainmentPage = async () => {
  return (
    <div>
    
      <SubPage
        title="Arts and Entertainment"
        category="arts-and-entertainment"
        links={[
          {
            label: "Arts and Entertainment",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Arts & Entertainment News & Trends - Eastern Mirror",
  description:
    "Stay updated with the latest arts and entertainment news, trends, and events. Explore movies, music, art, and more!",
  keywords: [
    "arts news",
    "entertainment trends",
    "movie updates",
    "music industry",
    "celebrity news",
    "cultural events",
    "latest art exhibitions",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/arts-and-entertainment",
    title: "Latest Arts & Entertainment News & Trends - Eastern Mirror",
    description:
      "Stay updated with the latest arts and entertainment news, trends, and events. Explore movies, music, art, and more!",
  },
};

export const dynamic = "force-dynamic";
export default ArtEntertainmentPage;
