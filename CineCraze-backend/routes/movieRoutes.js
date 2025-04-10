const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new movie
router.post("/", async (req, res) => {
  try {
    const { title, poster, genre, language, duration, rating, releaseDate } = req.body;
    const newMovie = new Movie({ title, poster, genre, language, duration, rating, releaseDate });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a movie
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
