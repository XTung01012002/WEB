const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");

const CartProductController = require("../controllers/cartproduct.controller");
const asyncHandle = require("../helpers/asyncHandler");

router.use(authToken);
router.post("/add", asyncHandle(CartProductController.addProductToCart));   
router.get("/count",  asyncHandle(CartProductController.countProductInCart));
router.get("/view" , asyncHandle(CartProductController.addProductToCartView));
router.put("/update-quantity" , asyncHandle(CartProductController.updateProductInCart));
router.delete("/" , asyncHandle(CartProductController.deleteProductInCart));
router.delete("/all" , asyncHandle(CartProductController.deleteAllProductInCart));

module.exports = router;