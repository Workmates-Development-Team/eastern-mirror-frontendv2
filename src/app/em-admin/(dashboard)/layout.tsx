"use client";

import AdminNavbar from "@/components/admin/Navbar";
import AdminSidebar from "@/components/admin/Sidebar";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import { AuthorProvider } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticate, isLoading } = useAuthContext()
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticate && !isLoading) {
      router.push(`/em-admin/login?redirectTo=${encodeURIComponent(pathname)}`)
    }
  }, [isAuthenticate, isLoading, pathname])

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  }

  if (!isAuthenticate) {
    return <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  }



  return (
    <AuthorProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminNavbar />
          {children}
        </div>
      </div>
    </AuthorProvider>
  );
}
