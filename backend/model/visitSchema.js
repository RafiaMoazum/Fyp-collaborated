const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  name:{  type: String,required:true  },
  email: {  type: String,required:true },
  phone: {  type: String,required:true },
  cnic: {  type: String,required:true },
  date: { type: Date,required:true},
  time: { type: String,required:true },
  hostelId: {type: String}
});

const VisitBooking = mongoose.model('VisitBooking', visitSchema);

module.exports = VisitBooking;
