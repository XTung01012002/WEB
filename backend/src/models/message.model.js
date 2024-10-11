const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
    },
    img: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = { messageSchema: model("message", messageSchema) };
