const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Hostel = require('../model/hostelSchema');
const Booking = require('../model/bookingSchema');
const TempBooking=require('../model/temporaryBookingSchema');
const User = require('../model/userSchema');
const Room = require('../model/roomsSchema');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;


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

// OAuth 2.0 credentials
const clientId = '20839287515-dms9q3b52t26k41nsfd54edgqnijrplr.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'https://developers.google.com/oauthplayground';
const refresh_token = '1//04Sb7Y8IXZRgUCgYIARAAGAQSNwF-L9Ird9U3vHzGF4JkqkKZFjCcMyBIbAbFbOv1P_-76JUKcmZLkYlYQkpuedIfLPabsTCJj0w';

// Gmail API scopes
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Creating an OAuth2 client
const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);

// Send email route
router.post('/sendEmail', async (req, res) => {
  const { to, subject, text, sender } = req.body;

  try {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'rafiamoazum@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refresh_token,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });

    const mailOptions = {
      from: sender || 'rafiamoazum@gmail.com', // Set dynamic sender or use a default sender
      to,
      subject:'About Booking',
      text: text || 'You Bookung is Confirmed! Congratulations', 
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

module.exports = router;


