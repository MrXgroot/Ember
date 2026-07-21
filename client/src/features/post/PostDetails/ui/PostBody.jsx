import React from "react";

export function PostBody({ post }) {
  const title = post?.title;
  const content = post?.description || post?.body;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-content-primary leading-tight">
        {title}
      </h1>
      {content && (
        <p className="text-base font-normal text-content-secondary leading-relaxed whitespace-pre-line">
          {content}
        </p>
      )}
    </div>
  );
}
