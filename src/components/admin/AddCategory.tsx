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
import { Plus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { SeacrhSelect } from "./SearchSelect";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { Autocomplete, Box, TextField } from "@mui/material";
import SelexBox from "./SelectBox";

type CategoryProps = {
  name: string;
  _id: string;
  avatar?: string;
};

export default function AddCategory({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Category name is required")
        .min(2, "Must be at least 2 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post("/category/add", values);

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

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get(`/category/all/cat`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category by providing a name.
          </DialogDescription>
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
              onChange={(value: string) => setFieldValue("parent", value)}
            />
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
