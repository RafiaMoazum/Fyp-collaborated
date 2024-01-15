const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  name:{  type: String  },
  email: {  type: String },
  phone: {  type: String },
  cnic: {  type: String },
  date: { type: Date},
  time: { type: String },
  hostelId: {type: String}
});

const VisitBooking = mongoose.model('VisitBooking', visitSchema);

module.exports = VisitBooking;
