import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {

    return (
        <div>
         
            <SubPage title="Editor's Pick" category="editor's-pick" links={[{
                label: "Editor's Pick",
            }]} />
        </div>
    );
};

export const metadata: Metadata = {
  title: "Editor’s Picks: Must-Read News Highlights – Eastern Mirror",
  description:
    "Explore curated top stories selected by our editorial team for in-depth insights and powerful narratives.",
  keywords: [
   "editor's pick", "top news", "curated news", "must-read stories", "featured articles", "news highlights", "trending stories"
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/editors-pick",
    title: "Editor’s Picks: Must-Read News Highlights – Eastern Mirror",
    description:
      "Explore curated top stories selected by our editorial team for in-depth insights and powerful narratives.",
  },
};

export const dynamic = 'force-dynamic';
export default IndiaPage;
