const express = require("express");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const router = express.Router();

// Create booking
router.post("/book", async (req, res) => {
  const { movieId, customerId, bookedSeats, totalAmount } = req.body;
  
  try {
    // Save booking information
    const booking = new Booking({
      customerId,
      movieId,
      bookedSeats,
      totalAmount,
      paymentStatus: "Pending",  // Initially, payment status is "Pending"
    });

    await booking.save();
    
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get booking details by customer
router.get("/:customerId", async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId }).populate("movieId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;