import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {
  return (
    <div>
      

      <SubPage
        title="Sports"
        category="sports"
        links={[
          {
            label: "Sports",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Sports News & Updates You Can’t Miss - Eastern Mirror",
  description:
    "Get the latest sports news, live updates, match highlights, and expert analysis. Stay ahead with top stories from the sports world.",
  keywords: [
    "sports news",
    "latest sports updates",
    "live match news",
    "sports highlights",
    "trending sports news",
    "breaking sports news",
    "game analysis",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/sports",
    title: "Latest Sports News & Updates You Can’t Miss - Eastern Mirror",
    description:
      "Get the latest sports news, live updates, match highlights, and expert analysis. Stay ahead with top stories from the sports world.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
