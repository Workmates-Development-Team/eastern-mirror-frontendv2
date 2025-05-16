import SubPage from "@/components/SubPage";
import { Metadata } from "next";

const IndiaPage = async () => {
  return (
    <div>
      <SubPage
        title="News"
        category="news"
        links={[
          {
            label: "News",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Breaking News & Top Stories from Nagaland – Eastern Mirror",
  description:
    "Stay updated with real-time breaking news, top headlines, and latest updates from Nagaland and around the world.",
  keywords: [
    "Nagaland news",
    "breaking news",
    "live updates",
    "headlines",
    "top stories",
    "Eastern Mirror news",
    "India news",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/news",
    title: "Breaking News & Top Stories from Nagaland – Eastern Mirror",
    description:
      "Stay updated with real-time breaking news, top headlines, and latest updates from Nagaland and around the world.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
