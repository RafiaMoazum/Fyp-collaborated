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

  // Route to retrieve hostels with averageRating > 3.5
router.get('/popularHostels', async (req, res) => {
  try {
      
      const hostels = await Hostel.find({ averageRating: { $gt: 3.5 } });

      if (!hostels || hostels.length === 0) {
          return res.status(404).json({ error: 'No highly rated hostels found' });
      }

      console.log(hostels)
      res.status(200).json({ hostels });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching highly rated hostels' });
  }
});
module.exports = router;
