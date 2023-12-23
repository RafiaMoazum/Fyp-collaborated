const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const TempVisitBooking=require('../model/temporaryVisitSchema');


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

  
module.exports= router;