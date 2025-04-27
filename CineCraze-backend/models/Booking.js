const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // Assuming you have a User model for customers
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  bookedSeats: [String],  // Array of booked seats
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  totalAmount: Number,
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;