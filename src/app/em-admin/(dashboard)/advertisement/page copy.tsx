"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axiosInstance from "@/utils/axios";
import { Box, Pagination, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Edit, Loader, Plus, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import AddEditAds from "@/components/admin/AddEditAds";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import Link from "next/link";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface Ads {
  _id: string;
  link: string;
  imageUrl: string;
}

interface EventsResponse {
  ads: Ads[];
  totalPages: number;
  currentPage: number;
}

interface SliserResponse {
  items: Ads[];
}

const Advertisement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [sliders, setSliders] = useState<Ads[]>([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getAds = async (page: number): Promise<EventsResponse> => {
    const { data } = await axiosInstance.get(
      `/ads?page=${page}&limit=10&search=${search}`
    );
    console.log(data);
    return data;
  };

  const {
    data = {
      totalPages: 1,
      currentPage: 1,
      ads: [],
    },
    isLoading,
    isError,
    refetch,
  } = useQuery<EventsResponse>({
    queryKey: ["ads-admin", currentPage, search],
    queryFn: () => getAds(currentPage),
    staleTime: 300000,
  });

  const getSliders = async () => {
    try {
      const { data } = await axiosInstance.get(`/ads/slider`);
      console.log(data);
      setSliders(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSliders();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
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
        await axiosInstance.delete("/ads/" + id);
        refetch();
        toast.success("Deleted Successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedArticles = Array.from(sliders);
    const [removed] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, removed);

    setSliders(reorderedArticles);
  };

  const updateSlider = async () => {
    try {
   
        const { data } = await axiosInstance.put("/ads/slider/update", {
          items: sliders,
        });
        toast.success("Updated Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToSlider = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't add this in to slider!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
      });

      if (result.isConfirmed) {
        const { data } = await axiosInstance.post("/ads/slider/add", { id });
        toast.success("Added Successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleRemoveFromSlider = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't remove this from slider!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        const { data } = await axiosInstance.put("/ads/slider/remove/"+id);
        toast.success("Remove Successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            Advertisement
          </h1>
          <p className="text-[#A3A3A3]">
            Manage and view all advertisement below.
          </p>
        </div>

        <div>
          <AddEditAds refetch={refetch} />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 p-4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Active Ads" {...a11yProps(0)} />
            <Tab label="All Ads" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="">
            <div className="flex justify-end mb-5">
              <Button onClick={updateSlider} size="sm" className="ml-auto">
                Save Changes
              </Button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="sliders">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mt-2 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4"
                  >
                    {sliders?.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between gap-2 mb-2 p-2 bg-gray-100 rounded-md"
                          >
                            <div className="aspect-square relative">
                              <Link href={item.link} target="_blanck">
                                <Image
                                  width={293}
                                  height={530}
                                  src={getImageUrl(item.imageUrl)}
                                  className="h-full w-full object-cover rounded-md border shadow-sm"
                                  alt="thumbnail"
                                />
                              </Link>

                              <div
                                onClick={() => {
                                  setSliders((prev) =>
                                    prev.filter((i) => i._id !== item._id)
                                  );
                                }}
                                className="bg-white/30 backdrop-blur-sm cursor-pointer absolute top-2 right-2 w-8 h-8 flex justify-center rounded-full items-center"
                              >
                                {loading ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {data.ads.map((ad) => (
              <div className="aspect-square relative">
                <Link href={ad.link} target="_blanck">
                  <Image
                    width={293}
                    height={530}
                    src={getImageUrl(ad.imageUrl)}
                    className="h-full w-full object-cover rounded-md border shadow-sm"
                    alt="thumbnail"
                  />
                </Link>

                <div className="bg-black/30 backdrop-blur-sm grid grid-cols-3 absolute bottom-0 w-full gap-2  px-4 py-2">
                  <Button
                    disabled={loading}
                    onClick={() => handleDelete(ad._id)}
                    size="sm"
                    variant="destructive"
                  >
                    {loading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash className="w-4 h-4" />
                    )}
                  </Button>
                  <AddEditAds data={ad} refetch={refetch} />

                  <Button
                    onClick={() => handleAddToSlider(ad._id)}
                    size="sm"
                    variant="secondary"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
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
        </CustomTabPanel>
      </div>
    </main>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default Advertisement;
