const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const asyncHandle = require("../helpers/asyncHandler");

const ProductController = require("../controllers/product.controller");

router.post("/upload", authToken, asyncHandle(ProductController.uploadProduct));
router.get("/", asyncHandle(ProductController.getAllProducts));
router.put("/update", authToken, asyncHandle(ProductController.updateProduct));
router.get("/category-productOne", asyncHandle(ProductController.getCategoryProductOne));
router.post("/category-wise", asyncHandle(ProductController.getCategoryWiseProduct));
router.post("/details", asyncHandle(ProductController.getProductDetails));

router.get("/search", asyncHandle(ProductController.searchProduct));
router.post("/filter", asyncHandle(ProductController.filterProduct));
router.delete("/", asyncHandle(ProductController.deleteProduct));
// router.post("/create", asyncHandle(ProductController.createProduct));


module.exports = router;