import { CreatePostModal } from "@/features/post/CreatePost/CreatePostModal";
import { CreateAuthModal } from "@/features/auth/CreateAuthModal/CreateAuthModal";
import { CreateCommunityModal } from "@/features/community/CreateCommunity/CreateCommunityModal";
export const registry = {
  auth: CreateAuthModal,
  createPost: CreatePostModal,
  createCommunity: CreateCommunityModal,
};
