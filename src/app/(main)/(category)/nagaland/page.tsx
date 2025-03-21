import SubPage from "@/components/SubPage";
import { nagaland } from "@/static/submenu";
import { Metadata } from "next";
import Head from "next/head";
const NagalandPage = async () => {
  return (
    <div>
      <Head>
        <meta name="title" content="Nagaland Articles - Latest News" />
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
        title="Nagaland"
        category="nagaland"
        links={[
          {
            label: "Nagaland",
          },
        ]}
        subMenu={nagaland}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title:
    "Latest News & Updates from Nagaland: Politics, Events, & More - Eastern Mirror",
  description:
    "Stay updated with the latest news, politics, events, entertainment, and culture from Nagaland. Live updates from all districts: Dimapur, Kohima & more.",
  keywords: [
    "Nagaland news",
    "Nagaland updates",
    "Nagaland latest news",
    "Nagaland politics",
    "Nagaland events",
  ],
  openGraph: {
    title:  "Latest News & Updates from Nagaland: Politics, Events, & More - Eastern Mirror",
    description:"Stay updated with the latest news, politics, events, entertainment, and culture from Nagaland. Live updates from all districts: Dimapur, Kohima & more.",
    url: `https://www.easternmirrornagaland.com/nagaland`,
  },
};

export const dynamic = "force-dynamic";
export default NagalandPage;
