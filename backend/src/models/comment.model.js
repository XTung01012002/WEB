const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    comment_content: {
      type: String,
      required: true,
      default: "comment",
    },
    comment_userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment_productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment_left: {
      type: Number,
      default: 0,
    },
    comment_right: {
      type: Number,
      default: 0,
    },
    comment_parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = { commentSchema: model("Comment", commentSchema) };
