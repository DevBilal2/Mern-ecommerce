// Add/update address (just like addToCart)
const User = require("../models/user");
const Address = require("../models/addresses");

exports.addAddress = async (req, res) => {
  try {
    console.log("Request received to add address:", req.body);

    const { id } = req.session.user;
    if (!id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const addressData = req.body;

    // Validate required fields
    if (
      !addressData.addressLine1 ||
      !addressData.city ||
      !addressData.country
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create and save address in a separate collection
    const newAddress = new Address({
      ...addressData,
      userId: id,
    });

    await newAddress.save();

    console.log("Address added successfully:", newAddress);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const addressId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Ensure the address belongs to the user
    const existingAddress = await Address.findOne({ _id: addressId, userId });

    if (!existingAddress) {
      return res
        .status(404)
        .json({ error: "Address not found or unauthorized" });
    }

    // Perform the update
    const updated = await Address.findByIdAndUpdate(addressId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

// getAddresses and deleteAddress remain the same as before

// Get addresses (like getCart)

exports.getAddresses = async (req, res) => {
  try {
    const { id } = req.session.user; // Extract user ID from session
    if (!id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    // Fetch addresses associated with the userId
    const addresses = await Address.find({ userId: id });

    // Check if addresses are found
    if (addresses.length === 0) {
      return res
        .status(404)
        .json({ error: "No addresses found for this user" });
    }

    // Return the found addresses
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete address (like removeFromCart)
exports.deleteAddress = async (req, res) => {
  try {
    // Extract user ID from session (fix this if your session data structure differs)
    const userId = req.session?.user?.id;
    const { addressId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Delete the address if it belongs to the user
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ error: "Address not found or unauthorized" });
    }

    // Fetch updated list of addresses for the user
    const addresses = await Address.find({ userId: userId });

    res.json({
      success: true,
      deletedAddressId: addressId,
      addresses: addresses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
