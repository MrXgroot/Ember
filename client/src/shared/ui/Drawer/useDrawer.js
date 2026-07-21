import { useDrawerStore } from "./useDrawerStore";

export function useDrawer() {
  const isOpen = useDrawerStore((state) => state.isOpen);

  const open = useDrawerStore((state) => state.open);

  const close = useDrawerStore((state) => state.close);

  const toggle = useDrawerStore((state) => state.toggle);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
