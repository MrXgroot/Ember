// modules/comment/comment.service.js

import commentRepository from "./comment.repository.js";

function buildCommentTree(comments) {
  const commentMap = new Map();
  const roots = [];

  // Create lookup map
  for (const comment of comments) {
    const node = {
      ...comment.toObject(),
      children: [],
    };

    commentMap.set(node._id.toString(), node);
  }

  // Build tree
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
const COMMENT_POPULATE = [
  {
    path: "user",
    select: "username displayName avatar",
  },
];
class CommentService {
  async createComment(commentData) {
    return await commentRepository.create({
      ...commentData,
      parent: commentData.parent ?? null,
    });
  }

  async getComments(filters = {}, options = {}) {
    const comments = await commentRepository.findMany(filters, {
      ...options,
      populate: COMMENT_POPULATE,
    });

    return buildCommentTree(comments);
  }

  async getComment(id) {
    return await commentRepository.findById(id);
  }

  async updateComment(id, commentData) {
    return await commentRepository.updateById(id, commentData);
  }

  async deleteComment(id) {
    return await commentRepository.deleteById(id);
  }
}

export default new CommentService();
