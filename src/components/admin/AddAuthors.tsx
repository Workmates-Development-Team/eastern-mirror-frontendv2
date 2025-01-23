"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { useAuthorContext } from "@/context/AuthorContext";

type AddAuthorsProps = {
  data?: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
};

export default function AddAuthors({
  data,
}: AddAuthorsProps) {
  const [open, setOpen] = useState(false);
  const {getAuthors} = useAuthorContext()
  const [imagePreview, setImagePreview] = useState(
    getImageUrl(data?.avatar) || "/images/noprofile.png"
  );
  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      avatar: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Author name is required")
        .min(2, "Must be at least 2 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid Email format"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        if (data?._id) {
          // Update API
          const response = await axiosInstance.put(
            `/author/update/${data._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success(response?.data?.message || "Author updated successfully");
        } else {
          // Add API
          const response = await axiosInstance.post("/author/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success(response?.data?.message || "Author added successfully");
        }

        getAuthors();
        resetForm();
        setOpen(false);
        setImagePreview("/images/noprofile.png");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
    setImagePreview("/images/noprofile.png");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? (
          <Button size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add New Author
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "Edit Author" : "Add Author"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 items-center">
            <Label
              htmlFor="avatar"
              className="bg-slate-300 w-28 h-28 rounded-full overflow-hidden"
            >
              <Image
                width={112}
                height={112}
                className="object-cover h-full w-full"
                src={imagePreview}
                alt="profile preview"
              />
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setFieldValue("avatar", file);
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...getFieldProps("name")}
              className={`${
                touched.name && errors.name ? "border-red-500" : ""
              }`}
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm italic">{errors.name}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...getFieldProps("email")}
              className={`${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm italic">{errors.email}</div>
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
                {data ? "Update" : "Add"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
