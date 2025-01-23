import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import Head from "next/head";

const ArtEntertainmentPage = async () => {

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

            <SubPage title='Arts and Entertainment' category="arts-and-entertainment" links={[{
                label: "Arts and Entertainment",
            }]} />
        </div>
    );
};

export const metadata: Metadata = {
    title: "India Articles - Latest News",
    description: "Explore the latest news and articles about Nagaland. Stay updated with the top stories and insights.",
};

export const dynamic = 'force-dynamic';
export default ArtEntertainmentPage;
