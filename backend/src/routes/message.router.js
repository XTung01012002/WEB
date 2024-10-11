const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const asyncHandle = require("../helpers/asyncHandler");

const MessageController = require("../controllers/message.controller");

router.use(authToken);
router.post("/send", asyncHandle(MessageController.sendMessage));
router.get("/:id", asyncHandle(MessageController.getMessages));
router.get("/", asyncHandle(MessageController.getConversations));
router.delete("/:id", asyncHandle(MessageController.deleteConversation));

module.exports = router;
