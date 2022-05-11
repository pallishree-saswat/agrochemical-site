const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require("../controllers/user");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/auth");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);

router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);


router.route("/user/register").post(register);
router.route("/user/login").post(login);
router.route("/user/verifyEmail").post(verifyEmail);
router.route("/user/forgotPassword").post(forgotPassword);
router.route("/user/resetPassword").post(resetPassword);
router.route("/user/updatePassword").post(updatePassword);
router.route("/user/logout").get(logout);
module.exports = router;