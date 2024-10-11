const express = require("express");
const router = express.Router();
const PaymentInfoController = require("../controllers/paymentinfo.controller");
const asyncHandle = require("../helpers/asyncHandler");
const authToken = require("../middlewares/authToken");

router.post("/check-payment-qr-code",authToken,  asyncHandle(PaymentInfoController.checkPaymentQrCode));

module.exports = router;