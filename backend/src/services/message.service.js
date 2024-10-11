const { messageSchema } = require("../models/message.model");
const { conversationSchema } = require("../models/conversation.model");
const { BadRequestError } = require("../responseHandle/error.response");
const cloudinary = require("cloudinary").v2;
const { getRecipientSocketId } = require("../utils/socket");
const { mongoose } = require("mongoose");

class MessageService {
  static sendMessage = async (req, res) => {
    const sessionUser = req.user;
    const { recipientId, message } = req.body;
    let img = req.body;

    let conversation = await conversationSchema.findOne({
      participants: { $all: [recipientId, recipientId] },
      isDeleted: false,
    });
    // Nếu không tìm thấy, tạo một cuộc hội thoại mới
    if (!conversation) {
      conversation = new conversationSchema({
        participants: [sessionUser, recipientId],
      });
      await conversation.save();
    }
    // if (img) {
    //     const uploadResponse = await cloudinary.uploader.upload(img);
    //     img = uploadResponse.secure_url;
    //   }

    // Tạo tin nhắn mới
    const newMessage = new messageSchema({
      conversationId: conversation._id,
      sender: sessionUser._id,
      content: message,
      // img: img||"",
    });
    // Cập nhật lastMessage trong cuộc hội thoại
    await Promise.all([
      newMessage.save(),
      conversationSchema.updateOne(
        { _id: conversation._id },
        { lastMessage: newMessage._id }
      ),
    ]);

    // Gửi sự kiện Socket.io đến người nhận (nếu họ đang kết nối)
    const recipientSocketId = getRecipientSocketId(recipientId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("newMessage", {
        message: newMessage,
      });
    }
    return newMessage;
  };

  static getMessages = async (req, recipientId) => {
    const sessionUser = req.user;
    const conversation = await conversationSchema.findOne({
      participants: { $all: [sessionUser, recipientId] },
    });

    if (!conversation) {
      throw new BadRequestError("Cuộc trò chuyện không tồn tại");
    }

    const messages = await messageSchema
      .find({ conversationId: conversation._id })
      .populate("sender")
      .select("-conversationId -updatedAt -isDeleted -createdAt -__v")
      .sort({ createdAt: 1 })
      .lean();

    return messages;
  };

  // Lấy tất cả cuộc trò chuyện mà người dùng tham gia
  static getConversations = async (req) => {
    const sessionUser = req.user;
    const conversations = await conversationSchema
      .find({ participants: sessionUser })
      .populate({
        path: "participants",
        select: "-password -updatedAt -__v -createdAt -email -role -name",
      })
      .sort({ updatedAt: -1 })
      .select("-updatedAt -isDeleted -__v -createdAt")
      .lean();

    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== sessionUser.toString()
      );
    });

    return conversations;
  };

  // Xóa 1 cuộc trò chuyện
  static deleteConversation = async (conversationId) => {
    const conversation = await conversationSchema.findOneAndUpdate(
      {
        _id: conversationId,
        isDeleted: false,
      },
      { isDeleted: true }
    );

    if (!conversation) {
      throw new BadRequestError("Cuộc trò chuyện không tồn tại");
    }

    await messageSchema.updateMany(
      { conversationId, isDeleted: false },
      { $set: { isDeleted: true } }
    );

    return true;
  };
}

module.exports = MessageService;
