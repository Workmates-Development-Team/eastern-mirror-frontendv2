"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { getImageUrl } from "@/utils/getImageUrl";
import Gallery from "./Gallery";

export default function AddVideo({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState("");

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      link: "",
    },
    validationSchema: Yup.object({
      thumbnail: Yup.string().required("Thumbnail URL is required"),
      link: Yup.string()
        .required("Video link is required")
        .url("Must be a valid URL"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post("/video/add", values);

        toast.success(data?.message);
        resetForm();
        refetch();
        handleClear()
        setOpen(false);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something Went Wrong");
      }
    },
  });


  useEffect(() => {
    if (thumbnail) {
      setFieldValue("thumbnail", thumbnail);
    }
  }, [thumbnail]);
  const handleClear = () => {
    setThumbnail("");
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
          <DialogDescription>
            Provide a thumbnail URL and a video link to add a new video.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div
            className={`flex justify-center bg-[#F6F7F9] p-3 rounded-md mb-6 h-[250px] border border-dashed border-blue-600`}
          >
            {thumbnail ? (
              <div className="relative w-full">
                <img
                  src={getImageUrl(thumbnail)}
                  alt="Selected file"
                  className="h-full w-full object-cover rounded-md"
                />

                <Button
                  onClick={handleClear}
                  className="absolute rounded-full top-2 right-2 bg-transparent text-white"
                  size="icon"
                  variant="outline"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Gallery thumbnail={thumbnail} setThumbnail={setThumbnail} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="link">Video Link</Label>
            <Input
              id="link"
              {...getFieldProps("link")}
              className={`col-span-3 ${
                touched.link && errors.link ? "border-red-500" : ""
              }`}
            />
            {touched.link && errors.link && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.link}
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleCancel}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
