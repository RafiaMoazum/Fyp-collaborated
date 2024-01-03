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

// Get room by ID
router.get('/getRoom/:roomId', authenticate, async (req, res) => {
  const roomId = req.params.roomId;

  try {
      const room = await Room.findById(roomId);

      if (!room) {
          return res.status(404).json({ error: 'Room not found' });
      }

      res.status(200).json(room);
  } catch (error) {
      console.error('Error fetching room details:', error);
      res.status(500).json({ error: 'An error occurred while fetching room details' });
  }
});

//Display Room Data
router.get('/showRooms/:hostelId', async (req, res) => {
    const hostelId = req.params.hostelId;
  
    try {
      // Finding the hostel by its ID
      //console.log('Hostel ID:', hostelId);
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
  
  // Update room
router.put('/updateRoom/:roomId', authenticate, async (req, res) => {
  const roomId = req.params.roomId;
  const {
      roomNumber,
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
      room_Service,
  } = req.body;

  try {
      const updatedRoom = await Room.findByIdAndUpdate(
          roomId,
          {
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
                  room_Service,
              },
          },
          { new: true } // Return the modified document rather than the original
      );

      res.status(200).json(updatedRoom);
  } catch (error) {
      console.error('Error updating room:', error);
      res.status(500).json({ error: 'An error occurred while updating the room' });
  }
});

// Delete room by ID
router.delete('/deleteRoom/:roomId', authenticate, async (req, res) => {
  const roomId = req.params.roomId;

  try {
    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Remove the room from the associated hostel
    const hostel = await Hostel.findOneAndUpdate(
      { rooms: roomId },
      { $pull: { rooms: roomId } },
      { new: true }
    );

    // Delete the room
    await Room.findByIdAndDelete(roomId);

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'An error occurred while deleting the room' });
  }
});


module.exports = router;
