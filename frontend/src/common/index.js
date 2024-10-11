const backendDomin = "http://localhost:8088";

const SummaryApi = {
  signUp: {
    url: `${backendDomin}/api/user/sign-up`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/user/sign-in`,
    method: "post",
  },
  userDetail: {
    url: `${backendDomin}/api/user/user-detail`,
    method: "get",
  },
  logOut: {
    url: `${backendDomin}/api/user/log-out`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomin}/api/user/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/user/update-user`,
    method: "put",
  },
  uploadProduct: {
    url: `${backendDomin}/api/product/upload`,
    method: "post",
  },
  allProducts: {
    url: `${backendDomin}/api/product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/product/update`,
    method: "put",
  },
  categoryProductOne: {
    url: `${backendDomin}/api/product/category-productOne`,
    method: "get",
  },
  categoryWishProduct: {
    url: `${backendDomin}/api/product/category-wise`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product/details`,
    method: "post",
  },
  addProductToCart: {
    url: `${backendDomin}/api/cartproduct/add`,
    method: "post",
  },
  countProductInCart: {
    url: `${backendDomin}/api/cartproduct/count`,
    method: "get",
  },
  addProductToCartView: {
    url: `${backendDomin}/api/cartproduct/view`,
    method: "get",
  },
  updateQuantityInCart: {
    url: `${backendDomin}/api/cartproduct/update-quantity`,
    method: "put",
  },
  deleteProductInCart: {
    url: `${backendDomin}/api/cartproduct`,
    method: "delete",
  },
  searchProduct: {
    url: `${backendDomin}/api/product/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/product/filter`,
    method: "post",
  },
  requestPasswordReset: {
    url: `${backendDomin}/request-password-reset`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/reset-password`,
    method: "put",
  },
  checkPaymentQrCode: {
    url: `${backendDomin}/check-payment-qr-code`,
    method: "post",
  },
  deleteAllProductInCart: {
    url: `${backendDomin}/api/cartproduct/all`,
    method: "delete",
  },
  deleteProduct: {
    url: `${backendDomin}/api/product`,
    method: "delete",
  },
};

export default SummaryApi;
