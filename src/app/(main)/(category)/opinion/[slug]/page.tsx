import SubPage from "@/components/SubPage";
import Head from "next/head";
import React from "react";

const OpinionSubCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div>
      <Head>
        <meta name="title" content="Nagaland Articles - Latest News" />
        <meta
          name="description"
          content="Explore the latest news and articles about Nagaland."
        />
        <meta name="keywords" content="Nagaland, news, articles, updates" />
        <meta name="author" content="Eastern Mirror" />
        <meta property="og:title" content="Nagaland Articles - Latest News" />
        <meta
          property="og:description"
          content="Explore the latest news and articles about Nagaland."
        />
        <meta
          property="og:url"
          content="https://www.easternmirrornagaland.com/nagaland"
        />
      </Head>

      <SubPage
        title={
          slug === "letters-to-editor"
            ? "Letters to Editor"
            : slug === "views-and-reviews"
            ? "Views and Reviews"
            : slug === "op-ed"
            ? "Op-Ed"
            : slug === "book-reviews"
            ? "Book Reviews"
            : slug === "editorial"
            ? "Editorial"
            : slug
        }
        category={slug}
        links={[
          {
            label: "Opinion",
            href: "/opinion",
          },
          {
            label:
              slug === "letters-to-editor"
                ? "Letters to Editor"
                : slug === "views-and-reviews"
                ? "Views and Reviews"
                : slug === "op-ed"
                ? "Op-Ed"
                : slug === "book-reviews"
                ? "Book Reviews"
                : slug === "editorial"
                ? "Editorial"
                : slug,
          },
        ]}
      />
    </div>
  );
};

export default OpinionSubCategory;
