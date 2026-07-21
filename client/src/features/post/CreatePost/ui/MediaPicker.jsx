import { cloneElement, useRef } from "react";

export function MediaPicker({
  children,
  onSelect,
  accept = "image/*,.gif",
  multiple = true,
}) {
  const inputRef = useRef(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleChange(event) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    onSelect?.(files);

    event.target.value = "";
  }

  return (
    <>
      {cloneElement(children, {
        onClick: openPicker,
      })}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
    </>
  );
}
