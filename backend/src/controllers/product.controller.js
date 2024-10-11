const { productSchema } = require("../models/product.model");
const { SuccessResponse } = require("../responseHandle/success.response");
const ProductService = require("../services/product.service");

class ProductController {
  uploadProduct = async (req, res, next) => {
    const product = await ProductService.uploadProduct(req.body);
    new SuccessResponse({
      message: "Upload product success",
      data: product,
    }).send(res);
  };

  getAllProducts = async (req, res, next) => {
    const products = await ProductService.getAllProducts();
    new SuccessResponse({
      message: "Get all products success",
      data: products,
    }).send(res);
  };

  updateProduct = async (req, res, next) => {
    const updatedProduct = await ProductService.updateProduct(req.body);
    new SuccessResponse({
      message: "Update product success",
      data: updatedProduct,
    }).send(res);
  };

  getCategoryProductOne = async (req, res, next) => {
    const products = await ProductService.getCategoryProductOne();
    new SuccessResponse({
      message: "Get category products success",
      data: products,
    }).send(res);
  };

  getCategoryWiseProduct = async (req, res) => {
    const products = await ProductService.getCategoryWiseProduct(req?.body);
    new SuccessResponse({
      message: "Get category wise products success",
      data: products,
    }).send(res);
  };

  getProductDetails = async (req, res) => {
    const product = await ProductService.getProductDetails(req.body);
    new SuccessResponse({
      message: "Get product details success",
      data: product,
    }).send(res);
  };

  searchProduct = async (req, res) => {
    const products = await ProductService.searchProduct(req.query.q);
    new SuccessResponse({
      message: "Search product success",
      data: products,
    }).send(res);
  };

  filterProduct = async (req, res) => {
    const products = await ProductService.filterProduct(req.body.category);
    new SuccessResponse({
      message: "Fillter product success",
      data: products,
    }).send(res);
  };
  deleteProduct = async (req, res) => {
    const product = await ProductService.deleteProduct(req.body);
    new SuccessResponse({
      message: "Delete product success",
      data: product,
    }).send(res);
  }

//   createProduct = async (req, res) => {
//     const product = await ProductService.create(req.body);
//     new SuccessResponse({
//       message: "Create product success",
//       data: product,
//     }).send(res);
// }
}

module.exports = new ProductController();
