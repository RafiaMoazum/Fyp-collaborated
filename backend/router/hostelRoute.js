const express = require('express');
const router = express.Router();
const multer = require('multer');
require('../db/connection'); // Database Connection
const Manager = require("../model/managerSchema"); // Manager Schema
const Hostel = require("../model/hostelSchema"); // Hostel Schema
const authenticate = require("../middleware/authenticate");

const storage = multer.diskStorage({
    destination: 'public/userImages',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

// Add Hostel Route
// Server-side code
router.post('/addHostel', authenticate, upload.array('hostelImages'), async (req, res) => {

    const { name, address, city, phone, email, description, customersGender, NoOfFloors, NoOfRooms,
        parking,
        wifi,
        laundry,
        Elevator,
        mess,
        livingArea } = req.body;

    try {
        const coordinatesString = req.body.coordinates;
        const [latitude, longitude] = coordinatesString.split(',').map(coord => parseFloat(coord.trim()));

        console.log("Latitude=", latitude);
        console.log("Longitude=", longitude);

        const hostelImages = req.files.map(file => file.path);

        const managerId = req.userID; // Get the managerId from req.rootUser

        // Create a new hostel document based on Hostel schema
        const hostel = new Hostel({
            name, address, city, phone, email, description, customersGender, NoOfFloors, NoOfRooms,
            facilities: {
                parking,
                wifi,
                laundry,
                Elevator,
                mess,
                livingArea,
            },
            coordinates: `${latitude}, ${longitude}`, // Storing coordinates as a string
            hostelImages
        });

        // Save the hostel document to the database
        const savedHostel = await hostel.save();

        try {
            await Manager.findByIdAndUpdate(managerId,
                { $push: { hostels: savedHostel._id } }
            );
        } catch (err) {
            console.log(`Error in adding hostel to manager🤞 ${err}`);
        }

        res.status(201).json({ message: 'Hostel added successfully' });
        console.log(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding the hostel' });
    }
});

// Route to retrieve all hostels
router.get('/getAllHostels', async (req, res) => {
    try {
      // Use the `find` method to retrieve all hostels
      const hostels = await Hostel.find();
  
      if (!hostels || hostels.length === 0) {
        return res.status(404).json({ error: 'No hostels found' });
      }
  
      res.status(200).json({ hostels });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching hostels' });
    }
  });
// router.get('/getUserData', async (req, res) => {
//     try {
//         const userId = req.rootUser._id;
//         const userData = await Manager.findById(userId);
//         res.status(200).json(userData);
//     } catch (error) {
//         res.status(500).json({ error: 'Unable to fetch user data' });
//     }
// });


module.exports= router;