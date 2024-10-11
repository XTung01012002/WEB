const { model, Schema } = require("mongoose");

const paymentInfoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    productList : [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = { paymentInfoSchema: model("paymentInfo", paymentInfoSchema) };
