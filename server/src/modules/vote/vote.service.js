// modules/vote/vote.service.js

import voteRepository from "./vote.repository.js";
import postRepository from "../post/post.repository.js";

export async function votePost({ userId, postId, type }) {
  const value = {
    upvote: 1,
    downvote: -1,
  }[type];

  if (!value) {
    throw new Error("Invalid vote type");
  }

  const existingVote = await voteRepository.findOne({
    user: userId,
    post: postId,
  });

  // First vote
  if (!existingVote) {
    await voteRepository.create({
      user: userId,
      post: postId,
      value,
    });

    await postRepository.incrementScore(postId, value);

    return;
  }

  // Same vote → remove vote
  if (existingVote.value === value) {
    await voteRepository.deleteById(existingVote._id);

    await postRepository.incrementScore(postId, -value);

    return;
  }

  // Opposite vote → switch vote
  await voteRepository.updateById(existingVote._id, {
    value,
  });

  await postRepository.incrementScore(postId, value * 2);
}

export async function getUserVote({ userId, postId }) {
  const vote = await voteRepository.findOne({
    user: userId,
    post: postId,
  });

  return vote?.value ?? null;
}
