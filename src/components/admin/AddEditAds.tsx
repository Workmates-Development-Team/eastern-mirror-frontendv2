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
import { Edit, Plus, Upload, X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";

import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddEditAds({
  refetch,
  data,
}: {
  refetch: () => void;
  data?: {
    _id: string;
    link: string;
    imageUrl: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (data) {
      setImagePreview(getImageUrl(data.imageUrl));
    }
  }, [data]);

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    values,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      link: data?.link || "",
      thumbnail: data?.imageUrl || "",
    },
    validationSchema: Yup.object({
      link: Yup.string().required("link is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("link", values.link);
        if (values.thumbnail) {
          formData.append("thumbnail", values.thumbnail);
        }

        if (data?._id) {
          // Update API
          const response = await axiosInstance.put(
            `/ads/update/${data._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success(response?.data?.message || "Ads updated successfully");
        } else {
          // Add API
          const response = await axiosInstance.post("/ads/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success(response?.data?.message || "Ads added successfully");
        }

        resetForm();
        setImagePreview("");
        refetch();
        setOpen(false);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? (
          <Button size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => setOpen(true)}>
            Add Ads
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "Edit Ads" : "Create Ads"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 items-center">
            <Label
              htmlFor="thumbnail"
              className="bg-slate-300/20 p-4 flex justify-center items-center cursor-pointer mb-4 border-dotted border w-full h-[300px] rounded overflow-hidden"
            >
              {imagePreview ? (
                <Image
                  width={293}
                  height={530}
                  className="object-cover h-full w-full"
                  src={imagePreview}
                  alt="profile preview"
                />
              ) : (
                <Upload />
              )}
            </Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setFieldValue("thumbnail", file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="link">Link</Label>
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
                disabled={isSubmitting}
                type="button"
                onClick={handleCancel}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit" size="sm">
                {isSubmitting
                  ? data
                    ? "Updating..."
                    : "Submitting..."
                  : data
                  ? "Update"
                  : "Submit"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
