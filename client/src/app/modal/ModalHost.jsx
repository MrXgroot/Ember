import { AnimatePresence } from "framer-motion";

import { registry } from "./registry";
import { useModalStore } from "./store/useModalStore";

export function ModalHost() {
  const { modal, props } = useModalStore();
  if (modal && !registry[modal]) {
    throw new Error(
      `[ModalHost] Unknown modal "${modal}". Check registry.js and the place where open("${modal}") is called.`,
    );
  }

  const Component = modal ? registry[modal] : null;

  return (
    <AnimatePresence mode="wait">
      {Component && <Component key={modal} {...props} />}
    </AnimatePresence>
  );
}
