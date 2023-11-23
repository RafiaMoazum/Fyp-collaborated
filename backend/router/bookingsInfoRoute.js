const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Hostel = require('../model/hostelSchema');
const Booking = require('../model/bookingSchema');
const User = require('../model/userSchema');
const Room = require('../model/roomsSchema');


// Display booking details
router.get('/showBookings/:hostelId', authenticate, async (req, res) => {
  try {
    const hostelId = req.params.hostelId;

    // Finding the hostel document by ID
    const hostel = await Hostel.findById(hostelId);

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Getting the array of room IDs from the hostel document
    const roomIds = hostel.rooms;

    // Finding all bookings where roomId matches any of the roomIds
    const bookings = await Booking.find({ rooms: { $in: roomIds } });
    
   
    // Create an array to store booking details
    const bookingDetails = [];

    // Iterate through the bookings and retrieve customer information
for (const booking of bookings) {
    const bookingDetail = {
      bookingId: booking._id,
      checkIn_date: booking.checkIn_date,
      checkOut_date: booking.checkOut_date,
      rooms: [],
      users: [],
    };
  
    // Retrieve room information for the booking
const rooms = await Room.find({ _id: { $in: booking.rooms } }); 
bookingDetail.rooms.push(...rooms);

// Retrieve customer information for the booking
const users = await User.find({ _id: { $in: booking.users } }); 
bookingDetail.users.push(...users);

  
    bookingDetails.push(bookingDetail);
  }
    res.status(200).json({ bookings: bookingDetails });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching booking details' });
  }
});

module.exports = router;
