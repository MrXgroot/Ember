import { useCreateAuthModalController } from "./controller";
import { Modal } from "@/shared/ui";
import { Header, GoogleButton, Footer } from "./ui";

export function CreateAuthModal({ className }) {
  const controller = useCreateAuthModalController();

  const { actions, ui } = controller;

  return (
    <Modal onClose={actions.close} className={className}>
      <Header onClose={actions.close} />

      <GoogleButton
        onSuccess={actions.continueWithGoogle}
        isPending={ui.isPending}
      />

      <Footer />
    </Modal>
  );
}
