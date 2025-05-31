const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  pricePKR: {
    type: Number,
    required: true,
    min: 0
  },
  priceUSD: {
    type: Number,
    required: true,
    min: 0
  },
  originalPricePKR: {
    type: Number,
    min: 0
  },
  originalPriceUSD: {
    type: Number,
    min: 0
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Dogs', 'Cats', 'Birds', 'Fish', 'Other']
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Good', 'Fair']
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  tags: [{
    type: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Create text index for search
productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  category: 'text'
});

// Pre-save middleware to convert PKR to USD
productSchema.pre('save', function(next) {
  if (this.isModified('pricePKR')) {
    // Convert PKR to USD (using a fixed rate for now, should be updated dynamically)
    const pkrToUsdRate = 0.0036; // 1 PKR = 0.0036 USD
    this.priceUSD = Math.round(this.pricePKR * pkrToUsdRate * 100) / 100;
  }
  if (this.isModified('originalPricePKR')) {
    const pkrToUsdRate = 0.0036;
    this.originalPriceUSD = Math.round(this.originalPricePKR * pkrToUsdRate * 100) / 100;
  }
  next();
});

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate discount percentage if original price is set
productSchema.pre('save', function(next) {
  if (this.isModified('originalPriceUSD') && this.originalPriceUSD > this.priceUSD) {
    this.discountPercentage = Math.round(((this.originalPriceUSD - this.priceUSD) / this.originalPriceUSD) * 100);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema); 