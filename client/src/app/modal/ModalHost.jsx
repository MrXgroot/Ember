import { AnimatePresence } from "framer-motion";

import { registry } from "./registry";
import { useModalStore } from "./store/useModalStore";

export function ModalHost() {
  const { modal, props } = useModalStore();

  const Component = modal ? registry[modal] : null;

  return (
    <AnimatePresence mode="wait">
      {Component && <Component key={modal} {...props} />}
    </AnimatePresence>
  );
}
