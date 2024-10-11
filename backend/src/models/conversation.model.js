const { model, Schema } = require("mongoose");

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = {
  conversationSchema: model("conversation", conversationSchema),
};
