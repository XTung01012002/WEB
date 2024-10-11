const { SuccessResponse } = require("../responseHandle/success.response");
const CartProductService = require("../services/cartproduct.service");

class CartProductController {
  addProductToCart = async (req, res, next) => {
    const product = await CartProductService.addProductToCart(req.body, req);
    new SuccessResponse({
      message: "Add product to cart success",
      data: product,
    }).send(res);
  };

  countProductInCart = async (req, res, next) => {
    const count = await CartProductService.countProductInCart(req);
    new SuccessResponse({
      message: "Count product in cart success",
      data: count,
    }).send(res);
  };

  addProductToCartView = async (req, res, next) => {
    const products = await CartProductService.addProductToCartView(req);
    new SuccessResponse({
      message: "Add product to cart view success",
      data: products,
    }).send(res);
  };

  updateProductInCart = async (req, res, next) => {
    const product = await CartProductService.updateProductInCart(req);
    new SuccessResponse({
      message: "Update product in cart success",
      data: product,
    }).send(res);
  };

  deleteProductInCart = async (req, res, next) => {
    const product = await CartProductService.deleteProductInCart(req);
    new SuccessResponse({
      message: "Delete product in cart success",
      data: product,
    }).send(res);
  };

  deleteAllProductInCart = async (req, res, next) => {
    const product = await CartProductService.deleteAllProductInCart(req);
    new SuccessResponse({
      message: "Delete all product in cart success",
      data: product,
    }).send(res);
  };
}

module.exports = new CartProductController();
