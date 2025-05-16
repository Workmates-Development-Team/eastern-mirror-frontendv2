import BreadcrumbComponent from "@/components/BreadcrumbConponent";
import Heading from "@/components/main/Heading";
import Videos from "@/components/main/Videos";
import { Metadata } from "next";

const VideosPage = () => {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen">
        <div className="container py-2 px-4 md:px-6 mt-3">
          <BreadcrumbComponent
            links={[
              { label: "Home", href: "/" },
              {
                label: "Video",
              },
            ]}
          />
        </div>

        <Heading title="Videos" />

        <Videos />
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Watch News Videos & Visual Stories – Eastern Mirror",
  description:
    "Watch the latest news videos, interviews, and on-the-ground reports from Nagaland and the Northeast.",
  keywords: [
   "news videos", "video reports", "interviews", "live news", "visual stories", "Nagaland coverage", "breaking footage"
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/videos",
    title: "Watch News Videos & Visual Stories – Eastern Mirror",
    description:
      "Watch the latest news videos, interviews, and on-the-ground reports from Nagaland and the Northeast.",
  },
};

export default VideosPage;
