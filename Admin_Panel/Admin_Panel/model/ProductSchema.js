const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  mainCategory: {
    type: String,
    required: true
  },
  categories: [String],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  reviews: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedDelivery: {
    type: String,
    required: true
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  sizes: [String],
  sizeCounts: [Number]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
