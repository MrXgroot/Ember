import voteService from "./vote.service.js";

class VoteController {
  async votePost(req, res) {
    const vote = await voteService.votePost({
      userId: req.body.userId,
      postId: req.params.postId,
      type: req.body.type,
    });

    res.status(200).json(vote);
  }
}

export default new VoteController();
