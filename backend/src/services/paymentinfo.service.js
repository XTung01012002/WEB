const { paymentInfoSchema } = require("../models/paymentinfo.model");
const { BadRequestError } = require("../responseHandle/error.response");

class PaymentInfoService {
  static checkPaymentQrCode = async (req, data) => {
    try {
      const sessionUser = req.user;
      const { phone, address, paymentMethod, product } = data;
      if (paymentMethod === "cash-on-delivery") {
        const payload = {
          phone,
          address,
          paymentMethod,
          productList: product,
          userId: sessionUser,
        };
        const newOrder = new paymentInfoSchema(payload);
        console.log(newOrder);
        await newOrder.save();

        return newOrder;
      }
      if (paymentMethod === "bank-transfer") {
        const paymentReceived = await checkBankTransfer();
        if (paymentReceived) {
          const payload = {
            phone,
            address,
            paymentMethod,
            productList: product,
            userId: sessionUser,
          };
          const newOrder = new paymentInfoSchema(payload);
          await newOrder.save();
          console.log(newOrder);
          return newOrder;
        }
      } else {
        throw new BadRequestError("Chưa nhận được thanh toán.");
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };
}
const checkBankTransfer = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Đơn hàng đang chờ vận chuyển.");
    }, 5000); // 10 giây
  });
};

module.exports = PaymentInfoService;
