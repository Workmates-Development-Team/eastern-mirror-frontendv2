import BreadcrumbComponent from "@/components/BreadcrumbConponent";
import NotFoundComponent from "@/components/not-found";
import ShareComponent from "@/components/ShareComponent";
import axiosServer from "@/utils/axiosServer";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import { Metadata } from "next";
import Link from "next/link";

const fetchData = async (slug: string) => {
  try {
    const { data } = await axiosServer.get(`/article/by/${slug}`);
    return data?.article;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = await fetchData((await params).slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist.",
      robots: "noindex, nofollow",
    };
  }

  const canonicalUrl = `https://www.easternmirrornagaland.com/${
    (await params).slug
  }`;

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

const ContentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const data = await fetchData((await params).slug);

  console.log(data)

  if (!data) return <NotFoundComponent />;

  return (
    <div className="min-h-screen">
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
                <div
                  dangerouslySetInnerHTML={{ __html: data.content }}
                  className="mt-5 md:mt-10 text-sm md:text-base content-custom lora-regular"
                ></div>
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
