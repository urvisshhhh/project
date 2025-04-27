const express = require("express");
const Cinema = require("../models/cinemaModel");

const router = express.Router();

// ✅ Fetch all cinemas or by city
router.get("/", async (req, res) => {
  try {
    const city = req.query.city;
    const cinemas = city ? await Cinema.find({ city }) : await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: "Cinema not found" });
    res.json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new cinema
router.post("/", async (req, res) => {
  try {
    const newCinema = new Cinema(req.body);
    await newCinema.save();
    res.status(201).json(newCinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update a cinema by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCinema) return res.status(404).json({ message: "Cinema not found" });
    res.json(updatedCinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a cinema
router.delete("/:id", async (req, res) => {
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!deletedCinema) return res.status(404).json({ message: "Cinema not found" });
    res.json({ message: "Cinema deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
