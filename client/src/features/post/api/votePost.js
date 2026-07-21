import api from "@/shared/integrations/api";
export async function votePost(postId, type) {
  const { data } = await api.post(`/posts/${postId}/vote`, {
    userId: "6a53b15cb906a893b96d2a47",
    type,
  });
  return data;
}
