const express= require('express');
const router= express.Router();
//router.use(fileUpload()); // Use the fileUpload middleware

require('../db/connection'); //Database Connection
const Manager=require("../model/managerSchema") //managerSchema
const Hostel= require("../model/hostelSchema")  //hostelSchema
const authenticate = require("../middleware/authenticate");

// Backend endpoint to get hostel details by ID
router.get('/hostelProfileData/:hostelId', authenticate, async (req, res) => {
    try {
      const hostelId = req.params.hostelId;
  
      // Query the database to find the hostel by ID
      const hostel = await Hostel.findById(hostelId);
  
      if (!hostel) {
        return res.status(404).json({ error: 'Hostel not found' });
      }
  
      // Return the hostel details as JSON response
      res.json(hostel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Backend endpoint to display hostel details to user
router.get('/hostelDetails/:hostelId', async (req, res) => {
  try {
    const hostelId = req.params.hostelId;

    // Query the database to find the hostel by ID
    const hostel = await Hostel.findById(hostelId);

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Return the hostel details as JSON response
    res.json(hostel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
  




module.exports= router;