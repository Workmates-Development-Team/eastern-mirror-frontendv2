import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {
  return (
    <div>
      

      <SubPage
        title="Education"
        category="education"
        links={[
          {
            label: "Education",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Education News & Updates – Eastern Mirror",
  description:
    "Stay updated with the latest education news, policies, and trends. Get insightful updates on exams, scholarships, and more.",
  keywords: [
    "education news",
    "latest education updates",
    "school news",
    "exam updates",
    "scholarship news",
    "education trends",
    "academic news",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/education",
    title: "Latest Education News & Updates – Eastern Mirror",
    description:
      "Stay updated with the latest education news, policies, and trends. Get insightful updates on exams, scholarships, and more.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
