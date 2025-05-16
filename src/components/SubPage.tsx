"use client";

import React, { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import Loader from "./Loader";
import BreadcrumbComponent from "./BreadcrumbConponent";
import Heading from "./main/Heading";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/date";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import axiosServer from "@/utils/axiosServer";
import Image from "next/image";

const queryClient = new QueryClient();

interface PropsInterface {
  title: string;
  category: string;
  links: {
    label: string;
    href?: string;
  }[];
  subMenu?: {
    href: string;
    name: string;
  }[];
  limit?: number;
  showPagination?: boolean;
  slug?: string;
}

const SubPage = ({
  title,
  category,
  links,
  subMenu,
  limit = 10,
  showPagination = true,
  slug,
}: PropsInterface) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubPageComponent
        category={category}
        links={links}
        subMenu={subMenu}
        title={title}
        limit={limit}
        showPagination={showPagination}
        slug={slug}
      />
    </QueryClientProvider>
  );
};

const SubPageComponent = ({
  category,
  links,
  subMenu,
  title,
  limit,
  showPagination,
  slug,
}: PropsInterface) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = searchParams.get("page") || "1";
  const [page, setPage] = useState<number>(parseInt(pageFromUrl, 10));

  const fetchCategoryArticles = async (category: string, page: number) => {
    const { data } = await axiosServer.get(
      `/article/all?category=${category}&page=${page}&limit=${limit}&sort=createdAt`
    );
    return data;
  };

  const fetchTagArticles = async (page: number, tag?: string) => {
    const { data } = await axiosServer.get(
      `/article/all?tag=${tag}&page=${page}`
    );
    return data;
  };

  const fetchAuthorrticles = async (page: number, author?: string) => {
    const { data } = await axiosServer.get(
      `/article/all?author=${author}&page=${page}`
    );
    return data;
  };

  const { isLoading, data, isError } = useQuery({
    queryKey: [category, page, slug],
    queryFn: () =>
      category === "tag"
        ? fetchTagArticles(page, slug)
        : category === "author"
          ? fetchAuthorrticles(page, slug)
          : fetchCategoryArticles(category, page),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    setPage(parseInt(pageFromUrl, 10));
  }, [pageFromUrl]);

  const updatePageInUrl = (newPage: number) => {
    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    });
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    updatePageInUrl(value);
  };

  if (isLoading) {
    return (
      <div className="container flex justify-center min-h-[50vh] mt-10">
        <Loader />
      </div>
    );
  }

  if (isError) {
    router.push("/");
    return null;
  }
  if (!data?.articles?.length) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent links={[{ label: "Home", href: "/" }, ...links]} />
      </div>

      {
        category === "tag" ? <div className="container mt-10 px-4 md:px-6"> <h2 className="text-[#000] mb-2 text-2xl font-bold">
          Articles Tagged With - <span className="capitalize">"{title}"</span>
        </h2> </div>: category === 'author'? <div className="container mt-10 px-4 md:px-6"> <h2 className="text-[#000] mb-2 text-2xl font-bold">
          Articles Tagged With - <span className="capitalize">"{title}"</span>
        </h2> </div> : <Heading title={title} />


      }


      <div className="container py-2 px-4 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-7 mt-3">
        <div className="md:col-span-2">
          {subMenu?.length ? (
            <div className="flex flex-wrap md:gap-3 gap-2">
              {subMenu.map((item, i: number) => (
                <Link
                  key={i}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "md:h-10 h-9 text-xs md:text-sm px-3 md:px-4"
                  )}
                  href={item?.href}
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="md:mt-10 mt-8 flex flex-col md:gap-7 gap-4">
            {data?.articles?.length ? (
              data?.articles?.map((item: any, i: string) => (
                <Card key={item._id} data={item} />
              ))
            ) : (
              <div className="flex justify-center">
                <p>No data found</p>
              </div>
            )}
          </div>

          {showPagination && (
            <div className="flex justify-center mt-12">
              <Pagination
                color="primary"
                count={data?.totalPages || 0}
                page={page || 1}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ data }: { data: any }) => {
  function extractFirstText(html: string, charLimit: number): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    function collectText(node: Node, collectedText: string[]): void {
      if (collectedText.join("").length >= charLimit) {
        return;
      }

      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        collectedText.push(node.textContent.trim());
      }

      Array.from(node.childNodes).forEach((child) =>
        collectText(child, collectedText)
      );
    }

    const textPieces: string[] = [];
    collectText(tempDiv, textPieces);

    const fullText = textPieces.join(" ");
    return fullText.slice(0, charLimit).trim();
  }

  const [isLoading, setIsLoading] = useState(true);

  const firstText = extractFirstText(data?.content, 100);

  return (
    <div className="bg-[#F5F6F9] grid grid-cols-6 md:gap-7 gap-3">
      <div className="md:col-span-2 col-span-3 relative">
        <Link href={"/" + data?.slug} className="w-full h-[200px] ">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
          )}
          <Image
            width={300}
            height={200}
            className={`w-full h-full max-h-[200px] ${data.thumbnail ? "object-cover" : "object-contain p-2"
              }`}
            src={getImageUrl(data?.thumbnail)}
            alt={data.title}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
      </div>

      <div className="md:col-span-4 col-span-3 flex flex-col justify-center md:p-3 p-2 pl-0">
        <Link href={"/" + data?.slug}>
          <h2 className="text-[#080F18] lora-bold md:text-lg leading-tight md:leading-normal text-sm md:pb-2.5 pb-2">
            {data?.title}
          </h2>
        </Link>
        <div className="text-[#646464] md:text-sm text-xs pb-2.5 truncate md:whitespace-normal md:overflow-visible md:text-overflow-clip">
          {firstText}...
        </div>
        <p className="text-xs text-[#BBBBBB] hidden md:block">
          {formatDate(data?.publishedAt)}
        </p>
      </div>
    </div>
  );
};

export default SubPage;
