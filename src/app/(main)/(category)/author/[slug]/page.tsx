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
            
            <SubPage title='Author' category="author" slug={slug} links={[{
                label: "Author",
            }]} />

        </div>
    )
}

export default Tags