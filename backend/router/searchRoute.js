const express = require('express');
const router = express.Router();
const Hostel = require('../model/hostelSchema'); 

// Search hostels
router.get('/searchHostels', async (req, res) => {
    const { name, address } = req.query;
    console.log('Search query:', { name, address });
    try {
        let query = {};

        if (name) {
            query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive regex for partial name match
        }

        if (address) {
            query.address = { $regex: new RegExp(address, 'i') }; // Case-insensitive regex for partial address match
        }
        console.log('MongoDB Query:', query);
        const hostels = await Hostel.find(query);
        res.json(hostels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
