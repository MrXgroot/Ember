import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCreatePost } from "@/features/post/hooks";
import { useCommunities } from "@/features/community/hooks";
import { useAuth, useAuthGuard } from "@/app/auth";
import { uploadImage } from "@/shared/integrations/cloudinary";

export function useCreatePostPageController() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const auth = useAuthGuard();
  const createPost = useCreatePost();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Status & Progress State
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [formError, setFormError] = useState("");

  // Cropper State
  const [rawSelectedFile, setRawSelectedFile] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // Fetch joined communities
  const { data: communities = [] } = useCommunities(
    { filters: { member: user?._id } },
    { enabled: !!user?._id },
  );

  // Object URL lifecycle
  useEffect(() => {
    if (!croppedImageFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(croppedImageFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [croppedImageFile]);

  const handleFileSelect = (file) => {
    setRawSelectedFile(file);
    setIsCropperOpen(true);
  };

  const handleCropComplete = (croppedFile) => {
    setCroppedImageFile(croppedFile);
    setIsCropperOpen(false);
    setRawSelectedFile(null);
  };

  const handleReCrop = () => {
    setRawSelectedFile(croppedImageFile);
    setIsCropperOpen(true);
  };

  const handleRemoveImage = () => {
    setCroppedImageFile(null);
    setRawSelectedFile(null);
  };

  const handleCancelCrop = () => {
    setIsCropperOpen(false);
    setRawSelectedFile(null);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Post title is required.");
      return;
    }

    auth.require(async () => {
      try {
        let media = null;

        if (croppedImageFile) {
          setIsUploadingImage(true);
          setUploadStatus("Uploading image to Cloudinary...");

          media = await uploadImage(croppedImageFile);

          setIsUploadingImage(false);
        }

        setUploadStatus("Publishing your post...");

        createPost.mutate(
          {
            title: title.trim(),
            description: description.trim() || undefined,
            community: communityId || undefined,
            media: media || undefined,
          },
          {
            onSuccess: (newPost) => {
              navigate(newPost?._id ? `/post/${newPost._id}` : "/");
            },
            onError: (error) => {
              setFormError(
                error?.message || "Failed to publish post. Please try again.",
              );
              setUploadStatus("");
            },
          },
        );
      } catch (error) {
        setIsUploadingImage(false);
        setUploadStatus("");
        setFormError(
          error?.message || "Failed to upload image. Please try again.",
        );
      }
    });
  };

  const isSubmitting = isUploadingImage || createPost.isPending;

  return {
    title,
    setTitle,

    description,
    setDescription,

    communityId,
    setCommunityId,

    communities,

    previewUrl,
    isUploadingImage,

    uploadStatus,
    formError,

    isCropperOpen,
    rawSelectedFile,

    isSubmitting,

    actions: {
      handlePublish,
      handleFileSelect,
      handleCropComplete,
      handleReCrop,
      handleRemoveImage,
      handleCancelCrop,
      handleCancel: () => navigate(-1),
    },
  };
}
