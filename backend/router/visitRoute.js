const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const TempVisitBooking=require('../model/temporaryVisitSchema');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

//Apply for booking
router.post('/applyVisit/:hostelId', async(req,res) =>{
    
    const {name,email,phone,cnic,date} = req.body;
    const hostelId = req.params.hostelId; // Extract hostelId from URL parameters

    try {
        // const userId = req.rootUser._id;  //req.rootUser= user's complete complete record
        // //const userId=req.userId;
        
    
        // Create a new booking
        const tempvisitbooking = new TempVisitBooking({
            name,
            email,
            phone,
            cnic,
            date,
            hostelId
        });

        // Save the tempbooking document to the database
        const savedtempVisit= await tempvisitbooking.save();

        
        // Retrieve the booking ID
        const bookingId = savedtempVisit._id;
        
        



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
        const pendingBookings = await TempVisitBooking.find({ hostelId });

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
const refresh_token = '1//041HtjeO2j26dCgYIARAAGAQSNwF-L9Irdybl6-0mL3KHyZqBnkTPMp8MXY6tBBpgO1M0SRWZeKocTYi-6utXMH9KTww4R7kiBv0';

// Gmail API scopes
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Creating an OAuth2 client
const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);

// Send email route -> Confirm Visit
router.post('/confirmVisit', async (req, res) => {
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
      from: sender || 'explorerhostel2@gmail.com', // Set dynamic sender or use a default sender
      to,
      subject:'About Booking',
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



// Send email route -> Confirm Visit
router.post('/rejectVisit', async (req, res) => {
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
        from: sender || 'explorerhostel2@gmail.com', // Set dynamic sender or use a default sender
        to,
        subject:'About Visit',
        text: text || `You Request for booking is not approved by ${sender} `, 
      };
  
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result);
  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  });
module.exports= router;