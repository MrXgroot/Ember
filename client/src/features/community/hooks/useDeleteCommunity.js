import { useMutation } from "@tanstack/react-query";

import { deleteCommunity } from "../api";

export function useDeleteCommunity() {
  return useMutation({
    mutationFn: deleteCommunity,
  });
}
import { useMutation } from "@tanstack/react-query";

import { deleteCommunity } from "../api";

export function useDeleteCommunity() {
  return useMutation({
    mutationFn: deleteCommunity,
  });
}
