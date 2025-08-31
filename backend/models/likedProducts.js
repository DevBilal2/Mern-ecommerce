const mongoose = require("mongoose");

const likedProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LikedProduct", likedProductSchema);
