const mongoose = require('mongoose');

// Task #46: Products collection with id, name, brand, category, price, image, description
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  brand:       { type: String, required: true, trim: true },
  category:    { type: String, required: true, trim: true },
  price:       { type: Number, required: true, min: 0 },
  image:       { type: String, default: '' },
  description: { type: String, default: '' },
  color:       { type: String, default: '' },
  inStock:     { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
