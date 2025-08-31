// routes/orderRoutes.js
const express = require('express');
const {
  createOrder,
  getOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route('/me').get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, admin, updateOrder)
  .delete(protect, admin, deleteOrder);

module.exports = router;