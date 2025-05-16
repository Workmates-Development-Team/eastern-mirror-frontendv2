import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const GamingPage = async () => {

    return (
        <div>
          

            <SubPage title="Gaming" category="gaming" links={[{
                label: "Gaming",
            }]} />
        </div>
    );
};

export const metadata: Metadata = {
  title: "Latest Gaming News, Reviews & Trends – Eastern Mirror",
  description:
    "Stay ahead with updates on video games, reviews, esports, gaming culture, and tech news from Nagaland and beyond.",
  keywords: [
   "gaming news", "game reviews", "esports", "video games", "gaming trends", "online games", "tech and gaming"
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/gaming",
    title: "Latest Gaming News, Reviews & Trends – Eastern Mirro",
    description:
      "Stay ahead with updates on video games, reviews, esports, gaming culture, and tech news from Nagaland and beyond.",
  },
};

export const dynamic = 'force-dynamic';
export default GamingPage;
