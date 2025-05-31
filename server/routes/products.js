const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('seller', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'firstName lastName email');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create product
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('priceUSD').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['food', 'toys', 'accessories', 'health', 'grooming'])
    .withMessage('Invalid category'),
  body('stock').isNumeric().withMessage('Stock must be a number'),
  body('images').isArray().withMessage('Images must be an array'),
  body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      priceUSD,
      category,
      stock,
      images,
      location
    } = req.body;

    // Calculate PKR price
    const pricePKR = Math.round(priceUSD * 278.50); // Using current exchange rate

    const product = new Product({
      name,
      description,
      priceUSD,
      pricePKR,
      category,
      stock,
      images,
      location,
      seller: req.user._id
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product
router.put('/:id', [
  auth,
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('priceUSD').optional().isNumeric().withMessage('Price must be a number'),
  body('category').optional().isIn(['food', 'toys', 'accessories', 'health', 'grooming'])
    .withMessage('Invalid category'),
  body('stock').optional().isNumeric().withMessage('Stock must be a number'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('location').optional().notEmpty().withMessage('Location is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const {
      name,
      description,
      priceUSD,
      category,
      stock,
      images,
      location,
      status
    } = req.body;

    // Calculate PKR price if USD price is updated
    if (priceUSD !== undefined) {
      product.pricePKR = Math.round(priceUSD * 278.50);
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (priceUSD) product.priceUSD = priceUSD;
    if (category) product.category = category;
    if (stock) product.stock = stock;
    if (images) product.images = images;
    if (location) product.location = location;
    if (status) product.status = status;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router; 