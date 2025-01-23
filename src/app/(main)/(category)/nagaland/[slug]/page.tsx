import SubPage from '@/components/SubPage'
import Head from 'next/head'
import React from 'react'

const NagalandSubCategory = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {

    const { slug } = await params

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

            <SubPage title={slug.charAt(0).toUpperCase() + slug.slice(1)} category={slug} links={[{
                label: "Nagaland",
                href: '/nagaland'
            }, {
                label: slug.charAt(0).toUpperCase() + slug.slice(1)
            }]} />
        </div>
    )
}

export default NagalandSubCategory