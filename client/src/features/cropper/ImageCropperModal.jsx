import React, { useState, useCallback, useMemo } from "react";
import Cropper from "react-easy-crop";
import {
  ZoomIn,
  ZoomOut,
  Check,
  X,
  Crop as CropIcon,
  RotateCcw,
} from "lucide-react";
import { getCroppedImg } from "./cropUtils";
import { cn } from "@/shared/integrations/cn";

const ASPECT_RATIOS = [
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 / 1 },
  { label: "Free", value: undefined },
];

export function ImageCropperModal({ imageFile, onComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Safely create and cleanup object URL
  const imageSrc = useMemo(() => {
    if (!imageFile) return null;
    return typeof imageFile === "string"
      ? imageFile
      : URL.createObjectURL(imageFile);
  }, [imageFile]);

  const onCropChange = (newCrop) => setCrop(newCrop);
  const onZoomChange = (newZoom) => setZoom(newZoom);

  const onCropCompleteHandler = useCallback((_, pixelCrop) => {
    setCroppedAreaPixels(pixelCrop);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels || isProcessing) return;

    try {
      setIsProcessing(true);
      const originalName = imageFile?.name
        ? `cropped-${imageFile.name}`
        : "cropped.jpg";
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        originalName,
      );
      onComplete(croppedFile);
    } catch (err) {
      console.error("Failed to crop image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-2xl bg-app-surface border border-app-border rounded-app-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-app-border">
          <div className="flex items-center gap-2">
            <CropIcon className="w-4 h-4 text-brand-primary" />
            <h2 className="text-sm font-semibold text-content-primary">
              Crop Image
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-content-muted hover:text-content-primary transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Work Area */}
        <div className="relative w-full h-80 sm:h-96 bg-black/90 select-none">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
            classes={{
              containerClassName: "w-full h-full",
              cropAreaClassName:
                "border-2 border-brand-primary rounded-app-sm shadow-outline",
            }}
          />
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-col gap-4 p-4 bg-app-bg border-t border-app-border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Aspect Ratio Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-content-muted mr-1">Aspect:</span>
              {ASPECT_RATIOS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setAspect(item.value)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-app-sm border transition-all",
                    aspect === item.value
                      ? "bg-brand-light border-brand-primary text-brand-hover font-semibold"
                      : "bg-app-surface border-app-border text-content-secondary hover:text-content-primary",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Zoom Slider */}
            <div className="flex items-center gap-2">
              <ZoomOut className="w-3.5 h-3.5 text-content-muted" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-24 sm:w-32 h-1 bg-app-surface border border-app-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <ZoomIn className="w-3.5 h-3.5 text-content-muted" />
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                }}
                title="Reset Zoom"
                className="p-1 text-content-muted hover:text-content-primary transition-colors ml-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-app-border/40">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-app-md text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-app-surface transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-app-md bg-brand-primary text-app-bg text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isProcessing ? "Applying..." : "Apply Crop"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
