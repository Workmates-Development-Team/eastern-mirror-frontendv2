import SubPage from "@/components/SubPage";
import { Metadata } from "next";
import React from "react";

const SEO = {
  editorial: {
    title: "Insightful Editorial News & Analysis - Eastern Mirror",
    description:
      "Stay informed with expert editorial news, in-depth analysis, and the latest updates on trending topics. Get the facts with Eastern Mirror.",
    keywords: [
      "editorial news",
      "latest news",
      "expert analysis",
      "breaking news",
      "current affairs",
      "in-depth reports",
      "news updates",
    ],
    openGraph: {
      url: "https://www.easternmirrornagaland.com/opinion/editorial",
      title: "Insightful Editorial News & Analysis - Eastern Mirror",
      description:
        "Stay informed with expert editorial news, in-depth analysis, and the latest updates on trending topics. Get the facts with Eastern Mirror.",
    },
  },

  viewsAndReviews: {
    title: "Thought-Provoking Views & Reviews – Eastern Mirror",
    description:
      "Explore insightful views and reviews on the latest topics. Stay informed with expert opinions under the opinion category.",
    keywords: [
      "opinion news",
      "expert reviews",
      "latest views",
      "news analysis",
      "editorial insights",
      "trending opinions",
      "media reviews",
    ],
    openGraph: {
      url: "https://www.easternmirrornagaland.com/opinion/views-and-reviews",
      title: "Thought-Provoking Views & Reviews – Eastern Mirror",
      description:
        "Explore insightful views and reviews on the latest topics. Stay informed with expert opinions under the opinion category.",
    },
  },

  opEd: {
    title: "Thought-Provoking Op-Ed on Current Issues – Eastern Mirror",
    description:
      "Explore insightful Op-Ed articles under the Opinion category, offering in-depth analysis on pressing topics. Stay informed with expert views.",
    keywords: [
      "Op-Ed",
      "opinion news",
      "expert analysis",
      "editorial insights",
      "latest opinions",
      "news commentary",
      "thought leadership",
    ],
    openGraph: {
      url: "https://www.easternmirrornagaland.com/opinion/op-ed",
      title: "Thought-Provoking Op-Ed on Current Issues – Eastern Mirror",
      description:
        "Explore insightful Op-Ed articles under the Opinion category, offering in-depth analysis on pressing topics. Stay informed with expert views.",
    },
  },

  letterToEditor: {
    title: "Voice of the People: A Thoughtful Perspective - Eastern Mirror",
    description: `Share your views on pressing issues in our "Letter to Editor" section under Opinion. Your voice matters—join the conversation today!`,
    keywords: [
      "opinion piece",
      "letter to editor",
      "public opinion",
      "editorial views",
      "reader's voice",
      "news commentary",
      "Eastern Mirror",
    ],
    openGraph: {
      url: "https://www.easternmirrornagaland.com/opinion/letter-to-editor",
      title: "Voice of the People: A Thoughtful Perspective - Eastern Mirror",
      description: `Share your views on pressing issues in our "Letter to Editor" section under Opinion. Your voice matters—join the conversation today!`,
    },
  },

  bookReviews: {
    title: "Thought-Provoking Book Reviews for Avid Readers – Eastern Mirror",
    description: `Dive into insightful book reviews under the opinion section, exploring diverse perspectives on must-read titles.`,
    keywords: [
      "book reviews",
      "literary opinions",
      "best books",
      "must-read books",
      "book critiques",
      "reading recommendations",
      "book analysis",
    ],
    openGraph: {
      url: "https://www.easternmirrornagaland.com/opinion/book-reviews",
      title: "Thought-Provoking Book Reviews for Avid Readers – Eastern Mirror",
      description: `Dive into insightful book reviews under the opinion section, exploring diverse perspectives on must-read titles.`,
    },
  },
};

interface Props {
  params: { slug: string };
}

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return slug === "editorial"
    ? SEO.editorial
    : slug === "views-and-reviews"
    ? SEO.viewsAndReviews
    : slug === "op-ed"
    ? SEO.opEd
    : slug === "letter-to-editor"
    ? SEO.letterToEditor
    : slug === "book-reviews"
    ? SEO.bookReviews
    : {
        title: "Opinion - Eastern Mirror",
        description: "Read the latest opinion articles on Eastern Mirror.",
      };
}

const OpinionSubCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Map slugs to page titles
  const categoryTitleMap: { [key: string]: string } = {
    "letter-to-editor": "Letter to Editor",
    "views-and-reviews": "Views and Reviews",
    "op-ed": "Op-Ed",
    "book-reviews": "Book Reviews",
    editorial: "Editorial",
  };

  return (
    <div>
      <SubPage
        title={categoryTitleMap[slug] || slug}
        category={slug}
        links={[
          { label: "Opinion", href: "/opinion" },
          { label: categoryTitleMap[slug] || slug },
        ]}
      />
    </div>
  );
};

export default OpinionSubCategory;
