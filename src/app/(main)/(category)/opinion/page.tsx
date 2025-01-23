import SubPage from "@/components/SubPage";
import { opinion } from "@/static/submenu";
import { Metadata } from "next";
import Head from "next/head";

const OpinionPage = async () => {

    return (
        <div>
            <Head>
                <meta name="title" content="India Articles - Latest News" />
                <meta name="description" content="Explore the latest news and articles about Nagaland." />
                <meta name="keywords" content="Nagaland, news, articles, updates" />
                <meta name="author" content="Eastern Mirror" />
                <meta property="og:title" content="Nagaland Articles - Latest News" />
                <meta property="og:description" content="Explore the latest news and articles about Nagaland." />
                <meta property="og:url" content="https://www.easternmirrornagaland.com/nagaland" />
            </Head>

            <SubPage title='Opinion' category="editorial" links={[{
                label: "Opinion",
            }]} subMenu={opinion} />
        </div>
    );
};

export const metadata: Metadata = {
    title: "India Articles - Latest News",
    description: "Explore the latest news and articles about Nagaland. Stay updated with the top stories and insights.",
};

export const dynamic = 'force-dynamic';
export default OpinionPage;
