const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Listing = require('./models/Listing');
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));

const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// DB Connection
mongoose.connect('mongodb://localhost:27017/hyperlocalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.post('/submit-listing', upload.array('photo', 10), async (req, res) => {
  try {
    const {
      productName,
      specifications,
      category,
      availability,
      price,
      dailyRate,
      lenderName,
      contactInfo,
      latitude,
      longitude
    } = req.body;

    const photoUrls = req.files.map(file => `/uploads/${file.filename}`);

    const newListing = new Listing({
      productName,
      specifications,
      category,
      availability,
      price,
      dailyRate,
      lenderName,
      contactInfo,
      photo: photoUrls,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)], // ✅ Ensure numbers
      },
    });

    await newListing.save();
    console.log('✅ Listing saved:', newListing);
    res.status(200).send('Data saved with location and photos!');
  } catch (err) {
    console.error('❌ Error saving listing:', err);
    res.status(500).send('Server error');
  }
});

// ✅ View all listings
app.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).send('Oops, listings went boom 💣');
  }
});

// ✅ Redundant endpoint, but keeping it just in case
app.get('/rent-items', async (req, res) => {
  try {
    const items = await Listing.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).send('Error fetching data 😵');
  }
});

// ✅ Geolocation filter
app.get('/nearby-listings', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).send('Missing coordinates.');

  try {
    const listings = await Listing.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000,
        },
      },
    });
    res.json(listings);
  } catch (err) {
    console.error('❌ Nearby fetch error:', err);
    res.status(500).send('Failed to get nearby listings.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
