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
import { Edit, Plus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import SelexBox from "./SelectBox";

export default function EditCategory({
  refetch,
  category,
}: {
  refetch: () => void;
  category: {
    name: string;
    _id: string;
    parent: string;
  };
}) {
  const [open, setOpen] = useState(false);

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: category?.name || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Category name is required")
        .min(2, "Must be at least 2 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.put(
          "/category/update/" + category?._id,
          values
        );

        toast.success(data?.message);
        resetForm();
        refetch();
        setOpen(false);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something Went Wrong");
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
        <Button size="icon" onClick={() => setOpen(true)}>
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit this category</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...getFieldProps("name")}
              className={`col-span-3 ${
                touched.name && errors.name ? "border-red-500" : ""
              }`}
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.name}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="mb-1" htmlFor="parent">
              Parent Category
            </Label>
            <SelexBox
              data={category}
              onChange={(value: string) => setFieldValue("parent", value)}
            />
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
                Update
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
