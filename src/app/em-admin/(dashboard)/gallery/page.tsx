"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axios";
import { getImageUrl } from "@/utils/getImageUrl";
import { useQuery } from "@tanstack/react-query";
import { Trash, Edit } from "lucide-react";
import { useState } from "react";
import {
  Button as MUIButton,
  Pagination,
  styled,
  TextField,
  Modal,
  Box,
} from "@mui/material";
import ImageSkeleton from "@/components/ImageSkeleton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

interface ArticleInterface {
  _id: string;
  url: string;
  name: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
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

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Gallery = () => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [newCaption, setNewCaption] = useState<string>("");
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {user} = useAuthContext()

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) setFile(selectedFile);
  };

  const handleUploadClick = async () => {
    if (!file || !caption) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("thumbnail", file);
    formData.append("name", file.name.split(".").slice(0, -1).join("."));
    formData.append("caption", caption);

    try {
      await axiosInstance.post("/gallery/upload", formData);
      toast.success("Image uploaded successfully!");
      refetch();
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Failed to upload image");
    } finally {
      setFile(null);
      setCaption("");
      setUploading(false);
      setOpenUploadModal(false);
    }
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
        await axiosInstance.delete(`/gallery/${id}`);
        toast.success("Deleted Successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting image", error);
      toast.error("Failed to delete image");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    refetch();
  };

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
          Gallery
        </h1>
        <Button onClick={() => setOpenUploadModal(true)}>Upload Image</Button>
      </div>

      <div>
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
            Array.from({ length: 10 }).map((_, i) => (
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
                  src={getImageUrl(image.url)}
                  alt="Gallery"
                  className="w-full h-4/5 object-cover"
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

      <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Box sx={modalStyle}>
          <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <MUIButton component="label" variant="contained">
            Choose File
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </MUIButton>
          {file && <p className="mt-2">{file.name}</p>}
          <TextField
            fullWidth
            placeholder="Enter caption"
            size="small"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ marginTop: 20 }}
          />
          <div className="flex gap-2 mt-4 justify-between">
            <Button variant="outline" onClick={() => setOpenUploadModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadClick} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </Box>
      </Modal>

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
    </main>
  );
};

export default Gallery;
