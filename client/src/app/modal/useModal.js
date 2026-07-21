// app/modal/useModal.js

import { useModalStore } from "./store";

export function useModal() {
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);
  const current = useModalStore((state) => state.current);

  return {
    open,
    close,
    current,
  };
}
