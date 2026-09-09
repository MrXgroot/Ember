import React from "react";
import { getConvertedWebpUrl } from "../utils/getConvertedWebpUrl";

export function PostMedia({ url, title }) {
  if (!url) return null;

  return (
    <div className="mt-1 rounded-app-md overflow-hidden border border-app-border/70 bg-black/40 max-h-[500px] flex items-center justify-center">
      <img
        src={getConvertedWebpUrl(url)}
        alt={title || "Post media"}
        loading="lazy"
        className="w-full h-auto max-h-[500px] object-contain cursor-pointer hover:scale-[1.01] transition-transform duration-200"
      />
    </div>
  );
}
