const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Listing = require('./models/Listing');

const app = express();
const PORT = 5000;

app.use(express.static('client'));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  }
});
const upload = multer({ storage });

mongoose.connect('mongodb://localhost:27017/hyperlocalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection failed:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.post('/submit-listing', upload.single('photo'), async (req, res) => {
  try {
    console.log('Incoming data:', req.body);
    
    const { productName, specifications, category, availability, price, lenderName, contactInfo, latitude, longitude } = req.body;

    const newListing = new Listing({
      productName,
      specifications,
      category,
      availability,
      price,
      lenderName,
      contactInfo,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      photo: req.file ? `/uploads/${req.file.filename}` : null,  
    });

    await newListing.save();
    res.status(200).send('Data saved with location and photo! 🎯');
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
