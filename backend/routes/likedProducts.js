const express = require("express");
const router = express.Router();
const { isAuthenticated, authorize } = require("../middleware/auth");

const {
  likeProduct,
  unlikeProduct,

  getLikedProducts,
} = require("../controller/likedProducts"); // Make sure this path is correct

router.post("/", isAuthenticated, likeProduct);
router.get("/", isAuthenticated, getLikedProducts);
router.delete("/:productId", isAuthenticated, unlikeProduct);

module.exports = router;
