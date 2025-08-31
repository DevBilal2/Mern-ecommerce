const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    addressLine1: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    phone: String,
    addressType: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional, good for future population
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
