import { savePost } from "./save.service.js";

export async function toggleSave(req, res, next) {
  try {
    const result = await savePost({
      userId: req.user.id,
      postId: req.params.postId,
    });

    res.status(200).json({
      message: result.isSaved
        ? "Post saved successfully."
        : "Post unsaved successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
