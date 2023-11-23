const express= require('express');
const router= express.Router();
const moment = require('moment');

require('../db/connection'); //Database Connection

const Room=require("../model/roomsSchema");
const User=require("../model/userSchema");
const Booking=require("../model/bookingSchema")
const customerAuthentication = require("../middleware/customerAuthentication");


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
        if (room.currentCapacity <= 0) {
            return res.status(422).json({ error: 'Room is fully booked' });
        }

        // Subtract 1 from the room's capacity
        room.currentCapacity -= 1;
       
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