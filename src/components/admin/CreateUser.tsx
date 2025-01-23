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
import { Loader, Plus } from "lucide-react";
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

export default function CreateUser({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);
  const [laoding, setLoading] = useState(false);

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      userType: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(2, "Must be at least 2 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Must be at least 2 characters"),
      phoneNumber: Yup.string().required("Phone number is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format")
        .min(2, "Must be at least 2 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(2, "Must be at least 2 characters"),
      userType: Yup.string().required("User type is required"), // Validation for userType
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.post("/user/create", values);
        toast.success(data?.message);
        resetForm();
        setOpen(false);
        refetch();
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something Went Wrong");
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create a new user by providing the information below.
          </DialogDescription>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...getFieldProps("email")}
              className={`col-span-3 ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.email}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              {...getFieldProps("phoneNumber")}
              className={`col-span-3 ${
                touched.phoneNumber && errors.phoneNumber
                  ? "border-red-500"
                  : ""
              }`}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...getFieldProps("password")}
              className={`col-span-3 ${
                touched.password && errors.password ? "border-red-500" : ""
              }`}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.password}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="userType">User Type</Label>
            <Select
              onValueChange={(value) => setFieldValue("userType", value)} // Set Formik value on change
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
              <Button disabled={laoding} type="submit" size="sm">
                {laoding ? (
                  <>
                    <Loader className="w-4 h-4 mr-2" /> Creating
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
