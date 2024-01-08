const express= require('express');
const router= express.Router();
const moment = require('moment');

require('../db/connection'); //Database Connection

const Room=require("../model/roomsSchema");
const User=require("../model/userSchema");
const Booking=require("../model/bookingSchema")
const TempBooking=require("../model/temporaryBookingSchema")
const customerAuthentication = require("../middleware/customerAuthentication");
const authenticate = require('../middleware/authenticate');


//Apply for booking
router.post('/apply/:roomId',customerAuthentication, async(req,res) =>{
    const roomId = req.params.roomId;
    console.log(`Room id= ${roomId}`);
    const {checkIn_date,checkOut_date} = req.body;


    //console.log(req.body);
    try {
        const userId = req.rootUser._id;  //req.rootUser= user's complete complete record
        //const userId=req.userId;
        
        const room = await Room.findById(roomId);
       
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        
        // Checking if the room is fully booked
        if (room.remainingCapacity <= 0) {
            return res.status(422).json({ error: 'Room is fully booked' });
        }

       
    
        // Create a new booking
        const tempbooking = new TempBooking({
            
            checkIn_date,
            checkOut_date,
            
            
        });

        // Save the tempbooking document to the database
        const savedtempBooking= await tempbooking.save();

        
        // Retrieve the booking ID
        const bookingId = savedtempBooking._id;
        
        try{
            await TempBooking.findByIdAndUpdate(bookingId, 
                {$push : { rooms: roomId }, 
            })
            await TempBooking.findByIdAndUpdate(bookingId, 
                {$push : { users: userId }, 
            })
        }catch(err){
             console.log(`Error in Booking🤞 ${err}`);
        }



        res.status(201).json({ message: 'Booking Done' });
        console.log(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while Booking' });
    }
})



// Confirm booking and move data from tempBooking to Booking
router.post('/confirmBooking/:bookingId', authenticate, async (req, res) => {
    const bookingId = req.params.bookingId;

    try {
        // Find the temp booking record
        const tempBooking = await TempBooking.findById(bookingId);
        
        if (!tempBooking) {
            return res.status(404).json({ error: 'Temp Booking not found' });
        }

        // Extract necessary data from tempBooking
        const { checkIn_date, checkOut_date, rooms, users } = tempBooking;

        // Create a new Booking
        const booking = new Booking({
            checkIn_date,
            checkOut_date,
            rooms,
            users,
            
        });

        // Save the booking document to the database
        const savedBooking = await booking.save();

        // Update room and user records accordingly
        for (const roomId of rooms) {
            // Find the room by ID
            const room = await Room.findById(roomId);
            
            if (room) {
                // Update remainingCapacity by -1
                room.remainingCapacity -= 1;

                // Save the changes to the room
                await room.save();
            }
        }

        // Remove the tempBooking record
        await TempBooking.findByIdAndRemove(bookingId);

        res.status(201).json({ message: 'Booking Confirmed' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while confirming the booking' });
    }
});

//Booking a room
router.post('/bookingroom/:roomId',customerAuthentication, async(req,res) =>{
    const roomId = req.params.roomId;
    console.log(`Room id= ${roomId}`);
    const {checkIn_date,checkOut_date} = req.body;
  

    //console.log(req.body);
    try {
        const userId = req.rootUser._id;  //req.rootUser= user's complete complete record
        //const userId=req.userId;
        
        const room = await Room.findById(roomId);
       
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        
        // Checking if the room is fully booked
        if (room.remainingCapacity <= 0) {
            return res.status(422).json({ error: 'Room is fully booked' });
        }

        // Subtract 1 from the room's capacity
        room.remainingCapacity -= 1;
       
        await room.save();
    
        // Create a new booking
        const booking = new Booking({
            checkIn_date,
            checkOut_date
            
        });

        // Save the hostel document to the database
        const savedBooking= await booking.save();

        // Retrieve the booking ID
        const bookingId = savedBooking._id;
        
        try{
             await Booking.findByIdAndUpdate(bookingId, 
                {$push : { rooms: roomId }, 
            })
            await Booking.findByIdAndUpdate(bookingId, 
                {$push : { users: userId }, 
            })
        }catch(err){
             console.log(`Error in Booking🤞 ${err}`);
        }


        res.status(201).json({ message: 'Booking Done' });
        console.log(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while Booking' });
    }
})


//  // Calculate the current date
//  const currentDate = moment();
//  console.log(`currentDate= ${currentDate}`)
//  // Calculate the checkout date
//  const checkoutDate = moment(checkOut_date);
//  console.log(`checkOutDate= ${checkOut_date}`)

//  // Check if the current date is greater than the checkout date by one day
//  if (currentDate.isAfter(checkoutDate.add(1, 'day'))) {
//      // If yes, add 1 to the room's capacity
//      room.capacity += 1;
//  }





module.exports= router;