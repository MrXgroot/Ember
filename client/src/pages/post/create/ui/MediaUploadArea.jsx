import React, { useRef } from "react";
import { ImagePlus, Crop as CropIcon, X, Loader2 } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function MediaUploadArea({
  previewUrl,
  onFileSelect,
  onReCrop,
  onRemove,
  isUploading = false,
  className,
}) {
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handleInputChange}
        disabled={isUploading}
        className="hidden"
      />

      {!previewUrl ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "group flex flex-col items-center justify-center gap-2 p-6 rounded-app-lg",
            "border border-dashed border-app-border hover:border-brand-primary hover:bg-app-surface/40 transition-all cursor-pointer",
            "disabled:opacity-40 disabled:pointer-events-none",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-app-surface border border-app-border flex items-center justify-center text-content-muted group-hover:text-brand-primary transition-colors">
            <ImagePlus className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-semibold text-content-secondary group-hover:text-content-primary transition-colors">
              Add an Image
            </span>
            <span className="text-[11px] text-content-muted">
              PNG, JPG, or WEBP (Crops automatically)
            </span>
          </div>
        </button>
      ) : (
        <div className="relative rounded-app-lg overflow-hidden border border-app-border bg-black/40 group max-h-[450px] flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Post preview"
            className={cn(
              "w-full h-auto max-h-[450px] object-contain transition-opacity",
              isUploading && "opacity-40",
            )}
          />

          {/* Uploading Spinner Overlay */}
          {isUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 backdrop-blur-[2px]">
              <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
              <span className="text-xs font-medium text-white">
                Uploading image...
              </span>
            </div>
          )}

          {/* Media Action Overlay */}
          {!isUploading && (
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={onReCrop}
                title="Re-crop image"
                className="p-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-colors border border-white/10"
              >
                <CropIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onRemove}
                title="Remove image"
                className="p-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-red-500/80 transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
