"use client";

import AddCategory from "@/components/admin/AddCategory";
import CategoryTable from "@/components/admin/table/CategoryTable";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface FetchCategoryResponse {
  categories: Category[];
  totalPages: number;
  currentPage: number;
}

export default function Category() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState<number>(1);

  const fetchCategories = async (params: {
    page?: number;
    search?: string;
  }): Promise<FetchCategoryResponse> => {
    const { data } = await axiosInstance.get(
      `/category/all?page=${params?.page}&search=${params?.search}`
    );
    return data;
  };

  const {
    data = { categories: [], totalPages: 0, currentPage: 1 },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["categories", { page, search: debouncedSearch }],
    queryFn: () => fetchCategories({ page, search: debouncedSearch }),
    staleTime: 300000,
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  console.log(error);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All Categories
          </h1>
          <p className="text-[#A3A3A3]">
            Manage and view all categories below.
          </p>
        </div>

        <div>
          <AddCategory refetch={refetch} />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <CategoryTable
            categories={data.categories}
            totalPage={data.totalPages}
            page={page}
            handlePageChange={handlePageChange}
            searchTerm={search}
            setSearchTerm={setSearch}
            setPage={setPage}
            refetch={refetch}
          />
        )}
      </div>
    </main>
  );
}
