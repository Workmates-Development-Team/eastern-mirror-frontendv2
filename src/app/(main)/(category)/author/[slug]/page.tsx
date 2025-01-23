import SubPage from '@/components/SubPage'
import React from 'react'
import Head from "next/head";

const Tags = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {

    const { slug } = await params
    return (
        <div>
            <Head>
                <meta name="title" content="Tag - Latest News" />
                <meta name="description" content="Explore the latest news and articles about Nagaland." />
                <meta name="keywords" content="Nagaland, news, articles, updates" />
                <meta name="author" content="Eastern Mirror" />
                <meta property="og:title" content="Nagaland Articles - Latest News" />
                <meta property="og:description" content="Explore the latest news and articles about Nagaland." />
                <meta property="og:url" content="https://www.easternmirrornagaland.com/nagaland" />
            </Head>

            <SubPage title='Author' category="author" slug={slug} links={[{
                label: "Author",
            }]} />

        </div>
    )
}

export default Tags