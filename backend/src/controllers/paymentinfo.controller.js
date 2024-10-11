const { paymentInfoSchema } = require("../models/paymentinfo.model");
const { SuccessResponse } = require("../responseHandle/success.response");
const PaymentInfoService = require("../services/paymentinfo.service");

class PaymentInfoController {
  checkPaymentQrCode = async (req, res, next) => {
    const data = req.body;
    const newOrder = await PaymentInfoService.checkPaymentQrCode(req, data);
    new SuccessResponse({
      message: "Thanh toán thành công",
      data: newOrder,
    }).send(res);
  };
}
module.exports = new PaymentInfoController();
