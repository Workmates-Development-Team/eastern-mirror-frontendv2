"use client";

import ChangePassword from "@/components/admin/ChangePassword";
import CreateUser from "@/components/admin/CreateUser";
import EditUser from "@/components/admin/EditUser";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  phoneNumber: string;
}

export default function UserPage() {
  const {user} = useAuthContext()
  const router = useRouter();
  const getUsers = async (): Promise<UserInterface[]> => {
    const { data } = await axiosInstance.get("/user/all");
    return data;
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 300000,
  });

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (user.userType !== "admin" && user.userType !== "editor") {
      router.push("/em-admin/dashboard");
    }
  }, [user.userType, router]);

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (isConfirmed) {
      try {
        await axiosInstance.delete("/user/" + id);
        refetch();
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All User
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all user.</p>
        </div>

        <div>
          <CreateUser refetch={refetch} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">First Name</TableHead>
            <TableHead className="min-w-[150px]">Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item) => (
            <TableRow key={String(item._id)}>
              <TableCell className="font-medium capitalize">
                {item.firstName}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {item.lastName}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell className="capitalize">{item.userType}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                {user.userType === "admin" ||
                (user.userType === "editor" ||
                  user.userType === "publisher") ? (
                  <ChangePassword refetch={refetch} id={item._id} />
                ) : null}

                {user.userType === "admin" ? (
                  <>
                    <EditUser user={item} refetch={refetch} />

                    <Button
                      onClick={() => handleDelete(item._id)}
                      size="icon"
                      variant="destructive"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
