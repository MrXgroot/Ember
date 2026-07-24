import { useForm } from "react-hook-form";

import { useModal } from "@/app/modal";
import { useCreateCommunity } from "../../hooks/useCreateCommunity";

export function useCreateCommunityController() {
  const modal = useModal();
  const mutation = useCreateCommunity();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = form;

  function close() {
    reset();
    modal.close();
  }

  async function submit(values) {
    try {
      await mutation.mutateAsync({
        communityData: values,
      });

      reset();
      modal.close();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    form,

    state: {
      values: watch(),
    },

    ui: {
      isPending: mutation.isPending,
      isSubmitDisabled: !isValid || mutation.isPending,
    },

    actions: {
      close,
      submit: handleSubmit(submit),
    },
  };
}
