"use client";

import React, { Suspense, useEffect, useState } from "react";
import axiosServer from "@/utils/axiosServer";
import { formatDate } from "@/utils/date";
import { Pagination } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";

const queryClient = new QueryClient();

const SearchPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchComponent />
    </QueryClientProvider>
  )
}

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState(Number(currentPage) || 1);
  const router = useRouter();

  useEffect(() => {
    setPage(Number(currentPage) || 1);
  }, [currentPage]);

  const fetchData = async () => {
    const { data } = await axiosServer.get(
      `/article/all?search=${query}&limit=10&page=${page}`
    );
    return data;
  };

  const { isPending, data } = useQuery({
    queryKey: ["seacrh", query, page],
    queryFn: () => fetchData(),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`?q=${query}&page=${value}`);
  };

  if (isPending) {
    return (
      <div className="container flex justify-center min-h-[50vh] mt-10">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <section className="">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8">
            <h2 className="text-[#000] mb-2 text-2xl font-bold">
              Search Result For <span className="capitalize">{query}</span>
            </h2>

            <div>
              {data?.articles?.map(
                (article: {
                  _id: string;
                  slug: string;
                  title: string;
                  createdAt: string;
                  content: string;
                  thumbnail: string;
                  author: {
                    name: string;
                  };
                }) => (
                  <div
                    key={article._id}
                    className="pb-12 flex gap-5 items-center md:flex-row flex-col"
                  >
                    <div>
                      <Image
                        src={getImageUrl(article.thumbnail)}
                        width={300}
                        height={250}
                        alt={article.slug}
                        className="w-full h-[200px] object-cover lg:w-[300px]"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-xl font-bold mb-2">
                        <Link href={"/" + article?.slug}>
                          {article.title}
                        </Link>
                      </h3>
                      <div className="search_post_meta">
                        <p className="mb-4">
                          Posted By{" "}
                          <span className="text-[#002366] font-bold">
                            {article.author.name}
                          </span>{" "}
                          On{" "}
                          <span className="text-[#002366] font-bold">
                            {formatDate(article.createdAt)}
                          </span>
                        </p>
                      </div>
                      <Link
                        className="text-[#002366] text-xs font-bold uppercase"
                        href={"/" + article?.slug}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex justify-center mt-12">
              <Pagination
                color="primary"
                count={data?.totalPages || 0}
                page={page || 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container flex justify-center min-h-[50vh]">
          <Loader />
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
