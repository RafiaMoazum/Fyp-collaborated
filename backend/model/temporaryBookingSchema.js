const mongoose = require('mongoose');

const temporaryBookingSchema = new mongoose.Schema({
  rooms:{type: [String]},
  users:{  type: [String]  },
  checkIn_date: { type: Date},
  checkOut_date: { type: Date }
});

const TempBooking = mongoose.model('TempBooking', temporaryBookingSchema);

module.exports = TempBooking;
