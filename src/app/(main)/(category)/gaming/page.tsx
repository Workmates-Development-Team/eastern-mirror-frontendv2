import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const GamingPage = async () => {

    return (
        <div>
          

            <SubPage title="Gaming" category="gaming" links={[{
                label: "Gaming",
            }]} />
        </div>
    );
};

export const metadata: Metadata = {
    title: "India Articles - Latest News",
    description: "Explore the latest news and articles about Nagaland. Stay updated with the top stories and insights.",
};

export const dynamic = 'force-dynamic';
export default GamingPage;
