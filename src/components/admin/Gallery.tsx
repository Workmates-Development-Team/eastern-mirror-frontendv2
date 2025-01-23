"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axios";
import { getImageUrl } from "@/utils/getImageUrl";
import { useQuery } from "@tanstack/react-query";
import { CloudUploadIcon, Edit, Trash, Upload } from "lucide-react";
import {
  Button as MUIButton,
  Pagination,
  styled,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRecoilValue } from "recoil";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import ImageSkeleton from "../ImageSkeleton";
import { useAuthContext } from "@/context/AuthContext";

interface ArticleInterface {
  _id: string;
  url: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GalleryResponse {
  images: ArticleInterface[];
  totalPages: number;
  currentPage: number;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Gallery = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: string;
  setThumbnail: (value: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {user} = useAuthContext()
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newCaption, setNewCaption] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);

  const getGallery = async (page: number): Promise<GalleryResponse> => {
    const { data } = await axiosInstance.get(
      `/gallery?page=${page}&limit=10&search=${searchQuery}`
    );
    return data;
  };

  const {
    data: gallery = {
      totalPages: 1,
      currentPage: 1,
      images: [],
    },
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<GalleryResponse>({
    queryKey: ["gallery", currentPage, searchQuery],
    queryFn: () => getGallery(currentPage),
    staleTime: 300000,
  });

  const uploadImage = async (formData: FormData) => {
    try {
      await axiosInstance.post("/gallery/upload", formData);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadClick = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("thumbnail", file);
    formData.append("name", file.name.split(".").slice(0, -1).join("."));
    formData.append("caption", caption);

    await uploadImage(formData);
    refetch();
    setFile(null);
    setUploading(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    refetch();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    refetch();
  };

  const handleImageClick = (imageUrl: string) => {
    setThumbnail(imageUrl);
    setIsDialogOpen(false);
  };

  const handleEditCaption = async () => {
    if (!editingCaptionId || !newCaption) return;

    try {
      await axiosInstance.patch(`/gallery/${editingCaptionId}/caption`, {
        caption: newCaption,
      });
      toast.success("Caption updated successfully!");
      refetch();
    } catch (error) {
      console.error("Error updating caption", error);
      toast.error("Failed to update caption");
    } finally {
      setEditingCaptionId(null);
      setNewCaption("");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this image? This action cannot be undone."
      );

      if (isConfirmed) {
        await axiosInstance.delete(`/gallery/${id}`);
        toast.success("Deleted Successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting image", error);
      toast.error("Failed to delete image");
    }
  };

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(true)}>
        <div className="h-full cursor-pointer flex flex-col items-center pb-10">
          <img
            className="h-[80%]"
            src="/svg/svgviewer-output.svg"
            alt="Upload Icon"
          />
          <h3 className="text-center font-medium text-[#1C252E] text-xl">
            Select file
          </h3>
          <div className="flex gap-1 mt-3">
            <p className="text-center text-sm text-[#637381]">
              Select files here or click to upload
            </p>
            <span className="text-center text-sm text-[#00A76F] font-medium underline">
              browse
            </span>
            <p className="text-center text-sm text-[#637381]">
              through your machine.
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <MUIButton
                  style={{ minWidth: 200 }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {file ? file?.name : "Upload image"}

                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </MUIButton>

                {file ? (
                  <>
                    <Input
                      placeholder="Write caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <Button onClick={handleUploadClick} disabled={uploading}>
                      {uploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  </>
                ) : null}
              </div>

              <TextField
                placeholder="Search by name"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="bg-white shadow-sm rounded-xl flex-1 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {isLoading ? (
                  Array.from({ length: 10 })?.map((_, i) => (
                    <div key={i} className="aspect-square">
                      <ImageSkeleton />
                    </div>
                  ))
                ) : gallery?.images?.length > 0 ? (
                  gallery.images.map((image) => (
                    <div
                      key={image._id}
                      className="relative bg-gray-100 aspect-square rounded-lg overflow-hidden shadow flex flex-col items-center"
                    >
                      <div className="absolute z-10 top-0 w-full flex justify-between p-2">
                        {user?.userType === "admin" ||
                        user?.userType === "editor" ? (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(image._id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        ) : null}

                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingCaptionId(image._id);
                            setNewCaption(image.caption);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>

                      <img
                        onClick={() => handleImageClick(image.url)}
                        src={getImageUrl(image?.url)}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />
                      <div className="min-h-8">
                        <p className="text-sm mt-2 truncate">{image.caption}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No images found</div>
                )}
              </div>

              <div className="flex justify-center mt-8">
                <Pagination
                  count={gallery.totalPages}
                  page={gallery.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            </div>

            {editingCaptionId && (
              <div className="absolute inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md min-w-[350px]">
                  <h2 className="mb-5 text-2xl">Edit Caption</h2>
                  <TextField
                    fullWidth
                    placeholder="Edit Caption"
                    size="small"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                  />
                  <div className="flex gap-2 mt-4 justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setEditingCaptionId(null)}
                    >
                      Cancel
                    </Button>

                    <Button onClick={handleEditCaption}>Save</Button>
                  </div>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Gallery;
