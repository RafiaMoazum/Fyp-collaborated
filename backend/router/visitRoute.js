const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const VisitBooking=require('../model/visitSchema');
const ConfirmedVisit=require('../model/confirmedVisitSchema')
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

//Apply for booking
router.post('/applyVisit/:hostelId', async(req,res) =>{
    
    const {name,email,phone,cnic,date,time} = req.body;
    const hostelId = req.params.hostelId; // Extract hostelId from URL parameters

    try {
        // const userId = req.rootUser._id;  //req.rootUser= user's complete complete record
        // //const userId=req.userId;
        
    
        // Create a new booking
        const visitbooking = new VisitBooking({
            name,
            email,
            phone,
            cnic,
            date,
            time,
            hostelId
        });

        // Save the tempbooking document to the database
        const savedVisit= await visitbooking.save();

        
        // Retrieve the booking ID
        const bookingId = savedVisit._id;
        
        



        res.status(201).json({ message: 'Visit Booking Done' });
        console.log(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while Booking' });
    }
})

// Display pending visits details
router.get('/pendingVisits/:hostelId', authenticate, async (req, res) => {
    const hostelId = req.params.hostelId;

    try {
        // Finding all pending visit records for the specified hostelId
        const pendingBookings = await VisitBooking.find({ hostelId });

        console.log("PendingBookings=",pendingBookings);
        // You can further customize the data you send in the response
        res.status(200).json({ pendingBookings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching pending bookings' });
    }
});

// OAuth 2.0 credentials
const clientId = '562995918458-jdo8on8efcbs9ns79lmpgrrdrk5b4evl.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'https://developers.google.com/oauthplayground';
const refresh_token = '1//04pgFhVdG2qr-CgYIARAAGAQSNwF-L9Ir3N8WS205O_nfYTZSWyTPIvWgNxEnOYz5eY8lIwQib5WFkqbwm3HfXCJzQP-puffDe0c';

// Gmail API scopes
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Creating an OAuth2 client
const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);

// Send email route -> Confirm Visit
router.post('/confirmVisit/:bookingId', async (req, res) => {
  const { to, subject, text, sender } = req.body;
  const bookingId = req.params.bookingId;

  try {
    console.log('Sender received:', sender);

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

    const mailOptions = {
      from: sender || 'explorerhostel2@gmail.com',
      to,
      subject: subject || 'About Booking',
      text: text || `Your Booking is Confirmed! Congratulations by ${sender}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);

    // Fetch the data from the visitBooking collection based on the bookingId
    const visitData = await VisitBooking.findById(bookingId);

    if (!visitData) {
      return res.status(404).json({ error: 'Visit booking not found' });
    }

    // Create a new instance of the ConfirmedVisit model using the fetched data
    const confirmedVisit = new ConfirmedVisit({
      name: visitData.name,
      email: visitData.email,
      phone: visitData.phone,
      cnic: visitData.cnic,
      date: visitData.date,
      time: visitData.time,
      hostelId: visitData.hostelId,
    });

    // Save the new instance to the ConfirmedVisit collection
    const savedConfirmedVisit = await confirmedVisit.save();

    // Delete the document from the visitBooking collection
    await VisitBooking.findByIdAndDelete(bookingId);

    res.status(200).json({ message: 'Email sent successfully and Booking confirmed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while sending the email and confirming the booking' });
  }
});



// Send email route -> reject Visit
router.post('/rejectVisit/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;

    const { to, subject, text, sender } = req.body;
  
    try {
      // Finding the temp booking record
   const visitBooking = await VisitBooking.findById(bookingId);
        
   if (!visitBooking) {
       return res.status(404).json({ error: 'Temp Booking not found' });
   }
      console.log('Sender received:', sender); 
  
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
        from: sender || 'explorerhostel2@gmail.com', // Set dynamic sender or use a default sender
        to,
        subject:'About Visit',
        text: text || `You Request for booking is not approved by ${sender} `, 
      };
  
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result);

      // Remove the tempBooking record
      await  VisitBooking.findByIdAndRemove(bookingId);

  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  });
module.exports= router;