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
        title="Health"
        category="health"
        links={[
          {
            label: "Health",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Health News & Updates for a Better Life - Eastern Mirror",
  description:
    "Stay informed with the latest health news, trends, and updates to improve your well-being. Get expert insights and tips daily.",
  keywords: [
    "health news",
    "health updates",
    "wellness trends",
    "medical breakthroughs",
    "healthcare tips",
    "fitness news",
    "nutrition updates",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/health",
    title: "Latest Health News & Updates for a Better Life - Eastern Mirror",
    description:
      "Stay informed with the latest health news, trends, and updates to improve your well-being. Get expert insights and tips daily.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
