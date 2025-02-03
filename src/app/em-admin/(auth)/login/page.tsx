"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {setIsAuthenticate, setUser, getProfile} = useAuthContext()

    // Formik for login form validation
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is Required"),
            password: Yup.string().required("Password is Required"),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);

                const response = await axiosInstance.post("/user/login", values);
                // const { phoneNumber, message } = response.data;
                const { token, admin } = response.data;

                setUser(admin)
                setIsAuthenticate(true)
                getProfile()

                sessionStorage.setItem("token", response.data.token);
                setLoading(false);
            } catch (error) {
                setError("Login failed: Invalid credentials");
                setLoading(false);
            }
        },
    });

    return (
        <div className="bg-[#F0F0F1]">
            <div className="flex flex-col h-screen justify-center container px-4 md:px-6 gap-4">
                <div className="flex justify-center mb-4">
                    <Image width={250} height={100} src="/images/logo.webp" alt="logo" />
                </div>

                <Card className="mx-auto w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        className={
                                            formik.touched.email && formik.errors.email
                                                ? "border-red-600"
                                                : ""
                                        }
                                        id="email"
                                        type="email"
                                        {...formik.getFieldProps("email")}
                                        placeholder="m@example.com"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-600 text-sm">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600 underline"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    <Input
                                        id="password"
                                        className={
                                            formik.touched.password && formik.errors.password
                                                ? "border-red-600"
                                                : ""
                                        }
                                        placeholder="********"
                                        type={showPassword ? "text" : "password"}
                                        {...formik.getFieldProps("password")}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-600 text-sm">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}
                                </div>

                                {error && (
                                    <div className="text-red-600 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <Button disabled={loading} type="submit" className="w-full">
                                    {loading ? (
                                        <span>
                                            <Loader2 className="animate-spin w-4 h-4 mr-2" />{" "}
                                        </span>
                                    ) : (
                                        ""
                                    )}{" "}
                                    Login
                                </Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
