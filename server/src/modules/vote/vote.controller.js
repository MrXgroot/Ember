// modules/vote/vote.controller.js

import { votePost as votePostService } from "./vote.service.js";

export async function votePost(req, res, next) {
  try {
    const vote = await votePostService({
      userId: req.user.id,
      postId: req.params.postId,
      type: req.body.type,
    });

    res.status(200).json({
      message: "Vote updated successfully.",
      data: { vote },
    });
  } catch (error) {
    next(error);
  }
}
