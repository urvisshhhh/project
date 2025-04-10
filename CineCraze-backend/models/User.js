const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    password: String, // Hashed password
    resetOtp: String,  // OTP for password reset
    resetOtpExpiry: Date,  // Expiry timestamp
});

module.exports = mongoose.model("User", userSchema);
