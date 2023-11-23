const express = require('express');
const router = express.Router();
const Hostel = require('../model/hostelSchema');
require('../db/connection'); //Database Connection

// Define the route to display all hostels
router.get('/allHostels', async (req, res) => {
  try {
    
    const hostels = await Hostel.find();

    res.json({ hostels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Lahore
router.get('/hostelsInLahore', async (req, res) => {
    try {
      // Database Query to get all hostels in Lahore
      const hostelsInLahore = await Hostel.find({ city: { $regex: /^lahore$/i } });
  
      res.json({ hostels: hostelsInLahore });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
