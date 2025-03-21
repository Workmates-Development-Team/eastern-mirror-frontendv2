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
        title="Science and Tech"
        category="science-and-tech"
        links={[
          {
            label: "Science and Tech",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Science & Tech Innovations You Should Know - Eastern Mirror",
  description:
    "Stay updated with the latest breakthroughs in science and technology. Explore trends, discoveries, and innovations shaping the future.",
  keywords: [
    "science news",
    "technology updates",
    "latest innovations",
    "future tech",
    "scientific discoveries",
    "tech trends",
    "emerging technologies",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/science-and-tech",
    title: "Latest Science & Tech Innovations You Should Know - Eastern Mirror",
    description:
      "Stay updated with the latest breakthroughs in science and technology. Explore trends, discoveries, and innovations shaping the future.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
