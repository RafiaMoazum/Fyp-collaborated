const express= require('express');
const router= express.Router();
const moment = require('moment');

require('../db/connection'); //Database Connection

const User=require("../model/userSchema");
const Review=require("../model/reviewSchema")
const Hostel =require("../model/hostelSchema")
const customerAuthentication = require("../middleware/customerAuthentication");


// Create a new review
router.post('/addReview/:hostelId', customerAuthentication, async (req, res) => {

    const hostelId=req.params.hostelId;
    const { rating, comment } = req.body;

  try {
    //const userId = req.rootUser._id;  //req.rootUser= user's complete complete record
    const userId = req.userID;
    const newReview = new Review({ 
        rating, comment 
    });

    console.log(`userId======${userId}`)
    const savedReview =await newReview.save();

      // Retrieve the booking ID
      const reviewId = savedReview._id;
        
      try{
        await Review.findByIdAndUpdate(reviewId,
          {
              $push: {
                  hostel: hostelId,
                  user: userId
              },
          },
          { new: true } // This option returns the modified document
      );
      }catch(err){
           console.log(`Error in Booking🤞 ${err}`);
      }

    //     // Calling the averageRating route after adding a new review
    // await fetch(`/averageRating/${hostelId}`);
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
      const reviews = await Review.find({ hostel: hostelId }).populate('user', 'name');

      // Return the reviews as a JSON response
      res.json(reviews);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

router.get('/averageRating/:hostelId', async (req, res) => {
  try {
    const hostelId = req.params.hostelId;

    // Aggregate pipeline to calculate the average rating
    const averageRating = await Review.aggregate([
      { $match: { hostel: hostelId } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);

      // Round the average rating to one decimal place
      const roundedAverageRating = parseFloat(averageRating[0].avgRating.toFixed(1));

      // Updating the average rating in the Hostel model
      await Hostel.findByIdAndUpdate(hostelId, { averageRating: roundedAverageRating });
   

    console.log('Average Rating:', averageRating[0].avgRating);
    res.json({ averageRating: averageRating[0].avgRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET user by ID
router.get('/getUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
