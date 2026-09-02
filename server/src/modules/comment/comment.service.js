// modules/comment/comment.service.js

import * as commentRepository from "./comment.repository.js";

const COMMENT_POPULATE = [
  {
    path: "user",
    select: "username displayName avatar",
  },
];

function buildCommentTree(comments) {
  const commentMap = new Map();
  const roots = [];

  for (const comment of comments) {
    const node = {
      ...comment.toObject(),
      children: [],
    };

    commentMap.set(node._id.toString(), node);
  }

  for (const comment of commentMap.values()) {
    if (!comment.parent) {
      roots.push(comment);
      continue;
    }

    const parent = commentMap.get(comment.parent.toString());

    if (parent) {
      parent.children.push(comment);
    }
  }

  return roots;
}

export async function createComment(commentData) {
  return await commentRepository.create({
    ...commentData,
    parent: commentData.parent ?? null,
  });
}

export async function getComments(filters = {}, options = {}) {
  const comments = await commentRepository.findMany(filters, {
    ...options,
    populate: COMMENT_POPULATE,
  });

  return buildCommentTree(comments);
}

export async function getComment(id) {
  return await commentRepository.findById(id, {
    populate: COMMENT_POPULATE,
  });
}

export async function updateComment(id, commentData) {
  return await commentRepository.updateById(id, commentData);
}

export async function deleteComment(id) {
  return await commentRepository.deleteById(id);
}
