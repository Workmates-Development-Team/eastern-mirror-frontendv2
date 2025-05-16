import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import React from "react";

const formatAuthorName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const author = formatAuthorName(decodeURIComponent(params.slug));

//   return {
//     title: `Explore Articles by "${author}" – Eastern Mirror`,
//     description: `Discover insightful articles and news stories written by "${author}". Stay updated with perspectives and opinions from ${author}.`,
//     keywords: [
//       `${author} articles`,
//       `articles by ${author}`,
//       `${author} news`,
//       "Eastern Mirror authors",
//       "featured writers",
//       "opinion leaders",
//     ],
//     openGraph: {
//       title: `Explore Articles by "${author}" – Eastern Mirror`,
//       description: `Discover insightful articles and news stories written by "${author}". Stay updated with perspectives and opinions from ${author}.`,
//       url: `https://www.easternmirrornagaland.com/author/${params.slug}`,
//       siteName: "Eastern Mirror",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Explore Articles by "${author}" – Eastern Mirror`,
//       description: `Discover insightful articles and news stories written by "${author}". Stay updated with perspectives and opinions from ${author}.`,
//     },
//   };
// }

const Author = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div>
      <SubPage
        title={formatAuthorName(slug)}
        category="author"
        slug={slug}
        links={[
          {
            label:formatAuthorName(slug),
          },
        ]}
      />
    </div>
  );
};


// export const dynamic = 'force-dynamic';

export default Author;
