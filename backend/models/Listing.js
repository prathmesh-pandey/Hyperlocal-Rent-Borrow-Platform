const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  productName: String,
  specifications: String,
  category: String,
  availability: String,
  price: Number,
  lenderName: String,
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  contactInfo: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

listingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);