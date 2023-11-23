const express= require('express');
const fileUpload = require('express-fileupload');  //for images
const router= express.Router();
//router.use(fileUpload()); // Use the fileUpload middleware

require('../db/connection'); //Database Connection
const Manager=require("../model/managerSchema") //managerSchema
const Hostel= require("../model/hostelSchema")  //hostelSchema
const authenticate = require("../middleware/authenticate");


//getting manager's data to display on hostels page
router.get('/managerData', authenticate, (req,res) =>{
    console.log("Hello from hostels page✌");
    console.log(req.rootUser);
    res.json(req.rootUser);   //is used in an Express.js route handler to send a JSON response to the client.

})


//getting hostels's data to display on hostels page
router.get('/hostelData', authenticate, async (req, res) => {
    try {
      
      const hostelIds = req.rootUser.hostels;  //req.rootUser= manager complete record
  
    
      const hostels = await Hostel.find({ _id: { $in: hostelIds } });  // query to find the hostel from hostel table by id
  
  
      res.json({ hostels });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
    
  module.exports= router;