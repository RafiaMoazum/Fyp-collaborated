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
