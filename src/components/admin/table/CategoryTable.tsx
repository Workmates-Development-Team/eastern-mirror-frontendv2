"use client";

import * as React from "react";
import { Loader, Trash } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@mui/material";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import EditCategory from "../EditCategory";
import { useRecoilValue } from "recoil";
import { useAuthContext } from "@/context/AuthContext";
interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface CategoryTableProps {
  totalPage: number;
  categories: Category[];
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  setPage?: (term: number) => void;
  page: number;
  handlePageChange: (_: unknown, newPage: number) => void;
  refetch: () => void;
}

export default function CategoryTable({
  totalPage,
  categories,
  searchTerm,
  setSearchTerm,
  page,
  handlePageChange,
  setPage,
  refetch,
}: CategoryTableProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPage?.(1);
    setSearchTerm?.(value);
  };
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
        await axiosInstance.delete("/category/delete/" + id);
        refetch();
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
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="flex items-center py-4">
          <Input
            placeholder="Search category names..."
            className="max-w-sm"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Parent Category</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length ? (
                categories?.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <div>{row?.name}</div>
                    </TableCell>

                    <TableCell>
                      <div>{row?.parent?.name || "---"}</div>
                    </TableCell>

                    <TableCell>
                      {user?.userType === "admin" ||
                      user?.userType === "editor" ? (
                        <Button
                          disabled={loading}
                          variant="destructive"
                          className="mr-3"
                          size="icon"
                          onClick={() => handleDelete(row?._id)}
                        >
                          {loading ? (
                            <Loader className="animate-spin w-4 h-4" />
                          ) : (
                            <Trash className="w-4 h-4" />
                          )}
                        </Button>
                      ) : null}

                      <EditCategory refetch={refetch} category={row} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Pagination
          count={totalPage}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}
