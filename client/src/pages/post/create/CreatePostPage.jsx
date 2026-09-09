import { AlertCircle } from "lucide-react";

import PageLayout from "@/app/layouts/page/PageLayout";
import { ImageCropperModal } from "@/features/cropper/ImageCropperModal";

import {
  CreatePostHeader,
  CommunitySelector,
  PostInputs,
  MediaUploadArea,
  CreatePostActions,
} from "./ui";

import { useCreatePostPageController } from "./controller";

export function CreatePostPage() {
  const {
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
    actions,
  } = useCreatePostPageController();

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

        <form onSubmit={actions.handlePublish} className="flex flex-col gap-5">
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
              onFileSelect={actions.handleFileSelect}
              isUploading={isUploadingImage}
              onReCrop={actions.handleReCrop}
              onRemove={actions.handleRemoveImage}
            />

            <CreatePostActions
              onCancel={actions.handleCancel}
              isPending={isSubmitting}
              statusText={uploadStatus}
              disabled={!title.trim()}
            />
          </fieldset>
        </form>

        {isCropperOpen && rawSelectedFile && (
          <ImageCropperModal
            imageFile={rawSelectedFile}
            onComplete={actions.handleCropComplete}
            onCancel={actions.handleCancelCrop}
          />
        )}
      </div>
    </PageLayout>
  );
}
