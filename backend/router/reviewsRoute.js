const express= require('express');
const router= express.Router();
const moment = require('moment');

require('../db/connection'); //Database Connection

const User=require("../model/userSchema");
const Review=require("../model/reviewSchema")
const Hostel =require("../model/hostelSchema")
const customerAuthentication = require("../middleware/customerAuthentication");


// Create a new review
router.post('/addReview/:hostelId',  async (req, res) => {

    const hostelId=req.params.hostelId;
    const { rating, comment } = req.body;

  try {
    //const userId = req.rootUser._id;  //req.rootUser= user's complete complete record
    const newReview = new Review({ 
        rating, comment 
    });

    const savedReview =await newReview.save();

      // Retrieve the booking ID
      const reviewId = savedReview._id;
        
      try{
           await Review.findByIdAndUpdate(reviewId, 
              {$push : { hostel: hostelId }, 
          })
        //   await Review.findByIdAndUpdate(reviewId, 
        //       {$push : { users: userId }, 
        //   })
      }catch(err){
           console.log(`Error in Booking🤞 ${err}`);
      }

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create the review' });
  }
});

// Display Reviews
router.get('/showReviews/:hostelId', async (req, res) => {
    try {
      const hostelId = req.params.hostelId;
  
      // Query the database to find reviews with matching hostelId
      const reviews = await Review.find({ hostel: hostelId });
  
      // Return the reviews as a JSON response
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  


module.exports = router;
