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

export default function ChangePassword({
  refetch,
  id,
}: {
  refetch: () => void;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetForm, errors, getFieldProps, handleSubmit, touched } = useFormik(
    {
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .required("Password is required")
          .min(6, "Must be at least 6 characters"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Passwords must match")
          .required("Confirm password is required"),
      }),
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.put(
            "/user/change-password/" + id,
            {
              newPassword: values.password,
            }
          );

          toast.success(data?.message || "Password changed successfully");
          resetForm();
          setOpen(false);
          refetch();
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something Went Wrong");
        } finally {
          setLoading(false);
        }
      },
    }
  );

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          <Edit className="mr-2 w-4 h-4" /> Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your new password below to change your current password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">New Password</Label>
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

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              {...getFieldProps("confirmPassword")}
              className={`col-span-3 ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.confirmPassword}
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
                    <Loader className="w-4 h-4 mr-2" /> Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
