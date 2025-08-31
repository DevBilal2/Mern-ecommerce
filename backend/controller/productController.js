// controllers/productController.js
const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const cloudinary = require("cloudinary").v2;

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // For pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const skip = (page - 1) * limit;

  // Build query
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Product.find(JSON.parse(queryStr)).skip(skip).limit(limit);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Executing query
  const products = await query;

  // Pagination result
  const total = await Product.countDocuments(JSON.parse(queryStr));
  const pages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    count: products.length,
    page,
    pages,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.session.userId;

  // Handle image upload
  let images = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        folder: "products",
        width: 1500,
        crop: "scale",
      });

      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  req.body.images = images;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Handle image upload if new images are added
  if (req.files && req.files.length > 0) {
    // Delete existing images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    // Upload new images
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        folder: "products",
        width: 1500,
        crop: "scale",
      });

      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = images;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Create product review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const review = {
    user: req.session.userId,
    name: req.session.userName,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user already reviewed the product
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.session.userId.toString()
  );

  if (alreadyReviewed) {
    return next(
      new ErrorResponse("Product already reviewed by this user", 400)
    );
  }

  // Add review
  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;

  // Calculate average rating
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Get top rated products
// @route   GET /api/v1/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ ratings: -1 }).limit(3);

  res.status(200).json({
    success: true,
    data: products,
  });
});
