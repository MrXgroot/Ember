import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import PageLayout from "@/app/layouts/page/PageLayout";
import { useCreatePost } from "@/features/post/hooks";
import { useCommunities } from "@/features/community/hooks";
import { useAuth, useAuthGuard } from "@/app/auth";
import { ImageCropperModal } from "@/features/cropper/ImageCropperModal";
import { uploadImage } from "@/shared/integrations/cloudinary";
import {
  CreatePostHeader,
  CommunitySelector,
  PostInputs,
  MediaUploadArea,
  CreatePostActions,
} from "./ui";

export function CreatePostPage() {
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

  // Cropper Modal State
  const [rawSelectedFile, setRawSelectedFile] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // Fetch joined communities
  const { data: communities = [] } = useCommunities(
    { filters: { member: user?._id } },
    { enabled: !!user?._id },
  );

  // Object URL lifecycle cleanup
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

  const isSubmitting = isUploadingImage || createPost.isPending;

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

  return (
    <PageLayout>
      <div className="max-w-2xl w-full mx-auto py-8 px-4 sm:px-6 flex flex-col gap-6">
        <CreatePostHeader />

        {formError && (
          <div className="flex items-center gap-2.5 p-3 rounded-app-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handlePublish} className="flex flex-col gap-5">
          <fieldset disabled={isSubmitting} className="contents">
            <CommunitySelector
              value={communityId}
              onChange={setCommunityId}
              communities={communities}
            />

            <PostInputs
              title={title}
              onTitleChange={setTitle}
              description={description}
              onDescriptionChange={setDescription}
            />

            <MediaUploadArea
              previewUrl={previewUrl}
              onFileSelect={handleFileSelect}
              isUploading={isUploadingImage}
              onReCrop={() => {
                setRawSelectedFile(croppedImageFile);
                setIsCropperOpen(true);
              }}
              onRemove={() => {
                setCroppedImageFile(null);
                setRawSelectedFile(null);
              }}
            />

            <CreatePostActions
              onCancel={() => navigate(-1)}
              isPending={isSubmitting}
              statusText={uploadStatus}
              disabled={!title.trim()}
            />
          </fieldset>
        </form>

        {isCropperOpen && rawSelectedFile && (
          <ImageCropperModal
            imageFile={rawSelectedFile}
            onComplete={handleCropComplete}
            onCancel={() => {
              setIsCropperOpen(false);
              setRawSelectedFile(null);
            }}
          />
        )}
      </div>
    </PageLayout>
  );
}
