import {
  Header,
  TitleField,
  BodyField,
  MediaPreview,
  CommunitySelect,
  ComposerToolbar,
  Footer,
} from "./ui";
import { Modal } from "@/shared/ui";
import { useCreatePostController } from "./controller";
export function CreatePostModal({ className }) {
  const controller = useCreatePostController();

  return (
    <Modal onClose={controller?.actions.close} className={className}>
      <Header onClose={controller?.actions.close} />

      <div className="flex flex-col gap-3">
        <TitleField
          value={controller?.state.title}
          onChange={controller?.actions.setTitle}
        />
        <MediaPreview attachments={controller.state.attachments} />
        <BodyField
          value={controller?.state.body}
          onChange={controller?.actions.setBody}
          onSelectAttachments={controller.actions.selectAttachments}
        />
      </div>

      <Footer
        onCancel={controller?.actions.close}
        onPublish={controller?.actions.publish}
        isPublishDisabled={controller?.ui.isSubmitDisabled}
      />
    </Modal>
  );
}
