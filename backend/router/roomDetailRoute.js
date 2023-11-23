const express= require('express');
const router= express.Router();
//router.use(fileUpload()); // Use the fileUpload middleware

require('../db/connection'); //Database Connection
const Hostel= require("../model/hostelSchema")  //hostelSchema
const Room= require("../model/roomsSchema") 
//const authenticate = require("../middleware/authenticate");

// Backend endpoint to get hostel details by ID
router.get('/roomDetails/:roomId', async (req, res) => {
    try {
      const roomId = req.params.roomId;
  
      // Query the database to find the room by ID
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Return the room details as JSON response
      res.json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  




module.exports= router;