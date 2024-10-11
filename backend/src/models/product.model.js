const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  { timestamps: true }
);

module.exports = { productSchema: model("product", productSchema) };
