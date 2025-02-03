"use client";

import * as React from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Swal from "sweetalert2";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import AddAuthors from "../AddAuthors";
import { useAuthContext } from "@/context/AuthContext";
import { useAuthorContext } from "@/context/AppContext";

export type Category = {
  id: string;
  name: string;
  parentCategory: string;
  status: boolean;
};

export default function AuthorTable() {
  const {authors, getAuthors} = useAuthorContext()
  const {user} = useAuthContext()
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setLoading(true);
        await axiosInstance.delete("/author/soft-delete/" + id);
        getAuthors();
        toast.success("Deleted Successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Authors</h2>

        
    
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                {user?.userType === "admin" ? (
                  <TableHead>Action</TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors?.length ? (
                authors.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <div>
                          <Avatar>
                            <AvatarImage
                              src={
                                row?.avatar
                                  ? process.env.NEXT_PUBLIC_API_BASE_URL +
                                    row.avatar
                                  : "/images/noprofile.png"
                              }
                            />
                            <AvatarFallback>
                              {row?.name?.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="text-base font-medium">{row?.name}</p>
                          <p className="text-gray-400 text-sm ">{row?.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>{row?.username}</div>
                    </TableCell>
                    {user.userType === "admin" ? (
                      <TableCell>
                        <Button
                          onClick={() => handleDelete(row._id)}
                          size="icon"
                          className="mr-4"
                          variant="destructive"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                        <AddAuthors
                          data={row}
                        />
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={0} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
