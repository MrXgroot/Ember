export function MediaPreview({ attachments = [] }) {
  if (!attachments.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex h-72 items-center justify-center overflow-hidden rounded-xl border border-app-border bg-app-surface"
        >
          <img
            src={attachment.preview}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
