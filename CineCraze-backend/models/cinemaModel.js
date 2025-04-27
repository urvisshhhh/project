const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
  name: String,
  location: String,
  city: String,
  rating: Number,
  amenities: [String],
  image: String,
  showtimes: [
    {
      id: String,
      time: String,
      type: String
    }
  ]
});

module.exports = mongoose.model('Cinema', CinemaSchema);
