const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  condition: {
    type: String,
    enum: ['new', 'old'],
    required: true,
  },
  summary: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
  },
  material: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String, // Store the image ID or filename
  },
});

module.exports = mongoose.model('Product', productSchema);
