// routes/productRoutes.js
const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require("../controller/productController");
const { isAuthenticated, authorize } = require("../middleware/auth");
const upload = require("../middleware/multer"); // For file uploads

const router = express.Router();

router.route("/").get(getProducts).post(
  isAuthenticated,
  authorize("admin"),
  upload.array("images", 10), // Max 10 images
  createProduct
);

router.get("/top", getTopProducts);

router.route("/:id/reviews").post(isAuthenticated, createProductReview);
router.get("/test", (req, res) => {
  res.send("Test route works!");
});
router
  .route("/:id")
  .get(getProduct)
  .put(
    isAuthenticated,
    authorize("admin"),
    upload.array("images", 10),
    updateProduct
  )
  .delete(isAuthenticated, authorize("admin"), deleteProduct);

module.exports = router;
