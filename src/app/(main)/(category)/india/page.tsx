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
        title="India"
        category="india"
        links={[
          {
            label: "India",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest India News, Opinions, Sports & More - Eastern Mirror",
  description:
    "Get the latest updates on India news, sports, science, health, and more on Eastern Mirror. Stay informed and ahead!",
  keywords: [
    "India news",
    "opinion news",
    "sports updates",
    "science and tech",
    "entertainment news",
    "education updates",
    "business news",
    "health news",
  ],
  openGraph: {
    title: "Latest India News, Opinions, Sports & More - Eastern Mirror",
  description:
    "Get the latest updates on India news, sports, science, health, and more on Eastern Mirror. Stay informed and ahead!",
    url: 'https://www.easternmirrornagaland.com/india'
  }
};

export const dynamic = "force-dynamic";
export default IndiaPage;
