// modules/reply/reply.controller.js

import replyService from "./reply.service.js";

class ReplyController {
  async createReply(req, res) {
    const reply = await replyService.createReply(req.body);

    res.status(201).json(reply);
  }

  async getReplies(req, res) {
    const replies = await replyService.getReplies(req.query);

    res.status(200).json(replies);
  }

  async getReply(req, res) {
    const reply = await replyService.getReply(req.params.replyId);

    res.status(200).json(reply);
  }

  async updateReply(req, res) {
    const reply = await replyService.updateReply(req.params.replyId, req.body);

    res.status(200).json(reply);
  }

  async deleteReply(req, res) {
    await replyService.deleteReply(req.params.replyId);

    res.status(204).send();
  }
}

export default new ReplyController();
