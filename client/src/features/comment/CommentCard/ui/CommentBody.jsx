import React from "react";

export function CommentBody({ body }) {
  return (
    <p className="whitespace-pre-line text-sm leading-relaxed text-content-secondary">
      {body}
    </p>
  );
}
