import SubPage from "@/components/SubPage";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

// Function to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${capitalizedSlug} - Latest News, Politics, Events & Updates - Eastern Mirror`,
    description: `Stay updated with the latest news, politics, events, art, and culture from ${capitalizedSlug}. Get real-time updates and in-depth coverage.`,
    keywords: [
      `${capitalizedSlug} news`,
      `${capitalizedSlug} updates`,
      `${capitalizedSlug} politics`,
      `${capitalizedSlug} events`,
      `${capitalizedSlug} culture`,
      `${capitalizedSlug} live news`,
      `${capitalizedSlug} latest`,
    ],
    openGraph: {
      title: `${capitalizedSlug} - Latest News, Politics, Events & Updates - Eastern Mirror`,
      description: `Stay updated with the latest news, politics, events, art, and culture from ${capitalizedSlug}. Get real-time updates and in-depth coverage.`,
      url: `https://www.easternmirrornagaland.com/nagaland/${slug}`,
    },
  };
}

const NagalandSubCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <SubPage
      title={capitalizedSlug}
      category={slug}
      links={[
        { label: "Nagaland", href: "/nagaland" },
        { label: capitalizedSlug },
      ]}
    />
  );
};

export default NagalandSubCategory;
