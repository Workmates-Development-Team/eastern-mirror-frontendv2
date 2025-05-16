import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const IndiaPage = async () => {

    return (
        <div>
          

            <SubPage title="Region" category="region" links={[{
                label: "Region",
            }]} />
        </div>
    );
};

export const metadata: Metadata = {
  title: "Regional News: Local Developments & Insights – Eastern Mirror",
  description:
    "Uncover important updates from districts and regions across Nagaland and neighboring states.",
  keywords: [
   "regional news", "local updates", "district news", "Nagaland regions", "area development", "community news", "rural stories"
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/region",
    title: "Exclusive Reports & Special Coverage – Eastern Mirror",
    description:
      "Uncover important updates from districts and regions across Nagaland and neighboring states.",
  },
};

export const dynamic = 'force-dynamic';
export default IndiaPage;
