const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city:{
        type:String
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    customersGender: {
        type: String, 
        enum: ['Male', 'Female', 'Other'], // Define possible values using enum
        required: true 
    },
    NoOfFloors: {
        type: Number,
        required: true
    },
    NoOfRooms: {
        type: Number,
        required: true
    },
    facilities: {
        convenience_store: { type: Boolean, default: false },
        parking: { type: Boolean, default: false },
        express_checkinCheckout: { type: Boolean, default: false },
        dinningArea: { type: Boolean, default: false },
        Elevator: { type: Boolean, default: false },
        mess:{ type: Boolean, default: false },
        commonRoom:{ type: Boolean, default: false },
        sportsArea:{ type: Boolean, default: false },
        guestArea:{ type: Boolean, default: false }
        
    },
    rooms:{
        type: [String]
    },
    hostelImages: [
        {
            type: String// Array of image URLs
        }
    ]
});

const Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
