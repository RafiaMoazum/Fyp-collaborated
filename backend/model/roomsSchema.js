const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    
    roomNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentCapacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    facilities: {
        ac: { type: Boolean, default: false },
        workingDesk: { type: Boolean, default: false },
        attachedBath: { type: Boolean, default: false },
        roomFridge: { type: Boolean, default: false },
        geyser: { type: Boolean, default: false },
        Kitchenette:{ type: Boolean, default: false },
        Safe:{ type: Boolean, default: false },
        Iron:{ type: Boolean, default: false },
        room_Service:{ type: Boolean, default: false }
        
    },
    roomImages: [
        {
            type: String // Array of image URLs
        }
    ]
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
