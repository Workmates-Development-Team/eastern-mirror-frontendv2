"use client";

import { Bell, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ADMIN_SIDEBAR_LINKS } from "@/constant/path";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();
  const { user, setUser, setIsAuthenticate } = useAuthContext()
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticate(false);
    setUser({
      email: '',
      userType: '',
      firstName: '',
      lastName: '',
      isDeleted: false,
      phoneNumber: ''
    });
  };


  const toggleMenu = (menu: any) => {
    setOpenMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  return (
    <div className="hidden border-r bg-white md:block h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/em-admin"
            className="flex items-center gap-2 font-semibold"
          >
            <Image
              width={140}
              height={50}
              className="object-contain"
              src="/images/logo.webp"
              alt="eastern mirror logo"
            />
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 gap-1 text-sm font-medium lg:px-4">
            {ADMIN_SIDEBAR_LINKS.map((link, i) => {
              if (
                link.label === "Users" &&
                !(user.userType === "admin" || user.userType === "editor")
              ) {
                return null;
              }
              if (link.label === "Contact" && user.userType !== "admin") {
                return null;
              }

              return (
                <div key={i}>
                  <Link
                    href={`/em-admin${link.path}`}
                    onClick={() => toggleMenu(link.label)}
                    className={cn(
                      pathname.includes(link.path)
                        ? "text-primary bg-muted"
                        : "text-muted-foreground",
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted w-full"
                    )}
                  >
                    {link.icon()}
                    {link.label}
                    {link?.subLinks && (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    )}
                  </Link>
                  {openMenu === link.label && link.subLinks?.length && (
                    <div className="my-1 w-full bg-muted rounded-lg pl-2">
                      {link?.subLinks?.map((subLink, j) => (
                        <Link
                          key={j}
                          href={subLink.path}
                          className={cn(
                            pathname === subLink.path
                              ? "text-primary"
                              : "text-muted-foreground",
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                          )}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button onClick={handleLogout} size="sm" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
