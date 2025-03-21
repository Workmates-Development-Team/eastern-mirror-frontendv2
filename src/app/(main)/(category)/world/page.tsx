import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {
  return (
    <div>
      <Head>
        <meta name="title" content="India Articles - Latest News" />
        <meta
          name="description"
          content="Explore the latest news and articles about Nagaland."
        />
        <meta name="keywords" content="Nagaland, news, articles, updates" />
        <meta name="author" content="Eastern Mirror" />
        <meta property="og:title" content="Nagaland Articles - Latest News" />
        <meta
          property="og:description"
          content="Explore the latest news and articles about Nagaland."
        />
        <meta
          property="og:url"
          content="https://www.easternmirrornagaland.com/nagaland"
        />
      </Head>

      <SubPage
        title="World"
        category="world"
        links={[
          {
            label: "World",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Breaking News & Expert Insights Across World – Eastern Mirror",
  description:
    "Stay ahead with the latest world news, opinions, sports, tech, business, health, arts, and education updates—all in one place.",
  keywords: [
    "world news",
    "opinion news",
    "sports updates",
    "tech trends",
    "business insights",
    "health reports",
    "entertainment news",
  ],

  openGraph: {
    title: "Breaking News & Expert Insights Across World – Eastern Mirror",
  description:
    "Stay ahead with the latest world news, opinions, sports, tech, business, health, arts, and education updates—all in one place.",
    url: 'https://www.easternmirrornagaland.com/world'
  }
};

export const dynamic = "force-dynamic";
export default IndiaPage;
