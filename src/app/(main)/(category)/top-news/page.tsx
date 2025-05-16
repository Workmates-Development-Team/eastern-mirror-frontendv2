import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {

    return (
        <div>
         
            <SubPage title="Top News" category="top-news" links={[{
                label: "Top News",
            }]} limit={6} showPagination={false} />
        </div>
    );
};

export const metadata: Metadata = {
  title: "Top Headlines & Today’s Highlights – Eastern Mirror",
  description:
    "Catch up on the biggest news stories of the day with expert coverage from Nagaland and beyond.",
  keywords: [
   "top news", "headlines today", "daily highlights", "breaking stories", "important news", "major updates", "headline news"
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/top-news",
    title: "Top Headlines & Today’s Highlights – Eastern Mirror",
    description:
      "Catch up on the biggest news stories of the day with expert coverage from Nagaland and beyond.",
  },
};

export const dynamic = 'force-dynamic';
export default IndiaPage;
