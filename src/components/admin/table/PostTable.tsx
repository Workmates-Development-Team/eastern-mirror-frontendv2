"use client";

import { Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import CategoryFilter from "./filter/CategoryFilter";
import DateRangePicker from "./filter/DateRangeFilter";
import { Separator } from "@/components/ui/separator";
import Sorting from "./filter/Sorting";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { useAuthContext } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "./TableSkeleton";

export type Article = {
  _id: string;
  title: string;
  content: string;
  publishedAt: string;
  tags: string[];
  slug: string;
  category: Category[];
  isPublished: boolean;
};

export type Category = {
  _id: string;
  name: string;
  parentCategory: string;
  status: boolean;
};

interface FetchArticlesResponse {
  articles: Article[];
  totalPages: number;
  currentPage: number;
}

export default function CategoryTable() {
  const { user } = useAuthContext();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<string>("desc");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchArticles = async (params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
    search?: string;
    category?: string;
    author?: string;
  }): Promise<FetchArticlesResponse> => {
    const { data } = await axiosInstance.get(
      `/article/all?page=${params?.page}&search=${
        params?.search
      }&sort=${sort}&order=${order}&category=${category}&startDate=${
        startDate || ""
      }&endDate=${endDate || ""}&admin=true`
    );
    setTotalPages(data?.totalPages);
    return data;
  };

  const {
    data = { articles: [], totalPages: 0, currentPage: 1 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "articles",
      {
        page,
        limit,
        sort,
        order,
        search: debouncedSearch,
        category,
        endDate,
        startDate,
      },
    ],
    queryFn: () =>
      fetchArticles({ page, limit, sort, order, search: debouncedSearch }),
    // staleTime: 300000,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.delete(`/article/delete/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy text");
        console.error("Failed to copy text:", error);
      });
  }

  return (
    <div className="w-full">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Search post..."
            className="max-w-xs"
            value={search}
            onChange={handleSearch}
          />
          <Separator orientation="vertical" />
          <div className="flex justify-end gap-3">
            <CategoryFilter category={category} setCategory={setCategory} />
            <Sorting setSort={setSort} setOrder={setOrder} />
            <DateRangePicker
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />{" "}
            {startDate || endDate ? (
              <Button
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                }}
              >
                Clear
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {isLoading ? (
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableSkeleton key={i} />
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {data?.articles.length ? (
                  data.articles.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        <div>{row?.title}</div>
                      </TableCell>

                      <TableCell>
                        <div>{formatDate(row?.publishedAt)}</div>
                      </TableCell>
                      <TableCell>
                        <div>{row?.tags?.join(", ")}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {row?.category?.map((item) => item?.name).join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={row?.isPublished ? "default" : "destructive"}
                        >
                          {row?.isPublished ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem>
                              <div onClick={() => copyToClipboard(row._id)}>
                                Copy Post ID
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                href={`/em-admin/post/edit-post/${row.slug}`}
                              >
                                Edit Article
                              </Link>
                            </DropdownMenuItem>
                            {user?.userType === "admin" ||
                            user?.userType === "editor" ? (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <button
                                    disabled={loading}
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    {loading ? "Deleting..." : "Delete Article"}
                                  </button>
                                </DropdownMenuItem>
                              </>
                            ) : null}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            count={data?.totalPages || totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
