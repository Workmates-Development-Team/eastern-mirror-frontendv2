import BreadcrumbComponent from "@/components/BreadcrumbConponent";
import NotFoundComponent from "@/components/not-found";
import ShareComponent from "@/components/ShareComponent";
import axiosServer from "@/utils/axiosServer";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import { Metadata } from "next";
import Link from "next/link";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import Head from "next/head";

const fetchData = async (slug: string) => {
  try {
    const { data } = await axiosServer.get(`/article/by/${slug}`);
    return data?.article;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const normalizeSlug = (slug: string) => slug.replace(/\/$/, "");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = normalizeSlug((await params).slug);
  const article = await fetchData(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist.",
      robots: "noindex, nofollow",
    };
  }

  const canonicalUrl = `https://www.easternmirrornagaland.com/${slug}`;

  return {
    title: article.title,
    description: article.excerpt || article.plainTextContent,
    keywords: article.metaKeyWord?.join(", ") || article.tags?.join(","),
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: article.title,
      description: article.excerpt || article.plainTextContent,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: getImageUrl(article.thumbnail) || "/images/logo-light.png",
          width: 1200,
          height: 630,
          alt: article.title || "Default Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.plainTextContent,
      images: [getImageUrl(article.thumbnail) || "/default-image.jpg"],
    },
  };
}

function replaceShortcodes(content: string) {
  return content.replace(
    /\[bsa_pro_ad_space id=6\]/g,
    `<div class="my-10"></div>`
  );
}

const ContentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const data = await fetchData((await params).slug);

  if (!data) {
    notFound();
  }

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.easternmirrornagaland.com/${data.slug}`,
    },
    headline: data.title,
    description: data.excerpt || data.plainTextContent || "",
    articleBody: data.content
      ? data.content.replace(/(<([^>]+)>)/gi, "")
      : "Full Article", // strip HTML tags if needed
    inLanguage: "en",
    image: getImageUrl(data.thumbnail) || "",
    author: {
      "@type": "Person",
      name: data.author?.name || "Unknown Author",
      url: data.author?.username
        ? `https://www.easternmirrornagaland.com/author/${data.author.username}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Eastern Mirror",
      logo: {
        "@type": "ImageObject",
        url: "https://www.easternmirrornagaland.com/logo.png", // Use your real logo image URL here
      },
    },
    datePublished: data.publishedAt,
    dateModified: data.updatedAt || data.publishedAt,
  };

  const processedContent = replaceShortcodes(data?.content);

  const containsWpBlocks = data?.content?.includes("<!-- wp:");
  return (
    <div className="min-h-screen">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(newsArticleSchema),
          }}
        />
      </Head>

      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent
          links={[{ label: "Home", href: "/" }, { label: data.title }]}
        />

        <div className="grid grid-cols-3 gap-7 md:mt-20 mt-10">
          <div className="col-span-3 mx-auto">
            <div className="max-w-[842px]">
              <h1 className="md:text-2xl text-[21px] leading-tight md:leading-normal lora-bold">
                {data.title}
              </h1>
              <p className="mt-2.5 text-[#9B9B9B] md:text-sm text-xs roboto-regular">
                Published on {formatDate(data.publishedAt)}
              </p>
              <p className="text-[#9B9B9B] md:text-sm text-xs roboto-regular">
                By{" "}
                {data.author?.name ? (
                  <Link
                    href={`/author/${data.author.username}`}
                    className="underline"
                  >
                    {data.author.name}
                  </Link>
                ) : (
                  <span className="underline">Unknown Author</span>
                )}
              </p>

              <ShareComponent title={data.title} slug={data.slug} />

              <div className="md:mt-6 mt-4">
                {containsWpBlocks ? (
                  <div className="prose lg:prose-lg max-w-4xl mx-auto space-y-6 mt-5 md:mt-10 text-sm md:text-base content-custom lora-regular">
                    {parse(processedContent)}
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.content }}
                    className="mt-5 md:mt-10 text-sm md:text-base content-custom lora-regular"
                  ></div>
                )}
              </div>

              <div className="flex gap-3 flex-wrap mt-4">
                {data.tags?.map((item: string, i: number) => (
                  <Link
                    className="border text-[#909090] text-xs px-3 py-2"
                    href={`/tag/${item
                      .toLocaleLowerCase()
                      .split(" ")
                      .join("-")}`}
                    key={i}
                  >
                    {item.trim()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
