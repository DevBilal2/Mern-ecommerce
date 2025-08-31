// controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Validate order items
  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorResponse("No order items", 400));
  }

  // Verify products exist and stock is available
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(
        new ErrorResponse(`Product not found with id ${item.product}`, 404)
      );
    }

    if (product.stock < item.quantity) {
      return next(
        new ErrorResponse(
          `Not enough stock for ${product.name}. Available: ${product.stock}`,
          400
        )
      );
    }
  }

  const order = await Order.create({
    user: req.user.id,
    orderItems,
    shippingInfo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id ${req.params.id}`, 404)
    );
  }

  // Make sure user owns order or is admin
  if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to view this order", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/me
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// @desc    Get all orders - ADMIN
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// @desc    Update order status - ADMIN
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id ${req.params.id}`, 404)
    );
  }

  if (order.orderStatus === "delivered") {
    return next(new ErrorResponse("Order already delivered", 400));
  }

  // Update stock if order is cancelled
  if (req.body.orderStatus === "cancelled") {
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    Delete order - ADMIN
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id ${req.params.id}`, 404)
    );
  }

  // Return stock if order wasn't delivered
  if (order.orderStatus !== "delivered") {
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order deleted",
  });
});
