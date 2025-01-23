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
import { Edit, Plus, X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddEditEvent({
  refetch,
  data,
}: {
  refetch: () => void;
  data?: {
    _id: string;
    title: string;
    status: string;
    articles: {
      title: string;
      _id: string;
      thumbnail: string;
      slug: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [articles, setArticles] = useState<string[]>(
    data?.articles?.map((item) => item._id) || []
  );
  const [id, setId] = useState("");

  const {
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    touched,
    values,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || "",
      status: data?.status || "ongoing",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values) => {
      if (!articles.length) {
        toast.error("Please add at least one article ID.");
        return;
      }

      const slug = slugify(values.title);

      try {
        const payload = {
          ...values,
          articles,
          slug,
        };

        if (data?._id) {
          await axiosInstance.put(`/event/${data._id}`, payload);
          toast.success("Event updated successfully!");
        } else {
          await axiosInstance.post("/event", payload);
          toast.success("Event created successfully!");
        }

        resetForm();
        setArticles([]);
        refetch();
        setOpen(false);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const handleCancel = () => {
    resetForm();
    setArticles(data?.articles?.map((item) => item._id) || []);
    setOpen(false);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedArticles = Array.from(articles);
    const [removed] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, removed);

    setArticles(reorderedArticles);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? (
          <Button size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => setOpen(true)}>
            Create Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...getFieldProps("title")}
              className={`col-span-3 ${
                touched.title && errors.title ? "border-red-500" : ""
              }`}
            />
            {touched.title && errors.title && (
              <div className="text-red-500 text-sm italic col-span-4">
                {errors.title}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => setFieldValue("status", value)}
              defaultValue={values.status || "ongoing"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="article-id">Article ID</Label>
            <div className="mt-1 flex gap-2">
              <Input
                id="article-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (!id.trim()) {
                    toast.error("Article ID cannot be empty");
                    return;
                  }
                  setArticles((prev) => [...prev, id.trim()]);
                  setId("");
                }}
                type="button"
                size="icon"
                variant="outline"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {articles?.length ? (
            <div>
              <Label htmlFor="articles">Articles</Label>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="articles">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="mt-2"
                    >
                      {articles.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between gap-2 mb-2 p-2 bg-gray-100 rounded-md"
                            >
                              <p>{item}</p>
                              <Button
                                onClick={() => {
                                  setArticles((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                                type="button"
                                size="icon"
                                variant="destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          ) : null}

          <DialogFooter>
            <div className="flex gap-4">
              <Button
                disabled={isSubmitting}
                type="button"
                onClick={handleCancel}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit" size="sm">
                {isSubmitting
                  ? data
                    ? "Updating..."
                    : "Submitting..."
                  : data
                  ? "Update"
                  : "Submit"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
