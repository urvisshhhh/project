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
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie by ID with populated cinemas (if needed)
router.get("/populated/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cinemaIds");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);  // Send the populated movie details (with cinema details)
  } catch (err) {
    console.error("Error fetching populated movie:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new movie
router.post("/", async (req, res) => {
  try {
    const { title, poster, genre, language, duration, rating, releaseDate, synopsis, trailer, cast } = req.body;

    // Optional: Validation for required fields
    if (!title || !poster || !genre || !language || !duration || !rating || !releaseDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMovie = new Movie({
      title,
      poster,
      genre,
      language,
      duration,
      rating,
      releaseDate,
      synopsis,
      trailer,
      cast
    });

    await newMovie.save();
    res.status(201).json(newMovie);  // Return the created movie details
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a movie by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(updatedMovie);  // Return the updated movie details
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a movie
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
