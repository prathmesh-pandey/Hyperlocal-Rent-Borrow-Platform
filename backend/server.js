const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Listing = require('./models/Listing');

const app = express();
const PORT = 5000;

app.use(express.static('client'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hyperlocalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection failed:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.post('/submit-listing', async (req, res) => {
    try {
      console.log('Incoming data:', req.body);
      const listing = new Listing(req.body);
      await listing.save();
      res.status(200).send('Data saved! 🎉');
    } catch (err) {
      console.error('❌ Save error:', err);
      res.status(500).send('Error saving data 😵');
    }
  });
app.get('/listings', async (req, res) => {
    try {
      const listings = await Listing.find();
      res.json(listings);
    } catch (err) {
      res.status(500).send('Oops, listings went boom 💣');
    }
  });
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.get('/rent-items', async (req, res) => {
    try {
      const items = await Listing.find();
      res.status(200).json(items); 
    } catch (err) {
      res.status(500).send('Error fetching data 😵');
    }
  }); 
  app.get('/nearby-listings', async (req, res) => {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).send('Missing coordinates.');
  
    try {
      const listings = await Listing.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: 5000 // distance in meters
          }
        }
      });
      res.json(listings);
    } catch (err) {
      console.error('Nearby fetch error:', err);
      res.status(500).send('Failed to get nearby listings.');
    }
  }); 
