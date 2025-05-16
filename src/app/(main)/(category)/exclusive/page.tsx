import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {
  return (
    <div>
      <SubPage
        title="Exclusive"
        category="exclusive"
        links={[
          {
            label: "Exclusive",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Exclusive Reports & Special Coverage – Eastern Mirror",
  description:
    "Access in-depth reports, investigations, and exclusive news content you won’t find anywhere else.",
  keywords: [
    "exclusive news",
    "special reports",
    "investigative journalism",
    "in-depth stories",
    "featured news",
    "breaking exclusives",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/exclusive",
    title: "Exclusive Reports & Special Coverage – Eastern Mirror",
    description:
      "Access in-depth reports, investigations, and exclusive news content you won’t find anywhere else.",
  },
};

export const dynamic = "force-dynamic";
export default IndiaPage;
