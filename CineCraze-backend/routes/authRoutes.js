const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// 🔹 Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 🔹 Register User
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, phone, password: hashedPassword });
        await user.save();
        res.json({ message: "Registration successful!" });
    } catch (err) {
        res.status(400).json({ message: "Email already registered" });
    }
});

// 🔹 Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
});

// 🔹 Forgot Password - Send OTP
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const otp = generateOTP();
        console.log("Generated OTP:", otp);

        // Hash the OTP before storing it
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Store OTP and expiry time in the user document
        user.resetOtp = hashedOtp;
        user.resetOtpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
        await user.save(); // Ensure OTP is saved properly

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return res.status(500).json({ message: "Email sending failed" });
            res.json({ message: "OTP sent to your email" });
        });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 🔹 Verify OTP
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        console.log("Stored Hashed OTP in DB:", user.resetOtp);
        console.log("Entered OTP:", otp);

        if (!user.resetOtp) {
            return res.status(400).json({ message: "OTP not found. Request a new one." });
        }

        if (user.resetOtpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP expired. Please request a new one." });
        }

        const isOtpValid = await bcrypt.compare(otp, user.resetOtp);

        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        // Reset OTP fields after successful verification
        user.resetOtp = null;
        user.resetOtpExpiry = null;
        await user.save();

        res.json({ message: "OTP verified successfully!" });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/reset-password", async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user password
      await User.updateOne({ email }, { $set: { password: hashedPassword, resetOtp: null, resetOtpExpiry: null } });

      res.json({ message: "Password reset successfully. You can now log in." });
  } catch (error) {
      console.error("Password Reset Error:", error);
      res.status(500).json({ message: "Server error. Try again later." });
  }
});

// Admin Login Route
router.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin._id }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;


