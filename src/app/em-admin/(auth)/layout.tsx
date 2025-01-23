"use client";

import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticate, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  useEffect(() => {
    if (isAuthenticate && !isLoading) {
      router.push(redirectTo || "/em-admin/dashboard");
    }
  }, [isAuthenticate, isLoading, redirectTo]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isAuthenticate) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return <div>{children}</div>;
}
