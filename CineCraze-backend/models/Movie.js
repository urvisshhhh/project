  const mongoose = require("mongoose");

  const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true },
    genre: { type: [String], required: true },
    language: { type: [String], required: true },
    duration: { type: String, required: true },
    rating: { type: String, required: true },
    releaseDate: { type: String, required: true },
    synopsis: { type: String },
    trailer: { type: String },
    cast: [
      {
        id: String,
        name: String,
        role: String,
        image: String
      }
    ]
  });
  
  module.exports = mongoose.model("Movie", MovieSchema);
