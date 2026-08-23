import * as messageService from "./message.service.js";

export async function getMessages(req, res) {
  try {
    const { otherUserId } = req.params;
    const { limit, before } = req.query;

    const messages = await messageService.getMessages({
      userId: req.user.id,
      otherUserId,
      limit,
      before,
    });

    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function getInbox(req, res) {
  try {
    const inbox = await messageService.getInbox(req.user.id);

    res.status(200).json({
      message: "Inbox fetched successfully",
      data: inbox,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
