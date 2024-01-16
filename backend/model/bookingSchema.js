const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  rooms:{  type: [String]  },
  users:{  type: [String]  },
  checkIn_date: { type: Date, required:true},
  checkOut_date: { type: Date }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
