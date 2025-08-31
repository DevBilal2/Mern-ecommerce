const express = require("express");
const router = express.Router();
const { isAuthenticated, authorize } = require("../middleware/auth");
const {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} = require("../controller/addresses");

router.post("/", isAuthenticated, addAddress);

router.put("/:id", isAuthenticated, updateAddress);
router.delete("/:addressId", isAuthenticated, deleteAddress);

router.get("/", isAuthenticated, getAddresses);
module.exports = router;
