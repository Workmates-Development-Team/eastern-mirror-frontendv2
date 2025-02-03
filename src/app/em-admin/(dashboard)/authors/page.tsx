"use client";

import AddAuthors from "@/components/admin/AddAuthors";
import AuthorTable from "@/components/admin/table/AuthorTable";
import { useAuthContext } from "@/context/AuthContext";
import { useAuthorContext } from "@/context/AppContext";
import axiosInstance from "@/utils/axios";
import React, { useState } from "react";

export default function Authors() {
  const { user } = useAuthContext();

 

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All Authors
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all authors below.</p>
        </div>

        {user.userType === "admin" ? (
          <div>
            <AddAuthors />
          </div>
        ) : null}
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        <AuthorTable
        />
      </div>
    </main>
  );
}
