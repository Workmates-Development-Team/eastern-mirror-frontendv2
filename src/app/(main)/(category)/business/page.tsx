import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {
  return (
    <div>
    

      <SubPage
        title="Business"
        category="business"
        links={[
          {
            label: "Business",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Business News & Updates You Can't Miss – Eastern Mirror",
  description:
    "Stay ahead with the latest business news, trends, and updates. Get insights on market shifts, industry changes, and more.",
  keywords: [
    "business news",
    "latest updates",
    "market trends",
    "industry insights",
    "economic news",
    "financial updates",
    "corporate news",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/business",
    title: "Latest Business News & Updates You Can't Miss – Eastern Mirror",
    description:
      "Stay ahead with the latest business news, trends, and updates. Get insights on market shifts, industry changes, and more.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
