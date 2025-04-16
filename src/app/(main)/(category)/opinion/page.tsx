import SubPage from "@/components/SubPage";
import { opinion } from "@/static/submenu";
import { Metadata } from "next";
import Head from "next/head";

const OpinionPage = async () => {
  return (
    <div>
     

      <SubPage
        title="Opinion"
        category="editorial"
        links={[
          {
            label: "Opinion",
          },
        ]}
        subMenu={opinion}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Opinion News & Live Updates: Stay Informed - Eastern Mirror",
  description:
    "Get the latest opinion news and live updates. Stay informed with expert insights, analysis, and real-time developments.",
  keywords: [
    "opinion news",
    "live updates",
    "latest opinions",
    "expert analysis",
    "breaking news",
    "current affairs",
    "trending topics",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/opinion",
    title: "Opinion News & Live Updates: Stay Informed - Eastern Mirror",
    description:
      "Get the latest opinion news and live updates. Stay informed with expert insights, analysis, and real-time developments.",
  },
};

export const dynamic = "force-dynamic";
export default OpinionPage;
