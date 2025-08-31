const Cart = require("../models/cart");

// Add/update item in cart
const addToCart = async (req, res) => {
  try {
    const { sessionId } = req;
    const itemData = req.body;
    const { productId, quantity } = itemData;

    // First find the cart
    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = await Cart.create({
        sessionId,
        items: [itemData],
      });
      return res.json(cart);
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex >= 0) {
      // Product exists - increment quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Product doesn't exist - add new item
      cart.items.push(itemData);
    }

    // Save the updated cart
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const { sessionId } = req;
    const cart = await Cart.findOne({ sessionId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { sessionId } = req;
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { sessionId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Return the deleted productId for frontend to use
    res.json({
      success: true,
      deletedProductId: productId,
      cart, // Optional: if you want to use the full updated cart
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { sessionId } = req; // Assuming you're using session-based auth

    console.log(`Updating product ${productId} to quantity ${quantity}`); // Debug log

    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json({
      success: true,
      updatedQuantity: quantity,
      productId,
    });
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { addToCart, getCart, removeFromCart, updateCartItemQuantity };
