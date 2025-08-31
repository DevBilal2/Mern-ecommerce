const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1
  },
  selectedOptions: {
    type: Map,
    of: String,
    default: {}
  }
}, { _id: false }); // Prevents automatic _id for items

const cartSchema = new mongoose.Schema({
  sessionId: { // For guest users
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);