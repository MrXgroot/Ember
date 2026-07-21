import React from "react";

export function PostMedia({ post }) {
  const imageUrl = post?.media?.url ?? null;

  if (!imageUrl) return null;

  return (
    <div className="relative overflow-hidden border border-app-border rounded-app-sm bg-zinc-950 max-h-[700px] w-full flex items-center justify-center mt-2">
      <img
        src={imageUrl}
        alt={post?.title || "Post media"}
        className="w-full h-auto max-h-[400px] object-contain"
        loading="eager"
      />
    </div>
  );
}
