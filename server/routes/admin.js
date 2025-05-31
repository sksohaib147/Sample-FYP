const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Product = require('../models/Product');
const Pet = require('../models/Pet');
const Order = require('../models/Order');
const adminAuth = require('../middleware/adminAuth');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard data
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalPets = await Pet.countDocuments();
    
    const completedOrders = await Order.find({ status: 'completed' });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    const topProducts = await Product.find()
      .sort({ salesCount: -1 })
      .limit(5);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalPets,
      totalRevenue,
      recentOrders,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Suspend user
router.put('/users/:userId/suspend', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isSuspended = !user.isSuspended;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:userId', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all pets
router.get('/pets', adminAuth, async (req, res) => {
  try {
    const pets = await Pet.find().populate('seller', 'name email');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle listing visibility
router.put('/:type/:id/visibility', adminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = type === 'pets' ? Pet : Product;
    const listing = await Model.findById(id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    listing.isVisible = !listing.isVisible;
    await listing.save();
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete listing
router.delete('/:type/:id', adminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = type === 'pets' ? Pet : Product;
    await Model.findByIdAndDelete(id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get transaction logs
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = {};
    
    if (start && end) {
      query.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }
    
    const transactions = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user activities
router.get('/activities', adminAuth, async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = {};
    
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }
    
    const activities = await UserActivity.find(query)
      .populate('user', 'name email')
      .sort({ date: -1 });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Export transactions
router.get('/transactions/export', adminAuth, async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = {};
    
    if (start && end) {
      query.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }
    
    const transactions = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    // Convert to CSV
    const csv = transactions.map(t => ({
      id: t._id,
      date: t.createdAt,
      user: t.user.name,
      amount: t.totalAmount,
      status: t.status
    }));
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
    res.send(JSON.stringify(csv));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Export user activities
router.get('/activities/export', adminAuth, async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = {};
    
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }
    
    const activities = await UserActivity.find(query)
      .populate('user', 'name email')
      .sort({ date: -1 });
    
    // Convert to CSV
    const csv = activities.map(a => ({
      user: a.user.name,
      action: a.action,
      date: a.date,
      ipAddress: a.ipAddress
    }));
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=activities.csv');
    res.send(JSON.stringify(csv));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create initial admin account
router.post('/setup', async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin account already exists' });
    }

    const admin = new Admin({
      username: 'admin',
      password: '123'
    });

    await admin.save();
    res.json({ message: 'Admin account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 