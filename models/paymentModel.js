// paymentModel.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  shippingAddress: String,
  shippingContact: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' // Reference to the Product model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  postedTime: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
