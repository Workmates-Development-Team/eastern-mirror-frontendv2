"use client";

import AddCategory from "@/components/admin/AddCategory";
import AddVideo from "@/components/admin/AddVideo";
import CategoryTable from "@/components/admin/table/CategoryTable";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axios";
import { getImageUrl } from "@/utils/getImageUrl";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Loader, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegPlayCircle } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface Video {
  _id: string;
  link: string;
  thumbnail: string;
}

interface FetchCategoryResponse {
  videos: Video[];
  totalPages: number;
  currentPage: number;
}

export default function Videos() {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext()

  const fetchVideos = async (params: {
    page?: number;
  }): Promise<FetchCategoryResponse> => {
    const { data } = await axiosInstance.get(
      `/video?page=${params?.page}&limit=6`
    );
    return data;
  };

  const {
    data = { videos: [], totalPages: 1, currentPage: 1 },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["videos", { page }],
    queryFn: () => fetchVideos({ page }),
    staleTime: 300000,
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setLoading(true);
        await axiosInstance.delete("/video/" + id);
        refetch();
        toast.success("Deleted Successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All Videos
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all videos below.</p>
        </div>

        <div>
          <AddVideo refetch={refetch} />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="py-4">
              <h2 className="text-lg font-semibold">Videos</h2>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
              {data?.videos?.map((item, i: number) => (
                <div className="relative" key={i}>
                  {user?.userType === "admin" ||
                  user?.userType === "editor" ? (
                    <div>
                      <Button
                        disabled={loading}
                        size="sm"
                        variant="destructive"
                        className="absolute z-30 top-2 right-2"
                        onClick={() => handleDelete(item._id)}
                      >
                        {loading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ) : null}

                  <a
                    href={item.link}
                    target="_blank"
                    key={i}
                    className="relative h-[200px]  rounded-lg overflow-hidden"
                  >
                    <div className="absolute top-0  left-0 right-0 bottom-0 bg-black opacity-25"></div>
                    <Image
                      className="w-full h-[200px] object-cover"
                      src={getImageUrl(item.thumbnail)}
                      width={330}
                      height={201.61}
                      alt="image"
                    />
                    <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <FaRegPlayCircle className="w-[51.35px] h-[51.35px] text-red-500" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className="flex justify-center my-4">
              <Pagination
                count={data.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
