import * as saveRepository from "./save.repository.js";

export async function savePost({ userId, postId }) {
  const existingSave = await saveRepository.findOne({
    user: userId,
    post: postId,
  });

  if (existingSave) {
    await saveRepository.deleteById(existingSave._id);

    return {
      isSaved: false,
    };
  }

  await saveRepository.create({
    user: userId,
    post: postId,
  });

  return {
    isSaved: true,
  };
}

export async function isPostSaved({ userId, postId }) {
  const save = await saveRepository.exists({
    user: userId,
    post: postId,
  });

  return Boolean(save);
}
