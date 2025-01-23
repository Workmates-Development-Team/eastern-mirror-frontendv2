"use client";

import AddEditEvent from "@/components/admin/AddEditEvent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axiosInstance from "@/utils/axios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Edit, Loader, Trash } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface EventArticle {
  title: string;
  _id: string;
  thumbnail: string;
  slug: string;
}

interface Event {
  _id: string;
  title: string;
  status: string;
  articles: EventArticle[];
  createdAt: string;
  updatedAt: string;
}

interface EventsResponse {
  events: Event[];
  totalPages: number;
  currentPage: number;
}

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const getEvents = async (page: number): Promise<EventsResponse> => {
    const { data } = await axiosInstance.get(
      `/event?page=${page}&limit=10&search=${search}`
    );
    return data;
  };

  const {
    data = {
      totalPages: 1,
      currentPage: 1,
      events: [],
    },
    isLoading,
    isError,
    refetch,
  } = useQuery<EventsResponse>({
    queryKey: ["events-admin", currentPage, search],
    queryFn: () => getEvents(currentPage),
    staleTime: 300000,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    refetch();
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
        await axiosInstance.delete("/event/" + id);
        refetch();
        toast.success("Deleted Successfully");
      }
    } catch (error: any) {
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
            Events
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all events below.</p>
        </div>

        <div>
          <AddEditEvent refetch={refetch} />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 p-4">
        <div>
          <Input
            placeholder="Search events..."
            className="max-w-xs"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data.events.map((event) => (
            <Card key={event._id} className="relative">
              <div className="absolute top-1 right-1">
                <Badge
                  variant={
                    event.status === "ongoing" ? "default" : "destructive"
                  }
                >
                  {event.status}
                </Badge>
              </div>
              <CardHeader className="text-xl">{event.title}</CardHeader>
              <CardContent className="flex flex-col gap-3">
                {event.articles.map((article, index) => (
                  <div
                    key={article._id}
                    className="border-b pb-1 flex items-start gap-1"
                  >
                    <span>{index + 1})</span>
                    <p className="truncate">{article.title}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  disabled={loading}
                  onClick={() => handleDelete(event._id)}
                  size="icon"
                  variant="destructive"
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash className="w-4 h-4" />
                  )}
                </Button>
                <AddEditEvent data={event} refetch={refetch} />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Pagination
            color="primary"
            count={data.totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
};

export default Events;
