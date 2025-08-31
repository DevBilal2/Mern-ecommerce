// models/Order.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const shippingInfoSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const paymentInfoSchema = new mongoose.Schema(
  {
    id: { type: String },
    status: { type: String },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "stripe", "cod"],
      required: true,
    },
    amountPaid: { type: Number },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingInfo: shippingInfoSchema,
    paymentInfo: paymentInfoSchema,
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "processing",
    },
    deliveredAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Update product stock when order is created
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    await this.updateProductStock("decrement");
  }
  next();
});

// Update product stock when order is cancelled
orderSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());

  if (
    docToUpdate.orderStatus === "processing" &&
    this._update.orderStatus === "cancelled"
  ) {
    await docToUpdate.updateProductStock("increment");
  }

  if (this._update.orderStatus === "delivered" && !docToUpdate.deliveredAt) {
    this._update.deliveredAt = Date.now();
  }

  next();
});

// Method to update product stock
orderSchema.methods.updateProductStock = async function (action) {
  const Product = mongoose.model("Product");

  for (const item of this.orderItems) {
    const product = await Product.findById(item.product);

    if (action === "decrement") {
      product.stock -= item.quantity;
    } else if (action === "increment") {
      product.stock += item.quantity;
    }

    await product.save({ validateBeforeSave: false });
  }
};

module.exports = mongoose.model("Order", orderSchema);
