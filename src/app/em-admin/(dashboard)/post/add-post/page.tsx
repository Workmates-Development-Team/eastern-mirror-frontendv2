"use client";

import React, {
  useState,
  DragEvent,
  ChangeEvent,
  useEffect,
  useRef,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";
import { ArrowUpToLine, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import TextEditor from "@/components/admin/TextEditor";
import Gallery from "@/components/admin/Gallery";
import { getImageUrl } from "@/utils/getImageUrl";
import DatePicker from "react-datepicker";

// Dynamically import ReactQuill with no SSR
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type CategoryOption = {
  name: string;
  _id: string;
  parentCategory?: {
    id: string;
    name: string;
  };
};

type AuthorProps = {
  name: string;
  _id: string;
  avatar?: string;
};

const AddPost = () => {
  const [value, setValue] = useState<string>(
    () => sessionStorage.getItem("postContent") || ""
  );
  const [title, setTitle] = useState(
    () => sessionStorage.getItem("postTitle") || ""
  );
  const [category, setCategory] = useState<CategoryOption[]>([]);
  const [authors, setAuthors] = useState<AuthorProps[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [publishedAt, setpublishedAt] = useState<string>(new Date().toISOString());
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("postTitle", title);
  }, [title]);

  useEffect(() => {
    sessionStorage.setItem("postContent", value);
  }, [value]);

  const getCategories = async () => {
    const { data } = await axiosInstance.get("/category/all/cat");
    return data;
  };

  const { data: categories } = useQuery({
    queryKey: ["categories-all"],
    queryFn: getCategories,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getAuthors = async () => {
    try {
      const { data } = await axiosInstance.get(`/author/all`);
      setAuthors(data?.authors);
    } catch (error) {
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    try {
      
      const slug = slugify(title);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", value);
      formData.append(
        "category",
        JSON.stringify(category?.map((item) => item?._id))
      );
      formData.append("author", selectedAuthor);
      formData.append("tags", JSON.stringify(selectedTags));
      formData.append("slug", slug);

      formData.append("thumbnail", thumbnail);
      formData.append("publishedAt", publishedAt);

      const { data } = await axiosInstance.post("/article/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data?.message);

      handleClearForm();
      router.push("/em-admin/post/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const handleClear = () => {
    setThumbnail("");
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Do you want to save the draft or leave the page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [title, value]);

  const handleClearForm = () => {
    setTitle("");
    setValue("");
    setCategory([]);
    setSelectedTags([]);
    setSelectedAuthor("");
    sessionStorage.removeItem("postTitle");
    sessionStorage.removeItem("postContent");
    sessionStorage.removeItem("postMedia");
  };

  console.log(publishedAt)
  return (
    <div className="p-[50px]">
      <input
        type="text"
        placeholder="Title"
        className={cn(
          "lora-blod text-2xl border-none outline-none bg-transparent w-full pb-10"
        )}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div
        className={`flex justify-center bg-[#F6F7F9] p-3 rounded-md mb-6 min-h-[350px] border border-dashed border-blue-600`}
      >
        {thumbnail ? (
          <div className="relative w-full">
            <img
              src={getImageUrl(thumbnail)}
              alt="Selected file"
              className="h-full w-full object-cover rounded-md"
            />

            <Button
              onClick={handleClear}
              className="absolute rounded-full top-2 right-2 bg-transparent text-white"
              size="icon"
              variant="outline"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Gallery thumbnail={thumbnail} setThumbnail={setThumbnail} />
        )}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="name">Category</Label>
          <Autocomplete
            multiple
            id="tags-filled"
            options={categories?.map((option: any) => option)}
            freeSolo
            value={category}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name || ""
            }
            onChange={(event, newValue) => {
              setCategory(newValue as CategoryOption[]);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={typeof option === "string" ? option : option.name}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select Tags"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2  col-span-2">
          <Label htmlFor="name">Tags</Label>
          <Autocomplete
            multiple
            id="tags-filled"
            options={suggestedTags?.map((option) => option.title)}
            freeSolo
            value={selectedTags}
            onChange={(event, newValue) => {
              setSelectedTags(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select Tags"
              />
            )}
          />
        </div>


        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="author">Author</Label>
          <Autocomplete
            id="author"
            options={authors}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setSelectedAuthor(newValue?._id || "");
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={option._id}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="20"
                    height="20"
                    className="rounded-full aspect-square h-5 w-5"
                    src={
                      option?.avatar
                        ? process.env.NEXT_PUBLIC_API_BASE_URL + option.avatar
                        : "/images/noprofile.png"
                    }
                    alt=""
                  />
                  {option.name}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2  col-span-2">
          <Label htmlFor="name">Publish Date &  Time</Label>
         
          <input
            type="datetime-local"
            id="publishedAt"
            value={publishedAt}
            onChange={(e) => setpublishedAt(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <TextEditor value={value} setValue={setValue} />

      <div className="flex gap-4 mt-4">
        <Button
          disabled={!title || !value}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          Publish
        </Button>
        <Button
          onClick={handleClearForm}
          className="bg-red-600 hover:bg-red-700"
        >
          Clear Form
        </Button>
      </div>
    </div>
  );
};

export default AddPost;

const suggestedTags = [{ title: "Facebook  account" }];
