import SubPage from "@/components/SubPage";
import { nagaland } from "@/static/submenu";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

const NagalandPage = async () => {

    return (
        <div>
            <Head>
                <meta name="title" content="Nagaland Articles - Latest News" />
                <meta name="description" content="Explore the latest news and articles about Nagaland." />
                <meta name="keywords" content="Nagaland, news, articles, updates" />
                <meta name="author" content="Eastern Mirror" />
                <meta property="og:title" content="Nagaland Articles - Latest News" />
                <meta property="og:description" content="Explore the latest news and articles about Nagaland." />
                <meta property="og:url" content="https://www.easternmirrornagaland.com/nagaland" />
            </Head>

            <SubPage title="Nagaland" category="nagaland" links={[{
                label: "Nagaland",
            }]} subMenu={nagaland} />
        </div>
    );
};

export const metadata: Metadata = {
    title: "Nagaland Articles - Latest News",
    description: "Explore the latest news and articles about Nagaland. Stay updated with the top stories and insights.",
};

export const dynamic = 'force-dynamic';
export default NagalandPage;
