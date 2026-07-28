import React from "react";
import { Modal } from "@/shared/ui";
import { useCreateCommunityController } from "./controller";
import { Header, NameField, DescriptionField, Footer } from "./ui";

export function CreateCommunityModal({ className }) {
  const controller = useCreateCommunityController();

  return (
    <Modal onClose={controller?.actions.close} className={className}>
      {/* Modal Header */}
      <Header onClose={controller?.actions.close} />

      {/* Modal Form Inputs Container */}
      <form
        onSubmit={controller?.actions.submit}
        className="flex flex-col gap-4 p-4"
      >
        <NameField
          register={controller?.form.register}
          error={controller?.form.formState.errors.name}
        />

        <DescriptionField
          register={controller?.form.register}
          error={controller?.form.formState.errors.description}
        />

        {/* Modal Actions Footer */}
        <Footer
          onCancel={controller?.actions.close}
          isSubmitDisabled={controller?.ui.isSubmitDisabled}
          isPending={controller?.ui.isPending}
        />
      </form>
    </Modal>
  );
}
