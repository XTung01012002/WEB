const { SuccessResponse } = require("../responseHandle/success.response");
const CommentService = require("../services/comment.service");

class CommentController {
  createComment = async (req, res) => {
    const comment = await CommentService.createComment(req.body, req);
    new SuccessResponse({
      message: "Tạo bình luận thành công",
      data: comment,
    }).send(res);
  };

  getComment = async (req, res) => {
    const comment = await CommentService.getComment(req.body, req);
    new SuccessResponse({
      message: "Lấy bình luận thành công",
      data: comment,
    }).send(res);
  };
}
module.exports = new CommentController();
