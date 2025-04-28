import SubPage from "@/components/SubPage";
import React from "react";
import Head from "next/head";

const Tags = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div>
      <SubPage
        title="Tag"
        category="tag"
        slug={slug}
        links={[
          {
            label: "Tag",
          },
        ]}
      />
    </div>
  );
};

export default Tags;
