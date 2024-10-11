const { SuccessResponse } = require("../responseHandle/success.response");
const MessageService = require("../services/message.service");

class MessageController {
  sendMessage = async (req, res) => {
    const message = await MessageService.sendMessage(req);
    new SuccessResponse({
      message: "Gửi tin nhắn thành công",
      data: message,
    }).send(res);
  };

  getMessages = async (req, res) => {
    const messages = await MessageService.getMessages(req, req.params.id);
    new SuccessResponse({
      message: "Lấy tin nhắn thành công",
      data: messages,
    }).send(res);
  };

  getConversations = async (req, res) => {
    const conversations = await MessageService.getConversations(req);
    new SuccessResponse({
      message: "Lấy cuộc trò chuyện thành công",
      data: conversations,
    }).send(res);
  };
  deleteConversation = async (req, res) => {
    await MessageService.deleteConversation(req.params.id);
    new SuccessResponse({
      message: "Xóa cuộc trò chuyện thành công",
    }).send(res);
  };
}

module.exports = new MessageController();
