const express= require('express');
const fileUpload = require('express-fileupload');  //for images
const router= express.Router();
router.use(fileUpload()); // Use the fileUpload middleware

require('../db/connection'); //Database Connection
const Manager=require("../model/managerSchema") //managerSchema
const Hostel= require("../model/hostelSchema")  //hostelSchema
const authenticate = require("../middleware/authenticate");

//Add Hostel Route
//Create Hostel
router.post('/addHostel', authenticate, async(req,res) =>{
    
    const {name,address,city,phone,email,description,customersGender, NoOfFloors,NoOfRooms } = req.body;
  

    //const hostelImages = req.files.map(file => file.path); // Array of image paths
    console.log(req.body);
    try {
        const hostelImages = [];

        if (req.files && req.files.hostelImages) {
            if (Array.isArray(req.files.hostelImages)) {
                // Handle multiple files
                req.files.hostelImages.forEach(file => {
                    const filePath = file.path;
                    hostelImages.push(filePath);
                });
            } else {
                // Handle a single file
                const filePath = req.files.hostelImages.path;
                hostelImages.push(filePath);
            }
        }
        

        const managerId = req.userID; // Get the managerId from req.rootUser
        //const managerId = req.params.managerId; 
        //console.log(`managerId=${managerId}`);
        // Create a new hostel document based on Hostel schema
        const hostel = new Hostel({
            name,
            address,
            city,
            phone,
            email,
            description,
            customersGender,
            NoOfFloors,
            NoOfRooms,
            hostelImages
        });

        // Save the hostel document to the database
        const savedHostel= await hostel.save();

        
        try{
             await Manager.findByIdAndUpdate(managerId, 
                {$push : {hostels:savedHostel._id},
            })
        }catch(err){
             console.log(`Error in adding hostel to manager🤞 ${err}`);
        }
        res.status(201).json({ message: 'Hostel added successfully' });
        console.log(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding the hostel' });
    }
})

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