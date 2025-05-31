const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const sendEmail = require('../utils/email');

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    res.json({ message: 'Orders route working' });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Send confirmation email to user
    if (order.user && order.user.email) {
      await sendEmail({
        to: order.user.email,
        subject: 'Order Confirmation - Paws and Claws',
        text: `Thank you for your order! Your order ID is ${order._id}.`,
        html: `<h2>Thank you for your order!</h2><p>Your order ID is <b>${order._id}</b>.</p>`
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

module.exports = router; 