// modules/post/post.service.js

import postRepository from "./post.repository.js";
import PostQuery from "./post.query.js";

import { getUserVote } from "../vote/vote.service.js";
import { isPostSaved } from "../save/save.service.js";

export const POST_POPULATE = [
  {
    path: "user",
    select: "displayName username avatar",
  },
  {
    path: "community",
    select: "name slug avatar",
  },
];

async function enrichPost(post, userId) {
  const postData = post.toObject();

  if (!userId) {
    return {
      ...postData,
      viewer: {
        vote: null,
        isSaved: false,
      },
    };
  }

  const [vote, isSaved] = await Promise.all([
    getUserVote({
      userId,
      postId: post._id,
    }),

    isPostSaved({
      userId,
      postId: post._id,
    }),
  ]);

  return {
    ...postData,
    viewer: {
      vote,
      isSaved,
    },
  };
}

export async function createPost({ postData }) {
  return await postRepository.create(postData);
}

export async function getPosts(request = {}, userId = null) {
  const query = await PostQuery.from(request);

  const posts = await postRepository.findMany(query.filters, {
    ...query.options,
    populate: POST_POPULATE,
  });

  if (!userId) {
    return posts.map((post) => ({
      ...post.toObject(),
      viewer: {
        vote: null,
        isSaved: false,
      },
    }));
  }

  const enrichedPosts = await Promise.all(
    posts.map((post) => enrichPost(post, userId)),
  );

  return enrichedPosts;
}

export async function getPost({ postId, userId = null }) {
  console.log(postId);
  const post = await postRepository.findById(postId, {
    populate: POST_POPULATE,
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return await enrichPost(post, userId);
}

export async function updatePost({ postId, postData }) {
  return await postRepository.updateById(postId, postData);
}

export async function deletePost({ postId }) {
  return await postRepository.deleteById(postId);
}
