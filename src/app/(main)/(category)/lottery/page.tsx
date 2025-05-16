import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {
  return (
    <div>
      <SubPage
        title="Lottery"
        category="lottery"
        links={[
          {
            label: "Lottery",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Nagaland Dear Lottery Results & Updates",
  description:
    "Get real-time Nagaland state lottery results, winning numbers, and daily updates with verified outcomes.",
  keywords: [
    "Nagaland lottery",
    "lottery results",
    "lottery updates",
    "winning numbers",
    "state lottery",
    "daily lottery",
    "lottery news",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/lottery",
    title: "Latest Nagaland Dear Lottery Results & Updates",
    description:
      "Get real-time Nagaland state lottery results, winning numbers, and daily updates with verified outcomes.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
