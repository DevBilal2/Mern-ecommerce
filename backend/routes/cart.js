const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} = require("../controller/cartController");

// Middleware to handle session
router.use((req, res, next) => {
  // Generate session ID if doesn't exist
  if (!req.session.cartId) {
    req.session.cartId = require("crypto").randomBytes(16).toString("hex");
  }
  req.sessionId = req.session.cartId;
  next();
});

router.post("/", addToCart);
router.get("/", getCart);
router.patch("/quantity/:productId", updateCartItemQuantity);
router.delete("/:productId", removeFromCart);

module.exports = router;
