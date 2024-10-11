const { BadRequestError } = require("../responseHandle/error.response");
const CommentController = require("../controllers/comment.controller");
const { commentSchema } = require("../models/comment.model");

class CommentService {
  static createComment = async (data, req) => {
    const { content, productId, parentCommentId = null } = data;
    const sessionUser = req.user;
    if (!content || content.trim() === "" || typeof content !== "string") {
      throw new BadRequestError("Nội dung bình luận không được để trống");
    }
    const comment = new commentSchema({
      comment_content: content,
      comment_userId: sessionUser._id,
      comment_productId: productId,
      comment_parentId: parentCommentId,
    });

    let rightValue = 0;
    if (parentCommentId) {
      const parentComment = await commentSchema.findById(parentCommentId);
      if (!parentComment) {
        throw new BadRequestError("Bình luận cha không tồn tại");
      }
      rightValue = parentComment.comment_right;
      console.log(rightValue);

      await commentSchema.updateMany(
        {
          comment_productId: productId,
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        }
      );
      await commentSchema.updateMany(
        {
          comment_productId: productId,
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        }
      );
    } else {
      const maxRightValue = await commentSchema
        .findOne({
          comment_productId: productId,
        })
        .sort({ comment_right: -1 });
      if (maxRightValue) {
        rightValue = maxRightValue.comment_right + 1;
      } else {
        rightValue = 1;
      }
    }
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;
    await comment.save();
    return comment;
  };

  static getComment = async ({ productId, parentCommentId = null }, req) => {
    const sessionUser = req.user;
    const productFound = await commentSchema.find({
      comment_productId: productId,
    });
    if (!productFound) {
      throw new BadRequestError("Sản phẩm không tồn tại");
    }
    if (parentCommentId) {
      const commentParent = await commentSchema.findById(parentCommentId);
      if (!commentParent) {
        throw new BadRequestError("Bình luận cha không tồn tại");
      }
      const comments = await commentSchema
        .find({
          comment_productId: productId,
          comment_parentId: parentCommentId,
          comment_left: { $gt: commentParent.comment_left },
          comment_right: { $lt: commentParent.comment_right },
        })
        .select({
          comment_content: 1,
          comment_parentId: 1,
          comment_left: 1,
          comment_right: 1,
        })
        .sort({ comment_left: 1 })
        .lean();
      console.log(commentParent);
      return comments;
    }
    const comments = await commentSchema
      .find({
        comment_productId: productId,
        comment_parentId: parentCommentId,
      })
      .select({
        comment_content: 1,
        comment_parentId: 1,
        comment_left: 1,
        comment_right: 1,
      })
      .sort({ comment_left: 1 })
      .lean();
    return comments;
  };
}
module.exports = CommentService;
