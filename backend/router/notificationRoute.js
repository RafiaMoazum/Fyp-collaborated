const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Hostel = require('../model/hostelSchema');
const Booking = require('../model/bookingSchema');
const TempBooking=require('../model/temporaryBookingSchema');
const User = require('../model/userSchema');
const Room = require('../model/roomsSchema');


// Display pending booking details
router.get('/pendingBookings/:hostelId', authenticate, async (req, res) => {
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
    const pendingbookings = await TempBooking.find({ rooms: { $in: roomIds } });
    
   
    // Create an array to store booking details
    const bookingDetails = [];

    // Iterate through the bookings and retrieve customer information
for (const booking of pendingbookings) {
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




// // Display pending booking details
// router.get('/pendingBookings/:hostelId', authenticate, async (req, res) => {
//   try {
//     const hostelId = req.params.hostelId;

//     // Finding the hostel document by ID
//     const hostel = await Hostel.findById(hostelId);

//     if (!hostel) {
//       return res.status(404).json({ error: 'Hostel not found' });
//     }

//     // Getting the array of room IDs from the hostel document
//     const roomIds = hostel.rooms;

//     // Finding all bookings where roomId matches any of the roomIds
//     const pendingbookings = await TempBooking.find({ rooms: { $in: roomIds } });

//     // Create an array to store booking details
//     const bookingDetails = [];

//     // Iterate through the bookings and retrieve room and user information
//     for (const booking of pendingbookings) {
//       const bookingDetail = {
//         bookingId: booking._id,
//         checkIn_date: booking.checkIn_date,
//         checkOut_date: booking.checkOut_date,
//         rooms: [],
//         users: [],
//       };

//       // Retrieve room information for the booking
//       for (const roomId of booking.rooms) {
//         const room = await Room.findById(roomId);
//         if (room) {
//           bookingDetail.rooms.push({
//             roomNumber: room.roomNumber,
//             price: room.price,
//             capacity: room.capacity,
//             currentCapacity: room.currentCapacity,
//             // Add other room properties as needed
//           });
//         }
//       }

//       // Retrieve user information for the booking
//       for (const userId of booking.users) {
//         const user = await User.findById(userId);
//         if (user) {
//           bookingDetail.users.push({
//             name: user.name,
//             cnic: user.cnic,
//             phone: user.phone,
//             // Add other user properties as needed
//           });
//         }
//       }

//       bookingDetails.push(bookingDetail);
//     }

//     res.status(200).json({ bookings: bookingDetails });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred while fetching booking details' });
//   }
// });

module.exports = router;


