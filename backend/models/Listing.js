const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  productName: String,
  specifications: String,
  category: String,
  availability: String,
  price: Number,
  location: String,
  lenderName: String,
  contactInfo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Listing', listingSchema);