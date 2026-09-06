import { useInbox } from "./useInbox";

export function useHasInbox() {
  const { data } = useInbox();

  const messages = data?.messages ?? [];

  return messages.length > 0;
}
