const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {  type: [String]  }, 
  hostel: {  type: [String] }, 
  rating: { type: Number, required: true }, 
  comment: { type: String }, 
  date: { type: Date, default: Date.now }, 
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
