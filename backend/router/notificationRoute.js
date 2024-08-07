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
const clientId = '562995918458-jdo8on8efcbs9ns79lmpgrrdrk5b4evl.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'https://developers.google.com/oauthplayground';
const refresh_token = '1//046KGLwPormibCgYIARAAGAQSNwF-L9IrswAhwcbBNCDUIdlkAkJ2062nIfdYyYsfqQ5ds0dYcYL8RzvA2c9CicMPbSQkCiFPQJc';

// Gmail API scopes
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Creating an OAuth2 client
const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);

// Send email route -> Accept
router.post('/acceptEmail', async (req, res) => {
  const { to, subject, text, sender } = req.body;

  try {
    console.log('Sender received:', sender); // Add this line

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'explorerhostel2@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refresh_token,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });

    console.log('Sender:', sender);
    const mailOptions = {
      from: sender, // Set dynamic sender or use a default sender
      to,
      subject:'About Booking:Accepted',
      text: text || `You Bookung is Confirmed! Congratulations by ${sender} `, 
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});


// Send email route -> Reject
router.post('/rejectEmail/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;
  const { to, subject, text, sender } = req.body;

  try {
    
   // Find the temp booking record
   const tempBooking = await TempBooking.findById(bookingId);
        
   if (!tempBooking) {
       return res.status(404).json({ error: 'Temp Booking not found' });
   }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'explorerhostel2@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refresh_token,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });

    console.log('Sender:', sender);
    const mailOptions = {
      from: 'explorerhostel2@gmail.com', 
      to,
      subject:'About Booking: Reject',
      text: text || `You Booking is not Confirmed! by ${sender} `, 
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);

      // Remove the tempBooking record
        await TempBooking.findByIdAndRemove(bookingId);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

router.get('/getHostelByRoomId/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Find the hostel that has the specified room ID
    
    const hostel = await Hostel.findOne({ rooms: roomId });

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found for the given room ID' });
    }

    // You can customize the response based on your requirements
    res.json({ hostel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


