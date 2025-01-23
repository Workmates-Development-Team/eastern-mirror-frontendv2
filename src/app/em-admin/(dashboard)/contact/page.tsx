"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";

interface ContactResponse {
  letterToEditor: string;
  adQuery: string;
  ePaperQuery: string;
  customerCare: string;
  officeAddress: string;
  refundsQueries: string;
}

const getContactInfo = async (): Promise<ContactResponse> => {
  const { data } = await axiosInstance.get(`/contact`);
  return data?.contact;
};

const Contact = () => {

  const {user} = useAuthContext()

  const router = useRouter();

  useEffect(() => {
    if (user.userType !== "admin") {
      router.push("/em-admin/dashboard");
    }
  }, [user.userType, router]);

  const {
    data: contact,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ContactResponse>({
    queryKey: ["contact-info"],
    queryFn: () => getContactInfo(),
    staleTime: 300000,
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      letterToEditor: contact?.letterToEditor || "",
      adQuery: contact?.adQuery || "",
      ePaperQuery: contact?.ePaperQuery || "",
      customerCare: contact?.customerCare || "",
      officeAddress: contact?.officeAddress || "",
      refundsQueries: contact?.refundsQueries || "",
    },
    validationSchema: Yup.object({
      letterToEditor: Yup.string().required(
        "Letters to the Editor is required"
      ),
      adQuery: Yup.string().required("Advertisements Queries is required"),
      ePaperQuery: Yup.string().required("e-Paper Queries is required"),
      customerCare: Yup.string().required("Customer care contact is required"),
      officeAddress: Yup.string().required("Office address is required"),
      refundsQueries: Yup.string().required(
        "Refunds/Subscription Queries is required"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post("contact", values);
        toast.success(contact ? "Updated successfully" : "Added successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            Contact Us Settings
          </h1>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 p-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Letters to the Editor</Label>
              <Input
                name="letterToEditor"
                value={formik.values.letterToEditor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.letterToEditor && formik.errors.letterToEditor ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.letterToEditor}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">Advertisements Queries</Label>
              <Input
                name="adQuery"
                value={formik.values.adQuery}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.adQuery && formik.errors.adQuery ? (
                <p className="text-red-500 text-sm">{formik.errors.adQuery}</p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">e-Paper related Queries</Label>
              <Input
                name="ePaperQuery"
                value={formik.values.ePaperQuery}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ePaperQuery && formik.errors.ePaperQuery ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.ePaperQuery}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">Contact us (Customer care)</Label>
              <Input
                name="customerCare"
                value={formik.values.customerCare}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.customerCare && formik.errors.customerCare ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.customerCare}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">Office</Label>
              <Textarea
                name="officeAddress"
                value={formik.values.officeAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.officeAddress && formik.errors.officeAddress ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.officeAddress}
                </p>
              ) : null}
            </div>

            <div>
              <Label className="mb-2">Refunds/Subscription Queries</Label>
              <Input
                name="refundsQueries"
                value={formik.values.refundsQueries}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.refundsQueries && formik.errors.refundsQueries ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.refundsQueries}
                </p>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
