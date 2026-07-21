import { useState } from "react";

import { useModal } from "@/app/modal";
import { useCreatePost } from "../../hooks/useCreatePost";
import { uploadImage } from "@/shared/integrations/cloudinary";

export function useCreatePostController() {
  const modal = useModal();
  const mutation = useCreatePost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]);

  function close() {
    attachments.forEach((attachment) => {
      URL.revokeObjectURL(attachment.preview);
    });

    setAttachments([]);

    modal.close();
  }
  function selectAttachments(files) {
    if (!files.length) {
      return;
    }

    attachments.forEach((attachment) => {
      URL.revokeObjectURL(attachment.preview);
    });

    const file = files[0];

    setAttachments([
      {
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        type: "image",
      },
    ]);
  }
  function removeAttachment(id) {
    setAttachments((current) => {
      const attachment = current.find((item) => item.id === id);

      if (attachment) {
        URL.revokeObjectURL(attachment.preview);
      }

      return current.filter((item) => item.id !== id);
    });
  }

  async function publish() {
    try {
      let media = [];

      if (attachments.length) {
        const uploadedMedia = await uploadImage(attachments[0].file);

        media = uploadedMedia;
      }

      await mutation.mutateAsync({
        title,
        description: body,
        media,
      });
      attachments.forEach((attachment) => {
        URL.revokeObjectURL(attachment.preview);
      });

      setTitle("");
      setBody("");
      setAttachments([]);

      close();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    state: {
      title,
      body,
      attachments,
    },

    ui: {
      isPending: mutation.isPending,
      isSubmitDisabled: !title.trim() || mutation.isPending,
    },

    actions: {
      close,
      publish,

      setTitle,
      setBody,

      selectAttachments,
      removeAttachment,
    },
  };
}
