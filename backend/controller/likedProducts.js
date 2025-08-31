// Debugging: Verify the model is properly imported

// Improved likeProduct with better error handling
const LikedProduct = require("../models/likedProducts");

const likeProduct = async (req, res) => {
  try {
    const userId = req.session?.user?.id; // ✅ Correct way like your address controller
    const { productId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const alreadyLiked = await LikedProduct.findOne({ userId, productId });
    if (alreadyLiked) {
      return res
        .status(400)
        .json({ success: false, message: "Product already liked" });
    }

    const liked = await LikedProduct.create({ userId, productId });
    res.status(201).json({ success: true, data: liked });
  } catch (error) {
    console.error("Error in likeProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const unlikeProduct = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const { productId } = req.params;
    console.log(productId);
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const result = await LikedProduct.findOneAndDelete({
      userId,
      productId,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Like not found" });
    }

    res.status(200).json({ success: true, message: "Product unliked" });
  } catch (error) {
    console.error("Error in unlikeProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const getLikedProducts = async (req, res) => {
  try {
    const userId = req.session?.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const liked = await LikedProduct.find({ userId }).populate("productId");
    res.status(200).json({ success: true, count: liked.length, data: liked });
  } catch (error) {
    console.error("Error in getLikedProducts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export as named exports
module.exports = {
  likeProduct,
  unlikeProduct,
  getLikedProducts,
};
