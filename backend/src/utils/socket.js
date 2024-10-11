const { Server } = require("socket.io"); // Corrected import
const http = require("http");
const { messageSchema } = require("../models/message.model");
const { conversationSchema } = require("../models/conversation.model");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "FRONTEND_URL", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

const getRecipientSocketId = (recipientId) => {
  return onlineUsers[recipientId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  // Thêm người dùng vào danh sách online
  onlineUsers[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  // Xử lý khi tin nhắn đánh dấu đã xem
  socket.on(markMessageAsSeen, async ({ conversationId }) => {
    await messageSchema.updateMany(
      { conversationId, sender: { $ne: userId } },
      { seen: true }
    );
    await conversationSchema.updateOne(
      { _id: conversationId, "lastMessage.sender": { $ne: userId } },
      { "lastMessage.seen": true }
    );
    io.to(onlineUsers[userId]).emit("messageSeen", conversationId);
  });

  // ngắt kết nối
  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

module.exports = { io, server, getRecipientSocketId };
