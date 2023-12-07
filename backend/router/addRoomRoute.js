const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const Room = require('../model/roomsSchema'); // Import the Room schema
const Hostel = require('../model/hostelSchema');
const authenticate = require('../middleware/authenticate');

router.use(fileUpload()); // Use the fileUpload middleware

//Get and store room
router.post('/addRoom/:hostelId', authenticate, async (req, res) => {
    const hostelId = req.params.hostelId;
    console.log(`Hostel id= ${hostelId}`);
    const {
        roomNumber,
        type,
        capacity,
        currentCapacity,
        price,
        ac,
        workingDesk,
        attachedBath,
        roomFridge,
        geyser,
        Kitchenette,
        Safe,
        Iron,
        room_Service
    } = req.body;

    try {
        // const roomImages = [];

        // if (req.files && req.files.roomImages) {
        //     if (Array.isArray(req.files.roomImages)) {
        //         req.files.roomImages.forEach(file => {
        //             const filePath = file.path;
        //             roomImages.push(filePath);
        //         });
        //     } else {
        //         const filePath = req.files.roomImages.path;
        //         roomImages.push(filePath);
        //     }
        // }

        const room = new Room({
            roomNumber,
            capacity,
            currentCapacity,
            price,
            facilities: {
                ac,
                workingDesk,
                attachedBath,
                roomFridge,
                geyser,
                Kitchenette,
                Safe,
                Iron,
                room_Service
            },
            //roomImages
        });

        const savedRoom= await room.save();
        try{
            await Hostel.findByIdAndUpdate(hostelId, 
               {$push : {rooms:savedRoom._id},
           })
       }catch(err){
            console.log(`Error in adding room to hostel🤞 ${err}`);
       }

        res.status(201).json({ message: 'Room added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding the room' });
    }
    console.log(req.body)
});


//Display Room Data
router.get('/showRooms/:hostelId', async (req, res) => {
    const hostelId = req.params.hostelId;
  
    try {
      // Finding the hostel by its ID
      const hostel = await Hostel.findById(hostelId);
  
      if (!hostel) {
        return res.status(404).json({ error: 'Hostel not found' });
      }
  
      // Now accessing the room IDs associated with this hostel
      const roomIds = hostel.rooms;
  
      // Finding the room details using the room IDs
      const rooms = await Room.find({ _id: { $in: roomIds } });
  
      res.json(rooms);
    } catch (error) {
      console.error('Error fetching room data:', error);
      res.status(500).json({ error: 'An error occurred while fetching room data' });
    }
  });
  
  

module.exports = router;
