// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/japan_tourism', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema for Destinations
const destinationSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String
});

// Create a model for Destinations
const Destination = mongoose.model('Destination', destinationSchema);

// API endpoints
// Get all destinations
app.get('/api/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new destination
app.post('/api/destinations', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    try {
        const newDestination = new Destination({ name, description, imageUrl });
        await newDestination.save();
        res.status(201).json(newDestination);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
