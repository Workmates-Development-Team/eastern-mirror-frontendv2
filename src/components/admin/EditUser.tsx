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
import { Edit, Loader } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

export default function EditUser({
  refetch,
  user,
}: {
  refetch: () => void;
  user: UserInterface;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userType: user?.userType || "",
    },
    enableReinitialize: true, // This ensures form re-initializes on `user` prop change
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(2, "Must be at least 2 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Must be at least 2 characters"),

      userType: Yup.string().required("User type is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.put(`/user/${user._id}`, values); // Updated to a PUT request for editing
        toast.success(data?.message);
        resetForm();
        setOpen(false);
        refetch();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) resetForm(); // Reset form when opening
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon" onClick={() => setOpen(true)}>
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...getFieldProps("firstName")}
                className={`col-span-3 ${
                  touched.firstName && errors.firstName ? "border-red-500" : ""
                }`}
              />
              {touched.firstName && errors.firstName && (
                <div className="text-red-500 text-sm italic col-span-4">
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...getFieldProps("lastName")}
                className={`col-span-3 ${
                  touched.lastName && errors.lastName ? "border-red-500" : ""
                }`}
              />
              {touched.lastName && errors.lastName && (
                <div className="text-red-500 text-sm italic col-span-4">
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="userType">User Type</Label>
            <Select
              onValueChange={(value) => setFieldValue("userType", value)}
              value={getFieldProps("userType").value} // Shows current userType
            >
              <SelectTrigger id="userType">
                <SelectValue placeholder="Select a user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="publisher">Publisher</SelectItem>
              </SelectContent>
            </Select>
            {touched.userType && errors.userType && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.userType}
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
              <Button disabled={loading} type="submit" size="sm">
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2" /> Updating
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
