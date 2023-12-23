const mongoose = require('mongoose');

const temporaryVisitSchema = new mongoose.Schema({
  name:{  type: String  },
  email: {  type: String },
  phone: {  type: String },
  cnic: {  type: String },
  date: { type: Date},
  hostelId: {type: String}
});

const TempVisitBooking = mongoose.model('TempVisitBooking', temporaryVisitSchema);

module.exports = TempVisitBooking;
