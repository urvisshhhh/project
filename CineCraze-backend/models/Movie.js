const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  genre: { type: [String], required: true },
  language: { type: [String], required: true },
  duration: { type: String, required: true },
  rating: { type: String, required: true },
  releaseDate: { type: String, required: true }
});

module.exports = mongoose.model("Movie", MovieSchema);
