const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Hostel = require('../model/hostelSchema');
const Booking = require('../model/bookingSchema');
const User = require('../model/userSchema');
const Room = require('../model/roomsSchema');
const TempBooking= require('../model/temporaryBookingSchema')
const customerAuthentication = require('../middleware/customerAuthentication');



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

router.delete('/deleteall', async (req, res) => {
  try {
    await Manager.deleteMany({});
    res.status(200).json({ success: true, message: 'All  deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting rooms.' });
  }
});

router.get('/userBookings/:userId', customerAuthentication, async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await TempBooking.find({ users: userId });

    // Create an array to store booking details
    const bookingDetails = [];

    // Iterate through the bookings and retrieve room and user information
    for (const booking of bookings) {
      const bookingDetail = {
        _id: booking._id,
        checkIn_date: booking.checkIn_date,
        checkOut_date: booking.checkOut_date,
        rooms: [],
        users: [],
      };

      // Retrieve room information for the booking
      const rooms = await Room.find({ _id: { $in: booking.rooms } });
      bookingDetail.rooms.push(...rooms);

      // Retrieve user information for the booking
      const users = await User.find({ _id: { $in: booking.users } });
      bookingDetail.users.push(...users);

      bookingDetails.push(bookingDetail);
    }

    res.status(200).json(bookingDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching user bookings' });
  }
});

router.get('/showConfirmedBookings/:userId', customerAuthentication, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assuming you have a user ID associated with the bookings
    const bookings = await Booking.find({ users: userId });

    // Create an array to store booking details
    const bookingDetails = [];

    // Iterate through the bookings and retrieve necessary information
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
    res.status(500).json({ error: 'An error occurred while fetching confirmed booking details' });
  }
});

module.exports = router;
