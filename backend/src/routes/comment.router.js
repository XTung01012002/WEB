const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const asyncHandle = require("../helpers/asyncHandler");
const authToken = require("../middlewares/authToken");

router.post("/create",authToken, asyncHandle(CommentController.createComment));
router.get("/get",authToken, asyncHandle(CommentController.getComment));

module.exports = router;

